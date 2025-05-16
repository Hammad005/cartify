import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader } from "./ui/card";
import { productsStore } from "@/store/productStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis, Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Input } from "./ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import EditProduct from "./EditProduct";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const { products, productloading, deleteProduct } = productsStore();
  const category = [
    { id: 1, name: "Pants" },
    { id: 2, name: "T-Shirts" },
    { id: 3, name: "Hoodies" },
    { id: 4, name: "Shoes" },
    { id: 5, name: "Bags" },
    { id: 6, name: "Accessories" },
  ];

  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);
  const categoryFilter = (cat) => {
    if (cat === "All") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) => product.category === cat);
      setFilteredProducts(filtered);
    }
  };

  const [openDialog, setOpenDialog] = useState(false);
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const [editProduct, seteditProduct] = useState(null);

  const handleDelete = async () => {
    await deleteProduct(editProduct._id);
    seteditProduct(null)
    setOpenAlertDialog(false);
  }

  const navigateTo = useNavigate();
  return (
    <>
      <Card className={"md:w-4xl w-full p-4"}>
        <CardHeader>
          <h1 className="text-2xl font-bold text-primary">Products List</h1>
          <CardDescription>
            This is a list of all categories products
          </CardDescription>
        </CardHeader>
        <CardContent className={"p-0"}>
          <Input
            type="text"
            placeholder="Search products by name or category..."
            onChange={(e) => {
              const filtered = products.filter(
                (product) =>
                  product.name
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase()) ||
                  product.category
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase())
              );
              setFilteredProducts(filtered);
            }}
          />
        </CardContent>
        <Table>
          <TableHeader>
            <TableRow className={"hover:bg-transparent"}>
              <TableHead
                className={"text-primary font-bold hidden lg:table-cell"}
              >
                Product
              </TableHead>
              <TableHead className={"text-primary font-bold"}>Name</TableHead>
              <TableHead className={"text-primary font-bold"}>
                <Select
                  onValueChange={(e) => {
                    categoryFilter(e);
                  }}
                >
                  <SelectTrigger className="dark:bg-transparent border-0 p-0 dark:text-primary hover:dark:bg-transparent cursor-pointer">
                    <SelectValue placeholder="Category" className="p-0" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All</SelectItem>
                    {category.map((item) => (
                      <SelectItem key={item.id} value={item.name}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableHead>
              <TableHead className="text-primary font-bold">Price</TableHead>
              <TableHead className="text-primary text-center font-bold">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          {filteredProducts.length === 0 && (
            <TableCaption className="text-lg font-semibold ">
              No products found
            </TableCaption>
          )}
          <TableBody>
            {filteredProducts.map((product) => (
              <>
                <TableRow key={product._id}>
                  <TableCell className={"hidden lg:table-cell"}>
                    <div className="w-12 h-12 overflow-hidden rounded-full flex items-center">
                      <img
                        src={product.image.imageUrl}
                        alt={product.name}
                        className="object-cover w-12 rounded-full"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="md:hidden">
                      {product.name.slice(0, 10)
                        ? product.name.slice(0, 10) + "..."
                        : product.name}
                    </div>
                    <div className="hidden md:block">{product.name}</div>
                  </TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>Rs. {product.price}/-</TableCell>
                  <TableCell className={"text-center"}>
                    <DropdownMenu modal={false}>
                      <DropdownMenuTrigger>
                        <Ellipsis className="size-5 cursor-pointer" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>Options</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => navigateTo(`/product/${product._id}`)} >View</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {seteditProduct(product);setOpenDialog(true)}}>Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {seteditProduct(product);setOpenAlertDialog(true)}}>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className={"md:max-w-3xl w-full max-h-[80vh] overflow-y-auto"}>
          <DialogHeader>
            <DialogTitle className={'text-primary'}>Edit Product</DialogTitle>
            <DialogDescription>
              Edit Product Details
            </DialogDescription>
          </DialogHeader>
          <EditProduct product={editProduct} setOpenDialog={setOpenDialog} />
        </DialogContent>
      </Dialog>

      <AlertDialog open={openAlertDialog}>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>
        Are you sure you want to delete this product?
      </AlertDialogTitle>
      <AlertDialogDescription>
        Product Name: {editProduct?.name}
        <br />
        Product Category: {editProduct?.category}
        <br />
        Product Price: Rs.{editProduct?.price}/-
        <br />
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel disabled={productloading} onClick={() => setOpenAlertDialog(false)}>Cancel</AlertDialogCancel>
      <AlertDialogAction disabled={productloading} onClick={handleDelete}>
        {
          productloading ? (
            <Loader2 className="animate-spin" />
          ) : "Delete"
        }
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

    </>
  );
};

export default Products;
