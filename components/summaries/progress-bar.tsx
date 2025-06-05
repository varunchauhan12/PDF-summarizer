import { cn } from "@/lib/utils";

export default function ProgressBar({
  sections,
  currentSection,
}: {
  sections: Array<{ title: string; points: string[] }>;
  currentSection: number;
}) {
  return (
    <div className="absolute top-0 left-0 right-0 z-20 bg-background/80 backdrop-blur-xs pt-4 pb-2 border-b border-rose-500/10">
      <div className="px-4 gap-1.5 flex">
        {sections.map((_, index) => (
          <div
            className="flex-1 h-1.5 rounded-full bg-rose-500/10 overflow-hidden"
            key={index}
          >
            <div
              key={index}
              className={cn(
                "h-1.5 bg-linear-to-r from-gray-500 to-rose-600 transition-all duration-200",
                index === currentSection
                  ? " w-full"
                  : currentSection > index
                  ? "w-full opacity-10"
                  : "w-0"
              )}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
