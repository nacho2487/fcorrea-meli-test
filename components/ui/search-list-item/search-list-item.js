import React from "react";
import Link from "next/link";
import css from "./search-list-item.scss";
import { currencify, formatDecimal, formatAmount } from "../../../lib/pricing";

const FreeShippingIndicator = () => (
  <img
    className={css.freeShippingIndicator}
    width="18px"
    src="/static/assets/img/ic_shipping@2x.png"
  />
);

export default ({ item }) => (
  <div className={css.searchListItem}>
    <img className={css.thumbnail} src={item.picture} />
    <div className={css.productDetails}>
      <p className={css.price}>
        {currencify(item.price.currency)} {formatAmount(item.price.amount)}
        <sup>{formatDecimal(item.price.decimals)}</sup>
        {item.free_shipping && <FreeShippingIndicator />}
      </p>
      <Link prefetch href={`/items/${item.id}`}>
        <a>
          <h3 className={css.title}>{item.title}</h3>
        </a>
      </Link>
    </div>
    <div>
      <p className={css.cityName}>{item.city_name}</p>
    </div>
  </div>
);
