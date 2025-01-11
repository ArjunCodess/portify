import Editor from "@/components/editor";
import Preview from "@/components/preview";
import { getUserByEmail } from "@/actions/user";
import { currentUser } from "@clerk/nextjs/server";

export default async function Admin() {
  const user = await currentUser();
  const userRecord = await getUserByEmail(user!.emailAddresses[0].emailAddress);

  return (
    <section className="h-full px-4">
      <div className="mb-8">
        <h1 className="text-4xl font-medium font-eb-garamond mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your admin dashboard. Here you can manage your portfolio
          content and settings.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-1 md:col-span-2">
          <Editor />
        </div>
        <div className="col-span-1">
          <Preview username={userRecord!.username} />
        </div>
      </div>
    </section>
  );
}