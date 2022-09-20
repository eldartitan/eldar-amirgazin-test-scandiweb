import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CartList from "./CartList";
import s from "../../style/cart.module.css";
import { getCart, getCurrency } from "../../store/selector";
import { useEffect } from "react";
import { getTotalPrice } from "../../store/cartSlice";

export default function Cart() {
  const dispatch = useDispatch();
  const data = useSelector(getCart);
  const price = useSelector(getCurrency);
  const extPrice = `${data.totalPrice.toFixed(2)} ${price?.symbol}`;

  useEffect(() => {
    dispatch(getTotalPrice(price?.label))
  }, [data.quantity, dispatch, price?.label])

  return (
    <div className={s.cart}>
      <div className={s.cartText}>CART</div>
      {data.products.map((d) => (
        <CartList key={d.id} cart={d} />
      ))}
      <div className={s.lineDiv}>
        <span className={s.line}></span>
      </div>
      <div className={s.text}>
        <span className={s.textMedium}>Quantity: </span>
        <span className={s.textBold}>{data.quantity}</span>
      </div>
      <div className={s.text}>
        <span className={s.textMedium}>Total: </span>
        <span className={s.textBold}>{extPrice}</span>
      </div>
      <button
        onClick={() => (data.quantity ? alert("ORDER COMPLETE") : null)}
        className={s.orderButton}
      >
        ORDER
      </button>
    </div>
  );
}
