/** @format */

import { convertToDateToPrint, settingAuthData } from '../../../utils/functions';
import { dataArticleActions } from '../../../store/data-article-slice';
import LoadingSpinner from '../loadingSpinner/loadingSpinner';
import TruncatedText from '../truncatedText/truncatedText';
import { useDispatch, useSelector } from 'react-redux';
import { serverUrl } from '../../../utils/constants';
import React, { useState, useEffect } from 'react';
import classes from './articleCard.module.scss';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ArticleCard = (props) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { t } = useTranslation();

	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		setIsAuthenticated(settingAuthData().isLoggedIn ?? false);
	}, [dispatch]);

	const sendArticleFormHandler = () => {
		dispatch(
			dataArticleActions.setArticleData({
				...props,
				_id: props._id,
			})
		);
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
				dispatch(dataArticleActions.removeArticleData(ArticleId));
				window.location.replace('/news');
				setIsLoading(false);
			})
			.catch((err) => {
				console.error('there is an error for deleting the specific Article: ', err.name);
				setIsLoading(false);
				setError(err);
			});
	};

	return (
		<div className={classes.article}>
			<div className={classes.article__image__container}>
				{props.articleCover.articleImageUrl && (
					<img
						className={classes.article__image}
						src={props.articleCover.articleImageUrl ?? ''}
						alt={props.author ?? ''}
						title={props.author ?? ''}
						loading='lazy'
					/>
				)}
				<div className={classes.article__internal__description}>
					{props.author && <h2>{props.author ?? ''}</h2>}
					{props.description && (
						<TruncatedText
							text={props.description}
							maxLength={700}
						/>
					)}{' '}
				</div>
			</div>
			<div className={classes.article__external__informations}>
				{props.date && <p>{convertToDateToPrint(props.date)}</p>}
				<div className={classes.article__external__informations__item}>{props.tag && <small>{props.tag ?? ''}</small>}</div>
				{props.link && (
					<p>
						Vai all'articolo completo di {props.author} |{' '}
						<a
							className={classes.hover__article__link}
							href={props.link}
							target='_blank'
							rel='noreferrer'>
							Qui
						</a>
					</p>
				)}
				{isAuthenticated && (
					<div className={classes.article__button__wrapper}>
						<button
							onClick={sendArticleFormHandler}
							className={classes.article__cta}>
							{t('modify')}
						</button>
						<button
							onClick={deleteArticleHandler}
							className={classes.article__cta}>
							{t('remove')}
						</button>
						{isLoading && <LoadingSpinner />}
						{error && <small className={classes.error}>{t('errors.ArticleErrorDelete')}</small>}
					</div>
				)}
			</div>
		</div>
	);
};

export default ArticleCard;
