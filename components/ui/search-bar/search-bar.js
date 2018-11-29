import React from "react";
import css from "./search-bar.scss";
import { TextInput, Button } from "../";

export default props => (
  <div className={css.searchBar}>
    <form action="/items" method="get">
      <TextInput
        name="q"
        placeholder="Nunca dejes de buscar"
        required
        defaultValue={props.searchTerm}
      />
      <Button search>
        <img src="/static/assets/img/ic_Search@2x.png" />
      </Button>
    </form>
  </div>
);
