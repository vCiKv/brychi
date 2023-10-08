import Dashboard from "./dashboard";

// app/posts/page.ts
type PageProps = {
  params: {},
  searchParams: { [key: string]: string | string[] | undefined },
}


export default function Home(props:PageProps) {
  const searchParams = props.searchParams;
  const activeTab = searchParams.tab;
   return (
    <Dashboard activeTab={Number(activeTab??0)} />
  );
}
