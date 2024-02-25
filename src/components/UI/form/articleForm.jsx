/** @format */

import { dataArticleActions } from '../../../store/data-article-slice';
import { articlesSchema } from '../../../schema/articlesSchema';
import LoadingSpinner from '../loadingSpinner/loadingSpinner';
import { useDispatch, useSelector } from 'react-redux';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { serverUrl } from '../../../utils/constants';
import React, { useState, useEffect } from 'react';
import classes from './genericForm.module.scss';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import TagSelect from '../select/tagSelect';
import axios from 'axios';
import {
	handleSingleImageDelete,
	convertToDateForInput,
} from '../../../utils/functions';

const ArticleForm = () => {
	const uriLocation = window.location.href;
	const { t } = useTranslation();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	let dataUpdateArticle = useSelector(
		(state) => state.dataArticle.articleData ?? ''
	);

	useEffect(() => {
		if (uriLocation.includes('/admin/update-article')) {
			setIsUpdate(true);
		} else {
			dispatch(dataArticleActions.resetArticleData());
			setIsUpdate(false);
		}
	}, [uriLocation, dispatch]);

	const { register, control, formState, setValue, handleSubmit, trigger } =
		useForm({
			defaultValues: {
				...dataUpdateArticle,
				date: convertToDateForInput(dataUpdateArticle?.date),
			},
			resolver: zodResolver(articlesSchema),
		});

	const { errors } = formState;

	const [articleImage, setArticleImage] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [isUpdate, setIsUpdate] = useState(false);
	const [error, setError] = useState(null);

	const handleSelectChange = (selectedValue) => {
		return selectedValue;
	};

	const handleInputChange = async (event) => {
		const { name, value } = event.target;
		setValue(name, value);

		try {
			await trigger(name);
		} catch (error) {
			console.log('validation error', error);
		}
	};

	const handleArticleCover = (event) => {
		const articleImage = event.target.files[0];
		setArticleImage(articleImage);
	};

	const confirmHandler = (data) => {
		const formData = new FormData();

		formData.append('author', data.author);
		formData.append('date', data.date);
		formData.append('tag', data.tag);
		formData.append('description', data.description);
		formData.append('link', data.link);

		formData.append(
			'articleImage',
			articleImage ?? dataUpdateArticle?.articleImageKey
		);

		if (dataUpdateArticle?._id) {
			formData.append('_id', dataUpdateArticle?._id);
		}

		if (formData !== {}) {
			setIsLoading(true);

			const addArticleUrl = `${serverUrl}/add-article`;
			const updateArticleUrl = `${serverUrl}/update-article`;
			const requestUrl = uriLocation.includes('admin/add-new-article')
				? addArticleUrl
				: uriLocation.includes('/admin/update-article')
				? updateArticleUrl
				: '';
			if (requestUrl !== '') {
				axios
					.request({
						method: requestUrl.includes('add-article') ? 'post' : 'put',
						url: requestUrl,
						data: formData,
					})
					.then((res) => {
						console.log(res.data);
					})
					.catch((err) => {
						console.error(
							`There is an error for ${
								requestUrl.includes('add-article') ? 'adding' : 'updating'
							} a article:`,
							err
						);
						setError(err);
					})
					.finally(() => {
						dispatch(dataArticleActions.resetArticleData());
						setIsLoading(false);
						navigate('/news');
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
						<h4>{t('labels.addDbArticle')}</h4>
					) : (
						isUpdate && <h4>{t('labels.modifyDbArticle')}</h4>
					)}
					<small className={classes.obligatory}>{t('labels.obligatory')}</small>
					<label htmlFor='Author'>
						{t('author')}
						<span>*</span>
					</label>
					<input
						defaultValue={formState.defaultValues?.author ?? ''}
						{...register('author')}
						type='text'
						onChange={handleInputChange}
					/>
					{errors.author?.message && <small>{errors.author?.message}</small>}
				</div>
				<div className={classes.form__container__item}>
					<label htmlFor='date'>
						{t('dateArticle')}
						<span>*</span>
					</label>
					<input
						defaultValue={formState.defaultValues?.date ?? ''}
						{...register('date')}
						type='date'
						onChange={handleInputChange}
					/>
					{errors.date?.message && <small>{errors.date?.message}</small>}
				</div>
				<div className={classes.form__container__item}>
					<label htmlFor='Tag'>
						{t('tag')}
						<span>*</span>
					</label>
					<Controller
						name='tag'
						control={control}
						defaultValue=''
						render={({ field }) => (
							<TagSelect
								onChange={(selectedValue) => {
									field.onChange(handleSelectChange(selectedValue));
								}}
								value={field.value}
							/>
						)}
					/>
					{errors.genre?.message && <small>{errors.genre?.message}</small>}
				</div>
				<div className={classes.form__container__item}>
					<label htmlFor='description'>
						{t('description')}
						<span>*</span>
					</label>
					<textarea
						defaultValue={formState.defaultValues?.description ?? ''}
						{...register('description')}
						type='text'
						onChange={handleInputChange}></textarea>
					{errors.description?.message && (
						<small>{errors.description?.message}</small>
					)}
				</div>
				<div className={classes.form__container__item}>
					<label htmlFor='Link'>{t('linksLabels.articleLink')}</label>
					<input
						defaultValue={formState.defaultValues?.link ?? ''}
						{...register('link')}
						type='text'
						onChange={handleInputChange}
					/>
					{errors.link?.message && <small>{errors.link.message}</small>}
				</div>
				<div className={classes.form__container__item}>
					{!dataUpdateArticle?.articleCover?.articleImageUrl && (
						<>
							<label htmlFor='articleImage'>
								{t('articleCover')}
								<span>*</span>
							</label>
							<input
								onChange={handleArticleCover}
								type='file'
								name='articleImage'
								accept='.png, .jpg, .jpeg'
								required
							/>
						</>
					)}

					{dataUpdateArticle?.articleCover?.articleImageUrl && (
						<div className={classes.form__container__item__images}>
							<img
								author={dataUpdateArticle?.author}
								alt={dataUpdateArticle?.author}
								src={dataUpdateArticle?.articleCover.articleImageUrl}
							/>
							<div className={classes.flex__button__images__delete}>
								<button
									onClick={() =>
										handleSingleImageDelete(
											dataUpdateArticle?.articleCover.articleImageKey,
											serverUrl,
											dispatch,
											dataArticleActions.removeImageKey,
											'delete-article-image'
										)
									}
									className={classes.fourth__button}
									type='button'>
									X
								</button>
							</div>
						</div>
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

export default ArticleForm;
