import { Card } from "@/components/ui/card";
import DeleteButton from "@/components/summaries/delete-button";
import Link from "next/link";
import { FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import { formatFileName } from "@/lib/utils";
import { MotionDiv } from "../ui/common/motion-wrapper";
import { itemVariants } from "@/utils/constants";

const StatusBadge = ({ status }: { status: string }) => {
  return (
    <span
      className={cn(
        "px-3 py-1 text-xs font-medium rounded-full capitalize inline-block",
        status === "completed"
          ? "bg-green-100 text-green-800"
          : "bg-yellow-100 text-yellow-800"
      )}
    >
      {status}
    </span>
  );
};

const SummaryHeader = ({
  fileUrl,
  title,
  createdAt,
}: {
  fileUrl: string;
  title: string | null;
  createdAt: string;
}) => {
  return (
    <div className="flex items-center gap-3 w-full ">
      <div className="shrink-0">
        <FileText className="w-5 h-5 text-rose-500" />
      </div>
      <div className="flex-1 min-w-0 pr-8">
        <h3 className="text-base font-semibold text-gray-900 truncate leading-none m-0">
          {title || formatFileName(fileUrl)}
        </h3>
        <p className="text-xs text-gray-500 mt-1">
          {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
        </p>
      </div>
    </div>
  );
};

export default function SummaryCard({ summary }: { summary: any }) {
  return (
    <MotionDiv
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      whileHover={{
        scale: 1.04,
        transition: { duration: 0.2, ease: "easeOut" },
      }}
    >
      <Card className="relative h-full overflow-hidden hover:shadow-md transition-shadow duration-200">
        <div className="absolute top-5 right-5 z-10">
          <DeleteButton summaryId={summary.id} />
        </div>

        <Link href={`summaries/${summary.id}`} className="block p-5 h-full">
          <div className="flex flex-col h-full">
            {/* Header section - removed margin bottom and adjusted positioning */}
            <SummaryHeader
              fileUrl={summary.original_file_url}
              title={summary.title}
              createdAt={summary.created_at}
            />

            {/* Summary text with consistent padding */}
            <p className="text-gray-600 line-clamp-3 text-sm mt-4 flex-grow">
              {summary.summary_text}
            </p>

            {/* Footer section with status badge */}
            <div className="mt-4 pt-2 border-t border-gray-100">
              <StatusBadge status={summary.status} />
            </div>
          </div>
        </Link>
      </Card>
    </MotionDiv>
  );
}
