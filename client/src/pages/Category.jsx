import React from "react";
import { useNavigate } from "react-router-dom";
import { productsStore } from "@/store/productStore";
import { useParams } from "react-router-dom";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
const Category = () => {
  const { category } = useParams();
  const { products } = productsStore();
  const naviateTo = useNavigate();
  const filteredProducts = products?.filter(
    (product) => product.category === category
  );

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <>
    <div className='md:px-14 px-6'>
      <h1 className="font-bold text-4xl text-primary text-center pt-8 animate-pulse uppercase">
        {category}
      </h1>
      <p className="text-muted-foreground text-center pt-2 pb-10">
        Explore the freshest drops in fashion before they&apos;re gone.
      </p>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 ">
        {filteredProducts?.map((product) => (
          <CardContainer key={product.id} className="inter-var my-3">
            <CardBody className="bg-transparent relative group/card  dark:hover:shadow-2xl dark:hover:shadow-primary/20 dark:bg-transparent border-primary/30  w-full h-auto  rounded-xl p-6 border  ">
              <CardItem translateZ="100" className="w-full mt-4">
                <img
                  src={product.image.imageUrl}
                  alt={product.name}
                  className="object-cover w-auto h-96 rounded-xl group-hover/card:shadow-xl"
                />
              </CardItem>
              <CardItem
                translateZ="65"
                className="text-xl font-bold text-neutral-600 dark:text-primary"
              >
                {product.name.length > 25
                  ? product.name.slice(0, 25) + "..."
                  : product.name}
              </CardItem>
              <CardItem
                as="p"
                translateZ="55"
                className="text-gray-500 text-sm max-w-sm mt-2 dark:text-gray-300"
              >
                Rs.{product.price}/-
              </CardItem>
              <CardItem
                as="p"
                translateZ="50"
                className="text-gray-400 text-sm max-w-sm mt-2 dark:text-gray-300"
              >
                {product.category}
              </CardItem>
              <CardItem
                className="flex justify-between items-center mt-4 w-full"
                translateZ="45"
              >
                <Button
                  onClick={() => naviateTo(`/product/${product._id}`)}
                  className={"w-full hover:bg-primary cursor-pointer"}
                  variant={"secondary"}
                >
                  Shop Now
                </Button>
              </CardItem>
            </CardBody>
          </CardContainer>
        ))}
      </div>
    </div>
    </>
  );
};

export default Category;
