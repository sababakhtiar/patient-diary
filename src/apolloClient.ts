// // apolloClient.ts
// import { ApolloClient, InMemoryCache } from '@apollo/client';

// // Initialize Apollo Client
// const client = new ApolloClient({
//   uri: 'https://patient-appointment-production.up.railway.app/graphql', // Replace with your GraphQL endpoint
//   cache: new InMemoryCache(),
// });

// export default client;




// apolloClient.ts
import { ApolloClient, InMemoryCache, ApolloLink, createHttpLink } from '@apollo/client';
import { store } from './redux/store'; // Adjust the import based on your store location

// Create an http link to your GraphQL API
const httpLink = createHttpLink({
  uri: 'https://patient-appointment-production.up.railway.app/graphql', // Replace with your actual API URL
});

// Create a middleware link to attach the token to every request
const authLink = new ApolloLink((operation, forward) => {
  const state = store.getState();
  const token = state.auth.token; // Assuming you store the token in the auth slice

  // Use the token in the Authorization header if it exists
  if (token) {
    operation.setContext({
      headers: {
        Authorization: `${token}`,
      },
    });
  }

  return forward(operation);
});

// Create the Apollo Client instance
const client = new ApolloClient({
  link: authLink.concat(httpLink), // Chain the auth link and http link
  cache: new InMemoryCache(),
});

export default client;

