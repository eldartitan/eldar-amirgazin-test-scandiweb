/** @format */

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";
import { PRODUCT } from "../../query/queryies";
import { setProduct } from "../../store/cartSlice";
import s from "../../style/product.module.css";
import ProductAtribs from "./ProductAtribs";
import { getCurrencyLabel, getProducts } from "../../store/selector";

export default function Product() {
  let { id } = useParams();
  const { loading, data } = useQuery(PRODUCT, {
    variables: { id },
  });

  // if (loading) {
  //   return (<h1>Loading...</h1>)
  // };
  
  const dispatch = useDispatch();
  const state = useSelector(getProducts);
  const price = useSelector(getCurrencyLabel);
  const pr = data?.product.prices.filter((p) => p.currency.label === price)[0];

  const [added, setAdded] = useState(false);
  const [selectImg, setSelectImg] = useState(0);
  const [select, setSelect] = useState({
    Capacity: null,
    "With USB 3 ports": null,
    "Touch ID in keyboard": null,
    Size: null,
    Color: null,
  });

  const selectClick = (atribute, value) => {
    if (select[atribute] === null) {
      setSelect({ ...select, [atribute]: value });
    } else if (select[atribute] !== value) {
      setSelect({ ...select, [atribute]: value });
    } else if (select[atribute] === value) {
      setSelect({ ...select, [atribute]: null });
    }
  };

  const addToCartClick = (prop) => {
    const propL = prop.filter((e) => select[e.id] !== null).length;
    if (propL === prop.length) {
      if (data.product.id in state) {
        setAdded("Product has already been added!");
      } else {
        const prop = {
          id: data.product.id,
          data: data.product,
          atribs: select,
          amount: 1,
        };
        if (data.product.id in state === false) {
          dispatch(setProduct(prop));
        }
        setAdded("Product added!");
      }
    } else {
      setAdded("Select all atributes please!");
    }
  };

  return (
    <>
      {!loading && data ? (
        <div className={s.product}>
          <div className={s.imgList}>
            {data.product.gallery.map((link, index) => {
              return (
                <button
                  className={s.imgListMap}
                  key={link}
                  onClick={() => setSelectImg(index)}
                >
                  <img src={link} alt="" width={79} />
                </button>
              );
            })}
          </div>
          <div>
            <span className={s.productImg}>
              <img src={data.product.gallery[selectImg]} alt="" width={610} />
            </span>
          </div>
          <div className={s.infoBlock}>
            <div className={s.brandNameBlock}>
              <span className={s.brand}>{data.product.brand}</span>
              <span className={s.name}>{data.product.name}</span>
            </div>
            {data.product.attributes.map((atribs) => {
              return (
                <ProductAtribs
                  atribs={atribs}
                  select={select}
                  selectClick={selectClick}
                  key={atribs.id}
                />
              );
            })}
            <div className={s.priceBlock}>
              <span className={s.price}>PRICE:</span>
              <span className={s.amount}>
                {pr.amount}
                {pr.currency.symbol}
              </span>
            </div>
            <button
              onClick={() => addToCartClick(data.product.attributes)}
              className={s.addToCart}
            >
              ADD TO CART
            </button>
            {added ? (
              <div className={s.addedAlert}>
                <span className="">{added}</span>
              </div>
            ) : null}
            <div
              className={s.description}
              dangerouslySetInnerHTML={{ __html: data.product.description }}
            />
          </div>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
}
