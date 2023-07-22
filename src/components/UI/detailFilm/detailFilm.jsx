/** @format */

import LoadingSpinner from '../loadingSpinner/loadingSpinner';
import classes from '../../../assets/detailCard.module.scss';
import { BiLogoFacebookCircle } from 'react-icons/bi';
import { useTranslation } from 'react-i18next';
import { BsInstagram } from 'react-icons/bs';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FaMedal } from 'react-icons/fa';
import { SiImdb } from 'react-icons/si';
import React from 'react';

const DetailFilm = () => {
	const film = useSelector((state) => state.dataFilm.filmData);
	console.log(film);
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
			<h1 className={classes.text__align__center}>{t('errors.filmError')}</h1>
		);
	} else {
		return (
			film && (
				<section className={classes.detail__container}>
					<div className={classes.detail__card__container}>
						{film?.trailer ? (
							<iframe
								className={classes.detail__card__video}
								title={film.title + 'trailer'}
								src={film.trailer ?? ''}
								allowFullScreen
							/>
						) : (
							<img
								className={classes.detail__card__image}
								src={film.imageUrl ?? ''}
								alt={film.title ?? ''}
								title={film.title ?? ''}
								loading='lazy'
							/>
						)}
						<div className={classes.detail__card__info__flex}>
							<div className={classes.detail__card__left}>
								{film?.title && (
									<div className={classes.detail__card__info__wrapper}>
										<h3>{film.title ?? ''}</h3>
									</div>
								)}
								{film?.year && film?.duration && (
									<>
										<div className={classes.detail__card__info__wrapper}>
											<small>
												{t('year')} | {film?.year ?? ''} -{' '}
												{film?.duration ?? ''} {t('minutes')}
											</small>
										</div>
									</>
								)}
								{film?.director && (
									<>
										<p>{t('director')}</p>
										<div className={classes.detail__card__info__wrapper}>
											<p>{film?.director ?? ''}</p>
										</div>
									</>
								)}
								{film?.synopsis && (
									<>
										<p>{t('synopsis')}</p>
										<div className={classes.detail__card__info__wrapper}>
											<p>{film?.synopsis ?? ''}</p>
										</div>
									</>
								)}
								{film?.productionNotes && (
									<>
										<p>{t('productionNotes')}</p>
										<div className={classes.detail__card__info__wrapper}>
											<p>{film?.productionNotes ?? ''}</p>
										</div>
									</>
								)}
								{film?.screenwriters && (
									<>
										<p>{t('screenwriter')}</p>
										{film.screenwriters.map((screenwriter, index) => (
											<div
												key={index}
												className={classes.detail__card__info__wrapper}>
												<p>{screenwriter.screenwriterName ?? ''}</p>
											</div>
										))}
									</>
								)}
								{film?.directorOfPhotography && (
									<>
										<p>{t('directorOfPhotography')}</p>
										<div className={classes.detail__card__info__wrapper}>
											<p>{film?.directorOfPhotography ?? ''}</p>
										</div>
									</>
								)}
								{film?.editing && (
									<>
										<p>{t('editing')}</p>
										<div className={classes.detail__card__info__wrapper}>
											<p>{film?.editing ?? ''}</p>
										</div>
									</>
								)}
								{film?.scenography && (
									<>
										<p>{t('scenography')}</p>
										<div className={classes.detail__card__info__wrapper}>
											<p>{film?.scenography ?? ''}</p>
										</div>
									</>
								)}
								{film?.costumes && (
									<>
										<p>{t('costumes')}</p>
										<div className={classes.detail__card__info__wrapper}>
											<p>{film?.costumes ?? ''}</p>
										</div>
									</>
								)}
								{film?.music && (
									<>
										<p>{t('music')}</p>
										<div className={classes.detail__card__info__wrapper}>
											<p>{film?.music ?? ''}</p>
										</div>
									</>
								)}
								{film?.sound && (
									<>
										<p>{t('sound')}</p>
										<div className={classes.detail__card__info__wrapper}>
											<p>{film?.sound ?? ''}</p>
										</div>
									</>
								)}
								{film?.soundDesign && (
									<>
										<p>{t('soundDesign')}</p>
										<div className={classes.detail__card__info__wrapper}>
											<p>{film?.soundDesign ?? ''}</p>
										</div>
									</>
								)}
								{film?.casting && (
									<>
										<p>{t('casting')}</p>
										<div className={classes.detail__card__info__wrapper}>
											<p>{film?.casting ?? ''}</p>
										</div>
									</>
								)}
								{film?.firstAssistantDirector && (
									<>
										<p>{t('firstAssistantDirector')}</p>
										<div className={classes.detail__card__info__wrapper}>
											<p>{film?.firstAssistantDirector ?? ''}</p>
										</div>
									</>
								)}
								{film?.lineProducer && (
									<>
										<p>{t('lineProducer')}</p>
										<div className={classes.detail__card__info__wrapper}>
											<p>{film?.lineProducer ?? ''}</p>
										</div>
									</>
								)}
								{film?.executiveProducers && (
									<>
										<p>{t('executiveProducers')}</p>
										<div className={classes.detail__card__info__wrapper}>
											<p>{film?.executiveProducers ?? ''}</p>
										</div>
									</>
								)}
								{film?.productions && (
									<>
										<p>{t('production')}</p>
										{film.productions.map((production, index) => (
											<div
												key={index}
												className={classes.detail__card__info__wrapper}>
												<p>{production.productionName ?? ''}</p>
											</div>
										))}
									</>
								)}
								{film?.producers && (
									<>
										<p>{t('producers')}</p>
										{film.producers.map((producer, index) => (
											<div
												key={index}
												className={classes.detail__card__info__wrapper}>
												<p>{producer.producerName ?? ''}</p>
											</div>
										))}
									</>
								)}
								{film?.coProductions && (
									<>
										<p>{t('coProductions')}</p>
										{film.coProductions.map((coProduction, index) => (
											<div
												key={index}
												className={classes.detail__card__info__wrapper}>
												<p>{coProduction.coProductionName ?? ''}</p>
											</div>
										))}
									</>
								)}
								{film?.coProducers && (
									<>
										<p>{t('coProducers')}</p>
										{film.coProducers.map((coProducer, index) => (
											<div
												key={index}
												className={classes.detail__card__info__wrapper}>
												<p>{coProducer.coProducerName ?? ''}</p>
											</div>
										))}
									</>
								)}
								{film?.distributor && (
									<>
										<p>{t('distributor')}</p>
										<div className={classes.detail__card__info__wrapper}>
											<p>{film?.distributor ?? ''}</p>
										</div>
									</>
								)}
								{film?.salesAgent && (
									<>
										<p>{t('salesAgent')}</p>
										<div className={classes.detail__card__info__wrapper}>
											<p>{film?.salesAgent ?? ''}</p>
										</div>
									</>
								)}
							</div>
							<div className={classes.detail__card__right}>
								{film?.type && (
									<>
										<p>{t('typology')}</p>
										<div className={classes.detail__card__right__container}>
											<div className={classes.detail__card__right__item}>
												<small>{film?.type}</small>
											</div>
										</div>
									</>
								)}
								{film?.genre && (
									<>
										<p>{t('genres')}</p>
										<div className={classes.detail__card__right__container}>
											<div className={classes.detail__card__right__item}>
												<small>{film?.genre}</small>
											</div>
										</div>
									</>
								)}
								{film?.festivals && (
									<>
										<p>{t('festivals')}</p>
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
								{film?.imdb && film?.instagram && film?.facebook && (
									<>
										<p>{t('Links')}</p>
										<div className={classes.detail__card__right__links}>
											<a
												href={film.imdb ?? ''}
												target='_blank'>
												<SiImdb size={30} />
											</a>
											<a
												href={film.instagram ?? ''}
												target='_blank'>
												<BsInstagram size={30} />
											</a>
											<a
												href={film.facebook ?? ''}
												target='_blank'>
												<BiLogoFacebookCircle size={30} />
											</a>
										</div>
									</>
								)}
								{film?.festivals && (
									<>
										<div className={classes.detail__card__right__legends}>
											<p>
												<FaMedal className={classes.selection} />{' '}
												{t('competition')}
											</p>
											<p>
												<FaMedal className={classes.victory} /> {t('award')}
											</p>
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
