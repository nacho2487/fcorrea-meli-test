import React from "react";
import css from "./button.scss";

export default props => (
  <button className={css.button}>{props.children}</button>
);
