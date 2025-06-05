"use client";
import { useRouter } from "next/navigation";
import { getPDFSummary } from "@/actions/upload-action";
import { storePDFsummaryAction } from "@/actions/upload-action";
import { toast } from "sonner";
import { set, z } from "zod";
import UploadFormInput from "./upload-form-input";

import { useUploadThing } from "@/utils/uploadthing";
import { useRef, useState } from "react";
import LoadingSkeleton from "./LoadingSkeletonPage";

// Schema for file validation
const Schema = z.object({
  file: z
    .instanceof(File, { message: "Invalid file" })
    .refine(
      (file) => file.size <= 20 * 1024 * 1024,
      "File size must be less than 24MB"
    )
    .refine(
      (file) => file.type.startsWith("application/pdf"),
      "file must be a PDF"
    ),
});

export default function Uploadform() {
  const uploadref = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Initialize UploadThing with callbacks
  const { startUpload, routeConfig } = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => {
      console.log("Upload complete");
    },

    onUploadError: (error) => {
      console.log("upload error", error);
      setIsLoading(false);

      toast.error("Error occurred while uploading", {
        description: error.message,
      });
    },

    onUploadBegin: (fileName) => {
      console.log("upload begin for", fileName);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let storeResult: any; // Move declaration here to make it available in the entire function

    try {
      setIsLoading(true);
      const formdta = new FormData(e.currentTarget);
      const file = formdta.get("file") as File;

      // Validate the file
      const ValidatedFields = Schema.safeParse({ file });

      if (!ValidatedFields.success) {
        console.log(
          ValidatedFields.error.flatten().fieldErrors.file?.[0] ??
            "Invalid file"
        );

        setIsLoading(false);
        toast.error("❌something went wrong", {
          description:
            ValidatedFields.error.flatten().fieldErrors.file?.[0] ??
            "Invalid file",
        });

        return;
      }

      // Start the upload process
      toast.success("Uploading PDF", {
        description: "We are uploading your file to the server",
      });

      const resp = await startUpload([file]);
      console.log("----resp----", resp);

      // Check if upload was successful
      if (!resp) {
        setIsLoading(false);
        toast.error("❌something went wrong", {
          description: "Please use a different file or try again",
        });

        return;
      }

      // Process the PDF
      toast.success("📄Processing PDF", {
        description: "Hang Tight! Our AI is working on your PDF🔄 ",
      });

      const result = await getPDFSummary(resp);
      const { data = null, message = null } = result || {};

      if (data) {
        toast.success("📄Saving PDF", {
          description: "Hang Tight! We are saving your PDF summary",
        });

        if (data.summary) {
          // Check that the URL exists in the expected place
          const fileURL = resp[0]?.serverData?.url;

          if (!fileURL) {
            console.error("File URL not found in response", resp);
            toast.error("Error: File URL not found");
            setIsLoading(false);

            return;
          }

          // Store the PDF summary
          storeResult = await storePDFsummaryAction({
            summary: data.summary,
            fileURL,
            title: data.title,
            filename: file.name,
          });

          // Check the result of the action
          if (!storeResult?.success) {
            toast.error("Failed to save PDF summary", {
              description: storeResult?.message || "Unknown error",
            });

            setIsLoading(false);
            return;
          }

          // Success! Show toast and reset form
          toast.success("✅PDF summary saved", {
            description: "Your PDF summary has been saved successfully",
          });

          uploadref.current?.reset();
          console.log("Store result:", storeResult);
          if (storeResult?.data?.id) {
            router.push(`summaries/${storeResult.data.id}`);
          } else {
            router.push(`/dashboard`);
          }
        }
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error in PDF processing", error);
      uploadref.current?.reset();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadFormInput
        isLoading={isLoading}
        ref={uploadref}
        onSubmit={handleSubmit}
      />

      {isLoading && (
        <div className="relative">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full border-t border-gray-200 dark:border-gray-800" />
            <div className="relative flex justify-center">
              <span className="bg-background px-3 text-muted-foreground text-sm">
                Processing
              </span>
            </div>
          </div>
          <LoadingSkeleton />
        </div>
      )}
    </div>
  );
}
