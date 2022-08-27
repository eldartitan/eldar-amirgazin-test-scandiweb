import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrency } from "../store/currencySlice";
import { useQuery } from "@apollo/client";
import UpIcon from "../style/icons/UpIcon";
import DownIcon from "../style/icons/DownIcon";
import { CURRENCIES } from "../query/queryies";
import s from "../style/dropdownCurrency.module.css";
import listenForOutsideClicks from "../util/listenForOutsideClicks";
import { getCurrencySymbol } from "../store/selector";

export default function DropdownCurrency() {
  const dispatch = useDispatch();
  const { loading, data } = useQuery(CURRENCIES);
  const price = useSelector(getCurrencySymbol);
  const menuRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [listening, setListening] = useState(false);
  
  useEffect(listenForOutsideClicks(
    listening,
    setListening,
    menuRef,
    setIsOpen,
  ));

  const handleClick = (prop) => {
    dispatch(setCurrency(prop))
    setIsOpen(false)
  }

  return (
    <div className={s.dropdown} ref={menuRef}>
      <button
        className={s.buttonIsOpen}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={s.price}>{price}</span>
        {isOpen ? <UpIcon /> : <DownIcon />}
      </button>
      {isOpen && (
        <ul className={s.modal}>
          {data &&
            data.currencies.map((cur) => {
              return (
                <li key={cur.label}>
                  <button
                    className={s.modalButton}
                    onClick={() => handleClick(cur)}
                  >
                    {cur.symbol} {cur.label}
                  </button>
                </li>
              );
            })}
        </ul>
      )}
    </div>
  );
}