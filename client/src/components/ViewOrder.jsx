import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardHeader } from "./ui/card";
import { useNavigate } from "react-router-dom";
import { ChevronDownIcon, PackageCheck, Timer, Truck } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ViewOrder = ({ view, setView, order }) => {
  const navigateTo = useNavigate();
  return (
    <>
      <Dialog open={view} onOpenChange={setView}>
        <DialogContent
          className={"md:max-w-4xl w-full max-h-[90vh] overflow-y-auto"}
        >
          <DialogHeader>
            <DialogTitle>
              Order:{" "}
              <span className="text-primary">
                #{"0" + order?._id.slice(-3)}
              </span>
            </DialogTitle>
            <DialogDescription>
              Confirmed{" "}
              {new Date(order?.createdAt).toLocaleString("default", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </DialogDescription>
          </DialogHeader>
          <div className="flex lg:flex-row flex-col justify-between gap-2">
            <div className="block lg:hidden">
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger
                    icon={ChevronDownIcon}
                    label="Order Summary"
                    value={
                      "Rs. " + (order?.totalAmount + 100).toFixed(2) + "/-"
                    }
                    className="flex items-center justify-between border  font-bold text-primary text-sm bg-input/50 w-full px-2"
                  />
                  <AccordionContent className={"border-b px-2 py-2"}>
                    <div className="border-b mb-3">
                      {order?.products?.map((item) => (
                        <div
                          key={item.productId._id}
                          className="flex justify-between py-2"
                        >
                          <div className="flex gap-6">
                            <div className="relative">
                              <img
                                src={item.productId.image?.imageUrl}
                                alt={item.productId.name}
                                className="w-[60px] h-[60px] object-cover rounded-md cursor-pointer"
                                onClick={() =>
                                  navigateTo(`/product/${item.productId._id}`)
                                }
                              />
                              <div className="absolute top-[-10px] right-[-10px] bg-primary text-white text-[10px] font-semibold rounded-full px-[8px] py-[2px] transition-transform duration-300 ease-in-out group-hover:scale-115">
                                {item?.quantity}
                              </div>
                            </div>
                            <div>
                              <p className="font-semibold text-sm text-primary hidden md:block">
                                {item.productId.name}
                              </p>
                              <p className="font-semibold text-sm text-primary md:hidden block">
                                {item.productId.name.length > 15
                                  ? item.productId.name.slice(0, 15) + "..."
                                  : item.productId.name}
                              </p>
                              <p className="text-muted-foreground text-xs font-bold">
                                {item.productColor} / {item.productSize} /{" "}
                                {item.productId.category}
                              </p>
                              <p className="text-muted-foreground text-xs font-bold">
                                Rs. {item.productId.price}/-
                              </p>
                            </div>
                          </div>
                          <p className="font-semibold text-xs">
                            Rs. {item.productId.price * item.quantity}/-
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="w-full ">
                      <div className="flex justify-between text-xs">
                        <p className="text-gray-300">
                          Subtotal ·{" "}
                          {order?.products?.reduce(
                            (total, item) => total + item.quantity,
                            0
                          )}{" "}
                          items
                        </p>
                        <p className="font-semibold">
                          Rs. {order?.totalAmount - 100}/-
                        </p>
                      </div>
                      <div className="flex justify-between text-xs pt-2">
                        <p className="text-gray-300">Shipping</p>
                        <p className="font-semibold">Rs. 100/-</p>
                      </div>
                      <div className="flex items-center justify-between pt-5 text-base">
                        <p className="text-primary font-bold">Total</p>
                        <p className="font-bold">
                          Rs. {(order?.totalAmount + 100).toFixed(2)}/-
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            <div className="flex flex-col items-center gap-2 w-full">
              <Card className={"w-full p-4"}>
                {order?.status === "Pending" && (
                  <div className="flex flex-col">
                    <span className="flex gap-1 font-bold">
                      <Timer className="text-primary" /> {order?.status}
                    </span>
                    <p className="text-muted-foreground text-sm">
                      This order is pending.
                    </p>
                  </div>
                )}
                {order?.status === "Shipped" && (
                  <div className="flex flex-col">
                    <span className="flex gap-1 font-bold">
                      <Truck className="text-primary" /> {order?.status}
                    </span>
                    <p className="text-muted-foreground text-sm">
                      This shipment is on its way.
                    </p>
                  </div>
                )}
                {order?.status === "Delivered" && (
                  <div className="flex flex-col">
                    <span className="flex gap-1 font-bold">
                      <PackageCheck className="text-primary" /> {order?.status}
                    </span>
                    <p className="text-muted-foreground text-sm">
                      This order is delivered successfully.
                    </p>
                  </div>
                )}
              </Card>
              <Card className={"w-full p-4 flex flex-col gap-1"}>
                <h1 className="text-primary font-bold text-sm">
                  Delivery Details
                </h1>
                <div className="flex flex-col">
                  <span className="text-gray-500 text-sm">Name:</span>
                  <span className="text-gray-300 text-sm">
                    {order?.userId.name}
                  </span>
                  <span className="text-gray-500 text-sm">Email:</span>
                  <span className="text-gray-300 text-sm">
                    {order?.userId.email}
                  </span>
                  <span className="text-gray-500 text-sm">Address:</span>
                  <span className="text-gray-300 text-sm">
                    {order?.userAddressId.address}
                  </span>
                  {order?.userAddressId.appartment && (
                    <>
                      <span className="text-gray-500 text-sm">
                        Apartment, suite, etc:
                      </span>
                      <span className="text-gray-300 text-sm">
                        {order?.userAddressId.appartment}
                      </span>
                    </>
                  )}
                  <span className="text-gray-500 text-sm">City:</span>
                  <span className="text-gray-300 text-sm">
                    {order?.userAddressId.city}
                  </span>
                  <span className="text-gray-500 text-sm">Postal Code:</span>
                  <span className="text-gray-300 text-sm">
                    {order?.userAddressId.postalCode}
                  </span>
                  <span className="text-gray-500 text-sm">Phone:</span>
                  <span className="text-gray-300 text-sm">
                    {order?.userAddressId.phone}
                  </span>
                </div>
              </Card>
            </div>
            <div className="w-full lg:block hidden">
              <Card className={"w-full p-4 max-h-[70vh] overflow-y-auto"}>
                <div className="border-b">
                  {order?.products?.map((item) => (
                    <div
                      key={item.productId._id}
                      className="flex justify-between py-2"
                    >
                      <div className="flex gap-6">
                        <div className="relative">
                          <img
                            src={item.productId.image?.imageUrl}
                            alt={item.productId.name}
                            className="w-[60px] h-[60px] object-cover rounded-md cursor-pointer"
                            onClick={() =>
                              navigateTo(`/product/${item.productId._id}`)
                            }
                          />
                          <div className="absolute top-[-10px] right-[-10px] bg-primary text-white text-[10px] font-semibold rounded-full px-[8px] py-[2px] transition-transform duration-300 ease-in-out group-hover:scale-115">
                            {item?.quantity}
                          </div>
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-primary hidden md:block">
                            {item.productId.name}
                          </p>
                          <p className="font-semibold text-sm text-primary md:hidden block">
                            {item.productId.name.length > 15
                              ? item.productId.name.slice(0, 15) + "..."
                              : item.productId.name}
                          </p>
                          <p className="text-muted-foreground text-xs font-bold">
                            {item.productColor} / {item.productSize} /{" "}
                            {item.productId.category}
                          </p>
                          <p className="text-muted-foreground text-xs font-bold">
                            Rs. {item.productId.price}/-
                          </p>
                        </div>
                      </div>
                      <p className="font-semibold text-xs">
                        Rs. {item.productId.price * item.quantity}/-
                      </p>
                    </div>
                  ))}
                </div>
                <div className="w-full">
                  <div className="flex justify-between text-xs">
                    <p className="text-gray-300">
                      Subtotal ·{" "}
                      {order?.products?.reduce(
                        (total, item) => total + item.quantity,
                        0
                      )}{" "}
                      items
                    </p>
                    <p className="font-semibold">
                      Rs. {order?.totalAmount - 100}/-
                    </p>
                  </div>
                  <div className="flex justify-between text-xs pt-2">
                    <p className="text-gray-300">Shipping</p>
                    <p className="font-semibold">Rs. 100/-</p>
                  </div>
                  <div className="flex items-center justify-between pt-5 text-base">
                    <p className="text-primary font-bold">Total</p>
                    <p className="font-bold">
                      Rs. {order?.totalAmount.toFixed(2)}/-
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ViewOrder;
