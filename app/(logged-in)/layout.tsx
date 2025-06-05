import { currentUser, User } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getsubscriptionstatus, haveactivePlan } from "@/lib/user";
import UpgradeRequired from "@/components/ui/common/upgradeRequired";
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }
  const hasActiveSubscription = await haveactivePlan(
    user.emailAddresses[0].emailAddress
  );
  if (!hasActiveSubscription) {
    return <UpgradeRequired />;
  }
  return <>{children}</>;
}
