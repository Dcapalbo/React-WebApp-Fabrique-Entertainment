/** @format */

import { dataContactActions } from '../../../store/data-contact-slice';
import { contactSchema } from '../../../schema/conctactSchema';
import LoadingSpinner from '../loadingSpinner/loadingSpinner';
import { slugCreation } from '../../../utils/functions';
import { useDispatch, useSelector } from 'react-redux';
import { zodResolver } from '@hookform/resolvers/zod';
import classes from './genericForm.module.scss';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import React from 'react';

const AboutContactForm = () => {
	const uriLocation = window.location.href;
	const { t } = useTranslation();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	let dataUpdateContact = useSelector(
		(state) => state.dataContact.contactData ?? ''
	);

	useEffect(() => {
		if (uriLocation.includes('/admin/update-contact')) {
			setIsUpdate(true);
		} else {
			dispatch(dataContactActions.resetContactData());
			setIsUpdate(false);
		}
	}, [uriLocation, dispatch]);

	const { register, formState, setValue, handleSubmit, trigger } = useForm({
		defaultValues: dataUpdateContact ?? '',
		resolver: zodResolver(contactSchema),
	});

	const { errors } = formState;

	const [isUpdate, setIsUpdate] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [file, setFile] = useState(null);

	const handleInputChange = async (event) => {
		const { name, value } = event.target;
		setValue(name, value);

		try {
			await trigger(name);
		} catch (error) {
			console.log('validation error', error);
		}
	};

	const confirmHandler = (data) => {
		const formData = new FormData();

		formData.append('name', data.name);
		formData.append('surname', data.surname);
		formData.append('role', data.role);
		formData.append('bio', data.bio);
		formData.append('email', data.email);
		formData.append('phoneNumber', data.phoneNumber);
		formData.append('slug', slugCreation(data.name));
		formData.append('file', file);

		if (dataUpdateContact?._id) {
			formData.append('_id', dataUpdateContact?._id);
		}

		if (formData !== {}) {
			const endpoint =
				uriLocation ===
				`${process.env.REACT_APP_CLIENT_LOCAL_PORT}/admin/add-new-contact`
					? `${process.env.REACT_APP_API_LOCAL_PORT}/add-contact`
					: `${process.env.REACT_APP_API_LOCAL_PORT}/update-contact`;

			setIsLoading(true);
			axios
				.request({
					method: uriLocation.includes('/update-contact') ? 'put' : 'post',
					url: endpoint,
					data: formData,
				})
				.then((res) => {
					console.log(res.data);
				})
				.catch((err) => {
					console.error(
						uriLocation.includes('/update-contact')
							? 'There is an error for updating a contact: '
							: 'There is an error for adding a new contact: ',
						err.name
					);
					setError(err);
				})
				.finally(() => {
					setIsLoading(false);
					navigate('/admin/contacts');
				});
		}
	};

	return (
		<section className={classes.form__wrapper}>
			<form
				onSubmit={handleSubmit(confirmHandler)}
				className={classes.form__container}>
				<div className={classes.form__container__item}>
					{!isUpdate ? (
						<h4>{t('labels.addDbContact')}</h4>
					) : (
						isUpdate && <h4>{t('labels.modifyDbContact')}</h4>
					)}
					<label htmlFor='Name'>{t('genericInfo.name')}</label>
					<input
						defaultValue={formState.defaultValues?.payload?.name ?? ''}
						{...register('name')}
						type='text'
						onChange={handleInputChange}
					/>
					{errors.name?.message && <small>{errors.name?.message}</small>}
				</div>
				<div className={classes.form__container__item}>
					<label htmlFor='Surname'>{t('genericInfo.surname')}</label>
					<input
						defaultValue={formState.defaultValues?.payload?.surname ?? ''}
						{...register('surname')}
						type='text'
						onChange={handleInputChange}
					/>
					{errors.surname?.message && <small>{errors.surname?.message}</small>}
				</div>
				<div className={classes.form__container__item}>
					<label htmlFor='Role'>{t('role')}</label>
					<input
						defaultValue={formState.defaultValues?.payload?.role ?? ''}
						{...register('role')}
						type='text'
						onChange={handleInputChange}
					/>
					{errors.role?.message && <small>{errors.role?.message}</small>}
				</div>
				<div className={classes.form__container__item}>
					<label htmlFor='Bio'>{t('bio')}</label>
					<textarea
						defaultValue={formState.defaultValues?.payload?.bio ?? ''}
						{...register('bio')}
						type='text'
						onChange={handleInputChange}></textarea>
					{errors.bio?.message && <small>{errors.bio?.message}</small>}
				</div>
				<div className={classes.form__container__item}>
					<label htmlFor='Email'>{t('genericInfo.email')}</label>
					<input
						defaultValue={formState.defaultValues?.payload?.email ?? ''}
						{...register('email')}
						type='email'
						onChange={handleInputChange}
					/>
					{errors.email?.message && <small>{errors.email?.message}</small>}
				</div>
				<div className={classes.form__container__item}>
					<label htmlFor='PhoneNumber'>{t('genericInfo.number')}</label>
					<input
						defaultValue={formState.defaultValues?.payload?.phoneNumber ?? ''}
						{...register('phoneNumber', { valueAsNumber: true })}
						type='number'
						onChange={handleInputChange}
					/>
					{errors.phoneNumber?.message && (
						<small>{errors.phoneNumber?.message}</small>
					)}
				</div>
				<div className={classes.form__container__item}>
					<label htmlFor='Image'>{t('profileCover')}</label>
					<input
						onChange={(event) => {
							const file = event.target.files[0];
							setFile(file);
						}}
						type='file'
						name='Image'
						required
					/>
				</div>
				<div className={classes.form__container__item}>
					{!isUpdate ? (
						<>
							<button
								className={classes.secondary__button}
								type='submit'>
								{t('insertAction')}
							</button>
							<div className={classes.generic__margin__top}>
								{error && <small>{t('errors.dbCrud')}</small>}
							</div>
						</>
					) : (
						isUpdate && (
							<>
								<button
									className={classes.secondary__button}
									type='submit'>
									{t('modifyAction')}
								</button>
								<div className={classes.generic__margin__top}>
									{error && <small>{t('errors.dbCrud')}</small>}
								</div>
							</>
						)
					)}
				</div>
				{isLoading && <LoadingSpinner />}
			</form>
		</section>
	);
};

export default AboutContactForm;
