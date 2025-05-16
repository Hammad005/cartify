import React from 'react'
import { DashBoardChart } from './DashBoardChart'
import { BadgeDollarSign, Package, PackageCheck, ShoppingCart, Users } from 'lucide-react'
import AnalyticsCard from './AnalyticsCard'
import { productsStore } from '@/store/productStore'
import { orderStore } from '@/store/orderStore'
import { authStore } from '@/store/authStore'

const Analytics = () => {
  const {products} = productsStore();
  const {orders} = orderStore();
  const {clients} = authStore();
  
  return (
    <>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 md:w-4xl w-full">
        <AnalyticsCard
          title="Total Clients"
          value={clients}
          icon={Users}
        />
        <AnalyticsCard
          title="Total Products"
          value={products.length}
          icon={ShoppingCart}
        />
        <AnalyticsCard
          title="Deliverd Orders"
          value={orders.filter((order) => order.status === "Delivered").length}
          icon={PackageCheck}
        />
        <AnalyticsCard
          title="Total Revenue"
          value={"Rs. "+orders.reduce((total, order) => total + order.totalAmount, 0)+"/-"}
          icon={BadgeDollarSign}
        />
      </div>
    <DashBoardChart/>
    </>
  )
}

export default Analytics