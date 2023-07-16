/** @format */

import LoadingSpinner from '../loadingSpinner/loadingSpinner';
import classes from '../../../assets/detailCard.module.scss';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import React from 'react';

const DetailFilm = () => {
	const film = useSelector((state) => state.dataFilm.filmData);
	const [loading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const { t } = useTranslation();

	useEffect(() => {
		setIsLoading(true);
		if (film) {
			setIsLoading(false);
		} else {
			setError(true);
		}
	}, [film]);

	if (loading) {
		return <LoadingSpinner />;
	} else if (error) {
		return (
			<h1 className={classes.text__align__center}>
				Il film selezionato non è stato trovato, tornare alla pagina precedente
			</h1>
		);
	} else {
		return (
			film && (
				<section className={classes.detail__container}>
					<div className={classes.detail__card__container}>
						<img
							className={classes.detail__card__image}
							src={film.imageUrl ?? ''}
							alt={film.title ?? ''}
							title={film.title ?? ''}
							loading='lazy'
						/>
						<div className={classes.detail__card__info__flex}>
							<div className={classes.detail__card}>
								{film?.title && (
									<div className={classes.detail__card__info__wrapper}>
										<p>{film.title ?? ''}</p>
									</div>
								)}
								{film?.productions && (
									<>
										<p>Produzione</p>
										{film.productions.map((production, index) => (
											<div
												key={index}
												className={classes.detail__card__info__wrapper}>
												<p>{production.productionName ?? ''}</p>
											</div>
										))}
									</>
								)}
								{film?.director && (
									<>
										<p>Regia</p>
										<div className={classes.detail__card__info__wrapper}>
											<p>{film?.director ?? ''}</p>
										</div>
									</>
								)}
								{film?.screenwriters && (
									<>
										<p>Sceneggiatura</p>
										{film.screenwriters.map((screenwriter, index) => (
											<div
												key={index}
												className={classes.detail__card__info__wrapper}>
												<p>{screenwriter.screenwriterName ?? ''}</p>
											</div>
										))}
									</>
								)}
								{film?.synopsis && (
									<>
										<p>Sinossi</p>
										<div className={classes.detail__card__info__wrapper}>
											<p>{film?.synopsis ?? ''}</p>
										</div>
									</>
								)}
								{film?.directorOfPhotography && (
									<>
										<p>Direttore della fotografia</p>
										<div className={classes.detail__card__info__wrapper}>
											<p>{film?.directorOfPhotography ?? ''}</p>
										</div>
									</>
								)}
								{film?.duration && (
									<>
										<p>Durata</p>
										<div className={classes.detail__card__info__wrapper}>
											<p>{film?.duration ?? ''}</p>
										</div>
									</>
								)}
								{film?.year && (
									<>
										<p>Anno</p>
										<div className={classes.detail__card__info__wrapper}>
											<p>{film?.year ?? ''}</p>
										</div>
									</>
								)}
							</div>
							<div className={classes.detail__card__right}>
								{film?.type && (
									<>
										<p>Tipo</p>
										<div className={classes.detail__card__right__container}>
											<div className={classes.detail__card__right__item}>
												<small>{film?.type}</small>
											</div>
										</div>
									</>
								)}
								{film?.festivals && (
									<>
										<p>Festivals</p>
										<div className={classes.detail__card__right__container}>
											{film?.festivals.map((festival, index) => (
												<div
													key={index}
													className={classes.detail__card__right__item}>
													<small>{festival.festivalName ?? ''}</small>
												</div>
											))}
										</div>
									</>
								)}
								{film?.genres && (
									<>
										<p>Genere</p>
										<div className={classes.detail__card__right__container}>
											{film?.genres.map((genre, index) => (
												<div
													key={index}
													className={classes.detail__card__right__item}>
													<small>{genre.genreName ?? ''}</small>
												</div>
											))}
										</div>
									</>
								)}
							</div>
						</div>
					</div>
				</section>
			)
		);
	}
};

export default DetailFilm;
