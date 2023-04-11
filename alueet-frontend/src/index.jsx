import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
// Remember to include these two stylesheets for leaflet and leaflet-draw
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';

const client = new ApolloClient({
	uri: 'http://localhost:3001',
	cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root')).render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>
);
