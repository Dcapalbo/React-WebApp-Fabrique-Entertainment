/** @format */

import { handlePressBookDownload } from '../../../utils/functions';
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
								src={film.coverImageUrl ?? ''}
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
										<div className={classes.detail__card__info__wrapper}>
											<h6>{t('director')}</h6>
											<p>{film?.director ?? ''}</p>
										</div>
									</>
								)}
								{film?.actors && (
									<>
										<h6>{t('actors')}</h6>
										{film.actors.map((actor, index) => (
											<div
												key={index}
												className={classes.detail__card__info__wrapper}>
												<p>
													{actor.actorRole ?? ''} | {actor.actorName ?? ''}
												</p>
											</div>
										))}
									</>
								)}
								{film?.synopsis && (
									<>
										<div className={classes.detail__card__info__wrapper}>
											<h6>{t('synopsis')}</h6>
											<p>{film?.synopsis ?? ''}</p>
										</div>
									</>
								)}
								{film?.directorNotes && (
									<>
										<div className={classes.detail__card__info__wrapper}>
											<h6>{t('directorNotes')}</h6>
											<p>{film?.directorNotes ?? ''}</p>
										</div>
									</>
								)}
								{film?.productionNotes && (
									<>
										<div className={classes.detail__card__info__wrapper}>
											<h6>{t('productionNotes')}</h6>
											<p>{film?.productionNotes ?? ''}</p>
										</div>
									</>
								)}
								{film?.subjects && (
									<>
										<h6>{t('subject')}</h6>
										{film.subjects.map((subject, index) => (
											<div
												key={index}
												className={classes.detail__card__info__wrapper}>
												<p>{subject.subjectName ?? ''}</p>
											</div>
										))}
									</>
								)}
								{film?.screenwriters && (
									<>
										<h6>{t('screenwriter')}</h6>
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
										<div className={classes.detail__card__info__wrapper}>
											<h6>{t('directorOfPhotography')}</h6>
											<p>{film?.directorOfPhotography ?? ''}</p>
										</div>
									</>
								)}
								{film?.editing && (
									<>
										<div className={classes.detail__card__info__wrapper}>
											<h6>{t('editing')}</h6>
											<p>{film?.editing ?? ''}</p>
										</div>
									</>
								)}
								{film?.scenography && (
									<>
										<div className={classes.detail__card__info__wrapper}>
											<h6>{t('scenography')}</h6>
											<p>{film?.scenography ?? ''}</p>
										</div>
									</>
								)}
								{film?.costumes && (
									<>
										<div className={classes.detail__card__info__wrapper}>
											<h6>{t('costumes')}</h6>
											<p>{film?.costumes ?? ''}</p>
										</div>
									</>
								)}
								{film?.music && (
									<>
										<div className={classes.detail__card__info__wrapper}>
											<h6>{t('music')}</h6>
											<p>{film?.music ?? ''}</p>
										</div>
									</>
								)}
								{film?.sound && (
									<>
										<div className={classes.detail__card__info__wrapper}>
											<h6>{t('sound')}</h6>
											<p>{film?.sound ?? ''}</p>
										</div>
									</>
								)}
								{film?.soundDesign && (
									<>
										<div className={classes.detail__card__info__wrapper}>
											<h6>{t('soundDesign')}</h6>
											<p>{film?.soundDesign ?? ''}</p>
										</div>
									</>
								)}
								{film?.casting && (
									<>
										<div className={classes.detail__card__info__wrapper}>
											<h6>{t('casting')}</h6>
											<p>{film?.casting ?? ''}</p>
										</div>
									</>
								)}
								{film?.firstAssistantDirector && (
									<>
										<div className={classes.detail__card__info__wrapper}>
											<h6>{t('firstAssistantDirector')}</h6>
											<p>{film?.firstAssistantDirector ?? ''}</p>
										</div>
									</>
								)}
								{film?.lineProducer && (
									<>
										<div className={classes.detail__card__info__wrapper}>
											<h6>{t('lineProducer')}</h6>
											<p>{film?.lineProducer ?? ''}</p>
										</div>
									</>
								)}
								{film?.executiveProducers &&
									film?.executiveProducers.length > 0 && (
										<>
											<h6>{t('executiveProducers')}</h6>
											{film.executiveProducers.map(
												(executiveProducer, index) => (
													<div
														key={index}
														className={classes.detail__card__info__wrapper}>
														<p>
															{executiveProducer.executiveProducerName ?? ''}
														</p>
													</div>
												)
											)}
										</>
									)}
								{film?.productions && (
									<>
										<h6>{t('productions')}</h6>
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
										<h6>{t('producers')}</h6>
										{film.producers.map((producer, index) => (
											<div
												key={index}
												className={classes.detail__card__info__wrapper}>
												<p>{producer.producerName ?? ''}</p>
											</div>
										))}
									</>
								)}
								{film?.coProductions && film?.coProductions.length > 0 && (
									<>
										<h6>{t('coProductions')}</h6>
										{film.coProductions.map((coProduction, index) => (
											<div
												key={index}
												className={classes.detail__card__info__wrapper}>
												<p>{coProduction.coProductionName ?? ''}</p>
											</div>
										))}
									</>
								)}
								{film?.coProducers && film?.coProducers.length > 0 && (
									<>
										<h6>{t('coProducers')}</h6>
										{film.coProducers.map((coProducer, index) => (
											<div
												key={index}
												className={classes.detail__card__info__wrapper}>
												<p>{coProducer.coProducerName ?? ''}</p>
											</div>
										))}
									</>
								)}
								{film?.collaborations && film?.collaborations.length > 0 && (
									<>
										<h6>{t('collaborations')}</h6>
										{film.collaborations.map((collaboration, index) => (
											<div
												key={index}
												className={classes.detail__card__info__wrapper}>
												<p>{collaboration.collaborationName ?? ''}</p>
											</div>
										))}
									</>
								)}
								{film?.contributes && film?.contributes.length > 0 && (
									<>
										<h6>{t('contributes')}</h6>
										{film.contributes.map((contribute, index) => (
											<div
												key={index}
												className={classes.detail__card__info__wrapper}>
												<p>{contribute.contributeName ?? ''}</p>
											</div>
										))}
									</>
								)}
								{film?.distributor && (
									<>
										<div className={classes.detail__card__info__wrapper}>
											<h6>{t('distributor')}</h6>
											<p>{film?.distributor ?? ''}</p>
										</div>
									</>
								)}
								{film?.salesAgent && (
									<>
										<div className={classes.detail__card__info__wrapper}>
											<h6>{t('salesAgent')}</h6>
											<p>{film?.salesAgent ?? ''}</p>
										</div>
									</>
								)}
							</div>
							<div className={classes.detail__card__right}>
								{film?.type && (
									<>
										<h6>{t('typology')}</h6>
										<div className={classes.detail__card__right__container}>
											<div className={classes.detail__card__right__item}>
												<small>{film?.type}</small>
											</div>
										</div>
									</>
								)}
								{film?.projectState && (
									<>
										<h6>{t('projectState')}</h6>
										<div className={classes.detail__card__right__container}>
											<div className={classes.detail__card__right__item}>
												<small>{film?.projectState}</small>
											</div>
										</div>
									</>
								)}
								{film?.projectState && (
									<>
										<h6>{t('genres')}</h6>
										<div className={classes.detail__card__right__container}>
											<div className={classes.detail__card__right__item}>
												<small>{film?.genre}</small>
											</div>
										</div>
									</>
								)}
								{film?.festivals && (
									<>
										<h6>{t('festivals')}</h6>
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
										<h6>{t('links')}</h6>
										<div className={classes.detail__card__right__links}>
											<a
												href={film.imdb ?? ''}
												target='_blank'
												rel='noreferrer'>
												<SiImdb size={30} />
											</a>
											<a
												href={film.instagram ?? ''}
												target='_blank'
												rel='noreferrer'>
												<BsInstagram size={30} />
											</a>
											<a
												href={film.facebook ?? ''}
												target='_blank'
												rel='noreferrer'>
												<BiLogoFacebookCircle size={30} />
											</a>
										</div>
									</>
								)}
								{film?.pressBookPdfUrl && (
									<>
										<div className={classes.detail__card__right__container}>
											<button
												className={classes.third__button}
												type='button'
												onClick={() =>
													handlePressBookDownload(film.pressBookPdfUrl)
												}>
												{t('pressBook')}
											</button>
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
