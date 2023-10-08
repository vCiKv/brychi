import Home from "./dashboard/home";
import SaleHistory from "./dashboard/sales";
import OrderHistory from "./dashboard/orders";
import Inventory from "./dashboard/inventory";
import DashboardMenu, { TabContent } from "./dashboard/menu";
import { getInventory, getOrders, getSales } from "@/db/actions";

export default async function Dashboard(props: { activeTab: number | string }) {
  const inventory = await getInventory();
  const sales = await getSales();
  const orders = await getOrders();

  const dashboardContent = [
    <Home
      key={"home-content"}
      buy={orders}
      sell={sales}
      inventory={inventory}
    />,
    <SaleHistory key={"sale-content"} data={sales} inventory={inventory} />,
    <OrderHistory key={"order-content"} data={orders} inventory={inventory} />,
    <Inventory key={"inventory-content"} data={inventory} />,
    // <TestComp key={"test-content"}/>
  ];
  const NoInternet = () => {
    return <div>No Internet found Cannot connect to server</div>;
  };
  return (
    <>
      {!inventory ? (
        <NoInternet />
      ) : (
        <>
          <DashboardMenu />
          <div className="px-4 md:container pt-12 mx-auto">
            {dashboardContent.map((content, index) => (
              <TabContent
                key={"content-" + index}
                activeTab={Number(props.activeTab)}
                tab={index}
              >
                {content}
              </TabContent>
            ))}
          </div>
          <div className="block h-24 bg-transparent"></div>
        </>
      )}
    </>
  );
}
