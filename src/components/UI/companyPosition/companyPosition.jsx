/** @format */
import ReactMapboxGl from 'react-mapbox-gl';
import React from 'react';

const Map = ReactMapboxGl({
	accessToken: 'IL_TUO_TOKEN_DI_ACCESSO_A_MAPBOX',
});

const CompanyPosition = () => {
	const mapStyle = 'mapbox://styles/mapbox/streets-v11';
	const positions = {
		longitude: 44,
		latitude: -80,
		zoomLevel: 10,
	};
	const center = [positions.longitude, positions.latitude];

	return (
		<Map
			style={mapStyle}
			containerStyle={{ height: '400px', width: '100%' }}
			center={center}
			zoom={[positions.zoomLevel]}></Map>
	);
};

export default CompanyPosition;
