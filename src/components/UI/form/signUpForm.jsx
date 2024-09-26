/** @format */

import LoadingSpinner from '../loadingSpinner/loadingSpinner';
import { signUpSchema } from '../../../schema/signUpSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { serverUrl } from '../../../utils/constants';
import classes from './genericForm.module.scss';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import axios from 'axios';
import React from 'react';

const SignUpForm = () => {
	const { register, handleSubmit, formState } = useForm({
		defaultValues: '',
		resolver: zodResolver(signUpSchema),
	});

	const { errors } = formState;
	const { t } = useTranslation();

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const navigate = useNavigate();

	const confirmHandler = (event) => {
		const { name, email, password } = event;

		const formData = new FormData();

		formData.append('name', name);
		formData.append('email', email);
		formData.append('password', password);

		setIsLoading(true);
		axios
			.post(`${serverUrl}/sign-up`, formData)
			.then((res) => {
				console.log(res.data);
				navigate('/login');
			})
			.catch((err) => {
				console.error('there is an error for the creation of the user account, the user could be already been registered: ', err);
				setIsLoading(false);
				setError(err);
			});
	};

	return (
		<section className={classes.form__wrapper}>
			<form
				onSubmit={handleSubmit(confirmHandler)}
				className={classes.form__container}>
				<div className={classes.form__container__item}>
					<h4>{t('labels.signUpLabel')}</h4>
					<label htmlFor='Name'>{t('genericInfo.name')}</label>
					<input
						{...register('name')}
						type='text'
					/>
					{errors.name?.message && <small>{errors.name?.message}</small>}
				</div>
				<div className={classes.form__container__item}>
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
					<button
						className={classes.secondary__button}
						type='submit'>
						{t('createAccount')}
					</button>
				</div>
				{error && <small>{t('errors.signUp')}</small>}
				{isLoading && <LoadingSpinner />}
			</form>
		</section>
	);
};

export default SignUpForm;
