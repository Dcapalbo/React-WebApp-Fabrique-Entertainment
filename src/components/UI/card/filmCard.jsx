/** @format */

import { dataFilmActions } from '../../../store/data-film-slice';
import LoadingSpinner from '../loadingSpinner/loadingSpinner';
import { useDispatch, useSelector } from 'react-redux';
import classes from '../../../assets/card.module.scss';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import React from 'react';

const FilmCard = (props) => {
	console.log(props);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { t } = useTranslation();

	const isLoggedIn = useSelector((state) => state.userLogin.isLoggedIn);

	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		setIsAuthenticated(isLoggedIn);
	}, [isLoggedIn, dispatch]);

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
			.delete(`${process.env.REACT_APP_API_LOCAL_PORT}/delete-film`, {
				data: filmId,
			})
			.then((res) => {
				dispatch(dataFilmActions.removeFilmData({ _id: props._id }));
				window.location.replace('/admin/films');
				setIsLoading(false);
			})
			.catch((err) => {
				console.error(
					'there is an error for deleting the specific film: ',
					err.name
				);
				setIsLoading(false);
				setError(err);
			});
	};

	return (
		<div className={classes.card}>
			{props.imageUrl && (
				<img
					onClick={sendFilmDetails}
					className={classes.card__image}
					src={props.imageUrl}
					alt={props.title}
					title={props.title}
					loading='lazy'
				/>
			)}
			<div className={classes.card__internal__description}>
				{props.title && <h2>{props.title}</h2>}
				{props.synopsis && <p>{props.synopsis}</p>}
			</div>
			<div className={classes.card__external__informations}>
				{props.director && <h2>{props.director}</h2>}

				{props.productions && (
					<>
						{props?.productions.map((production, index) => (
							<p key={index}>{production.productionName}</p>
						))}
					</>
				)}
				<div className={classes.card__external__informations__item}>
					{props.type && (
						<>
							<small>{props.type}</small>
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
							{t('modifyFilmCard')}
						</button>
						<button
							onClick={deleteFilmHandler}
							className={classes.card__cta}>
							{t('deleteFilmCard')}
						</button>
					</div>
				</>
			)}
			{isLoading && <LoadingSpinner />}
			{error && (
				<small className={classes.error}>{t('errors.errorSweetDelete')}</small>
			)}
		</div>
	);
};

export default FilmCard;