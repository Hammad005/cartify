import { cartStore } from '@/store/cartStore';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const CheckOutOrder = () => {
    const { cart } = cartStore();
    const navigateTo = useNavigate();
  return (
    <>
    <div className="w-full pb-3 border-b">
                {cart?.items?.map((item) => (
                  <div
                    key={item.productId._id}
                    className="flex justify-between py-2"
                  >
                    <div className="flex gap-6">
                      <div className="relative">
                        <img
                          src={item.productId.image?.imageUrl}
                          alt={item.productId.name}
                          className="w-[60px] h-[60px] object-cover rounded-md cursor-pointer"
                          onClick={() => navigateTo(`/product/${item.productId._id}`)}
                        />
                        <div className="absolute top-[-10px] right-[-10px] bg-primary text-white text-[10px] font-semibold rounded-full px-[8px] py-[2px] transition-transform duration-300 ease-in-out group-hover:scale-115">
                          {item?.quantity}
                        </div>
                      </div>
                      <div>
                        <p className="font-semibold text-lg text-primary hidden md:block">
                            {item.productId.name}
                          </p>
                          <p className="font-semibold text-sm text-primary md:hidden block">
                            {item.productId.name.length > 15
                              ? item.productId.name.slice(0, 15) + "..."
                              : item.productId.name}
                          </p>
                        <p className="text-muted-foreground text-xs font-bold">
                          {item.productColor} / {item.productSize} /{" "}
                          {item.productId.category}
                        </p>
                        <p className="text-muted-foreground text-xs font-bold">
                          Rs. {item.productId.price}/-
                        </p>
                      </div>
                    </div>
                    <p className="font-semibold">
                      Rs. {item.productId.price * item.quantity}/-
                    </p>
                  </div>
                ))}
              </div>
              <div className="w-full pt-3">
                <div className="flex justify-between text-sm">
                  <p className="text-gray-300">
                    Subtotal ·{" "}
                    {cart?.items?.reduce(
                      (total, item) => total + item.quantity,
                      0
                    )}{" "}
                    items
                  </p>
                  <p className="font-semibold">Rs. {cart?.totalPrice}/-</p>
                </div>
                <div className="flex justify-between text-sm pt-2">
                  <p className="text-gray-300">Shipping</p>
                  <p className="font-semibold">Rs. 100/-</p>
                </div>
                <div className="flex items-center justify-between pt-5 text-2xl">
                  <p className="text-primary font-bold">Total</p>
                  <p className="font-bold">
                    Rs. {(cart?.totalPrice + 100).toFixed(2)}/-
                  </p>
                </div>
              </div>
    </>
  )
}

export default CheckOutOrder