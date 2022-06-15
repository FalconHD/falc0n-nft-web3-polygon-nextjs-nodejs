// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "hardhat/console.sol";

contract NFTMarket is ERC721URIStorage {
    using Counters for Counters.Counter;
    // nfts tokens
    Counters.Counter private _token;

    // collection tokens
    Counters.Counter private _collection;

    // transaction
    Counters.Counter private _transactionIds;

    // marketplace owner
    address payable owner;

    /*
        Struct
            */
    struct Collection {
        uint256 collectionToken;
        string tokenURI;
        address payable creator;
        uint256 floor_price;
        address[] owners;
        uint256[] nfts;
    }

    struct NFT {
        uint256 nftToken;
        address payable owner;
        uint256 price;
        bool onSale;
        address[] likes;
    }

    struct MarketTransaction {
        uint256 transactionId;
        uint256 tokenId;
        address payable seller;
        address payable buyer;
        uint256 price;
    }

    /* 
        Map 
            */
    mapping(uint256 => NFT) private idToNFT;
    mapping(uint256 => Collection) private idToCollection;
    mapping(uint256 => MarketTransaction) private idToMarketTransaction;

    /*  events */

    event NFTCreated(
        uint256 nftToken,
        address payable owner,
        uint256 price,
        bool onSale,
        uint256 likes
    );

    event CollectionCreated(
        uint256 collectionToken,
        string tokenURI,
        address payable owner,
        uint256 floor_price,
        address[] owners,
        uint256[] nfts
    );

    constructor() ERC721("Falc0n Nfts", "METT") {
        owner = payable(msg.sender);
    }

    /* 
            collection contract

            create new collection token
            add owner to collection token

            get one collection
            get all collections
            get collection by owner
        */

    modifier collectionTokenExiste(uint256 collectionToken) {
        require(
            idToCollection[collectionToken].collectionToken != 0x0,
            "Collection don't existe"
        );
        _;
    }

    modifier isCollectionOwner(uint256 collectionToken) {
        Collection memory currentCollection = idToCollection[collectionToken];

        bool isOwner = false;
        for (uint256 i = 0; i < currentCollection.owners.length; i++) {
            if (msg.sender == currentCollection.owners[i]) {
                isOwner = true;
            }
        }
        require(
            isOwner == true || msg.sender == currentCollection.creator,
            "You don't have permission"
        );
        _;
    }

    //create new collection token
    function createCollectionToken() private returns (uint256) {
        _collection.increment();
        uint256 newTokenId = _collection.current();

        // _mint(msg.sender, newTokenId);
        // _setTokenURI(newTokenId, tokenURI);
        return newTokenId;
    }

    function createCollection(string memory tokenURI) public payable {
        uint256 newCollectionToken = createCollectionToken();
        idToCollection[newCollectionToken] = Collection(
            newCollectionToken,
            tokenURI,
            payable(msg.sender),
            0,
            new address[](0),
            new uint256[](0)
        );

        emit CollectionCreated(
            newCollectionToken,
            tokenURI,
            payable(msg.sender),
            0,
            new address[](0),
            new uint256[](0)
        );
    }

    function addOwner(address newOwner, uint256 collectionToken)
        public
        collectionTokenExiste(collectionToken)
    {
        require(
            idToCollection[collectionToken].creator == msg.sender,
            "You are not a collection creator!"
        );
        idToCollection[collectionToken].owners.push(newOwner);
    }

    function getCollections() public view returns (Collection[] memory) {
        uint256 itemCount = _collection.current();

        Collection[] memory items = new Collection[](itemCount);
        for (uint256 currentId = 1; currentId <= itemCount; currentId++) {
            Collection storage currentItem = idToCollection[currentId];
            items[currentId - 1] = currentItem;
        }
        return items;
    }

    function getCollection(uint256 collectionToken)
        public
        view
        collectionTokenExiste(collectionToken)
        returns (Collection memory)
    {
        return idToCollection[collectionToken];
    }

    function getCollectionByOwner() public view returns (Collection[] memory) {
        uint256 totalItemCount = _collection.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (
                containsByAddress(idToCollection[i + 1].owners, msg.sender) ||
                idToCollection[i + 1].creator == msg.sender
            ) {
                itemCount += 1;
            }
        }

        Collection[] memory items = new Collection[](itemCount);

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (
                containsByAddress(idToCollection[i + 1].owners, msg.sender) ||
                idToCollection[i + 1].creator == msg.sender
            ) {
                uint256 currentId = i + 1;
                Collection storage currentItem = idToCollection[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    /* 
            NFT contract

            creation of new NFT
            listing of new NFT  // setOnSale
            buying of new NFT
            updating of new NFT // price - like

            get NFT by token
            get NFT by Collection
            get NFT by Owner
            get all NFT
        */

    //create new nft token
    modifier NFTTokenExiste(uint256 NFTToken) {
        require(idToNFT[NFTToken].nftToken != 0x0, "NFT not found");
        _;
    }

    modifier isNTFOwner(uint256 NFTToken) {
        require(idToNFT[NFTToken].owner == msg.sender, "You are not the owner");
        _;
    }

    function createNFTToken(string memory tokenURI) private returns (uint256) {
        _token.increment();
        uint256 newTokenId = _token.current();

        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        return newTokenId;
    }

    function createNFTItem(
        string memory tokenURI,
        uint256 price,
        uint256 collectionToken
    ) public payable isCollectionOwner(collectionToken) {
        // Verifications
        require(price > 0, "Price must be at least 1 wei");

        // Process
        uint256 newNFTToken = createNFTToken(tokenURI);
        idToNFT[newNFTToken] = NFT(
            newNFTToken,
            payable(msg.sender),
            price,
            true,
            new address[](0)
        );

        //add NFT to collection
        idToCollection[collectionToken].nfts.push(newNFTToken);

        //set floot price
        if (idToCollection[collectionToken].floor_price == 0) {
            idToCollection[collectionToken].floor_price = price;
        } else {
            idToCollection[collectionToken].floor_price = min(
                idToCollection[collectionToken].floor_price,
                price
            );
        }

        //event
        emit NFTCreated(newNFTToken, payable(msg.sender), price, false, 0);
    }

    //set NFT Price
    function setNFTPrice(uint256 price, uint256 NFTToken)
        public
        NFTTokenExiste(NFTToken)
        isNTFOwner(NFTToken)
    {
        require(price > 0, "Price must be at least 1 wei");
        require(
            idToNFT[NFTToken].onSale == false,
            "You can't set price while the NFT is on sale!"
        );
        idToNFT[NFTToken].price = price;
    }

    //set NFT onSale
    function setOnSaleNFT(uint256 NFTToken, bool _state)
        public
        NFTTokenExiste(NFTToken)
        isNTFOwner(NFTToken)
    {
        idToNFT[NFTToken].onSale = _state;
    }

    //buy NFT
    function buyNFT(uint256 NFTToken) public payable NFTTokenExiste(NFTToken) {
        require(
            idToNFT[NFTToken].owner != msg.sender,
            "You are already the owner!"
        );
        require(idToNFT[NFTToken].onSale == true, "NFT not for sale");
        require(
            idToNFT[NFTToken].price == msg.value,
            "Not the right price to sell"
        );

        // transaction
        if (idToNFT[NFTToken].owner.send(msg.value)) {
            _transfer(idToNFT[NFTToken].owner, msg.sender, NFTToken);
            idToNFT[NFTToken].owner = payable(msg.sender);
            idToNFT[NFTToken].onSale = false;

            // transaction history
            _transactionIds.increment();
            uint256 transactionId = _transactionIds.current();
            idToMarketTransaction[transactionId] = MarketTransaction(
                transactionId,
                NFTToken,
                payable(idToNFT[NFTToken].owner),
                payable(msg.sender),
                idToNFT[NFTToken].price
            );
        }
    }

    //set NFT like
    function setLike(uint256 NFTToken) public NFTTokenExiste(NFTToken) {
        require(
            idToNFT[NFTToken].owner != msg.sender,
            "You are the owner! you can't like your own NFT"
        );

        bool userExist = false;
        for (uint256 i = 0; i < idToNFT[NFTToken].likes.length; i++) {
            if (idToNFT[NFTToken].likes[i] == msg.sender) {
                userExist = true;
                delete idToNFT[NFTToken].likes[i];
                break;
            }
        }
        if (!userExist) {
            idToNFT[NFTToken].likes.push(msg.sender);
        }
    }

    //get NFT Like count
    function numberOfLikes(uint256 NFTToken)
        public
        view
        NFTTokenExiste(NFTToken)
        returns (uint256)
    {
        return idToNFT[NFTToken].likes.length;
    }

    //get NFT by Token
    function getNFT(uint256 NFTToken)
        public
        view
        NFTTokenExiste(NFTToken)
        returns (NFT memory)
    {
        return idToNFT[NFTToken];
    }

    //get NFT by Collection
    function getNFTByCollection(uint256 _CollectionToken)
        public
        view
        collectionTokenExiste(_CollectionToken)
        returns (NFT[] memory)
    {
        uint256[] memory nftsToken = idToCollection[_CollectionToken].nfts;

        NFT[] memory items = new NFT[](nftsToken.length);

        for (uint256 index = 0; index < nftsToken.length; index++) {
            items[index] = idToNFT[nftsToken[index]];
        }
        return items;
    }

    //get all NFT
    function getNFTs() public view returns (NFT[] memory) {
        uint256 NFTCount = _token.current();

        NFT[] memory items = new NFT[](NFTCount);
        for (uint256 currentId = 1; currentId <= NFTCount; currentId++) {
            items[currentId - 1] = idToNFT[currentId];
        }
        return items;
    }

    //get NFT by Owner
    function getNFTbyOwner() public view returns (NFT[] memory) {
        uint256 NFTCount = _token.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < NFTCount; i++) {
            if (idToNFT[i + 1].owner == msg.sender) {
                itemCount += 1;
            }
        }

        NFT[] memory items = new NFT[](itemCount);

        for (uint256 i = 0; i < NFTCount; i++) {
            if (idToNFT[i + 1].owner == msg.sender) {
                uint256 currentId = i + 1;
                NFT storage currentItem = idToNFT[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    /*
        Utilities

        */
    function max(uint256 a, uint256 b) internal pure returns (uint256) {
        return a >= b ? a : b;
    }

    function min(uint256 a, uint256 b) internal pure returns (uint256) {
        return a >= b ? b : a;
    }

    /* Returns all market transactions */
    function fetchMarketTransactions()
        public
        view
        returns (MarketTransaction[] memory)
    {
        uint256 transactionCount = _transactionIds.current();

        MarketTransaction[] memory transactions = new MarketTransaction[](
            transactionCount
        );

        for (uint256 i = 0; i < transactionCount; i++) {
            MarketTransaction memory currentTransaction = idToMarketTransaction[
                i
            ];
            transactions[i] = currentTransaction;
        }
        return transactions;
    }

    function containsByAddress(address[] memory array, address _address)
        private
        pure
        returns (bool)
    {
        for (uint256 index = 0; index < array.length; index++) {
            if (array[index] == _address) {
                return true;
            }
        }
        return false;
    }
}
