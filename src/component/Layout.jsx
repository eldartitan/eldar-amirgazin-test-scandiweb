/** @format */

import React, { PureComponent } from "react";
import { Outlet } from "react-router-dom";
import LogoIcon from "../style/icons/LogoIcon";
import s from "../style/style.module.css";
import CategoryBar from "./CategoryBar";
import DropdownCurrency from "./DropdownCurrency";
import DropdownMenu from "./DropdownMenu";

export default class Layout extends PureComponent {
  render() {
    return (
      <>
        <nav>
          <div className={s.navBar}>
            <CategoryBar />
            <LogoIcon />
            <div className={s.actionBar}>
              <DropdownCurrency />
              <DropdownMenu />
            </div>
          </div>
        </nav>
        <Outlet />
      </>
    );
  }
}
