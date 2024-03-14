import TutorialContextProvider from "@/components/tutorial/context";
import SignOutButton from "@/components/tutorial/sign-out";
import { TutorialContainer } from "@/components/tutorial/steps";
import { getSession } from "@/lib/user";
import { redirect } from "next/navigation";

export default async function TutorialPage() {
  const session = await getSession();
  if (!session?.user) {
    return null;
  } else if (!session.user.redirectToTutorial) {
    redirect("/dashboard/workspaces");
  }

  return (
    <TutorialContextProvider>
      <SignOutButton />
      <TutorialContainer username={session.user.name ?? "Usuario"} />
    </TutorialContextProvider>
  );
}
