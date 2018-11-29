import React from "react";
import Head from "../components/head";

import MercadoLibreAPI from "../lib/meli/api";
import withNavigation from "../components/layout/with-navigation";

class ItemSearchResultsPage extends React.Component {
  static async getInitialProps({ query }) {
    const meli = new MercadoLibreAPI("MLU");
    const items = await meli.getSearchResults(query.q);

    return { items };
  }
  render() {
    console.log(this.props);
    return (
      <div>
        <Head title="Resultados de busqueda" />
        <pre>{JSON.stringify(this.props.items)}</pre>
      </div>
    );
  }
}

export default withNavigation(ItemSearchResultsPage);
