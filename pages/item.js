import React from "react";
import withNavigation from "../components/layout/with-navigation";
import Head from "../components/head";
import { Categories, ItemDetail } from "../components/ui";

import MercadoLibreAPI from "../lib/meli";

class ItemDetailPage extends React.Component {
  static async getInitialProps({ query }) {
    const isServer = !process.browser;
    const meli = new MercadoLibreAPI(process.env.SITE, isServer);
    const response = await meli.getItem(query.id);

    return { item: response.item, query: query.search };
  }

  render() {
    const { item } = this.props;
    return (
      <div>
        <Head />
        <Categories categories={item.categories} />
        <ItemDetail item={item} />
      </div>
    );
  }
}

export default withNavigation(ItemDetailPage);
