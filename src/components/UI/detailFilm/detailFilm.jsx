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
				{t("errors.filmError")}
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
										<p>{t("production")}</p>
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
										<p>{t("director")}</p>
										<div className={classes.detail__card__info__wrapper}>
											<p>{film?.director ?? ''}</p>
										</div>
									</>
								)}
								{film?.screenwriters && (
									<>
										<p>{t("screenwriter")}</p>
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
										<p>{t("synopsis")}</p>
										<div className={classes.detail__card__info__wrapper}>
											<p>{film?.synopsis ?? ''}</p>
										</div>
									</>
								)}
								{film?.directorOfPhotography && (
									<>
										<p>{t("directorOfPhotography")}</p>
										<div className={classes.detail__card__info__wrapper}>
											<p>{film?.directorOfPhotography ?? ''}</p>
										</div>
									</>
								)}
								{film?.duration && (
									<>
										<p>{t("duration")}</p>
										<div className={classes.detail__card__info__wrapper}>
											<p>{film?.duration ?? ''}</p>
										</div>
									</>
								)}
								{film?.year && (
									<>
										<p>{t("year")}</p>
										<div className={classes.detail__card__info__wrapper}>
											<p>{film?.year ?? ''}</p>
										</div>
									</>
								)}
							</div>
							<div className={classes.detail__card__right}>
								{film?.type && (
									<>
										<p>{t("typology")}</p>
										<div className={classes.detail__card__right__container}>
											<div className={classes.detail__card__right__item}>
												<small>{film?.type}</small>
											</div>
										</div>
									</>
								)}
								{film?.festivals && (
									<>
										<p>{t("festivals")}</p>
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
										<p>{t("genres")}</p>
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
