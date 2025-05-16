import React, { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { orderStore } from "@/store/orderStore";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { PackageCheck, PenLine, Timer, Truck } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ViewOrder from "./ViewOrder";


const FilterdOrders = ({ filterdOrders }) => {
  const { orders, orderloading, changeStatus } = orderStore();
  const navigateTo = useNavigate();
  const filtrOrders = orders.filter((order) => order.status === filterdOrders);

  const handleStatusChange = (id, status) => {
    changeStatus(id, status);
  };

  const [view, setView] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null)

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [filtrOrders]);

  return (
    <>
      {filtrOrders.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center px-4 py-10 bg-black/30 rounded-lg mt-4">
          <h1 className="text-primary text-4xl font-bold pt-10">
            No Orders Found
          </h1>
          <p className="text-muted-foreground mb-4">
            There are currently no orders with the status "{filterdOrders}".
          </p>
        </div>
      ) : (
        filtrOrders.map((order) => (
          <Card
            key={order._id}
            className="p-4 mb-4 flex flex-col gap-3 bg-black/30"
          >
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium">
                  Order number:{" "}
                  <span className="text-primary">
                    #{"0" + order._id.slice(-3)}
                  </span>
                </p>
              </div>
              <div>
                <Button variant={"secondary"} onClick={() => {setView(true);
                  setSelectedOrder(order)
                }}>View</Button>
                <ViewOrder view={view} setView={setView} order={selectedOrder}/>
              </div>
            </div>
            {order.products?.map((product) => (
              <>
                <div className="flex justify-between py-2">
                  <div className="flex gap-6">
                    <div className="relative">
                      <img
                        src={product.productId?.image?.imageUrl}
                        alt={product.productId?.name}
                        className="w-[60px] h-[60px] object-cover rounded-md cursor-pointer"
                        onClick={() =>
                          navigateTo(`/product/${product.productId?._id}`)
                        }
                      />
                      <div className="absolute top-[-10px] right-[-10px] bg-primary text-white text-[10px] font-semibold rounded-full px-[8px] py-[2px] transition-transform duration-300 ease-in-out group-hover:scale-115">
                        {product.quantity}
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-lg text-primary hidden md:block">
                        {product.productId?.name}
                      </p>
                      <p className="font-semibold text-sm text-primary md:hidden block">
                        {product.productId?.name.length > 15
                          ? product.productId?.name.slice(0, 15) + "..."
                          : product.productId?.name}
                      </p>
                      <p className="text-muted-foreground text-xs font-bold">
                        {product.productColor} / {product.productSize} /{" "}
                        {product.productId?.category}
                      </p>
                      <p className="text-muted-foreground text-xs font-bold">
                        Rs. {product.productId?.price}/-
                      </p>
                    </div>
                  </div>
                  <p className="font-semibold text-xs">
                    Rs. {product.productId?.price * product.quantity}
                    /-
                  </p>
                </div>
              </>
            ))}
            <div className="border-t">
              <div className="flex flex-col py-2 gap-2">
                <div className="flex justify-between">
                  <p className="font-semibold text-xs">Order Status:</p>
                  <Select
                    defaultValue={order.status}
                    onValueChange={(e) => handleStatusChange(order._id, e)}
                    disabled={orderloading}
                  >
                    <SelectTrigger
                      className={
                        "flex gap-1 dark:bg-transparent hover:dark:bg-transparent border-0 border-b border-primary rounded-none p-0 cursor-pointer"
                      }
                    >
                      <SelectValue placeholder="Change Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Change Status" disabled>
                        <PenLine />
                        Change Status
                      </SelectItem>
                      <SelectSeparator />
                      <SelectItem value="Pending">
                        <Timer />
                        Pending
                      </SelectItem>
                      <SelectItem value="Shipped">
                        <Truck />
                        Shipped
                      </SelectItem>
                      <SelectItem value="Delivered">
                        <PackageCheck />
                        Delivered
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-between">
                  <p className="text-lg text-primary font-bold">Total:</p>
                  <p className="text-lg text-primary font-bold">
                    Rs. {order.totalAmount}/-
                  </p>
                </div>
              </div>
            </div>
          </Card>
        ))
      )}
    </>
  );
};

export default FilterdOrders;
