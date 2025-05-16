import Categories from '@/components/Categories'
import NewArrivals from '@/components/NewArrivals'
import React from 'react'

const Home = () => {
  return (
    <>
    <div className='md:px-14 px-6'>
    <h1 className='font-bold text-3xl text-primary text-center pt-8'>Style Starts Here.</h1>
    <p className='text-muted-foreground text-center pt-2'>Discover top categories curated for trendsetters. Shop what defines you.</p>
    <Categories/>

    
    <NewArrivals/>
    </div>
    </>
  )
}

export default Home