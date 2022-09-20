import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "@apollo/client";
import UpIcon from "../style/icons/UpIcon";
import DownIcon from "../style/icons/DownIcon";
import { CURRENCIES } from "../query/queryies";
import s from "../style/dropdownCurrency.module.css";
import { getCurrency } from "../store/selector";
import useOutsideAlerter from "../util/useOutsideAlerter";
import { setCurrency } from "../store/cartSlice";

export default function DropdownCurrency() {
  const dispatch = useDispatch();
  const { data } = useQuery(CURRENCIES);
  const price = useSelector(getCurrency);

  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef(null);
  const wrapperRef = useRef(null);
  useOutsideAlerter(buttonRef, wrapperRef, setIsOpen);

  const handleClick = (prop) => {
    dispatch(setCurrency(prop));
    setIsOpen(false);
  };

  useEffect(() => {
    dispatch(setCurrency(data?.currencies[0]));
  }, [data, dispatch])
  
  return (
    <>
      <div className={s.dropdown}>
        <button
          ref={buttonRef}
          className={s.buttonIsOpen}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={s.price}>{ price?.symbol }</span>
          {isOpen ? <UpIcon /> : <DownIcon />}
        </button>
        {isOpen && (
          <ul className={s.modal} ref={wrapperRef}>
            {data?.currencies.map((cur) => {
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
    </>
  );
}
