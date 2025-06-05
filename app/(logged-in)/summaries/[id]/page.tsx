import getSummarybyId from "@/lib/summaries";
import { notFound } from "next/navigation";
import BgGradient from "@/components/ui/common/bg-gradient";
import { SummaryHeader } from "@/components/summaries/summary-header";
import SourceInfo from "@/components/summaries/source-info";
import { FileText } from "lucide-react";
import SummaryViewer from "@/components/summaries/summary-viewer";
import { MotionDiv } from "@/components/ui/common/motion-wrapper";
import { itemVariants } from "@/utils/constants";
export default async function SummaryPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const id = params.id;
  const summary = await getSummarybyId(id);

  if (!summary) {
    notFound();
  }

  const {
    title,
    summary_text,
    file_name,
    word_count,
    created_at,
    original_file_url,
  } = summary;

  return (
    <div className="relative isolate min-h-screen bg-linear-to-b from-rose-50/40 to-white">
      <BgGradient className="from-rose-400 via-rose-300 to-orange-200" />

      <div className="container mx-auto flex flex-col gap-4">
        <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-12 lg:py-24">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="flex flex-col"
          >
            <SummaryHeader title={title} created_at={created_at} />

            {file_name && (
              <SourceInfo
                file_name={file_name}
                summary_text={summary_text}
                created_at={created_at}
                title={title}
                original_file_url={original_file_url}
              />
            )}

            <div className="relative mt-4 sm:mt-8 lg:mt-16">
              <MotionDiv
                variants={itemVariants}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="relative p-4 sm:p-6 lg:p-8 
                bg-white/80 backdrop-blur-md rounded-2xl 
                sm:rounded-3xl shadow-xl border border-rose-100/30 
                transition-all duration-300 hover:shadow-2xl 
                hover:bg-white/90 max-w-4xl mx-auto"
              >
                <div
                  className="absolute inset-0 
                  bg-gradient-to-br from-rose-50/30 via-orange-50/30 
                  to-transparent opacity-50 rounded-2xl 
                  sm:rounded-3xl"
                />

                <div
                  className="absolute top-2 sm:top-4 
                  right-2 sm:right-4 flex items-center gap-1.5 
                  sm:gap-2 text-xs sm:text-sm"
                >
                  <div
                    className="text-muted-foreground bg-white/90 px-2 sm:px-3 
                    py-1 sm:py-1.5 rounded-full shadow-xs"
                  >
                    <FileText className="w-3 h-3 sm:w-4 sm:h-4 mr-1 inline" />
                    <span className="font-medium">
                      {word_count?.toLocaleString()} words
                    </span>
                  </div>
                </div>

                <div className="relative mt-8 sm:mt-6 flex justify-center">
                  <SummaryViewer summary={summary.summary_text} />
                </div>
              </MotionDiv>
            </div>
          </MotionDiv>
        </div>
      </div>
    </div>
  );
}
