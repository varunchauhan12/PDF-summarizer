"use client";
import { Button } from "@/components/ui/button";
import { DownloadIcon } from "lucide-react";

export default function DownloadSummaryButton({
  title,
  summary_text,
  file_name,
}: {
  title: string;
  summary_text: string;
  file_name: string;
}) {
  console.log("this is the summary ", summary_text);
  const handleDownload = () => {
    const safeTitle = title || "Untitled";
    const safeSummaryText = summary_text || "No summary available";
    const safeFileName = file_name || "document";

    const summary = `# ${safeTitle}

Generated Summary

${safeSummaryText}

Source file: ${safeFileName}
Generated by MindWorksAI
`;

    const blob = new Blob([summary], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Summary-${safeFileName.replace(/[^a-zA-Z0-9]/g, "_")}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Button
      onClick={handleDownload}
      size="sm"
      className="h-8 px-3 bg-rose-100 text-rose-600 hover:text-rose-700 hover:bg-rose-50 flex items-center"
    >
      <DownloadIcon className="items-center text-center w-4 h-4 gap-1.5" />
      Download Summary
    </Button>
  );
}
