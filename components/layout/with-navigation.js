import React from "react";
import { Navigation, Container } from "../ui";

const withNavigation = Page => {
  const PageWithNavigation = props => (
    <React.Fragment>
      <Navigation />
      <Container>
        <Page {...props} />
      </Container>
    </React.Fragment>
  );

  PageWithNavigation.getInitialProps = Page.getInitialProps;

  return PageWithNavigation;
};

export default withNavigation;
