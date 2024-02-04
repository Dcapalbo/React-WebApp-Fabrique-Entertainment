/** @format */

import { dataArticleActions } from '../../../store/data-article-slice';
import LoadingSpinner from '../loadingSpinner/loadingSpinner';
import TruncatedText from '../truncatedText/truncatedText';
import classes from '../../../assets/card.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { serverUrl } from '../../../utils/constants';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ArticleCard = (props) => {
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

	const sendArticleFormHandler = () => {
		navigate('/admin/update-article');
	};

	const deleteArticleHandler = () => {
		setIsLoading(true);

		const ArticleId = {
			_id: props._id,
		};

		axios
			.delete(`${serverUrl}/delete-article`, {
				data: ArticleId,
			})
			.then((res) => {
				dispatch(dataArticleActions.removeArticleData({ _id: props._id }));
				window.location.replace('/news');
				setIsLoading(false);
			})
			.catch((err) => {
				console.error(
					'there is an error for deleting the specific Article: ',
					err.name
				);
				setIsLoading(false);
				setError(err);
			});
	};

	return (
		<div className={classes.card}>
			{props.articleCover.articleImageUrl && (
				<img
					
					className={classes.card__image}
					src={props.articleCover.articleImageUrl ?? ''}
					alt={props.title ?? ''}
					title={props.title ?? ''}
					loading='lazy'
				/>
			)}
			<div className={classes.card__internal__description}>
				{props.title && <h2>{props.title ?? ''}</h2>}
				{props.description && (
					<TruncatedText
						text={props.description}
						maxLength={700}
					/>
				)}{' '}
			</div>
			<div className={classes.card__external__informations}>
				{props.link && (
					<p>
						Vai all'articolo completo |{' '}
						<a
							href={props.link}
							target='_blank'
							rel='noreferrer'>
							Qui
						</a>
					</p>
				)}
				<div className={classes.card__external__informations__item}>
					{props.tag && (
						<>
							<small>{props.tag ?? ''}</small>
						</>
					)}
				</div>
			</div>
			{isAuthenticated && (
				<>
					<div className={classes.card__button__wrapper}>
						<button
							onClick={sendArticleFormHandler}
							className={classes.card__cta}>
							{t('modify')}
						</button>
						<button
							onClick={deleteArticleHandler}
							className={classes.card__cta}>
							{t('remove')}
						</button>
					</div>
				</>
			)}
			{isLoading && <LoadingSpinner />}
			{error && (
				<small className={classes.error}>
					{t('errors.ArticleErrorDelete')}
				</small>
			)}
		</div>
	);
};

export default ArticleCard;
