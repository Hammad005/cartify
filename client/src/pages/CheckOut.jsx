import CheckOutForm from "@/components/CheckOutForm";
import CheckOutOrder from "@/components/CheckOutOrder";
import { Button } from "@/components/ui/button";
import { cartStore } from "@/store/cartStore";
import {
  ChevronDownIcon,
  Truck,
} from "lucide-react";
import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { orderStore } from "@/store/orderStore";

const CheckOut = () => {
  const { cart } = cartStore();
  const {success} = orderStore();

  const navigateTo = useNavigate();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    if (success) {
      navigateTo("/happyShopping");
    }
  }, [success, navigateTo]);
  
  

  return (
    <>
      {cart?.items?.length > 0 && (
        <div className="block lg:hidden">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger
                icon={ChevronDownIcon}
                label="Order Summary"
                value={"Rs. " + (cart?.totalPrice + 100).toFixed(2) + "/-"}
                className="flex items-center justify-between border rounded-none font-bold text-primary text-sm bg-input/50 w-full px-2"
              />
              <AccordionContent className={"border-b px-2 py-2"}>
                <CheckOutOrder />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      )}
      <div className="md:px-6 px-6">
        {cart?.items?.length < 1 ? (
          <div className="flex flex-col items-center justify-center min-h-[80vh]">
            <Truck className="size-12 text-primary animate-pulse" />
            <h1 className="font-bold text-3xl text-primary/80 text-center uppercase">
              Your cart is empty
            </h1>
            <p className="text-muted-foreground text-center pt-2">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Button
              className="mt-4 cursor-pointer"
              onClick={() => navigateTo("/")}
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="flex justify-between">
            <div className="lg:w-[50%] w-full lg:border-r lg:pr-6 pt-6 pb-6 sticky top-0 lg:min-h-screen h-full">
              <CheckOutForm />
            </div>
            <div className="lg:flex hidden flex-col items-start w-[50%] pt-6 pl-6 pb-6 sticky top-0 lg:h-full">
              <CheckOutOrder />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CheckOut;
