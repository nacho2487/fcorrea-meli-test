import React from "react";
import Link from "next/link";
import css from "./logo.scss";

export default props => (
  <Link href="/">
    <img className={css.logo} src="/static/assets/img/Logo_ML@2x.png" />
  </Link>
);
