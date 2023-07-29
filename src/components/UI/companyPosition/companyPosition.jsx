/** @format */

import ReactMapGl, { Marker } from 'react-map-gl';
import React from 'react';

const CompanyPosition = () => {
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
			mapboxAccessToken={process.env.REACT_APP_TOKEN}>
			<Marker
				longitude={12.50512}
				latitude={41.89211}
			/>
		</ReactMapGl>
	);
};

export default CompanyPosition;
