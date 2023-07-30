/** @format */

import LoadingSpinner from '../loadingSpinner/loadingSpinner';
import { serverUrl } from '../../../utils/constants';
import ApiGetHook from '../../../hooks/apiGetHook';
import classes from './cardContainer.module.scss';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import FilmCard from './filmCard';
import React from 'react';

const FilmCardContainer = () => {
	const { t } = useTranslation();
	const { films, error, loading } = ApiGetHook(`${serverUrl}/get-films`);

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
								coProductions={film?.coProductions ?? ''}
								coProducers={film?.coProducers ?? ''}
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
								distributor={film?.distributor ?? ''}
								salesAgent={film?.salesAgent ?? ''}
								firstAssistantDirector={film.firstAssistantDirector}
								synopsis={film.synopsis}
								productionNotes={film?.productionNotes ?? ''}
								duration={film.duration}
								year={film.year}
								festivals={film?.festivals ?? ''}
								slug={film.slug}
								type={film.type}
								trailer={film?.trailer ?? ''}
								imdb={film?.imdb ?? ''}
								instagram={film?.instagram ?? ''}
								facebook={film?.facebook ?? ''}
								coverImageUrl={film?.cover?.coverImageUrl}
								coverImageKey={film?.cover?.coverImageKey}
								pressBookPdfUrl={film?.pressBook?.pressBookPdfUrl}
								pressBookPdfKey={film?.pressBook?.pressBookPdfKey}
								key={film._id}
								_id={film._id}
							/>
						))
					) : (
						<h1>{t('errors.filmExistenceError')}</h1>
					)}
				</div>
			</section>
		);
	}
};

export default FilmCardContainer;
