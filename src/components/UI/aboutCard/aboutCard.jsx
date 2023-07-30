/** @format */

import { dataContactActions } from '../../../store/data-contact-slice';
import LoadingSpinner from '../loadingSpinner/loadingSpinner';
import { useDispatch, useSelector } from 'react-redux';
import classes from '../../../assets/card.module.scss';
import { serverUrl } from '../../../utils/constants';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import axios from 'axios';
import React from 'react';

const AboutCard = (props) => {
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

	const sendContactIdFormHandler = () => {
		dispatch(
			dataContactActions.setContactData({
				...props,
				_id: props._id,
			})
		);
		navigate('/admin/update-contact');
	};

	const sendContactDetailHanlder = () => {
		dispatch(
			dataContactActions.setContactData({
				...props,
			})
		);
		navigate(`/about/${props.slug}`);
	};

	const deleteContactHandler = () => {
		setIsLoading(true);

		const contactId = {
			_id: props._id,
		};

		axios
			.delete(`${serverUrl}/delete-contact`, {
				data: contactId,
			})
			.then((res) => {
				dispatch(dataContactActions.removeContactData({ _id: props._id }));
				window.location.replace('/admin/contacts');
				setIsLoading(false);
			})
			.catch((err) => {
				console.error(
					'there is an error for deleting the specific contact: ',
					err
				);
				setIsLoading(false);
				setError(err);
			});
	};

	return (
		<div className={classes.card}>
			{props.contactImageUrl && (
				<img
					onClick={sendContactDetailHanlder}
					className={classes.card__image}
					src={props.contactImageUrl}
					alt={props.name}
					name={props.name}
					loading='lazy'
				/>
			)}
			<div className={classes.card__internal__description}>
				{props.name && <h2>{props.name}</h2>}
				{props.surname && <h2>{props.surname}</h2>}
				{props.bio && <p>{props.bio}</p>}
			</div>
			<div className={classes.card__external__informations}>
				<div className={classes.card__external__informations__item}>
					{props.role && <p>{props.role}</p>}
				</div>
				<div className={classes.card__external__informations__item}>
					{props.email && <p>{props.email}</p>}
				</div>
			</div>
			{isAuthenticated && (
				<>
					<div className={classes.card__button__wrapper}>
						<button
							onClick={sendContactIdFormHandler}
							className={classes.card__cta}>
							{t('modify')}
						</button>
						<button
							onClick={deleteContactHandler}
							className={classes.card__cta}>
							{t('remove')}
						</button>
					</div>
				</>
			)}
			{isLoading && <LoadingSpinner />}
			{error && (
				<small className={classes.error}>
					{t('errors.contactErrorDelete')}
				</small>
			)}
		</div>
	);
};

export default AboutCard;
