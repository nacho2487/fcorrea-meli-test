import React from "react";

import Head from "../components/head";
import withNavigation from "../components/layout/with-navigation";
import { SearchList, Categories } from "../components/ui";

import MercadoLibreAPI from "../lib/meli";

class ItemSearchResultsPage extends React.Component {
  static async getInitialProps({ query }) {
    const meli = new MercadoLibreAPI(process.env.SITE, true);
    const items = await meli.getSearchResults(query.search);

    return { items, query: query.search };
  }
  render() {
    const { items, query } = this.props;
    return (
      <div>
        <Head
          title={`Encontrá "${query}" en Mercado Libre`}
          description={`Buscá y encontrá "${query}" y miles de articulos mas en MercadoLibre.com`}
        />
        <Categories categories={items.categories} />
        <SearchList items={items.items} />
      </div>
    );
  }
}

export default withNavigation(ItemSearchResultsPage);
