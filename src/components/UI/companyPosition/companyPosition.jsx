/** @format */

import ReactMapGl, { Marker, NavigationControl } from 'react-map-gl'; // Importa NavigationControl
import React from 'react';

const CompanyPosition = () => {
	const handleMarkerClick = () => {
		const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=41.89211,12.50512`;
		window.open(googleMapsUrl, '_blank');
	};

	// Stile per posizionare i controlli di navigazione
	const navControlStyle = {
		right: 10,
		top: 10,
	};

	return (
		<ReactMapGl
			initialViewState={{
				longitude: 12.50512,
				latitude: 41.89211,
				zoom: 16,
			}}
			style={{ width: '100%', height: '400px' }}
			mapStyle='mapbox://styles/mapbox/streets-v9'
			transitionDuration='200'
			mapboxAccessToken={import.meta.env.VITE_TOKEN}>
			<Marker
				onClick={handleMarkerClick}
				longitude={12.50512}
				latitude={41.89211}
			/>
			<NavigationControl style={navControlStyle} />{' '}
		</ReactMapGl>
	);
};

export default CompanyPosition;
