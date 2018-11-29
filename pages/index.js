import React from "react";
import Link from "next/link";
import Head from "../components/head";
import withNavigation from "../components/layout/with-navigation";

const Home = () => (
  <div>
    <Head title="Home" />
  </div>
);

export default withNavigation(Home);
