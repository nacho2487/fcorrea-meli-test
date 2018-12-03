import React from "react";
import withNavigation from "../components/layout/with-navigation";
import Head from "../components/head";
import { Categories, ItemDetail, ErrorState } from "../components/ui";

import MercadoLibreAPI from "../lib/meli";

class ItemDetailPage extends React.Component {
  static async getInitialProps({ query }) {
    const meli = new MercadoLibreAPI(process.env.SITE, true);
    const response = await meli.getItem(query.id);

    return { item: response.item, query: query.search };
  }

  renderErrorState() {
    return <ErrorState />;
  }

  render() {
    const { item } = this.props;

    return (
      <div>
        <Head
          title={item.title}
          ogImage={item.picture}
          description={`${item.title} en MercadoLibre`}
        />
        <Categories categories={item.categories} />
        <ItemDetail item={item} />
      </div>
    );
  }
}

export default withNavigation(ItemDetailPage);
