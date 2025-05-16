import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { authStore } from "@/store/authStore";
import logoCircle from "../assets/logoCircle.png";
import logo from "../assets/logo.png";

const Login = () => {
  const [seePassword, setSeePassword] = useState(false);
  const [data, setData] = useState({ email: "", password: "" });

  const { login, loading } = authStore();
  const handleSubmit = (e) => {
    e.preventDefault();
    login(data);
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
                  Login
                </h1>
                <p className="text-gray-300 text-xs">Login to your account</p>
              </div>
            </CardHeader>
            <CardContent>
              <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
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
                <Button className="cursor-pointer" disabled={loading}>
                  {loading ? <Loader2 className="animate-spin" /> : "Login"}
                </Button>
              </form>
              <p className="text-gray-300 text-sm text-center mt-4">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-primary hover:text-primary/80 hover:border-b hover:border-white"
                >
                  Sign Up
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Login;
