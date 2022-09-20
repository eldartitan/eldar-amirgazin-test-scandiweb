import React from "react";
import { useQuery } from "@apollo/client";
import { NavLink } from "react-router-dom";
import { CATEGORIES } from "../query/queryies";
import s from "../style/style.module.css";

export default function CategoryBar() {
  const { data } = useQuery(CATEGORIES);

  return (
    <>
      <div className={s.categoryBar}>
        {data?.categories.map((cat) => (
          <NavLink
            key={cat.name}
            to={cat.name==="all" ? "" : cat.name}
            className={({ isActive }) =>
              isActive ? s.isActive : s.isNotActive
            }
          >
            {cat.name.toUpperCase()}
          </NavLink>
        ))}
      </div>
    </>
  );
}
