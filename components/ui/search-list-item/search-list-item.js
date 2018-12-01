import React from "react";
import Link from "next/link";
import css from "./search-list-item.scss";

const currencify = currency => (currency === "USD" ? "U$S" : "$");
const formatDecimal = number => {
  const formatted = (number < 10 ? "0" : "") + number;
  const irrelevant = "00";

  return formatted === irrelevant ? null : formatted;
};

const FreeShippingIndicator = () => (
  <img
    className={css.fclass}
    width="18px"
    src="/static/assets/img/ic_shipping@2x.png"
  />
);

export default ({ item }) => (
  <div className={css.searchListItem}>
    <img className={css.thumbnail} src={item.picture} />
    <div className={css.productDetails}>
      <p className={css.price}>
        {currencify(item.price.currency)} {item.price.amount}
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
