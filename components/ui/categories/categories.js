import React from "react";
import css from "./categories.scss";

const CategoryItem = ({ name, last }) => (
  <div className={css.categoryItem}>
    {name}
    {!last && (
      <img
        className={css.chevron}
        src="/static/assets/icon/right-chevron.svg"
      />
    )}
  </div>
);

export default props => (
  <div className={css.categories}>
    {props.categories.map((category, idx) => (
      <CategoryItem
        key={idx}
        name={category}
        last={idx === props.categories.length - 1}
      />
    ))}
  </div>
);
