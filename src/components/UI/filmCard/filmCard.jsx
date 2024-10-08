/** @format */

import { dataFilmActions } from '../../../store/data-film-slice';
import LoadingSpinner from '../loadingSpinner/loadingSpinner';
import { settingAuthData } from '../../../utils/functions';
import TruncatedText from '../truncatedText/truncatedText';
import classes from '../../../assets/card.module.scss';
import { serverUrl } from '../../../utils/constants';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const FilmCard = (props) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { t } = useTranslation();

	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		setIsAuthenticated(settingAuthData().isLoggedIn ?? false);
	}, [dispatch]);

	const sendFilmFormHandler = () => {
		dispatch(
			dataFilmActions.setFilmData({
				...props,
				_id: props._id,
			})
		);
		navigate('/admin/update-film');
	};

	const sendFilmDetails = () => {
		dispatch(dataFilmActions.setFilmData(props));
		navigate(`/film/${props.slug}`);
	};

	const deleteFilmHandler = () => {
		setIsLoading(true);

		const filmId = {
			_id: props._id,
		};

		axios
			.delete(`${serverUrl}/delete-film`, {
				data: filmId,
			})
			.then((res) => {
				dispatch(dataFilmActions.removeFilmData({ _id: props._id }));
				window.location.replace('/admin/films');
				setIsLoading(false);
			})
			.catch((err) => {
				console.error('there is an error for deleting the specific film: ', err.name);
				setIsLoading(false);
				setError(err);
			});
	};

	return (
		<div className={classes.card}>
			{props.cover && props.cover.coverImageUrl && (
				<img
					onClick={sendFilmDetails}
					className={classes.card__image}
					src={props.cover.coverImageUrl ?? ''}
					alt={props.title ?? ''}
					title={props.title ?? ''}
					loading='lazy'
				/>
			)}
			<div className={classes.card__internal__description}>
				{props.title && <h2>{props.title ?? ''}</h2>}
				{props.synopsis && (
					<TruncatedText
						text={props.synopsis}
						maxLength={700}
					/>
				)}{' '}
			</div>
			<div className={classes.card__external__informations}>
				{props.director && <h2>{props.director ?? ''}</h2>}
				{props.productions && <p>{props.productions[0].productionName ?? ''}</p>}
				<div className={classes.card__external__informations__item}>
					{props.type && (
						<>
							<small>{props.type ?? ''}</small>
						</>
					)}
				</div>
			</div>
			{isAuthenticated && (
				<>
					<div className={classes.card__button__wrapper}>
						<button
							onClick={sendFilmFormHandler}
							className={classes.card__cta}>
							{t('modify')}
						</button>
						<button
							onClick={deleteFilmHandler}
							className={classes.card__cta}>
							{t('remove')}
						</button>
					</div>
				</>
			)}
			{isLoading && <LoadingSpinner />}
			{error && <small className={classes.error}>{t('errors.filmErrorDelete')}</small>}
		</div>
	);
};

export default FilmCard;
