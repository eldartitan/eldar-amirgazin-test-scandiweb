import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import styles from "../../style/dropdownMenu.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getCurrency } from "../../store/selector";
import MenuCard from "./MenuCard";
import { getTotalPrice } from "../../store/cartSlice";

export default function Modal({ isOpen, setIsOpen, data, wrapperRef }) {
  const dispatch = useDispatch();
  const price = useSelector(getCurrency);

  useEffect(() => {
    dispatch(getTotalPrice(price?.label))
  }, [data.quantity])

  return ReactDOM.createPortal(
    <>
      <div className="container containerFlex">
        {isOpen ? <div className={styles.backdrop}></div> : null}
        <div ref={wrapperRef} className={styles.menu}>
          <div className={styles.bagBlock}>
            <span className="font-bold">My Bag</span>
            <span>, {data.quantity} items</span>
          </div>
          <div className={styles.cards}>
            {Object.values(data.products)?.map((card) => (
              <MenuCard key={card.id} data={card} />
            ))}
          </div>
          <div className={styles.totalPrice}>
            <span>Total</span>
            <span>{`${data.totalPrice.toFixed(2)} ${price?.symbol}`}</span>
          </div>
          <div className={styles.linksBlock}>
            <Link
              to={"/cart"}
              onClick={() => setIsOpen(false)}
              className={styles.viewBag}
            >
              VIEW BAG
            </Link>
            <button className={styles.checkOut}>CHECK OUT</button>
          </div>
        </div>
      </div>
    </>,
    document.getElementById('portal')
  );
}
