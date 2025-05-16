import { CreditCard, Info, Loader2, Plus } from "lucide-react";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "./ui/card";
import { addressStore } from "@/store/addressStore";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { cartStore } from "@/store/cartStore";
import { orderStore } from "@/store/orderStore";

const CheckOutForm = () => {
  const navigateTo = useNavigate();
  const { address } = addressStore();
  const [defaultAddressId, setDefaultAddressId] = useState(address?.[0]?._id);
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const [cardData, setCardData] = useState({
    cardNumber: "",
    monthYear: "",
    securityCode: "",
  });
  const { cart } = cartStore();
  const { createOrder, orderloading } = orderStore();

  const handleCompeleteOrder = () => {
    if (!address) {
      toast.error("Please add an address first");
      return;
    }
    const ids = cart?.items?.map((item) => item.productId._id);
    const colors = cart?.items?.map((item) => item.productColor);
    const sizes = cart?.items?.map((item) => item.productSize);
    const quantities = cart?.items?.map((item) => item.quantity);

    const products = ids.map((id, index) => ({
      productId: id,
      productColor: colors[index],
      productSize: sizes[index],
      quantity: quantities[index],
    }));

    if (paymentMethod === "Online Payment") {
      if (!cardData.cardNumber || cardData.cardNumber.length < 19) {
        toast.error("Please enter a valid card number");
        return;
      }
      if (!cardData.monthYear || cardData.monthYear.length < 5) {
        toast.error("Please enter a valid month and year");
        return;
      }
      if (!cardData.securityCode || cardData.securityCode.length < 3) {
        toast.error("Please enter a valid security code");
        return;
      }
    }
    const finalOrderData = {
      products,
      userAddressId: defaultAddressId,
      totalAmount: cart?.totalPrice + 100,
      paymentMethod,
    };

    createOrder(finalOrderData);
  };

  return (
    <>
      <div className="w-full flex flex-col pb-3">
        <h1 className="font-bold text-3xl text-primary">Delivery</h1>
        <Card className="w-full my-4">
          <div className="flex flex-col gap-6 p-6">
            <div className="flex items-center justify-between w-full">
              <p className="text-muted-foreground">
                Select your delivery address
              </p>
              <Button
                className="flex items-center text-primary text-sm cursor-pointer"
                onClick={() => {
                  navigateTo("/profile");
                }}
                variant={"outline"}
              >
                <Plus className="size-4 p-0" /> Add Address
              </Button>
            </div>
            {address.length === 0 ? (
              <span className="text-gray-500 text-sm">
                No address added yet, please add an address to continue
              </span>
            ) : (
              address?.map((address, index) => (
                <Card key={address._id} className={"m-0 rounded-sm p-1"}>
                  <CardContent className={"p-1"}>
                    {["Default Address", "2nd Address", "3rd Address"][
                      index
                    ] && (
                      <div className="flex items-center justify-between">
                        <span className="text-primary text-sm">
                          {
                            ["Default Address", "2nd Address", "3rd Address"][
                              index
                            ]
                          }
                        </span>
                        <div className="flex gap-2">
                          <Checkbox
                            id={`default-${index}`}
                            checked={defaultAddressId === address._id}
                            onCheckedChange={() =>
                              setDefaultAddressId(address._id)
                            }
                          />
                        </div>
                      </div>
                    )}
                    <div className="flex flex-col">
                      <span className="text-gray-500 text-sm">Address:</span>
                      <span className="text-gray-300 text-sm">
                        {address.address}
                      </span>
                      {address.appartment && (
                        <>
                          <span className="text-gray-500 text-sm">
                            Apartment, suite, etc:
                          </span>
                          <span className="text-gray-300 text-sm">
                            {address.appartment}
                          </span>
                        </>
                      )}
                      <span className="text-gray-500 text-sm">City:</span>
                      <span className="text-gray-300 text-sm">
                        {address.city}
                      </span>
                      <span className="text-gray-500 text-sm">
                        Postal Code:
                      </span>
                      <span className="text-gray-300 text-sm">
                        {address.postalCode}
                      </span>
                      <span className="text-gray-500 text-sm">Phone:</span>
                      <span className="text-gray-300 text-sm">
                        {address.phone}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </Card>

        <h1 className="font-bold text-3xl text-primary">Payment</h1>
        <p className="text-muted-foreground text-xs">
          All transactions are secure and encrypted
        </p>
        <Card className="w-full mt-4">
          <div className="flex flex-col px-6">
            <div className="flex flex-col gap-6 w-full">
              <p className="text-muted-foreground">
                Select your payment method
              </p>

              <div className="flex flex-col">
                <Button
                  variant={"ghost"}
                  className={`flex gap-3 cursor-pointer justify-start border rounded-br-none rounded-bl-none  ${
                    paymentMethod === "COD" && "border-primary"
                  } `}
                  onClick={() => setPaymentMethod("COD")}
                >
                  <Checkbox
                    checked={paymentMethod === "COD"}
                    onCheckedChange={() => setPaymentMethod("COD")}
                    className={"cursor-pointer"}
                  />
                  Cash on Delivery (COD)
                </Button>
                <Button
                  variant={"ghost"}
                  className={`flex gap-3 cursor-pointer justify-start border rounded-tr-none rounded-tl-none  ${
                    paymentMethod === "Online Payment" &&
                    "border-primary rounded-br-none rounded-bl-none"
                  } `}
                  onClick={() => setPaymentMethod("Online Payment")}
                >
                  <Checkbox
                    checked={paymentMethod === "Online Payment"}
                    onCheckedChange={() => setPaymentMethod("Online Payment")}
                    className={"cursor-pointer"}
                  />
                  Online Payment
                </Button>
                {paymentMethod === "Online Payment" && (
                  <div className="flex flex-col border px-4 py-2 gap-2 rounded-br-md rounded-bl-md">
                    <span className="text-muted-foreground text-xs">
                      Enter your card details
                    </span>
                    <div className="relative flex items-center gap-2">
                      <Input
                        type="text"
                        className="w-full pl-10"
                        placeholder="Card Number"
                        value={cardData.cardNumber}
                        onChange={(e) => {
                          let val = e.target.value.replace(/[^0-9]/g, ""); // keep digits only
                          val = val.substring(0, 16); // max 16 digits
                          let formatted = val.match(/.{1,4}/g)?.join("-") || ""; // group into chunks of 4
                          setCardData({
                            ...cardData,
                            cardNumber: formatted,
                          });
                        }}
                        required
                      />
                      <Info
                        className="cursor-pointer text-muted-foreground hover:text-primary"
                        onClick={() =>
                          toast.info("Accepted Cards: Visa, Mastercard, Amex")
                        }
                      />
                      <div className="absolute top-2 left-2">
                        <CreditCard className="text-muted-foreground" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Input
                        type="text"
                        className="w-full"
                        placeholder="MM/YY"
                        maxLength={5}
                        value={cardData.monthYear}
                        onChange={(e) => {
                          let val = e.target.value.replace(/[^0-9]/g, ""); // remove non-digits
                          if (val.length >= 3) {
                            val = val.slice(0, 2) + "/" + val.slice(2, 4);
                          }
                          setCardData({
                            ...cardData,
                            monthYear: val,
                          });
                        }}
                        required
                      />
                      <Input
                        type="password"
                        className="w-full"
                        placeholder="Security Code"
                        maxLength={3}
                        value={cardData.securityCode}
                        onChange={(e) => {
                          let val = e.target.value.replace(/[^0-9]/g, ""); // remove non-digits
                          val = val.slice(0, 3);
                          setCardData({
                            ...cardData,
                            securityCode: val,
                          });
                        }}
                        required
                      />
                      <Info
                        className="cursor-pointer text-muted-foreground hover:text-primary size-13"
                        onClick={() =>
                          toast.info(
                            "The security code is the 3 digits on the back of your card"
                          )
                        }
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>

        <div className="border-b py-6">
          <Button
            className="w-full cursor-pointer"
            onClick={handleCompeleteOrder}
            disabled={orderloading}
          >
            {orderloading ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Compelete Order"
            )}
          </Button>
        </div>

        <p className="text-muted-foreground text-xs pt-4">
          All rights reserved Cartify.
        </p>
      </div>
    </>
  );
};

export default CheckOutForm;
