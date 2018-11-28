import React from "react";
import css from "./text-input.scss";

export default ({ type = "text", placeholder } = {}) => (
  <input className={css.textInput} type={type} placeholder={placeholder} />
);
