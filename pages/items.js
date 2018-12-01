import React from "react";

import Head from "../components/head";
import withNavigation from "../components/layout/with-navigation";
import { SearchList, Categories } from "../components/ui";

import MercadoLibreAPI from "../lib/meli";

class ItemSearchResultsPage extends React.Component {
  static async getInitialProps({ query }) {
    const meli = new MercadoLibreAPI(process.env.SITE);
    const items = await meli.getSearchResults(query.search);

    return { items, query: query.search };
  }
  render() {
    return (
      <div>
        <Head title={`'${this.props.query}' | Mercado Libre`} />
        <Categories categories={this.props.items.categories} />
        <SearchList items={this.props.items.items} />
      </div>
    );
  }
}

export default withNavigation(ItemSearchResultsPage);
