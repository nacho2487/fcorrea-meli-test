import React from "react";

import css from "./navigation.scss";

import { Container, Logo, SearchBar } from "../";

export default props => (
  <div className={css.navigationWrapper}>
    <Container>
      <nav className={css.navigation}>
        <Logo />
        <SearchBar />
      </nav>
    </Container>
  </div>
);
