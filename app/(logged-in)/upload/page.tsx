import { Badge } from "@/components/ui/badge";
import BgGradient from "@/components/ui/common/bg-gradient";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import UploadHeader from "@/components/upload/upload-header";
import Uploadform from "@/components/upload/upload-form";
import { hasreacheduploadlimit } from "@/lib/user";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
export default async function UploadPage() {
  const user = await currentUser();
  if (!user?.id) {
    redirect("/sign-in");
  }
  const userId = user.id;
  const { hasReachedLimit } = await hasreacheduploadlimit(userId);
  if (hasReachedLimit) {
    redirect("/dashboard");
  }
  return (
    <section className="min-h-screen">
      <BgGradient />
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <UploadHeader />
          <Uploadform />
        </div>
      </div>
    </section>
  );
}
