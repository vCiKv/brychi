"use client"
import { cn } from "@/lib/utils";
import { Home, Package, Percent, Truck } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const dashMenuItems = [
  {
    icon: <Home />,
    name: "home",
  },
  {
    icon: <Percent />,
    name: "sales",
  },
  {
    icon: <Truck />,
    name: "orders",
  },
  {
    icon: <Package />,
    name: "inventory",
  },
];
export const TabContent = (props: {
  tab: number;
  children: React.ReactNode;
  activeTab:number
}) => {
  return <>{props.tab === props.activeTab && [props.children]}</>;
};
const DashboardMenu = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") ?? 0;
  const setActiveTab = (num: number) => {
    router.push("/?tab=" + num);
  };
  const MenuItem = (props: {
    name: string;
    icon?: JSX.Element;
    index: number;
  }) => {
    return (
      <button
        onClick={() => setActiveTab(props.index)}
        className={cn(
          "flex md:flex-row flex-col items-center w-full px-2 py-2  gap-x-0 md:gap-x-2 rounded-lg hover:bg-black/20 active:bg-black/40",
          props.index === Number(activeTab) ? "bg-black/40" : ""
        )}
      >
        <span>{props.icon}</span>

        <span className="text-sm font-medium capitalize">{props.name}</span>
      </button>
    );
  };

  return (
    <div className="fixed bottom-0 z-50 w-screen h-20 p-4 overflow-hidden text-white bg-blue-800">
      <nav className="flex gap-1 h-full">
        {dashMenuItems.map((menuItem, index) => (
          <MenuItem key={"menu-" + index} index={index} {...menuItem} />
        ))}
      </nav>
    </div>
  );
};

export default DashboardMenu