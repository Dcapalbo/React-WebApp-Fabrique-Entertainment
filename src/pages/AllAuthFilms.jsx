/** @format */

import CardContainer from '../components/UI/cardContainer/cardContainer';
import { dataFilmActions } from '../store/data-film-slice';
import FilmCard from "../components/UI/filmCard/filmCard";
import Footer from '../components/footer/footer';
import Header from '../components/header/header';
import { serverUrl } from '../utils/constants';
import { useDispatch } from 'react-redux';
import React, { useEffect } from 'react';

const AllAuthFilms = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(dataFilmActions.resetFilmData());
	}, [dispatch]);

	return (
		<>
			<Header />
			<CardContainer
				component={FilmCard}
				fetchDataUrl={`${serverUrl}/get-films`}
			/>
			<Footer />
		</>
	);
};

export default AllAuthFilms;
