import React from "react";
import { useNavigate } from "react-router-dom";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import { Button } from "./ui/button";
import { productsStore } from "@/store/productStore";

const NewArrivals = () => {
  const { products } = productsStore();
  const navigateTo = useNavigate();
  
  return (
    <>
      {products?.length >= 3 && (
        <>
          <h1 className="font-bold text-3xl text-primary text-center pt-8 animate-pulse">
            Hot & New This Week.
          </h1>
          <p className="text-muted-foreground text-center pt-2 ">
            Stay ahead of the curve. Explore the freshest drops in fashion
            before they&apos;re gone.
          </p>
          <Carousel className={"mx-8"}>
            <CarouselContent>
              {products?.slice(0, 6).map((product) => (
                <CarouselItem key={product.id} className="lg:basis-1/3 md:basis-1/2">
                  <CardContainer className="inter-var my-20">
                    <CardBody className="bg-transparent relative group/card  dark:hover:shadow-2xl dark:hover:shadow-primary/20 dark:bg-transparent border-primary/30  w-full h-auto  rounded-xl p-6 border  ">
                      <CardItem translateZ="100" className="w-full mt-4 relative flex">
                        <img
                          src={product.image.imageUrl}
                          alt={product.name}
                          className="object-cover w-auto h-96 rounded-xl group-hover/card:shadow-xl"
                        />
                        <div className="absolute top-3 left-2 -rotate-35">
                          <span className="text-primary text-sm font-bold">New</span>
                        </div>
                      </CardItem>
                      <CardItem
                        translateZ="65"
                        className="text-xl font-bold text-neutral-600 dark:text-primary"
                      >
                        {
                          product.name.length > 25
                            ? product.name.slice(0, 25) + "..."
                            : product.name
                        }
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
                          onClick={() => navigateTo(`/product/${product._id}`)}
                          className={"w-full hover:bg-primary cursor-pointer"}
                          variant={"secondary"}
                        >
                          Shop Now
                        </Button>
                      </CardItem>
                    </CardBody>
                  </CardContainer>
                </CarouselItem>
              ))}
            </CarouselContent>
            {products.length > 3 && (
              <>
                <CarouselPrevious />
                <CarouselNext />
              </>
            )}
          </Carousel>
        </>
      )}
    </>
  );
};

export default NewArrivals;
