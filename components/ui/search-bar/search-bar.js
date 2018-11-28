import React from "react";
import css from "./search-bar.scss";
import { TextInput, Button } from "../";

export default props => (
  <div className={css.searchBar}>
    <TextInput placeholder="Nunca dejes de buscar" /> <Button />
  </div>
);
