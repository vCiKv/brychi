"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn, getTotalDrinkSale, makeRandomId } from "@/lib/utils";
import { useState } from "react";
import DisplayDrinks from "./displayDrink";
import {
  BuyDataType,
  DrinkInventoryType,
  DrinksType,
  SellDataType,
} from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/dataTable";
import { ArrowUpDown } from "lucide-react";
import { AddSale } from "./formAddSale";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { updateOrderStatus } from "@/db/actions";
export const SalesDataTable = (props: {
  data: SellDataType[];
  inventory: DrinkInventoryType[];
}) => {
  const columns: ColumnDef<SellDataType>[] = [
    {
      accessorKey: "id",
      header: "id",
    },
    {
      accessorKey: "drinks",
      header: "items",
      cell: ({ row }) => {
        const drinks = row.getValue("drinks") as DrinksType[];
        const id = row.getValue("id") as string;
        // const id = columnHelper.accessor(row=>row.id)
        return (
          <div className="space-y-2">
            <span className="font-mono text-sm font-bold">{id}</span>
            {drinks.map((drink, index) => (
              <DisplayDrinks
                key={index+drink.drinkId+makeRandomId(4)}
                {...drink}
                inventory={props.inventory}
              />
            ))}
          </div>
        );
      },
      // <CustomTableRowSales {...row} inventory={props.inventory} />
    },
    {
      accessorKey: "drinks",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="uppercase"
          >
            Sales
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      // header: "sales",
      cell: ({ row }) => {
        const drinks = row.getValue("drinks") as DrinksType[];
        return <>{getTotalDrinkSale(drinks)}</>;
      },
    },
    {
      accessorKey: "time",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="uppercase"
          >
            Time
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      // header: "time"
    },
    {
      accessorKey: "customerName",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="uppercase"
          >
            Customer
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      // header: "customer"
    },
  ];
  const [showAddSale, setShowAddOrder] = useState(false);
  const toggleAddOrder = () => {
    setShowAddOrder((p) => !p);
  };
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle>Latest Sales</CardTitle>
        <Button onClick={toggleAddOrder}>
          {showAddSale ? "Hide Sale" : "Add Sale"}
        </Button>
      </CardHeader>
      <CardContent>
        {showAddSale && (
          <AddSale inventory={props.inventory} toggle={toggleAddOrder} />
        )}
        <DataTable columns={columns} data={props.data} />
      </CardContent>
    </Card>
  );
};
const ActionsOrders = (props: { id: string; oldStatus: number,drinks:DrinksType[] }) => {
  const [loading, setLoading] = useState(false);
  const [newStatus, setNewStatus] = useState<string | undefined>(undefined);
  const id = props.id;
  if (!id) {
    return;
  }
  const statues = [
    {
      value: 1,
      name: "received",
    },
    {
      value: -1,
      name: "cancelled",
    },
    {
      value: 0,
      name: "processing",
    },
  ];
  const router = useRouter()
  const confirmStatusEdit = async () => {
    if (!newStatus) {
      return;
    }
    if (loading) {
      toast.message("loading...");
      return;
    }
    setLoading(true);
    const isComplete = await updateOrderStatus(
      id,
      Number(newStatus),
      props.oldStatus,
      props.drinks
    );
    if (isComplete) {
      
      toast.success(id + " status updated");
      setNewStatus(undefined);
      setLoading(false);
      router.refresh()
      return;
    } else {
      toast.error("failed to updated status- " + id);
      setNewStatus(undefined);
      setLoading(false);
      return;
    }
 
  };
  return (
    <>
      <div className="max-h-[210px] w-[150px] space-y-2">
        <Select onValueChange={setNewStatus} defaultValue={newStatus}>
          <SelectTrigger>
            <SelectValue placeholder="Select a Status" />
          </SelectTrigger>
          <SelectContent>
            {statues.map((status) => (
              <SelectItem
                key={"select-" + status.name}
                value={String(status.value)}
              >
                {status.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button
        size={"sm"}
        className="my-2"
        loading={loading}
        onClick={confirmStatusEdit}
      >
        Edit Status
      </Button>
    </>
  );
};

export const OrdersDataTable = (props: {
  data: BuyDataType[];
  inventory: DrinkInventoryType[];
}) => {
  const StatusChip = (props: { type: -1 | 0 | 1 | number }) => {
    let myType: keyof typeof statusStyle = "0";
    if (props.type === -1 || props.type === 0 || props.type === 1) {
      myType = String(props.type) as keyof typeof statusStyle;
    }
    const statusStyle = {
      "-1": "bg-red-400",
      "0": "bg-slate-800",
      "1": "bg-green-500",
    };
    const statusText = {
      "-1": "cancelled",
      "0": "processing",
      "1": "received",
    };
    return (
      <div
        className={cn(
          "rounded-full px-3 py-1 mx-auto w-full text-white text-center",
          statusStyle[myType]
        )}
      >
        {statusText[myType]}
      </div>
    );
  };
  const columns: ColumnDef<BuyDataType>[] = [
    {
      accessorKey: "id",
      header: "id",
    },
    {
      accessorKey: "drinks",
      header: "items",
      cell: ({ row }) => {
        const drinks = row.getValue("drinks") as DrinksType[];
        const id = row.getValue("id") as string;
        // const id = columnHelper.accessor(row=>row.id)
        return (
          <div className="space-y-2">
            <span className="font-mono text-sm font-bold">{id}</span>
            {drinks.map((drink, index) => (
              <DisplayDrinks
                key={index + drink.drinkId+makeRandomId(4)}
                {...drink}
                inventory={props.inventory}
              />
            ))}
          </div>
        );
      },
      // <CustomTableRowSales {...row} inventory={props.inventory} />
    },
    {
      accessorKey: "drinks",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="uppercase"
          >
            Sales
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      // header: "sales",
      cell: ({ row }) => {
        const drinks = row.getValue("drinks") as DrinksType[];
        return <>{getTotalDrinkSale(drinks)}</>;
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="uppercase"
          >
            Status
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return <StatusChip type={row.getValue("status")} />;
      },
    },
    {
      accessorKey: "purchasedFrom",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="uppercase"
          >
            Purchased From
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      // header: "customer"
    },
    {
      accessorKey: "time",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="uppercase"
          >
            Time
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      // header: "time"
    },
    {
      accessorKey: "",
      header: "Action",
      cell: ({ row }) => {
        const id = row.getValue("id") as string;
        const status = row.getValue("status") as number;
        const drinks = row.getValue("drinks") as DrinksType[];

        return <ActionsOrders id={id} oldStatus={status} drinks={drinks} />;
      },
    },
  ];
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle>Latest Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={props.data} />
      </CardContent>
    </Card>
  );
};
