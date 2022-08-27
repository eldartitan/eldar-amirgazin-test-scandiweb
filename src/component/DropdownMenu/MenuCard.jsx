/** @format */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dAmount, iAmount, selectAtribes } from "../../store/cartSlice";
import CardAtribs from "./CardAtribs";
import s from "../../style/dropdownMenu.module.css";
import { Link } from "react-router-dom";
import { getCurrencyLabel } from "../../store/selector";

export default function MenuCard({ data }) {
  const dispatch = useDispatch();
  const price = useSelector(getCurrencyLabel);
  const pr = data.data.prices.filter((p) => p.currency.label === price)[0];
  const [select, setSelect] = useState(data.atribs);

  useEffect(() => {
    dispatch(selectAtribes({ id: data.id, select }));
  }, [select, dispatch, data.id]);

  const selectClick = (atribute, value) => {
    if (select[atribute] === null || select[atribute] !== value) {
      setSelect({ ...select, [atribute]: value });
    } else if (select[atribute] === value) {
      setSelect({ ...select, [atribute]: null });
    }
  };

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
          {pr.amount}
          {pr.currency.symbol}
        </div>
        {data.data.attributes.map((atribs) => (
          <CardAtribs
            key={data.id}
            atribs={atribs}
            selectClick={selectClick}
            select={select}
          />
        ))}
      </div>
      <div className={s.amountBlock}>
        <button
          onClick={() => dispatch(iAmount({ id: data.id }))}
          className={s.amountButton}
        >
          +
        </button>
        <span className={s.amountData}>{data.amount}</span>
        <button
          onClick={() => dispatch(dAmount({ id: data.id }))}
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
