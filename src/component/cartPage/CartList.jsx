import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  dAmount,
  getTotalPrice,
  iAmount,
  selectAtribes,
} from "../../store/cartSlice";
import ArrowLeft from "../../style/icons/ArrowLeft";
import ArrowRight from "../../style/icons/ArrowRight";
import ProductAtribs from "../productPage/ProductAtribs";
import { Link } from "react-router-dom";
import { getCurrency } from "../../store/selector";
import s from "../../style/cart.module.css";

export default function CartList({ cart }) {
  const dispatch = useDispatch();
  const price = useSelector(getCurrency);
  const pr = cart.data.prices.filter(
    (p) => p.currency.label === price?.label,
  )[0];

  const [selectImg, setSelectImg] = useState(0);
  const [select, setSelect] = useState(cart.atribs);

  useEffect(() => {
    dispatch(selectAtribes({ id: cart.id, atribs: select }));
  }, [select, dispatch, cart.id]);

  const selectClick = (atribute, value) => {
    if (select[atribute] === null || select[atribute] !== value) {
      setSelect({ ...select, [atribute]: value });
    } else if (select[atribute] === value) {
      setSelect({ ...select, [atribute]: null });
    }
  };

  const handleClickI = () => {
    dispatch(iAmount(cart.id));
    dispatch(getTotalPrice(price.label));
  };

  const handleClickD = () => {
    dispatch(dAmount(cart.id));
    dispatch(getTotalPrice(price.label));
  };

  return (
    <div className={s.flexCol}>
      <span className={s.line}></span>
      <div className={s.list}>
        <div className={s.infoBlock}>
          <div className={s.flexCol}>
            <Link to={`/${cart.data.category}/${cart.id}`} className={s.brand}>
              {cart.data.brand}
            </Link>
            <Link to={`/${cart.data.category}/${cart.id}`} className={s.name}>
              {cart.data.name}
            </Link>
          </div>
          <div className={s.flexCol}>
            <span className={s.price}>
              {pr?.amount}
              {pr?.currency.symbol}
            </span>
          </div>
          {cart.data.attributes.map((atribs) => {
            return (
              <ProductAtribs
                atribs={atribs}
                select={select}
                selectClick={selectClick}
                key={atribs.id}
              />
            );
          })}
        </div>
        <div className={s.amountBlock}>
          <button onClick={handleClickI} className={s.buttonAmount}>
            +
          </button>
          <span className={s.amount}>{cart.amount}</span>
          <button onClick={handleClickD} className={s.buttonAmount}>
            -
          </button>
        </div>
        <div className={s.gallery}>
          <div
            className={s.galleryImage}
            style={{
              backgroundImage: `url(${cart.data.gallery[selectImg]})`,
            }}
          >
            {cart.data.gallery.length > 1 ? (
              <div className={s.arrowBlock}>
                <div className={s.arrowCont}>
                  <button
                    onClick={() =>
                      selectImg === 0
                        ? setSelectImg(cart.data.gallery.length - 1)
                        : setSelectImg(selectImg - 1)
                    }
                    className={s.buttonLeft}
                  >
                    <ArrowLeft />
                  </button>
                  <button
                    onClick={() =>
                      selectImg === cart.data.gallery.length - 1
                        ? setSelectImg(0)
                        : setSelectImg(selectImg + 1)
                    }
                    className={s.buttonRight}
                  >
                    <ArrowRight />
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
