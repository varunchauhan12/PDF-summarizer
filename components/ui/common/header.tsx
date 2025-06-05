import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import NavLink from "./nav-link";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import PlanBadge from "@/components/ui/common/planBagde";

export default function Header() {
  return (
    <nav className="container flex items-center font-semibold py-3 lg:px-3 px-2 mx-auto justify-between">
      {/* left section - Logo */}
      <div className="w-1/3 flex">
        <NavLink href="/" className="flex items-center gap-1">
          <FileText className="w-5 h-5 lg:w-6 lg:h-6 hover:rotate-12 transform transition duration-200 ease-in-out text-gray-900" />
          <span className="font-bold text-gray-900 lg:text-xl">MindWorks</span>
        </NavLink>
      </div>

      {/* middle section - pricing and dashboard */}
      <div className="w-1/3 flex justify-center gap-4 lg:gap-12 items-center">
        <NavLink href="/#pricing">Pricing</NavLink>
        <SignedIn>
          <NavLink href="/dashboard">DashBoard</NavLink>
        </SignedIn>
      </div>

      {/* right section - sign in and upload */}
      <div className="w-1/3 flex justify-end gap-3">
        <SignedIn>
          {" "}
          <div className="flex gap-3 items-center">
            <NavLink href="/upload">Upload PDF </NavLink>
            <PlanBadge />
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </SignedIn>
        <SignedOut>
          <NavLink href="/sign-in">Sign In</NavLink>
        </SignedOut>
      </div>
    </nav>
  );
}
