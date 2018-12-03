import React from "react";
import withNavigation from "../components/layout/with-navigation";
import Head from "../components/head";
import { Categories, ItemDetail, ErrorState } from "../components/ui";

import MercadoLibreAPI from "../lib/meli";

class ItemDetailPage extends React.Component {
  static async getInitialProps({ query }) {
    const meli = new MercadoLibreAPI(process.env.SITE, true);
    const response = await meli.getItem(query.id);

    return { response, query: query.search };
  }

  renderErrorState(error) {
    if (error.payload.status === 404) {
      return (
        <ErrorState
          title="¡Ups! El articulo que buscás no existe."
          message="Intenta buscando tu articulo en la barra de busqueda."
        />
      );
    }

    return <ErrorState />;
  }

  render() {
    const { response } = this.props;

    if (response.error) return this.renderErrorState(response);

    const { item } = response;

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
