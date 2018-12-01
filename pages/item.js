import React from "react";
import withNavigation from "../components/layout/with-navigation";
import Head from "../components/head";

class ItemDetailPage extends React.Component {
  render() {
    return (
      <div>
        <Head />
      </div>
    );
  }
}

export default withNavigation(ItemDetailPage);
