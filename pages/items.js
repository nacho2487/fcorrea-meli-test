import React from "react";

import Head from "../components/head";
import withNavigation from "../components/layout/with-navigation";
const MercadoLibreAPI = require("../lib/meli").default;

class ItemSearchResultsPage extends React.Component {
  static async getInitialProps({ query }) {
    const meli = new MercadoLibreAPI(process.env.SITE);
    const items = await meli.getSearchResults(query.q);

    return { items, query: query.q };
  }
  render() {
    console.log(this.props);
    return (
      <div>
        <Head title={`'${this.props.query}' | Mercado Libre`} />
        <pre>{JSON.stringify(this.props.items)}</pre>
      </div>
    );
  }
}

export default withNavigation(ItemSearchResultsPage);
