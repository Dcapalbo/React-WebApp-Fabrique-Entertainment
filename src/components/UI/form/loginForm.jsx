/** @format */

import LoadingSpinner from '../loadingSpinner/loadingSpinner';
import { loginSchema } from '../../../schema/loginSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { serverUrl } from '../../../utils/constants';
import { useTranslation } from 'react-i18next';
import classes from './genericForm.module.scss';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import React, { useState } from 'react';

import axios from 'axios';
import { dataUserActions } from '../../../store/data-user-slice';

const LoginForm = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: '',
		resolver: zodResolver(loginSchema),
	});

	const { t } = useTranslation();

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const confirmHandler = (event) => {
		const { email, password } = event;

		const formData = new FormData();

		formData.append('email', email);
		formData.append('password', password);

		setIsLoading(true);
		axios
			.post(`${serverUrl}/login`, formData)
			.then((res) => {
				sessionStorage.setItem('token', res.data.token);
				sessionStorage.setItem('name', res.data.name);
				dispatch(dataUserActions.setAuth(true));
				setIsLoading(false);
				navigate('/');
			})
			.catch((err) => {
				console.error('there is an error for the login form: ', err);
				setError(err);
				setIsLoading(false);
			});
	};

	return (
		<section className={classes.form__wrapper}>
			<form
				onSubmit={handleSubmit(confirmHandler)}
				className={classes.form__container}>
				<div className={classes.form__container__item}>
					<h4>{t('labels.loginLabel')}</h4>
					<label htmlFor='Email'>{t('genericInfo.email')}</label>
					<input
						{...register('email')}
						type='email'
					/>
					{errors.email?.message && <small>{errors.email?.message}</small>}
				</div>
				<div className={classes.form__container__item}>
					<label htmlFor='Password'>{t('password')}</label>
					<input
						{...register('password')}
						type='password'
					/>
				</div>
				{errors.password?.message && <small>{errors.password?.message}</small>}
				<div className={classes.form__container__item}>
					<label htmlFor='confirmPassword'>{t('confirmPassword')}</label>
					<input
						{...register('confirmPassword')}
						type='password'
					/>
				</div>
				{errors.confirmPassword?.message && <small>{errors.confirmPassword?.message}</small>}
				<div className={classes.form__container__item}>
					<Link to='/forgot-password'>{t('labels.forgotLabel')}</Link>
					<button
						className={classes.secondary__button}
						type='submit'>
						{t('signInAction')}
					</button>
				</div>
				{error && <small>{t('errors.login')}</small>}
				{isLoading && <LoadingSpinner />}
			</form>
		</section>
	);
};

export default LoginForm;
