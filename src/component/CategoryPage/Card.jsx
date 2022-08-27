/** @format */

import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { BasketIcon } from "../../style/icons/BasketIcon";
import s from "../../style/category.module.css";

export default function Card(props) {
  const price = useSelector((state) => state.currency.currency.label);
  const cart = useSelector((state) => state.cart.products);
  const pr = props.data.prices.filter((p) => p.currency.label === price)[0];

  return (
    <div className={s.card}>
      <div
        className={s.cardImage}
        style={{
          backgroundImage: `url(${props.data.gallery[0]})`,
        }}
      >
        {props.data.id in cart ? (
          <div className={s.cartLogoDiv}>
            <Link to={"/cart"} className={s.cartLogo}>
              <BasketIcon fill={"#FFFFFF"} />
            </Link>
          </div>
        ) : null}
      </div>
      <div className={s.cardLinks}>
        {props.category ? (
          <Link to={`${props.data.id}`}>{props.data.name}</Link>
        ) : (
          <Link to={`${props.data.category}/${props.data.id}`}>
            {props.data.name}
          </Link>
        )}
      </div>
      <span className={s.cardAmount}>
        {pr.amount} {pr.currency.symbol}
      </span>
    </div>
  );
}
