import React from "react";
import MercadoLibreAPI from "../lib/meli";

export default class ItemSearchResultsPage extends React.Component {
  static async getInitialProps({ query }) {
    const meli = new MercadoLibreAPI("MLU");
    const items = await meli.getSearchResults(query.q);

    return { items };
  }
  render() {
    console.log(this.props);
    return (
      <div>
        <pre>{JSON.stringify(this.props.items)}</pre>
      </div>
    );
  }
}
