import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import logoCircle from "../assets/logoCircle.png";
import { Link, useNavigate } from "react-router-dom";
import {
  ChartNoAxesCombined,
  Loader,
  LogOut,
  Menu,
  Search,
  ShoppingBag,
  User2,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { authStore } from "@/store/authStore";
import { cartStore } from "@/store/cartStore";
import SearchMenu from "./SearchMenu";

const Navbar = () => {
  const categories = [
    "Pants",
    "T-Shirts",
    "Hoodies",
    "Shoes",
    "Bags",
    "Accessories",
  ];

  const { cart } = cartStore();

  const navigateTo = useNavigate();
  const redirectTo = (path) => {
    navigateTo(path);
  };

  const { user, logout, loading } = authStore();
  const [openSearch, setOpenSearch] = useState(false);
  const [openSheet, setOpenSheet] = useState(false);

  useEffect(() => {
    setOpenSheet(false);
  }, [navigateTo])
  
  return (
    <>
      <SearchMenu openSearch={openSearch} setOpenSearch={setOpenSearch} />
      <nav
        className={`flex items-center justify-between w-full lg:px-[5rem] px-6 py-3 bg-background border-b`}
      >
        <div className="lg:hidden">
          <Menu onClick={() => setOpenSheet(true)} />
          <Sheet open={openSheet} onOpenChange={setOpenSheet}>
            <SheetContent side="bottom" className={"rounded-t-2xl"}>
              <SheetHeader>
                <SheetTitle>
                  <div className="flex items-center gap-2">
                    <h2 className="font-semibold text-3xl font-serif">
                      <span className="text-primary">C</span>artify
                    </h2>

                    <div className="relative flex items-center justify-center">
                      <img
                        src={logoCircle}
                        alt="Cartify"
                        className="size-[50px] spin-slow "
                      />
                      <div className="absolute right-0 left-0 flex items-center justify-center">
                        <img
                          src={logo}
                          alt="C</div>artify"
                          className="w-[30px]"
                        />
                      </div>
                    </div>
                  </div>
                </SheetTitle>
                <SheetDescription>
                  <ul className="flex flex-col gap-6 mt-2">
                    {categories.map((category) => (
                      <li key={category}>
                        <button
                          onClick={() => redirectTo(`/category/${category}`)}
                          className="hover:border-b hover:border-primary text-gray-300 text-base"
                        >
                          {category}
                        </button>
                      </li>
                    ))}
                  </ul>
                </SheetDescription>
              </SheetHeader>
              <SheetFooter>
                {user?.role !== "admin" && (
                  <Button
                    onClick={() => redirectTo(user ? "/profile" : "login")}
                    variant={"outline"}
                  >
                    <User2 className="text-primary" />
                    Account
                  </Button>
                )}
                {user && (
                  <Button
                    onClick={() => {
                      logout();
                      setOpenSheet(false);
                    }}
                    variant={"outline"}
                    disabled={loading}
                  >
                    {loading ? (
                      <Loader className="animate-spin" />
                    ) : (
                      <>
                        <LogOut className="text-primary" /> Logout
                      </>
                    )}
                  </Button>
                )}
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
        <div className="flex lg:justify-start justify-center items-center gap-6">
          <Link
            to="/"
            className="flex justify-center lg:justify-start items-center gap-2 "
          >
            <h2 className="font-semibold text-3xl font-serif lg:flex hidden">
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
        <div className="lg:flex items-center justify-center hidden">
          <ul className="lg:flex items-center gap-8 hidden">
            {categories.map((category) => (
              <li key={category}>
                <Link
                  to={`/category/${category}`}
                  className="hover:border-b hover:border-primary text-gray-300"
                >
                  {category}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center gap-6">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger onClick={() => setOpenSearch(true)}>
                <Search className="hover:scale-115 transition-transform duration-300 ease-in-out text-gray-300 hover:text-primary cursor-pointer" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Search</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {user?.role !== "admin" && (
            <div className="lg:flex hidden">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger
                    onClick={() =>
                      redirectTo(user?.role === "client" ? "/profile" : "login")
                    }
                  >
                    <User2 className="hover:scale-115 transition-transform duration-300 ease-in-out text-gray-300 hover:text-primary cursor-pointer" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Account</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          )}

          {user?.role === "admin" && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger onClick={() => redirectTo("/dashboard")}>
                  <ChartNoAxesCombined className="hover:scale-115 transition-transform duration-300 ease-in-out text-gray-300 hover:text-primary cursor-pointer" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Dashboard</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}

          {user?.role === "client" && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger onClick={() => redirectTo("/cart")}>
                  <div className="relative group">
                    <ShoppingBag className="group-hover:scale-115 transition-transform duration-300 ease-in-out text-gray-300 hover:text-primary cursor-pointer" />
                    {cart?.items?.length > 0 && (
                      <div className="absolute top-[-10px] right-[-10px] bg-primary text-white text-[10px] font-semibold rounded-full px-[8px] py-[2px] transition-transform duration-300 ease-in-out group-hover:scale-115">
                        {cart?.items?.length}
                      </div>
                    )}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Cart</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          {user && (
            <div className="lg:flex hidden">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger
                    onClick={logout}
                    className={`${loading && "pointer-events-none"}`}
                  >
                    {loading ? (
                      <Loader className="animate-spin text-primary/50" />
                    ) : (
                      <LogOut className="hover:scale-115 transition-transform duration-300 ease-in-out text-gray-300 hover:text-primary cursor-pointer" />
                    )}
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Logout</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
