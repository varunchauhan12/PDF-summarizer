import Link from "next/link";
import { Pricingplans } from "@/utils/Pricing-plans";
import { cn } from "@/lib/utils";
import { ArrowRight, CheckIcon } from "lucide-react";
import { MotionDiv, MotionSection } from "../common/motion-wrapper";
import {
  containerVariants,
  itemVariants,
  listvariants,
} from "@/utils/constants";
type PriceType = {
  name: string;
  id: string;
  price: number;
  description: string;
  items: string[];
  paymentLink: string;
  priceId: string;
};

const PricingCard = ({
  name,
  price,
  description,
  items,
  id,
  paymentLink,
}: PriceType) => {
  return (
    <MotionDiv
      variants={listvariants}
      className="relative w-full max-w-lg hover:scale-105 transition-transform duration-300"
    >
      <div
        className={cn(
          "relative flex flex-col gap-4 p-8 bg-white rounded-xl shadow-md border-[1px] border-gray-500/20 lg:gap-8 z-10 h-full",
          id === "pro" && "border-rose-500 gap-5 border-2"
        )}
      >
        <MotionDiv
          variants={listvariants}
          className="flex justify-between items-center gap-4"
        >
          <div>
            <p className="text-lg lg:text-xl  font-bold capitalize">{name}</p>
            <p className="text-base-content/80 mt-2 ">{description}</p>
          </div>
        </MotionDiv>
        <MotionDiv variants={listvariants} className="flex gap-2 ">
          <p className="text-5xl tracking-tight font-extrabold">${price}</p>
          <div className="mb-[4px] flex flex-col justify-end">
            <p className="text-xs uppercase font-semibold">USD</p>
            <p className="text-xs">/month</p>
          </div>
        </MotionDiv>
        <MotionDiv
          variants={listvariants}
          className="space-y-2.5 leading-relaxed  text-base  flex-1"
        >
          {items.map((item, index) => (
            <li key={index} className="flex items-center gap-2">
              {" "}
              <CheckIcon size={18} />
              <span>{item}</span>
            </li>
          ))}
        </MotionDiv>
        <MotionDiv
          variants={listvariants}
          className="space-y-2 flex justify-center w-full"
        >
          <Link
            href={paymentLink}
            className={cn(
              "w-full rounded-full text-white border-2 py-2 flex items-center justify-center gap-2 bg-linear-to-r from-rose-800 to-rose-500 hover:bg-linear-to-r hover:from-rose-500 hover:to-rose-800 ",
              id === "pro"
                ? "border-rose-900"
                : "border-rose-100 from-rose-400 to-rose-500"
            )}
          >
            Buy Now <ArrowRight size={18} className="animate-pulse" />
          </Link>
        </MotionDiv>
      </div>
    </MotionDiv>
  );
};

export default function PricingSection() {
  return (
    <MotionSection
      variants={containerVariants}
      initial="hidden"
      whileInView={"visible"}
      viewport={{ once: true, margin: "-100px" }}
      className="relative overflow-hidden "
      id="pricing"
    >
      <MotionDiv
        variants={itemVariants}
        className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 "
      >
        <div className="flex items-center justify-center w-full pb-12">
          <h2 className="uppercase font-bold text-xl mb-8 text-rose-500">
            Pricing
          </h2>
        </div>
        <div className="relative flex flex-col lg:flex-row gap-8 mt-8 items-center lg:items-stretch">
          {Pricingplans.map((plan) => (
            <PricingCard key={plan.id} {...plan} />
          ))}
        </div>
      </MotionDiv>
    </MotionSection>
  );
}
