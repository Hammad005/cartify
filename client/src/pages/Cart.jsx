import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cartStore } from "@/store/cartStore";
import { Loader2, ShoppingBag, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import logoCircle from "../assets/logoCircle.png";
import logo from "../assets/logo.png";

const Cart = () => {
  const navigateTo = useNavigate();
  const {
    cart,
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
    cartloading,
  } = cartStore();
  const [productIdStored, setProductIdStored] = useState(null);
  const handleRemoveFromCart = (id, productColor, productSize, totalPrice) => {
    setProductIdStored(id);
    removeFromCart(id, productColor, productSize, totalPrice);
  };
  return (
    <>
      <div className="md:px-14 px-3">
        {!cart ? (
          <div className="flex flex-col items-center justify-center min-h-[80vh]">
            <ShoppingBag className="size-12 text-primary animate-bounce" />
            <h1 className="font-bold text-3xl text-primary/80 text-center uppercase">
              Your cart is empty
            </h1>
            <p className="text-muted-foreground text-center pt-2">
              Add items to it now.
            </p>
            <Button
              className="mt-4 cursor-pointer"
              onClick={() => navigateTo("/")}
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between pt-8">
              <h1 className="font-bold text-3xl text-white flex gap-3">
                <ShoppingBag className="size-9 text-primary hidden md:block" />
                Your Cart
              </h1>
              <Button
                className="cursor-pointer"
                variant={"outline"}
                onClick={() => navigateTo("/")}
              >
                Continue Shopping
              </Button>
            </div>

            <div className={"py-8"}>
              <Table>
                <TableHeader className={"[&_tr]:border-b-0"}>
                  <TableRow className={"hover:bg-transparent"}>
                    <TableHead
                      className={
                        "uppercase font-bold text-xs text-muted-foreground min-w-[130px]"
                      }
                    >
                      Products
                    </TableHead>
                    <TableHead
                      className={
                        "uppercase font-bold text-xs text-muted-foreground hidden md:table-cell"
                      }
                    >
                      Quantity
                    </TableHead>
                    <TableHead
                      className={
                        "uppercase font-bold text-xs text-muted-foreground text-right"
                      }
                    >
                      Total
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className={"border-b border-t"}>
                  {cart?.items.map((item) => (
                    <TableRow
                      key={item.productId._id}
                      className={"border-b-0 hover:bg-transparent"}
                    >
                      <TableCell className="flex gap-4 my-6 md:my-3">
                        <img
                          src={item.productId.image?.imageUrl}
                          alt={item.productId.name}
                          className="w-20 h-25 object-cover rounded-md cursor-pointer"
                          onClick={() =>
                            navigateTo(`/product/${item.productId._id}`)
                          }
                        />
                        <div>
                          <p className="font-semibold text-lg text-primary hidden md:block">
                            {item.productId.name}
                          </p>
                          <p className="font-semibold text-sm text-primary md:hidden block">
                            {item.productId.name.length > 15
                              ? item.productId.name.slice(0, 15) + "..."
                              : item.productId.name}
                          </p>
                          <p className="text-xs text-gray-400">
                            Color: {item.productColor}
                          </p>
                          <p className="text-xs text-gray-400">
                            Size: {item.productSize}
                          </p>
                          <p className="text-xs text-gray-400">
                            Category: {item.productId.category}
                          </p>
                          <p className="font-semibold text-sm text-gray-300">
                            Rs. {item.productId.price}/-
                          </p>

                          <div className="flex items-center gap-2 md:hidden">
                            <div className="flex flex-row justify-center items-center border p-1 rounded-md gap-3">
                              <Button
                                variant={"outline"}
                                disabled={item.quantity === 1 || cartloading}
                                size={"icon"}
                                onClick={() => {
                                  decrementQuantity(
                                    item.productId._id,
                                    item.productId.price
                                  );
                                  setProductIdStored(item.productId._id);
                                }}
                              >
                                -
                              </Button>
                              <p className="text-xl font-bold">
                                {item.quantity}
                              </p>
                              <Button
                                variant={"outline"}
                                size={"icon"}
                                disabled={cartloading}
                                onClick={() => {
                                  incrementQuantity(
                                    item.productId._id,
                                    item.productId.price
                                  );
                                  setProductIdStored(item.productId._id);
                                }}
                              >
                                +
                              </Button>
                            </div>
                            <Button
                              variant={"secondary"}
                              size={"icon"}
                              disabled={cartloading}
                              onClick={() =>
                                handleRemoveFromCart(
                                  item.productId._id,
                                  item.productColor,
                                  item.productSize,
                                  (
                                    item.productId.price * item.quantity
                                  ).toFixed(2)
                                )
                              }
                            >
                              <Trash2 />
                            </Button>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex items-center gap-3">
                          <div className="flex justify-center items-center gap-3 border p-1 rounded-md">
                            <Button
                              variant={"outline"}
                              disabled={item.quantity === 1 || cartloading}
                              size={"icon"}
                              onClick={() => {
                                decrementQuantity(
                                  item.productId._id,
                                  item.productId.price
                                );
                                setProductIdStored(item.productId._id);
                              }}
                            >
                              -
                            </Button>
                            <p className="text-xl font-bold">{item.quantity}</p>
                            <Button
                              variant={"outline"}
                              size={"icon"}
                              disabled={cartloading}
                              onClick={() => {
                                incrementQuantity(
                                  item.productId._id,
                                  item.productId.price
                                );
                                setProductIdStored(item.productId._id);
                              }}
                            >
                              +
                            </Button>
                          </div>
                          <Button
                            variant={"secondary"}
                            size={"icon"}
                            disabled={cartloading}
                            onClick={() =>
                              handleRemoveFromCart(
                                item.productId._id,
                                item.productColor,
                                item.productSize,
                                (item.productId.price * item.quantity).toFixed(
                                  2
                                )
                              )
                            }
                          >
                            <Trash2 />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="text-right align-top md:align-middle pt-8 md:pt-0  text-white font-semibold text-lg ">
                        {item.productId._id === productIdStored &&
                        cartloading ? (
                          <div className="flex justify-end pr-4">
                            <Loader2 className="animate-spin" />
                          </div>
                        ) : (
                          "Rs. " + item.productId.price * item.quantity + "/-"
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="flex items-center justify-center md:justify-between py-8 font-semibold text-2xl">
                <div className="md:flex justify-start hidden items-center gap-6">
                  <Link
                    to="/"
                    className="flex justify-center md:justify-start items-center gap-2 "
                  >
                    <h2 className="font-semibold text-3xl font-serif md:flex hidden">
                      <span className="text-primary">C</span>artify
                    </h2>

                    <div className="relative flex items-center justify-center">
                      <img
                        src={logoCircle}
                        alt="Cartify"
                        className="size-[50px] spin-slow "
                      />
                      <div className="absolute right-0 left-0 flex items-center justify-center">
                        <img src={logo} alt="Cartify" className="w-[30px]" />
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="flex flex-col items-center gap-4">
                  <div className="flex items-center gap-4 w-full">
                    <h1 className="text-gray-300">Estimated Total:</h1>
                    <h3 className="text-primary font-bold text-right">
                      Rs. {cart?.totalPrice.toFixed(2)}/-
                    </h3>
                  </div>
                  <Button
                    onClick={() => navigateTo("/checkout")}
                    className="w-full cursor-pointer"
                  >
                    Check out
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
