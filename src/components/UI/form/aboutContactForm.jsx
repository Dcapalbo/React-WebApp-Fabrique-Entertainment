/** @format */

import { dataContactActions } from '../../../store/data-contact-slice';
import { contactSchema } from '../../../schema/conctactSchema';
import LoadingSpinner from '../loadingSpinner/loadingSpinner';
import { useDispatch, useSelector } from 'react-redux';
import { zodResolver } from '@hookform/resolvers/zod';
import { serverUrl } from '../../../utils/constants';
import classes from './genericForm.module.scss';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import React from 'react';
import {
	handleSingleImageDelete,
	slugCreation,
} from '../../../utils/functions';

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

	const [contactImage, setContactImage] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [isUpdate, setIsUpdate] = useState(false);
	const [error, setError] = useState(null);

	const handleInputChange = async (event) => {
		const { name, value } = event.target;
		setValue(name, value);

		try {
			await trigger(name);
		} catch (error) {
			console.log('validation error', error);
		}
	};

	const handleProfileCover = (event) => {
		const contactImage = event.target.files[0];
		setContactImage(contactImage);
	};

	const confirmHandler = (data) => {
		console.log(data);
		const formData = new FormData();

		formData.append('name', data.name);
		formData.append('surname', data.surname);
		formData.append('role', data.role);
		formData.append('bio', data.bio);
		formData.append('email', data.email);

		if (data.phoneNumber !== '') {
			formData.append('phoneNumber', data.phoneNumber);
		}

		formData.append('slug', slugCreation(data.name + ' ' + data.surname));
		formData.append(
			'contactImage',
			contactImage ?? dataUpdateContact?.contactImageKey
		);

		if (dataUpdateContact?._id) {
			formData.append('_id', dataUpdateContact?._id);
		}

		if (formData !== {}) {
			setIsLoading(true);

			const addContactUrl = `${serverUrl}/add-contact`;
			const updateContactUrl = `${serverUrl}/update-contact`;
			const requestUrl = uriLocation.includes('admin/add-new-contact')
				? addContactUrl
				: uriLocation.includes('/admin/update-contact')
				? updateContactUrl
				: '';
			if (requestUrl !== '') {
				axios
					.request({
						method: requestUrl.includes('add-contact') ? 'post' : 'put',
						url: requestUrl,
						data: formData,
					})
					.then((res) => {
						console.log(res.data);
					})
					.catch((err) => {
						console.error(
							`There is an error for ${
								requestUrl.includes('add-contact') ? 'adding' : 'updating'
							} a contact:`,
							err
						);
						setError(err);
					})
					.finally(() => {
						dispatch(dataContactActions.resetContactData());
						setIsLoading(false);
						navigate('/admin/contacts');
					});
			}
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
					<small className={classes.obligatory}>{t('labels.obligatory')}</small>
					<label htmlFor='Name'>
						{t('genericInfo.name')}
						<span>*</span>
					</label>
					<input
						defaultValue={formState.defaultValues?.payload?.name ?? ''}
						{...register('name')}
						type='text'
						onChange={handleInputChange}
					/>
					{errors.name?.message && <small>{errors.name?.message}</small>}
				</div>
				<div className={classes.form__container__item}>
					<label htmlFor='Surname'>
						{t('genericInfo.surname')}
						<span>*</span>
					</label>
					<input
						defaultValue={formState.defaultValues?.payload?.surname ?? ''}
						{...register('surname')}
						type='text'
						onChange={handleInputChange}
					/>
					{errors.surname?.message && <small>{errors.surname?.message}</small>}
				</div>
				<div className={classes.form__container__item}>
					<label htmlFor='Role'>
						{t('role')}
						<span>*</span>
					</label>
					<input
						defaultValue={formState.defaultValues?.payload?.role ?? ''}
						{...register('role')}
						type='text'
						onChange={handleInputChange}
					/>
					{errors.role?.message && <small>{errors.role?.message}</small>}
				</div>
				<div className={classes.form__container__item}>
					<label htmlFor='Bio'>
						{t('bio')}
						<span>*</span>
					</label>
					<textarea
						defaultValue={formState.defaultValues?.payload?.bio ?? ''}
						{...register('bio')}
						type='text'
						onChange={handleInputChange}></textarea>
					{errors.bio?.message && <small>{errors.bio?.message}</small>}
				</div>
				<div className={classes.form__container__item}>
					<label htmlFor='Email'>
						{t('genericInfo.email')}
						<span>*</span>
					</label>
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
						{...register('phoneNumber', {
							setValueAs: (v) => (v === '' ? '' : parseInt(v, 10)),
						})}
						type='number'
						onChange={handleInputChange}
					/>
					{errors.phoneNumber?.message && (
						<small>{errors.phoneNumber?.message}</small>
					)}
				</div>
				<div className={classes.form__container__item}>
					{!dataUpdateContact?.profileCover?.contactImageUrl ? (
						<>
							<label htmlFor='ContactImage'>
								{t('profileCover')}
								<span>*</span>
							</label>
							<input
								onChange={handleProfileCover}
								type='file'
								name='contactImage'
								accept='.png, .jpg, .jpeg'
								required
							/>
						</>
					) : (
						dataUpdateContact?.profileCover?.contactImageUrl && (
							<div className={classes.form__container__item__images}>
								<img
									title={dataUpdateContact?.name}
									alt={dataUpdateContact?.name}
									src={dataUpdateContact?.profileCover?.contactImageUrl}
								/>
								<div className={classes.flex__button__images__delete}>
									<button
										onClick={() =>
											handleSingleImageDelete(
												dataUpdateContact?.profileCover?.contactImageKey,
												serverUrl,
												dispatch,
												dataContactActions.removeImageKey,
												'delete-contact-image'
											)
										}
										className={classes.fourth__button}
										type='button'>
										X
									</button>
								</div>
							</div>
						)
					)}
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
