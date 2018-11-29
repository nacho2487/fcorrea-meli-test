import React from "react";
import classnames from "classnames";
import css from "./button.scss";

const cx = classnames.bind(css);

export default props => (
  <button
    className={cx(css.button, {
      [css.cta]: props.cta,
      [css.search]: props.search,
      [css.large]: props.size === "large",
      [css.fullWidth]: props.size === "full"
    })}
  >
    {props.children}
  </button>
);
