import React, { useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useState } from "react";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ImagePlus, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { productsStore } from "@/store/productStore";
import { toast } from "sonner";

const AddProduct = () => {
  const [data, setData] = useState({
    name: "",
    description: "",
    colors: "",
    sizes: "",
    price: "",
    image: "",
    category: "",
  });
  const category = [
    { id: 1, name: "Pants" },
    { id: 2, name: "T-Shirts" },
    { id: 3, name: "Hoodies" },
    { id: 4, name: "Shoes" },
    { id: 5, name: "Bags" },
    { id: 6, name: "Accessories" },
  ];

  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setData({ ...data, image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const {createProduct, productloading} = productsStore();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.category) {
      return toast.warning("Please select a category");
    }
    if (!data.image) {
      return toast.warning("Please select an image");
    }
    await createProduct(data);
    setData({
      name: "",
      description: "",
      colors: "",
      sizes: "",
      price: "",
      image: "",
      category: "",
    });
  }
  return (
    <>
      <Card className={"md:w-4xl w-full"}>
        <CardHeader>
          <h1 className="text-2xl font-bold text-primary">Add Product</h1>
          <CardDescription>Add product to your store</CardDescription>
        </CardHeader>
          <CardContent className={" mt-4"}>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <Label>Name:</Label>
              <Input
                type={"text"}
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                placeholder="Product Name"
                required
              />
              <Label>Description:</Label>
              <Textarea
                value={data.description}
                onChange={(e) =>
                  setData({ ...data, description: e.target.value })
                }
                placeholder="Product Description"
                required
              />
              <div className="flex gap-2">
                <div className="flex flex-col gap-2 w-full">
                  <Label className={'flex justify-between'}>Colors: <span className="hidden px-3 md:flex text-[0.65rem] text-gray-500">(use commas "," to separate values)</span></Label>
                  <span className="md:hidden flex text-[0.55rem] text-gray-500">(use commas "," to separate values)</span>
                  <Input
                    type={"text"}
                    value={data.colors}
                    onChange={(e) =>
                      setData({ ...data, colors: e.target.value })
                    }
                    placeholder="Product Colors"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <Label className={'flex justify-between'}>Sizes: <span className="hidden px-3 md:flex text-[0.65rem] text-gray-500">(use commas "," to separate values)</span></Label>
                  <span className="md:hidden flex text-[0.55rem] text-gray-500">(use commas "," to separate values)</span>
                  <Input
                    type={"text"}
                    value={data.sizes}
                    onChange={(e) => setData({ ...data, sizes: e.target.value })}
                    placeholder="Product Sizes"
                    required
                  />
                </div>
              </div>
              <div className="flex gap-2 my-2">
                <div className="flex flex-col gap-2 w-full">
                  <Label>Price:</Label>
                  <Input
                    type={"number"}
                    value={data.price}
                    onChange={(e) =>
                      setData({ ...data, price: e.target.value })
                    }
                    placeholder="Product Price"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <Label>Category:</Label>
                  <Select
                    value={data.category}
                    onValueChange={(e) =>
                      setData({ ...data, category: e })
                    }
                    required
                  >
                    <SelectTrigger className={'w-full'}>
                      <SelectValue placeholder="Select a product category" />
                    </SelectTrigger>
                    <SelectContent>
                      {category.map((item) => (
                        <SelectItem key={item.id} value={item.name}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Label>Image:</Label>
              <input
                type={"file"}
                hidden
                onChange={handleImageChange}
                ref={fileInputRef}
              />
              <Card className={'flex items-center justify-center gap-2 cursor-pointer border-dashed border-primary min-h-[200px]'} onClick={() => fileInputRef.current.click()}>
                {
                  data.image ? (
                    <img 
                      src={data.image}
                      alt="Product Image"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ImagePlus className={'size-8'} />
                  )
                }
                <span className="text-sm font-semibold text-primary">
                  {
                    data.image ? "Change Product Image" : "Upload Product Image"
                  }
                </span>
              </Card>
              
              <Button type={"submit"} className={'cursor-pointer'} disabled={productloading}>
                {
                  productloading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "Add Product"
                  )
                }
              </Button>
            </form>
          </CardContent>
      </Card>
    </>
  );
};

export default AddProduct;
