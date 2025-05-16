import React, { useEffect, useState } from "react";
import logoCircle from "../assets/logoCircle.png";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, CheckCircle } from "lucide-react";
import { orderStore } from "@/store/orderStore";
import ReactConfetti from "react-confetti";
import { Button } from "@/components/ui/button";
import { cartStore } from "@/store/cartStore";

const HappyShopping = () => {
  const navigate = useNavigate();
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const { orders, setSuccess } = orderStore();
  const { getCart } = cartStore();

  useEffect(() => {
    getCart();
    setSuccess(false);
  }, []);
  // Update window size on resize for responsive confetti
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <ReactConfetti
        width={windowSize.width}
        height={windowSize.height}
        recycle={false}
      />
      <div className="flex flex-col items-center justify-center py-16 min-h-[88vh] text-center px-4">
        <div className="flex justify-center items-center gap-6">
          <Link to="/" className="flex justify-center items-center gap-2">
            <h2 className="font-semibold text-5xl font-serif flex">
              <span className="text-primary">C</span>artify
            </h2>
            <div className="relative flex items-center justify-center">
              <img
                src={logoCircle}
                alt="Cartify"
                className="size-[70px] spin-slow"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <img src={logo} alt="Cartify" className="w-[50px]" />
              </div>
            </div>
          </Link>
        </div>

        <h1 className="font-bold text-4xl text-white pt-5 uppercase flex gap-3 items-center">
          Order Placed <CheckCircle className="text-primary size-9" />
        </h1>

        <p className="text-base text-muted-foreground">
          Thank you for shopping with us!
        </p>
        <p className="text-muted-foreground text-xs">
            You will receive your order in 7-10 working days.
        </p>
        <p className="font-semibold text-sm pt-3">
          Your order number is{" "}
          <span className="text-primary border-b border-white">
            ({orders && "#0" + orders[0]?._id.toString().slice(-3)})
          </span>
        </p>


        <div className="mt-3">
          <Button
            variant={"outline"}
            size={"lg"}
            className={"cursor-pointer"}
            onClick={() => navigate("/")}
          >
            <ShoppingCart className="size-5" />
            Continue Shopping
          </Button>
        </div>
      </div>
    </>
  );
};

export default HappyShopping;
