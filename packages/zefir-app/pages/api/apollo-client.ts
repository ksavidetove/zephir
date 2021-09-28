import {ApolloClient, HttpLink, InMemoryCache, split} from "@apollo/client";
import {WebSocketLink} from "@apollo/client/link/ws";
import {getMainDefinition} from "@apollo/client/utilities";
const WebSocketClient = require('websocket').client;

const httpLink = new HttpLink({
  uri: `http://${process.env.apiUrl || process.env.NEXT_PUBLIC_apiUrl}/graphql`
});

const wsLink = process.browser ? new WebSocketLink({
  uri: `ws://${process.env.subscriptionsApiUrl || process.env.NEXT_PUBLIC_subscriptionsApiUrl}/graphql`,
  options: {
    reconnect: true
  },
  webSocketImpl: WebSocketClient
}) : null;

const splitLink = process.browser ? split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink as WebSocketLink,
  httpLink,
) : httpLink;

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache({
    typePolicies: {
      User: {
        merge: false
      }
    }
  }),
});

export default client;