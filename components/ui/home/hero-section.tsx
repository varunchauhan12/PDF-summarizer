import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  MotionDiv,
  MotionH1,
  MotionH2,
  MotionSection,
  MotionSpan,
} from "../common/motion-wrapper";
import {
  buttonVariants,
  containerVariants,
  itemVariants,
} from "@/utils/constants";

export default function HeroSection() {
  return (
    <MotionSection
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative mx-auto flex flex-col z-0 items-center justify-center py-16 sm:py-20 lg:pb-28 transition-all aniamte-in lg:px-12 max-w-7xl"
    >
      <MotionDiv variants={itemVariants} className="flex items-center mb-4">
        <div className="relative p-[1px] overflow-hidden rounded-full bg-linear-to-r from-rose-200 via-rose-500 to-rose-600 animate-gradient-x group">
          <Badge
            variant={"secondary"}
            className="relative px-6 py-2 text-base font-medium bg-white rounded-full group-hover:bg-gray-50 transition-colors duration-200"
          >
            <Sparkles className="w-6 h-6 mr-2 text-rose-500 animate-pulse" />
            <p className="text-base text-rose-600">Powered by AI</p>
          </Badge>
        </div>
      </MotionDiv>
      <MotionH1 variants={itemVariants} className="font-bold py-6 text-center">
        Transform your PDFs into{" "}
        <span className="inline-block relative">
          <MotionSpan
            whileHover={buttonVariants}
            className="relative z-10 px-2"
          >
            consize
          </MotionSpan>
          <span
            className="absolute inset-0 bg-green-200/50 -rotate-2 rounded-lg transform -skew-y-1"
            aria-hidden="true"
          ></span>
        </span>
        Summaries
      </MotionH1>
      <MotionH2
        variants={itemVariants}
        className=" text-lg text-gray-600 sm:text-xl lg:text-2xl text-center px-4  lg:px-0 lg:max-w-4xl"
      >
        Get a beautiful summary reel of the document in seconds..
      </MotionH2>
      <MotionDiv variants={itemVariants} whileHover={buttonVariants}>
        <Button
          variant={"link"}
          className="mt-4 py-6 px-8 text-base  sm:text-lg lg:text-xl sm:px-10 lg:px-12 sm:py-7 lg:py-8 lg:mt-14 
        rounded-full text-white bg-linear-to-r from-green-500 to-rose-500
        hover:bg-linear-to-r hover:from-rose-500 hover:to-green-500 transition-colors duration-200 shadow-lg"
        >
          <Link href="/#pricing" className="flex gap-2 items-center text-white">
            <span>Try Mindworks</span>
            <ArrowRight className="animate-pulse" />
          </Link>
        </Button>
      </MotionDiv>
    </MotionSection>
  );
}
