import React from "react";
import s from "../../style/product.module.css";

export default function ProductAtribs({ atribs, select, selectClick }) {
  return (
    <div className={s.atribs}>
      <span className={s.atribName}>{atribs.name.toUpperCase()}:</span>
      <div className={atribs.id !== "Color" ? s.atribColor : s.atrib}>
        {atribs.items.map((item) => {
          return (
            <div
              key={item.value}
              style={{ backgroundColor: item.value }}
              className={
                select[atribs.id] === item.value
                  ? atribs.id === "Color"
                    ? s.AtribBtnSelectColor
                    : s.AtribBtnSelect
                  : atribs.id === "Color"
                  ? item.id === "White"
                    ? s.AtribBtnColorWhite
                    : s.AtribBtnColor
                  : s.AtribBtn
              }
            >
              <button
                className={s.atribButton}
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
