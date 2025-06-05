import { currentUser } from "@clerk/nextjs/server";
import { createUploadthing  , type FileRouter} from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const OurFileRouter = {
    pdfUploader : f({pdf: { maxFileSize: "32MB" }}).middleware(async({req})=>{
        const user = await currentUser();
        if (!user) throw new Error("Unauthorized");
        return { userID: user.id}
    }).onUploadComplete(async({metadata, file})=>{
        console.log("Upload complete for id:", metadata.userID);
        console.log("File URL", file.ufsUrl);
        return {userID : metadata.userID ,
             url : file.ufsUrl,
            name : file.name,};
    })
} satisfies FileRouter;

export type OurFileRouter = typeof OurFileRouter;
