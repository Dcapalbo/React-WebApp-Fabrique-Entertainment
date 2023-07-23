/** @format */

import LoadingSpinner from '../loadingSpinner/loadingSpinner';
import base64ArrayBuffer from '../../../utils/base64';
import ApiGetHook from '../../../hooks/apiGetHook';
import classes from './cardContainer.module.scss';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import FilmCard from './filmCard';

const FilmCardContainer = () => {
	const { films, error, loading } = ApiGetHook(
		`${process.env.REACT_APP_API_LOCAL_PORT}/get-films`
	);

	const typeData = useSelector((state) => state.dataType.dataType) || '';
	const [filteredData, setFilteredData] = useState([]);

	useEffect(() => {
		if (films) {
			setFilteredData(films);
			if (typeData) {
				const filteredFilms = films.filter((film) => film.type === typeData);
				setFilteredData(filteredFilms);
			}
		}
	}, [typeData, films]);

	if (loading) {
		return <LoadingSpinner />;
	} else if (error) {
		return (
			<h1 className={classes.text__align__center}>
				There are some problems, please try to refresh
			</h1>
		);
	} else {
		return (
			<section className={classes.wrapper__card__container}>
				<div
					className={
						(filteredData.length > 2
							? classes.card__container
							: classes.card__container,
						classes.justify__content__center)
					}>
					{filteredData.length > 0 ? (
						filteredData.map((film) => (
							<FilmCard
								title={film.title}
								director={film.director}
								productions={film.productions}
								producers={film.producers}
								coProductions={film.coProductions}
								coProducers={film.coProducers}
								actors={film.actors}
								subjects={film.subjects}
								screenwriters={film.screenwriters}
								genre={film.genre}
								directorOfPhotography={film.directorOfPhotography}
								editing={film.editing}
								scenography={film.scenography}
								costumes={film.costumes}
								music={film.music}
								sound={film.sound}
								soundDesign={film.soundDesign}
								casting={film.casting}
								lineProducer={film.lineProducer}
								executiveProducers={film.executiveProducers}
								distributor={film.distributor}
								salesAgent={film.salesAgent}
								firstAssistantDirector={film.firstAssistantDirector}
								synopsis={film.synopsis}
								productionNotes={film.productionNotes}
								duration={film.duration}
								year={film.year}
								festivals={film.festivals}
								slug={film.slug}
								type={film.type}
								trailer={film.trailer}
								imdb={film.imdb}
								instagram={film.instagram}
								facebook={film.facebook}
								coverImage={`data:image/;base64,${base64ArrayBuffer(
									film.coverImage
								)}`}
								pressBookPdf={film.pressBookPdf}
								key={film._id}
								_id={film._id}
							/>
						))
					) : (
						<h1>
							Non ci sono elementi per questa ricerca, inserirli manualmente
							presso la sezione del Database dedicata ai film
						</h1>
					)}
				</div>
			</section>
		);
	}
};

export default FilmCardContainer;
