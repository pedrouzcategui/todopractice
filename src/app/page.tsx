import { getSession } from "@/lib/user";
import { redirect } from "next/navigation";

export default async function Homepage() {
  const session = await getSession();

  if (session?.user) {
    redirect("/dashboard");
  } else {
    redirect("/login");
  }
}
