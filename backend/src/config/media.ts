import { create } from "ipfs-http-client";
import multer from "multer";
// import { initializeApp } from "firebase/app";

const storage = multer.memoryStorage();

export const handlFile = multer({ storage: storage });

const projectId = "2A7w9VDHoStSf2GY97qR9hRr7WT";
const projectSecret = "73483f05e1e3a56adbf5a2d864144af3";
const auth =
  "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");
export const ipfsClient = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

// const firebaseConfig = {
//   apiKey: "AIzaSyDL84Goy2Jd2cNuQ7k5fz0XVsov9sVBF9o",
//   authDomain: "ebookapp-81a39.firebaseapp.com",
//   projectId: "ebookapp-81a39",
//   storageBucket: "ebookapp-81a39.appspot.com",
//   messagingSenderId: "978252595759",
//   appId: "1:978252595759:web:e61a848b66acec39b63cda",
// };
// export const fireBaseApp = initializeApp(firebaseConfig);
