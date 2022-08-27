/** @format */

import React from "react";
import s from "../../style/dropdownMenu.module.css";

export default function CardAtribs({ atribs, selectClick, select }) {
  return (
    <div className={s.cardAtribs}>
      <span>{atribs.name}:</span>
      <div className={s.cardAtribsMap}>
        {atribs.items.map((item) => {
          return (
            <div
              key={item.value}
              style={{ backgroundColor: item.value }}
              className={
                select[atribs.id] === item.value
                  ? atribs.id === "Color"
                    ? s.cardAtribBtnSelectColor
                    : s.cardAtribBtnSelect
                  : atribs.id === "Color"
                  ? s.cardAtribBtnColor
                  : s.cardAtribBtn
              }
            >
              <button
                className={s.cardBtn}
                onClick={() => selectClick(atribs.id, item.value)}
                key={item.id}
              >
                {atribs.id !== "Color" ? item.value : null}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
