import React from "react";
import css from "./item-detail.scss";
import { currencify, formatDecimal, formatAmount } from "../../../lib/pricing";
import { Button } from "../";

const renderItemCondition = item =>
  item.condition === "new" ? "Nuevo" : "Usado";
const renderSoldQuantity = item =>
  `${item.sold_quantity} vendido${item.sold_quantity === 1 ? "" : "s"}`;

export default ({ item }) => (
  <div className={css.itemDetail}>
    <div className={css.productInfo}>
      <div className={css.picture}>
        <img src={item.picture} />
      </div>
      <div className={css.metadata}>
        <p className={css.preTitle}>
          {renderItemCondition(item)} • {renderSoldQuantity(item)}
        </p>
        <h1 className={css.title}>{item.title}</h1>
        <p className={css.price}>
          {currencify(item.price.currency)} {formatAmount(item.price.amount)}
          <sup>{formatDecimal(item.price.decimals)}</sup>
        </p>
        <Button cta size="full">
          Comprar
        </Button>
      </div>
    </div>
    <div className={css.descriptionContainer}>
      <h2>Descripción del producto</h2>
      <div className={css.description}>{item.description}</div>
    </div>
  </div>
);
