import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { orderStore } from "@/store/orderStore";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronDownIcon, Loader2 } from "lucide-react";
import { authStore } from "@/store/authStore";

const Orders = () => {
  const { orders, cancelOrder, orderloading } = orderStore();
  const { user } = authStore();
  const navigateTo = useNavigate();
  const [cancelOrderId, setcancelOrderId] = useState(null);
  return (
    <>
      {orders?.length === 0 ? (
        <>
          <div className="pt-16 flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-primary text-4xl font-bold pt-10">
              No Orders Yet
            </h1>
            <p className="text-muted-foreground mb-4">
              You haven't placed any orders yet.
            </p>
            <Link to="/">
              <Button variant="outline" size="lg">
                Start Shopping
              </Button>
            </Link>
          </div>
        </>
      ) : (
        <div className="flex flex-col">
          <div className="w-full flex flex-col">
            <Card className={"px-3 mt-6 bg-card/30"}>
              <h1 className="text-xl font-semibold">Your Orders:</h1>
              {orders?.map(
                (order) => (
                    <Card key={order._id} className="p-4 flex flex-col gap-3">
                      <div className="flex justify-between">
                        <div>
                          <p className="text-sm font-medium">
                            Order number:{" "}
                            <span className="text-primary">
                              #{"0" + order._id.slice(-3)}
                            </span>
                          </p>
                          <p className="text-sm font-medium">
                            Order status:{" "}
                            <span className="text-primary">{order.status}</span>
                          </p>
                        </div>
                        <Button
                          variant={"outline"}
                          disabled={orderloading}
                          size={'sm'}
                          onClick={() => {
                            cancelOrder(order._id);
                            setcancelOrderId(order._id);
                          }}
                        >
                          {cancelOrderId === order._id ? <Loader2 className="animate-spin"/> : "Cancel Order"}
                        </Button>
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
                                    navigateTo(
                                      `/product/${product.productId?._id}`
                                    )
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
                                    ? product.productId?.name.slice(0, 15) +
                                      "..."
                                    : product.productId?.name}
                                </p>
                                <p className="text-muted-foreground text-xs font-bold">
                                  {product.productColor} / {product.productSize}{" "}
                                  / {product.productId?.category}
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
                      ))}{" "}
                      <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                          <AccordionTrigger
                            icon={ChevronDownIcon}
                            label="Delivery Details"
                            className="border-t text-white rounded-none pb-1"
                          />
                          <AccordionContent>
                            <div className="flex flex-col gap-2">
                              <span className="text-gray-500 text-sm">
                                Name:
                              </span>
                              <span className="text-gray-300 text-sm">
                                {user?.name}
                              </span>
                              <span className="text-gray-500 text-sm">
                                Email:
                              </span>
                              <span className="text-gray-300 text-sm">
                                {user?.email}
                              </span>
                              <span className="text-gray-500 text-sm">
                                Address:
                              </span>
                              <span className="text-gray-300 text-sm">
                                {order.userAddressId?.address}
                              </span>
                              {order.userAddressId?.appartment && (
                                <>
                                  <span className="text-gray-500 text-sm">
                                    Apartment, suite, etc:
                                  </span>
                                  <span className="text-gray-300 text-sm">
                                    {order.userAddressId?.appartment}
                                  </span>
                                </>
                              )}
                              <span className="text-gray-500 text-sm">
                                City:
                              </span>
                              <span className="text-gray-300 text-sm">
                                {order.userAddressId?.city}
                              </span>
                              <span className="text-gray-500 text-sm">
                                Postal Code:
                              </span>
                              <span className="text-gray-300 text-sm">
                                {order.userAddressId?.postalCode}
                              </span>
                              <span className="text-gray-500 text-sm">
                                Phone:
                              </span>
                              <span className="text-gray-300 text-sm">
                                {order.userAddressId?.phone}
                              </span>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                      <div className="border-t">
                        <div className="flex flex-col py-2 gap-2">
                          <div className="flex justify-between">
                            <p className="font-semibold text-xs">Payment Method:</p>
                            <p className="font-semibold text-xs pr-1">
                              {order.paymentMethod}
                            </p>
                          </div>
                          <div className="flex justify-between">
                            <p className="font-semibold text-xs">Subtotal:</p>
                            <p className="font-semibold text-xs">
                              Rs.{order.totalAmount - 100}/-
                            </p>
                          </div>
                          <div className="flex justify-between">
                            <p className="font-semibold text-xs">Shipping:</p>
                            <p className="font-semibold text-xs">Rs.100/-</p>
                          </div>
                          <div className="flex justify-between">
                            <p className="text-lg text-primary font-bold">
                              Total:
                            </p>
                            <p className="text-lg text-primary font-bold">
                              Rs. {order.totalAmount}/-
                            </p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  )
              )}
            </Card>
          </div>
        </div>
      )}
    </>
  );
};

export default Orders;
