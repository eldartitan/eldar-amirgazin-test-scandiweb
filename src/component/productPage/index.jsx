import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";
import { PRODUCT } from "../../query/queryies";
import { setProduct } from "../../store/cartSlice";
import { getCurrency } from "../../store/selector";
import ProductAtribs from "./ProductAtribs";
import parse from 'html-react-parser';
import s from "../../style/product.module.css";

export default function Product() {
  let { id } = useParams();
  const { loading, data } = useQuery(PRODUCT, {
    variables: { id },
  });

  const dispatch = useDispatch();
  const price = useSelector(getCurrency);
  const pr = data?.product.prices.filter((p) => p.currency.label === price?.label)[0];

  const [added, setAdded] = useState(false);
  const [selectImg, setSelectImg] = useState(0);
  const [select, setSelect] = useState([]);

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
    if (!data.product.inStock) {
      setAdded("Product out of stock!");
    } else if (propL === prop.length) {
      const prop = {
        id: `${data.product.id}_${ new Date().getTime() }`,
        data: data.product,
        atribs: select,
        amount: 1,
      };
      dispatch(setProduct(prop));
    } else {
      setAdded("Select all atributes please!");
    }
  };

  return (
    <>
      {!loading && data ? (
        <div className={s.product}>
          <div className={s.imgList} style={!data?.product.inStock ? {opacity: "0.7"} : {}}>
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
            <div className={s.productImg} style={!data?.product.inStock ? {opacity: "0.7"} : {}}>
              {!data?.product.inStock ? (
                <div className={s.cardOutOf}>OUT OF STOCK</div>
              ) : null}
              <img src={data.product.gallery[selectImg]} alt="" width={610} />
            </div>
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
                {pr?.amount.toFixed(2)}
                {pr?.currency.symbol}
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
            {parse(data.product.description)}
          </div>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
}
