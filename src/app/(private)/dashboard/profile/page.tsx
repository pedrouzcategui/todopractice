import { UpdateProfileForm } from "@/components/dashboard/profile/update-profile-form";
import { Card } from "@/components/ui/card";
import { db } from "@/lib/db";
import { getSession } from "@/lib/user";
import { Session } from "next-auth";

export default async function ProfilePage() {
  // The session is guaranteed to be defined because the route is protected by dashboard layout
  const { user } = (await getSession()) as Session;

  const linkedAccounts = await db.account.findMany({
    where: { userId: user.id },
    select: { provider: true },
  });

  const authProviders = linkedAccounts.map(({ provider }) => provider);

  return (
    <section className="flex justify-center items-center">
      <Card className="w-full md:w-1/2 xl:w-1/3 2xl:w-1/4 flex flex-col gap-4 px-12 py-12 justify-center items-center">
        <header>
          <h2 className="text-center text-2xl font-bold">Profile</h2>
        </header>

        <UpdateProfileForm
          name={user.name!} // The user's name is guaranteed to be defined
          email={user.email!} //  The user's email is guaranteed to be defined
          image={user.image ?? undefined} // We cast `null` values to `undefined` in order to avoid handling absent value representation redundancy
          authProviders={authProviders}
        />
      </Card>
    </section>
  );
}