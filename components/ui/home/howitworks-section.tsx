import {
  BrainCircuit,
  FileOutput,
  FileText,
  MoveRight,
  Pizza,
} from "lucide-react";
import { ReactNode } from "react";
import { MotionDiv, MotionH2, MotionH3 } from "../common/motion-wrapper";

type Steps = {
  icon: ReactNode;
  label: string;
  description: string;
};

const steps: Steps[] = [
  {
    icon: <FileText size={64} strokeWidth={1.5} />,
    label: "Upload your PDF",
    description: "Upload your PDF document to get it summarized.",
  },
  {
    icon: <BrainCircuit size={64} strokeWidth={1.5} />,
    label: "AI analisis",
    description: "Our advanced AI algorithms analyze the document instantly.",
  },
  {
    icon: <FileOutput size={64} strokeWidth={1.5} />,
    label: "get your summary",
    description:
      "Recieve a clear & concise summary of the document in seconds.",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="relative overflow-hidden bg-gray-50">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 transform-gpu overflow-hidden blur-3xl"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-linear-to-br from-emerald-500 via-teal-500 to-cyan-500 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 51.9% 47.5%, 58.3% 45.2%, 34.5% 29.5%, 27.5% 57.6%, 18.6% 81.9%, 9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className=" text-center mb-16">
          <MotionH2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="font-bold uppercase text-xl mb-4 text-rose-500"
          >
            How it Works
          </MotionH2>
          <MotionH3
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="font-bold text-3xl max-w-2xl mx-auto px-4 sm:px-6"
          >
            Transform any PDF into easy-to-digest summary in three simple steps
          </MotionH3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto relative">
          {steps.map((step, idx) => (
            <MotionDiv
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 * idx }}
              className="relative flex items-stretch"
              key={idx}
            >
              <Stepitem {...step} />
              {idx < steps.length - 1 && (
                <MotionDiv
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 * idx + 0.3 }}
                  className="hidden md:block top-1/2 -right-4 transform -translate-y-1/2 z-10 absolute"
                >
                  <MoveRight
                    size={32}
                    strokeWidth={1}
                    className="text-rose-500"
                  ></MoveRight>
                </MotionDiv>
              )}
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  );
}
function Stepitem({ icon, label, description }: Steps) {
  return (
    <div className="relative p-6 rounded-2xl bg-white/5 backdrop-blue-xs border border-white/10 hover:border-rose-500/50  transition-colors group w-full">
      <div className="flex items-center justify-center h-24 w-24 mx-auto rounded-2xl bg-linear-to-br from-rose-500/10 to-transparent group-hover:from-rose-500/20 transition-colors ">
        <div className="text-rose-500">{icon}</div>
      </div>
      <div
        className="flex flex-col flex-1 gap-1 justiify-betwe
"
      >
        <h4 className="text-center font-bold text-xl">{label}</h4>
        <p className="text-center text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  );
}
