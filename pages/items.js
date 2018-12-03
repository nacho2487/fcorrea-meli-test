import React from "react";

import Head from "../components/head";
import withNavigation from "../components/layout/with-navigation";
import { SearchList, Categories, ErrorState } from "../components/ui";

import MercadoLibreAPI from "../lib/meli";

class ItemSearchResultsPage extends React.Component {
  static async getInitialProps({ query }) {
    const meli = new MercadoLibreAPI(process.env.SITE, true);
    const items = await meli.getSearchResults(query.search);

    return { items, query: query.search };
  }

  renderErrorState() {
    return <ErrorState />;
  }

  renderEmptyState() {
    return (
      <ErrorState
        title="No hay concidencias para tu busqueda"
        message="Intenta revisar la ortografía o buscar tu articulo con otras palabras."
      />
    );
  }

  render() {
    const { items, query } = this.props;

    if (items.items.length === 0) {
      return this.renderEmptyState();
    }

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
