import { Badge } from "@/components/ui/badge";
import BgGradient from "@/components/ui/common/bg-gradient";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UploadHeader() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 text-center">
      <div className="relative p-[1px] overflow-hidden rounded-full bg-linear-to-r from-rose-200 via-rose-500 to-rose-800 animate-gradient-x group">
        <Badge
          variant={"secondary"}
          className="relative px-6 py-2 text-base font-medium bg-white rounded-full group-hover:bg-gray-50 transition-colors duration-200 "
        >
          <Sparkles className="w-10 h-10 mr-2 text-rose-500 animate-pulse" />
          <p className="text-base text-rose-600">AI-Powered Content Creation</p>
        </Badge>
      </div>
      <div className=" flex flex-col items-center gap-5 capitalize">
        <h1 className="font-bold py-6 text-center capitalize">
          Start Uploading{" "}
          <span className="inline-block relative">
            <span className="relative z-10 px-2 capitalize">your PDF's</span>
            <span
              className="absolute inset-0 bg-green-200/50 -rotate-2 rounded-lg transform -skew-y-1"
              aria-hidden="true"
            ></span>
          </span>
        </h1>
        <p className=" text-gray-800 sm:text-sm lg:text-xl">
          Upload your PDF and let out AI do the magic!
        </p>
      </div>
    </div>
  );
}
