import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { BasketIcon } from "../../style/icons/BasketIcon";
import styles from "../../style/dropdownMenu.module.css";
import { getCart } from "../../store/selector";
import Modal from "./Modal";
import useOutsideAlerter from "../../util/useOutsideAlerter";

export default function DropdownMenu() {
  const data = useSelector(getCart);
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef(null);
  const wrapperRef = useRef(null);

  useOutsideAlerter(buttonRef, wrapperRef, setIsOpen);

  return (
    <div className={styles.dropdown}>
      <button ref={buttonRef} className={styles.menuButton} onClick={() => setIsOpen(!isOpen)}>
        <BasketIcon fill={"#43464E"} />
        {Object.values(data.products).length > 0 ? (
          <span className={styles.quantity}>{data.quantity}</span>
        ) : null}
      </button>
      {isOpen && data ? (
        <Modal
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          data={data}
          wrapperRef={wrapperRef}
        />
      ) : null}
    </div>
  );
}
