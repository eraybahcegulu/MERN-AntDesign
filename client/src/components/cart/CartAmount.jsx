import React from 'react'
import { useSelector } from "react-redux";
import CartButtons from "./CartButtons";

const CartAmount = () => {
    const cart = useSelector((state) => state.cart);

  return (
    <div className="cart-totals mt-auto ">
    <div className="subtotal  p-2">
      <div className="flex justify-between text-blue-400">
        <span>SUBTOTAL</span>
        <span>{cart.subTotal > 0 ? cart.subTotal.toFixed(2) : 0}$</span>
      </div>
    </div>

    <div className="vat border-t p-2">
      <div className="flex justify-between text-blue-400">
        <span>VAT {cart.tax}%</span>
        <span className="text-red-600">
          {(cart.subTotal * cart.tax) / 100 > 0
            ? `+${((cart.subTotal * cart.tax) / 100).toFixed(2)}`
            : 0}
          ₺
        </span>
      </div>
    </div>

    <div className="total border-t border-b-2 border-b-black p-2">
      <div className="mt-4 flex justify-between text-green-600 text-2xl">
        <span>
          <strong>TOTAL</strong>
        </span>
        <span className="text-xl">
          {cart.subTotal + (cart.subTotal * cart.tax) / 100 > 0
            ? (cart.subTotal + (cart.subTotal * cart.tax) / 100).toFixed(2)
            : 0}
          ₺
        </span>
      </div>
    </div>
    <CartButtons />
  </div>
  )
}

export default CartAmount