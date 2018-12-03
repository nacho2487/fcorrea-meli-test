import React from "react";
import NextHead from "next/head";
import { string } from "prop-types";
import "./global.scss";

const defaultDescription = "";

const Head = props => (
  <NextHead>
    <meta charSet="UTF-8" />
    <title>{props.title || ""}</title>
    <meta
      name="description"
      content={props.description || defaultDescription}
    />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" sizes="192x192" href="/static/touch-icon.png" />
    <link rel="icon" href="/static/favicon.ico" />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
    />
    {props.url && <meta property="og:url" content={props.url} />}
    <meta property="og:title" content={props.title || ""} />
    <meta
      property="og:description"
      content={props.description || defaultDescription}
    />
    {props.url && <meta name="twitter:site" content={props.url} />}
    <meta name="twitter:card" content="summary_large_image" />
    {props.ogImage && <meta name="twitter:image" content={props.ogImage} />}
    {props.ogImage && <meta property="og:image" content={props.ogImage} />}
    <meta property="og:image:width" content="180" />
    <meta property="og:image:height" content="180" />
  </NextHead>
);

Head.propTypes = {
  title: string,
  description: string,
  url: string,
  ogImage: string
};

export default Head;
