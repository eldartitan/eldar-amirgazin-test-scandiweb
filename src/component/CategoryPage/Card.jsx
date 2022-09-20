import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BasketIcon } from "../../style/icons/BasketIcon";
import { getCurrency } from "../../store/selector";
import { setProduct } from "../../store/cartSlice";
import s from "../../style/category.module.css";

export default function Card(props) {
  const dispatch = useDispatch();
  const price = useSelector(getCurrency);
  const pr = props.data.prices.filter(
    (p) => p.currency.label === price?.label,
  )[0];
  const link = props.category
    ? `${props.data.id}`
    : `${props.data.category + "/"}${props.data.id}`;

  const handleClick = () => {
    dispatch(
      setProduct({
        id: `${props.data.id}_${new Date().getTime()}`,
        data: props.data,
        atribs: [],
        amount: 1,
      }),
    );
  };

  return (
    <div className={s.cardContainer} style={{ position: "relative" }}>
      {!props.data.attributes.length && props.data.inStock ? (
        <button className={s.cartLogoDiv} onClick={handleClick}>
          <div className={s.cartLogo}>
            <BasketIcon fill={"#FFFFFF"} />
          </div>
        </button>
      ) : null}
      <Link to={link}>
        <div
          style={!props.data.inStock ? { opacity: 0.7 } : null}
          className={s.card}
        >
          <div className={s.cardImageContainer}>
            {!props.data.inStock ? (
              <div className={s.cardOutOf}>OUT OF STOCK</div>
            ) : null}
            <img className={s.cardImage} src={props.data.gallery[0]} alt="" />
          </div>
          <div>
            <div className={s.cardLinks}>
              {props.data.brand + " " + props.data.name}
            </div>
            <span className={s.cardAmount}>
              {pr?.amount.toFixed(2)} {pr?.currency.symbol}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
