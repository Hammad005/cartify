import { Button } from "@/components/ui/button";
import { Logs,  User2 } from "lucide-react";
import React, { useState } from "react";
import Orders from "@/components/Orders";
import ProfileDetails from "@/components/ProfileDetails";

const Profile = () => {
  const [toggle, setToggle] = useState("Profile");

  return (
    <>
      <div className="md:px-14 px-6 py-8">
        <div className="flex items-center justify-between">
          <h1 className="text-primary text-4xl font-bold">{toggle}</h1>
          <div className="flex gap-3">
            <Button
              variant={toggle === "Profile" ? "default" : "outline"}
              onClick={() => setToggle("Profile")}
              className={`cursor-pointer`}
            >
              <User2 />
              Profile
            </Button>
            <Button
              variant={toggle === "Orders" ? "default" : "outline"}
              onClick={() => setToggle("Orders")}
              className={"cursor-pointer"}
            >
              <Logs />
              Orders
            </Button>
          </div>
        </div>

        {toggle === "Profile" && <ProfileDetails />}
        {toggle === "Orders" && <Orders />}
      </div>
    </>
  );
};

export default Profile;
