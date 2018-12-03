import React from "react";
import css from "./error-state.scss";

const defaultTitle = "¡Ups! Algo sucedió";
const defaultMessage =
  "Ha ocurrido un error inesperado. Por favór, intentanlo mas tarde.";

export default ({ title, message }) => (
  <div className={css.errorState}>
    <p className={css.title}>{title || defaultTitle}</p>
    <p className={css.message}>{message || defaultMessage}</p>
  </div>
);
