import React from "react";
import css from "./text-input.scss";

export default ({
  type = "text",
  placeholder,
  name,
  required,
  defaultValue
} = {}) => (
  <input
    className={css.textInput}
    type={type}
    placeholder={placeholder}
    name={name}
    required={required}
    defaultValue={defaultValue}
  />
);
