/** @format */

import React, { PureComponent } from "react";
import { NavLink } from "react-router-dom";
import s from "../style/style.module.css";

export default class CategoryBar extends PureComponent {
  render() {
    return (
      <>
        <div className={s.categoryBar}>
          <NavLink
            to={""}
            className={({ isActive }) =>
              isActive ? s.isActive : s.isNotActive
            }
          >
            ALL
          </NavLink>
          <NavLink
            to={"clothes"}
            className={({ isActive }) =>
              isActive ? s.isActive : s.isNotActive
            }
          >
            CLOTHES
          </NavLink>
          <NavLink
            to={"tech"}
            className={({ isActive }) =>
              isActive ? s.isActive : s.isNotActive
            }
          >
            TECH
          </NavLink>
        </div>
      </>
    );
  }
}
