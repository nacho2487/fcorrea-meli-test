import React from "react";
import css from "./search-list.scss";

import { SearchListItem } from "../";

export default props => (
  <div className={css.searchList}>
    {props.items.map(item => (
      <SearchListItem key={item.id} item={item} />
    ))}
  </div>
);
