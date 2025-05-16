import NewArrivals from "@/components/NewArrivals";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { authStore } from "@/store/authStore";
import { cartStore } from "@/store/cartStore";
import { productsStore } from "@/store/productStore";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const ProductDetails = () => {
  const { id } = useParams();
  const { products } = productsStore();
  const navigateTo = useNavigate();
  
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [id]);

  const [product, setProduct] = useState(products?.find((product) => product._id === id))

  const {user} = authStore();
  const {addToCart} = cartStore();
  const [data, setData] = useState({
    productId: product?._id,
    productColor: "",
    productSize: "",
    quantity: 1,
    totalPrice: product?.price,
  })
  
 useEffect(() => {
  const foundProduct = products?.find((p) => p._id === id);
  if (foundProduct) {
    setProduct(foundProduct);
    setData({
      productId: foundProduct._id,
      productColor: "",
      productSize: "",
      quantity: 1,
      totalPrice: foundProduct.price,
    });
  }
}, [id, products]);

  const handleAddToCart = () => {
    if (!user) {
      return toast.error("Please login to add to cart");
    }
    if (!data.productColor) {
      return toast.error("Please select a color");
    }
    if (!data.productSize) {
      return toast.error("Please select a size");
    }
    addToCart(data);
  }
  const handleBuyNow = async () => {
    if (!user) {
      return toast.error("Please login to add to cart");
    }
    if (!data.productColor) {
      return toast.error("Please select a color");
    }
    if (!data.productSize) {
      return toast.error("Please select a size");
    }
    await addToCart(data);
    navigateTo("/checkout");
  }
  return (
    <>
      <div className="md:p-14 p-6">
        <div className="flex-col lg:flex lg:flex-row items-center justify-between lg:items-start gap-8 pb-20">
          <img
            src={product?.image.imageUrl}
            alt={product?.name}
            className="rounded-sm lg:h-[100vh]"
          />
          <div className="flex flex-col items-start pt-6 lg:pt-0 w-full">
            <h1 className="font-bold lg:text-6xl text-4xl text-primary">
              {product?.name}
            </h1>
            <Textarea
              readOnly
              value={product?.description}
              className={
                "text-muted-foreground font-semibold dark:bg-transparent border-0 resize-none p-0 pt-5"
              }
            />

            <div className="flex items-center justify-between pt-12 w-full">
              <p className="text-gray-300 font-semibold text-3xl">
                Rs. {product?.price}/-
              </p>
              <div className="flex justify-center items-center gap-6">
                <h3 className="text-primary text-xl font-bold">Category:</h3>
                <p className="text-gray-300 font-bold">{product?.category}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6 pt-8 w-full">
              <h3 className="text-primary text-xl font-bold">Colors:</h3>
              
                <Select
                value={data.productColor}
                onValueChange={(e) => setData({...data, productColor: e})}
                >
                  <SelectTrigger className={"w-full"}>
                    <SelectValue placeholder="Select a product color" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={"Choose a color"} disabled>
                      Choose a color
                    </SelectItem>
                    <SelectSeparator />
                    {product?.colors?.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              
            </div>

            <div className="flex items-center gap-9 pt-8 w-full">
              <h3 className="text-primary text-xl font-bold">Sizes:</h3>
                <Select
                value={data.productSize}
                onValueChange={(e) => setData({...data, productSize: e})}
                >
                  <SelectTrigger className={"w-full"}>
                    <SelectValue placeholder="Select a product size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={"Choose a size"} disabled>
                      Choose a size
                    </SelectItem>
                    <SelectSeparator />
                    {product?.sizes?.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
            </div>

            <div className="flex items-center gap-9 pt-8 w-full">
              <h3 className="text-primary text-xl font-bold">Quantity:</h3>
              <Card className="flex flex-row justify-center items-center gap-3 w-39 h-15">
                <Button variant={'outline'} onClick={() => setData({...data, quantity: data.quantity - 1})} disabled={data.quantity === 1}>-</Button>
                <p className="text-2xl font-bold">{data.quantity}</p>
                <Button variant={'outline'} onClick={() => setData({...data, quantity: data.quantity + 1})}>+</Button>
              </Card>
            </div>

            <div className="flex flex-col items-center gap-2 pt-8 w-full">
              <Button className="w-full cursor-pointer" variant={'outline'} onClick={handleAddToCart}>Add to Cart</Button>
              <Button className="w-full cursor-pointer" variant={'default'} onClick={handleBuyNow}>Buy it Now</Button>
            </div>
          </div>
        </div>
        <NewArrivals/>
      </div>
    </>
  );
};

export default ProductDetails;
