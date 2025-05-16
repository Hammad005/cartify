import React from "react";
import logo from "../assets/logo.png";
import logoCircle from "../assets/logoCircle.png";
const Loading = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="flex items-center gap-2">
          <div className="relative flex items-center justify-center">
            <img
              src={logoCircle}
              alt="Cartify"
              className="size-[80px] spin-slow "
            />
            <div className="absolute right-0 left-0 flex items-center justify-center">
              <img src={logo} alt="C</div>artify" className="w-[50px]" />
            </div>
          </div>
        </div>
        <h2 className="font-semibold text-[2.7rem] font-serif">
          <span className="text-primary">C</span>artify
        </h2>
      </div>
    </>
  );
};

export default Loading;
