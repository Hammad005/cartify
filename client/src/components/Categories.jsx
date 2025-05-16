import React from 'react'
import pants from '../assets/pants.webp'
import t_shirts from '../assets/t-shirts.jpg'
import shoes from '../assets/shoes.jpg'
import bags from '../assets/bags.jpg'
import hoodies from '../assets/hoodies.jpg'
import accessories from '../assets/accessories.jpg'
import { useNavigate } from 'react-router-dom'
import {
  Card,
  CardContent,
} from "@/components/ui/card"
const Categories = () => {
    const category = [
      {id: 1, name: 'Pants', image: pants},
      {id: 2, name: 'T-Shirts', image: t_shirts},
      {id: 3, name: 'Hoodies', image: hoodies},
      {id: 4, name: 'Shoes', image: shoes},
      {id: 5, name: 'Bags', image: bags},
      {id: 6, name: 'Accessories', image: accessories},
    ]
const naviateTo = useNavigate();
const handleClick = (cat) => {
  naviateTo(`/category/${cat}`);
}
  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-8'>
        {category.map((cat) => (
          <Card
            key={cat.id}
            onClick={() => handleClick(cat.name)}
            className="bg-transparent cursor-pointer overflow-hidden h-96 flex items-center justify-center group"
          >
            <CardContent className="p-0">
              <div className="relative w-full h-96">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-96 object-cover  transition-transform duration-300 ease-in-out transform group-hover:scale-105 "
                />
                <div className="absolute inset-0 bg-gray-950/30 hover:bg-gray-950/50 transition-colors duration-300 ease-in-out flex flex-col items-start justify-end p-6">
                  <h3 className="text-xl font-semibold text-primary">{cat.name}</h3>
                  <p className="text-sm text-gray-100">Explore {cat.name}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  )
}

export default Categories
