"use client";
import ContentSection from "@/components/summaries/content-section";
import { Card } from "../ui/card";
import { useState } from "react";
import { parseSection } from "@/lib/summary-helper";
import { NavigationControls } from "@/components/summaries/navigation";
import ProgressBar from "@/components/summaries/progress-bar";
import { MotionDiv } from "../ui/common/motion-wrapper";
const SectionTitle = ({ title }: { title: string }) => {
  return (
    <div className="flex flex-col gap-2 mb-6 sticky top-0 pt-2 pb-4 bg-background/80 backdrop-blur-sm z-50">
      <h2 className="text-3xl lg:text-4xl flex items-center justify-center gap-2">
        {title}
      </h2>
    </div>
  );
};

export default function SummaryViewer({ summary }: { summary: string }) {
  const [currentSection, setcurrentSection] = useState(0);
  const sections = summary
    .split("\n# ")
    .map((section) => section.trim())
    .filter(Boolean)
    .map(parseSection);

  return (
    <Card className="relative px-2 h-[500px] sm:h-[600px] lg:h-[700px] w-full xl:w-[600px] overflow-hidden bg-linear-to-br from-background via-background/95 to-rose-500/5 backdrop-blur-lg shadow-2xl rounded-3xl border border-rose-500/10">
      <div className="h-full overflow-y-auto scrollbar-hide pt-12 sm:pt-16 pb-20 sm:pb-24">
        <ProgressBar sections={sections} currentSection={currentSection} />
        <MotionDiv
          key={currentSection}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeInOut", delay: 0.1 }}
          className="px-4 sm:px-6"
        >
          <SectionTitle title={sections[currentSection]?.title || ""} />
          <ContentSection
            title={sections[currentSection]?.title || ""}
            points={sections[currentSection]?.points || ""}
          />
        </MotionDiv>
      </div>

      <NavigationControls
        currentSection={currentSection}
        totalSections={sections.length}
        onPrevious={() => setcurrentSection(currentSection - 1)}
        onNext={() => setcurrentSection(currentSection + 1)}
        onSectionSelect={setcurrentSection}
      />
    </Card>
  );
}
