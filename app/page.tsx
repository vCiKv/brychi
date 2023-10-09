import Dashboard from "./dashboard";
import { auth,clerkClient } from "@clerk/nextjs";
import Login from "./login";
// app/posts/page.ts
type PageProps = {
  params: {};
  searchParams: { [key: string]: string | string[] | undefined };
};
export default async function Home(props: PageProps) {
  const searchParams = props.searchParams;
  const activeTab = searchParams.tab;
  const { userId } = auth();
  if (!userId) {
    return <Login />;
  }
  const user = await clerkClient.users.getUser(userId);

  return <>{user && <Dashboard activeTab={Number(activeTab ?? 0)} />}</>;
}
