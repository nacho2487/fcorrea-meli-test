import React from "react";
import { withRouter } from "next/router";
import NProgress from "next-nprogress/component";

import { Navigation, Container } from "../ui";

const withNavigation = Page => {
  const PageWithNavigation = withRouter(props => (
    <div>
      <NProgress color="#333" />
      <Navigation searchTerm={props.router.query.search} />
      <Container>
        <Page {...props} />
      </Container>
    </div>
  ));

  PageWithNavigation.getInitialProps = Page.getInitialProps;

  return PageWithNavigation;
};

export default withNavigation;
