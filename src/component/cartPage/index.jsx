/** @format */

import React from "react";
import { useSelector } from "react-redux";
import CartList from "./CartList";
import s from "../../style/cart.module.css";
import { getCart, getCurrency } from "../../store/selector";

export default function Cart() {
  const data = useSelector(getCart);
  const price = useSelector(getCurrency);
  const dataKeys = Object.values(data.products);
  const extPrice = `${data.total[price.label].toFixed(2)} ${price.symbol}`;

  return (
    <div className={s.cart}>
      <div className={s.cartText}>CART</div>
      {dataKeys.map((d) => (
        <CartList key={d.id} cart={d} extPrice={extPrice} />
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
