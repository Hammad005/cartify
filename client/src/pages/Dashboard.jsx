import AddProduct from "@/components/AddProduct";
import AllOrders from "@/components/AllOrders";
import Analytics from "@/components/Analytics";
import Products from "@/components/Products";
import { Button } from "@/components/ui/button";
import {
  ChartNoAxesCombined,
  ChartSpline,
  Logs,
  PlusCircle,
  ShoppingCart,
} from "lucide-react";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const tabs = [
    { id: "analytics", label: "Analytics", icon: ChartSpline },
    { id: "add", label: "Add Product", icon: PlusCircle },
    { id: "products", label: "Products", icon: ShoppingCart },
    { id: "orders", label: "Orders", icon: Logs },
  ];
  const [activeTab, setactiveTab] = useState("analytics");
   useEffect(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, []);
  return (
    <>
      <div className="md:px-14 px-6 py-8 flex flex-col justify-center">
        <div className="flex flex-col items-center justify-center gap-6">
          <h1 className="font-bold text-3xl text-primary text-center flex items-center gap-2 animate-bounce">
            Dashboard <ChartNoAxesCombined className="size-8 text-white" />
          </h1>

          <div className="flex items-center ">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {tabs.map((tab) => (
                <Button
                  key={tab.id}
                  onClick={() => setactiveTab(tab.id)}
                  variant={activeTab === tab.id ? "default" : "outline"}
                  className="cursor-pointer"
                >
                  <tab.icon />
                  {tab.label}
                </Button>
              ))}
            </div>
          </div>

            {activeTab === "analytics" && <Analytics />}
            {activeTab === "add" && <AddProduct />}
            {activeTab === "products" && <Products />}
            {activeTab === "orders" && <AllOrders />}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
