/** @format */

import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BasketIcon } from "../../style/icons/BasketIcon";
import MenuCard from "./MenuCard";
import styles from "../../style/dropdownMenu.module.css";
import listenForOutsideClicks from "../../util/listenForOutsideClicks";
import { getCart, getCurrency } from "../../store/selector";

export default function DropdownMenu() {
  const data = useSelector(getCart);
  const price = useSelector(getCurrency);
  const menuRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [listening, setListening] = useState(false);

  useEffect(listenForOutsideClicks(
    listening,
    setListening,
    menuRef,
    setIsOpen,
  ));

  return (
    <div className={styles.dropdown} ref={menuRef}>
      <button
        className={styles.menuButton}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <BasketIcon fill={"#43464E"} />
        {Object.values(data.products).length > 0 ? (
          <span className={styles.quantity}>{data.quantity}</span>
        ) : null}
      </button>
      {isOpen && data ? (
        <>
          <div className={styles.menu}>
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
              <span>{`${data.total[price.label].toFixed(
                2,
              )} ${price.symbol}`}</span>
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
        </>
      ) : null}
    </div>
  );
}
