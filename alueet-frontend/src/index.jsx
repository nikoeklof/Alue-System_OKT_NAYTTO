import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  concat,
  ApolloLink,
} from "@apollo/client";

// Remember to include these two stylesheets for leaflet and leaflet-draw
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";

const httpLink = new HttpLink({
  uri: "http://localhost:3001",
});

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,

      authorization: localStorage.getItem("token") || null,
    },
  }));

  return forward(operation);
});

const client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "network-only",
      initialFetchPolicy: "cache-and-network",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
