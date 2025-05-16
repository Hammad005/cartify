import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader } from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, PackageCheck, Timer, Truck } from "lucide-react";
import FilterdOrders from "./FilterdOrders";
import { orderStore } from "@/store/orderStore";

const AllOrders = () => {
  const {orders} = orderStore();
  const list = [
    { name: "Pending", icon: Timer },
    { name: "Shipped", icon: Truck },
    { name: "Delivered", icon: PackageCheck },
  ];
  const [filterdOrders, setFilterdOrders] = useState(list[0].name);
  const ordersLength = orders.filter((order) => order.status === filterdOrders).length;
  return (
    <>
      <Card className={"md:w-4xl w-full"}>
        <CardHeader className={"w-full flex justify-between items-center"}>
          <div>
            <h1 className="text-2xl font-bold text-primary">
              {filterdOrders} Orders
            </h1>
            <CardDescription>You have {ordersLength}{" "}{filterdOrders} orders</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Select
              onValueChange={(e) => setFilterdOrders(e)}
              defaultValue={filterdOrders}
            >
              <SelectTrigger className={"min-w-[100px] flex gap-1"}>
                <SelectValue placeholder="Filter Orders" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Filter Orders" disabled><Filter />Filter Orders</SelectItem>
                <SelectSeparator/>
                {list.map((item) => (
                  <SelectItem key={item.name} value={item.name}>
                    {<item.icon className="text-primary" />}{item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
        {<FilterdOrders filterdOrders={filterdOrders} />}
        </CardContent>
      </Card>
    </>
  );
};

export default AllOrders;
