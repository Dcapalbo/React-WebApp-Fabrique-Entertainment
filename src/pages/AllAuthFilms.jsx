/** @format */

import FilmCardContainer from '../components/UI/card/filmCardContainer';
import { dataFilmActions } from '../store/data-film-slice';
import Footer from '../components/footer/footer';
import Header from '../components/header/header';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

const AllAuthFilms = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(dataFilmActions.resetFilmData());
	}, [dispatch]);

	return (
		<>
			<Header />
			<FilmCardContainer />
			<Footer />
		</>
	);
};

export default AllAuthFilms;
