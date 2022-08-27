/** @format */

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  dAmount,
  deleteProduct,
  iAmount,
  selectAtribes,
} from "../../store/cartSlice";
import ArrowLeft from "../../style/icons/ArrowLeft";
import ArrowRight from "../../style/icons/ArrowRight";
import ProductAtribs from "../productPage/ProductAtribs";
import s from "../../style/cart.module.css";
import { Link } from "react-router-dom";
import Cross from "../../style/icons/Cross";
import { getCurrencyLabel } from "../../store/selector";

export default function CartList({ cart }) {
  const dispatch = useDispatch();
  const price = useSelector(getCurrencyLabel);
  const pr = cart.data.prices.filter((p) => p.currency.label === price)[0];

  const [selectImg, setSelectImg] = useState(0);
  const [select, setSelect] = useState(cart.atribs);

  useEffect(() => {
    dispatch(selectAtribes({ id: cart.id, select }));
  }, [select, dispatch, cart.id]);

  const selectClick = (atribute, value) => {
    if (select[atribute] === null || select[atribute] !== value) {
      setSelect({ ...select, [atribute]: value });
    } else if (select[atribute] === value) {
      setSelect({ ...select, [atribute]: null });
    }
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
              {pr.amount}
              {pr.currency.symbol}
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
          <button
            onClick={() => dispatch(iAmount({ id: cart.id }))}
            className={s.buttonAmount}
          >
            +
          </button>
          <span className={s.amount}>{cart.amount}</span>
          <button
            onClick={() => dispatch(dAmount({ id: cart.id }))}
            className={s.buttonAmount}
          >
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
        <div>
          <button onClick={() => dispatch(deleteProduct(cart.id))}>
            <Cross />
          </button>
        </div>
      </div>
    </div>
  );
}
