import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { dAmount, iAmount } from "../../store/cartSlice";
import { Link } from "react-router-dom";
import { getCurrency } from "../../store/selector";
import CardAtribs from "./CardAtribs";
import s from "../../style/dropdownMenu.module.css";

export default function MenuCard({ data }) {
  const dispatch = useDispatch();
  const price = useSelector(getCurrency);
  const pr = data.data.prices.filter((p) => p.currency.label === price?.label)[0];

  return (
    <div className={s.card}>
      <div className={s.cardInfoBlock}>
        <div className={s.brandAndName}>
          <Link to={`/${data.data.category}/${data.id}`}>
            {data.data.brand}
          </Link>
          <Link to={`/${data.data.category}/${data.id}`} className={s.nameSpan}>
            {data.data.name}
          </Link>
        </div>
        <div className={s.price}>
          {pr?.amount.toFixed(2)}
          {pr?.currency.symbol}
        </div>
        {data.data.attributes.map((atribs) => (
          <CardAtribs
            key={data.id}
            atribs={atribs}
            select={data.atribs}
          />
        ))}
      </div>
      <div className={s.amountBlock}>
        <button
          onClick={() => dispatch(iAmount(data.id))}
          className={s.amountButton}
        >
          +
        </button>
        <span className={s.amountData}>{data.amount}</span>
        <button
          onClick={() => dispatch(dAmount(data.id))}
          className={s.amountButton}
        >
          -
        </button>
      </div>
      <div className={s.imgsBlock}>
        <img src={data.data.gallery[0]} width={121} alt="" />
      </div>
    </div>
  );
}
