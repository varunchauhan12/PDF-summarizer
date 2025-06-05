import Link from "next/link";
import { Button } from "../button";
import { ArrowRight } from "lucide-react";

export default function CtaSection() {
  return (
    <section className="bg-gray-50 py-12 flex items-center justify-center">
      <div className="relative w-full max-w-lg mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="max-w-md">
            <h2 className="text-2xl font-bold mb-3 tracking-tighter sm:text-4xl md:text-5xl">
              Ready to save HOURS of reading time?
            </h2>
            <p className="mx-auto max-w-2xl text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Transform lengthy documents into clear, actionable insights with
              our AI-powered summarizer.
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center w-full mt-8">
          <Button
            size={"lg"}
            variant={"link"}
            className="w-full min-[400px]:w-auto bg-linear-to-r from-slate-900 to-rose-500 hover:from-rose-500 hover:to-slate-900 hover:text-white text-white transition-all duration-300 flex hover:scale-105"
          >
            <Link
              href="/#pricing"
              className="flex items-center justify-center px-6 py-4"
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4 animate-pulse " />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
