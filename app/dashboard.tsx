"use client";
import { cn } from "@/lib/utils";
import Home from "./dashboard/home";
import { useSearchParams,useRouter } from 'next/navigation'
import SaleHistory  from "./dashboard/sales";
import OrderHistory from "./dashboard/orders";
import Inventory from "./dashboard/inventory";
 
const TabContent = (props: {
  tab: number;
  activeTab: number;
  children: React.ReactNode;
}) => {
  return <>{props.tab === props.activeTab && [props.children]}</>;
};
export default function Dashboard() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const activeTab = searchParams.get("tab")??0;
  const setActiveTab = (num:number)=>{
    router.push("/?tab="+num)
  }
  const DashboardMenu = () => {
    const MenuItem = (props: {
      name: string;
      icon?: JSX.Element;
      index: number;
    }) => {
      return (
        <button
          onClick={() => setActiveTab(props.index)}
          className={cn(
            "flex items-center w-full px-2 py-2 space-x-2 text-gray-500 rounded-lg hover:bg-gray-200 active:bg-gray-300",
            props.index === activeTab ? "bg-gray-300" : ""
          )}
        >
          {props.icon}
          <span className="text-sm font-medium capitalize">{props.name}</span>
        </button>
      );
    };
    const dashMenuItems = [
      {
        icon: (
          <svg
            className="w-4 h-4 "
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        ),
        name: "home",
      },
      {
        icon: (
          <svg
            className="w-4 h-4 "
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
            <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
            <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
          </svg>
        ),
        name: "sales",
      },
      {
        icon: (
          <svg
            className="w-4 h-4 "
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        ),
        name: "orders",
      },
      {
        icon: (
          <svg
            className="w-4 h-4 "
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
            <path d="M13 5v2" />
            <path d="M13 17v2" />
            <path d="M13 11v2" />
          </svg>
        ),
        name: "inventory",
      },
    ];
    return (
      <div className="fixed bottom-0 z-50 w-screen h-16 p-4 overflow-hidden text-gray-800 bg-gray-100">
        <nav className="flex gap-1">
          {dashMenuItems.map((menuItem, index) => (
            <MenuItem key={"menu-" + index} index={index} {...menuItem} />
          ))}
        </nav>
      </div>
    );
  };

  const dashboardContent =[
    <Home/>,<SaleHistory/>,<OrderHistory/>,<Inventory/>
  ]
  return (
    <>
      <DashboardMenu />
      <div className="container pt-12 mx-auto">
        {dashboardContent.map((content,index) =><TabContent key={"content-"+index} activeTab={Number(activeTab)} tab={index}>{content}</TabContent> )}
      </div>
      <div className="block h-24 bg-transparent"></div>
    </>
  );
}
