import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { authStore } from "@/store/authStore";
import { toast } from "sonner";
import logoCircle from "../assets/logoCircle.png";
import logo from "../assets/logo.png";

const Signup = () => {
  const [seePassword, setSeePassword] = useState(false);
  const [seeConfirmPassword, setSeeConfirmPassword] = useState(false);
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const [confirmPassword, setConfirmPassword] = useState("");

  const { signup, loading } = authStore();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }
    signup(data);
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-[88vh] gap-6 p-6">
        <div className="w-full md:w-[26rem]">
          <Card className="border-primary bg-transparent">
            <CardHeader className={"flex  gap-2 justify-between items-center"}>
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
                    <img src={logo} alt="C</div>artify" className="w-[30px]" />
                  </div>
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-primary/80 text-center">
                  Sign Up
                </h1>
                <p className="text-gray-300 text-xs">Create an account</p>
              </div>
            </CardHeader>
            <CardContent>
              <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                <Input
                  type="text"
                  placeholder="Full Name"
                  required
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                />
                <Input
                  type="email"
                  placeholder="Email"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  required
                />
                <div className="relative">
                  <Input
                    type={seePassword ? "text" : "password"}
                    placeholder="Password"
                    value={data.password}
                    onChange={(e) =>
                      setData({ ...data, password: e.target.value })
                    }
                    required
                  />
                  <div
                    className="absolute top-0 right-0 p-1.5"
                    onClick={() => setSeePassword(!seePassword)}
                  >
                    {seePassword ? (
                      <EyeOff className="size-6 text-primary/50 cursor-pointer" />
                    ) : (
                      <Eye className="size-6 text-primary/50 cursor-pointer" />
                    )}
                  </div>
                </div>
                <div className="relative">
                  <Input
                    type={seeConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <div
                    className="absolute top-0 right-0 p-1.5"
                    onClick={() => setSeeConfirmPassword(!seeConfirmPassword)}
                  >
                    {seeConfirmPassword ? (
                      <EyeOff className="size-6 text-primary/50 cursor-pointer" />
                    ) : (
                      <Eye className="size-6 text-primary/50 cursor-pointer" />
                    )}
                  </div>
                </div>
                <Button className="cursor-pointer" disabled={loading}>
                  {loading ? <Loader2 className="animate-spin" /> : "Sign Up"}
                </Button>
              </form>
              <p className="text-gray-300 text-sm text-center mt-4">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-primary hover:text-primary/80 hover:border-b hover:border-white"
                >
                  Login
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Signup;
