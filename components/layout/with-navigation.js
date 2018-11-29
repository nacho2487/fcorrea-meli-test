import React from "react";
import { withRouter } from "next/router";

import { Navigation, Container } from "../ui";

const withNavigation = Page => {
  const PageWithNavigation = withRouter(props => (
    <React.Fragment>
      <Navigation searchTerm={props.router.query.q} />
      <Container>
        <Page {...props} />
      </Container>
    </React.Fragment>
  ));

  PageWithNavigation.getInitialProps = Page.getInitialProps;

  return PageWithNavigation;
};

export default withNavigation;
