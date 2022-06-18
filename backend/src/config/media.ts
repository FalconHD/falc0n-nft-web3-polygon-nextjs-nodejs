import { create } from "ipfs-http-client";
import multer from "multer";

const storage = multer.memoryStorage();

export const handlFile = multer({ storage: storage });

const projectId = process.env.projectId
const projectSecret = process.env.projectSecret
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
