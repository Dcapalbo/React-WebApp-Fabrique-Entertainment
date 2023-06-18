/** @format */

import { dataFilmActions } from '../../../store/data-film-slice';
import LoadingSpinner from '../loadingSpinner/loadingSpinner';
import { useForm, useController } from 'react-hook-form';
import { filmSchema } from '../../../schema/filmSchema';
import { slugCreation } from '../../../utils/functions';
import { useDispatch, useSelector } from 'react-redux';
import { zodResolver } from '@hookform/resolvers/zod';
import classes from './genericForm.module.scss';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import TypeSelect from '../select/typeSelect';
import { useState, useEffect } from 'react';
import axios from 'axios';
import React from 'react';

const FilmForm = () => {
	const uriLocation = window.location.href;
	const { t } = useTranslation();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const dataUpdateFilm = useSelector((state) => state.dataFilm.filmData ?? '');

	const productionsData = dataUpdateFilm?.productions || [
		{ productionName: '' },
	];
	const screenwritersData = dataUpdateFilm?.screenwriters || [
		{ screenwriterName: '' },
	];

	const genresData = dataUpdateFilm?.genres || [];

	const genresOptions = [
		{ value: 'action', label: 'Azione' },
		{ value: 'comedy', label: 'Commedia' },
		{ value: 'drama', label: 'Drammatico' },
		{ value: 'horror', label: 'Horror' },
		{ value: 'romance', label: 'Romantico' },
		{ value: 'sci-fi', label: 'Fantascienza' },
		{ value: 'thriller', label: 'Thriller' },
		{ value: 'adventure', label: 'Avventura' },
		{ value: 'animation', label: 'Animazione' },
		{ value: 'fantasy', label: 'Fantasy' },
	];

	useEffect(() => {
		if (uriLocation.includes('/admin/update-film')) {
			setIsUpdate(true);
		} else {
			dispatch(dataFilmActions.resetFilmData());
			setIsUpdate(false);
		}
	}, [uriLocation, dispatch]);

	const { register, control, formState, setValue, handleSubmit, trigger } =
		useForm({
			defaultValues: dataUpdateFilm ?? '',
			resolver: zodResolver(filmSchema),
		});

	const { errors } = formState;

	const { field } = useController({ name: 'type', control });

	const [selectedGenres, setSelectedGenres] = useState(
		genresData.map((genre) => genre.value)
	);
	const [screenwriters, setScreenwriters] = useState(screenwritersData);
	const [productions, setProductions] = useState(productionsData);
	const [isLoading, setIsLoading] = useState(false);
	const [isUpdate, setIsUpdate] = useState(false);
	const [error, setError] = useState(null);
	const [file, setFile] = useState(null);

	const handleSelectChange = (option) => {
		field.onChange(option.target.value);
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

	const handleDynamicFieldChange = (
		event,
		index,
		fieldName,
		stateArray,
		setState
	) => {
		const { name, value } = event.target;
		setState((prevState) => {
			const updatedArray = [...prevState];
			updatedArray[index] = {
				...updatedArray[index],
				[fieldName]: value,
			};
			return updatedArray;
		});
	};

	const handleDynamicFieldAdd = (stateArray, setState, newField) => {
		setState((prevState) => [...prevState, newField]);
	};

	const handleDynamicFieldDelete = (index, stateArray, setState) => {
		setState((prevState) => {
			const filteredArray = stateArray.filter((_, i) => i !== index);
			return filteredArray;
		});
	};

	const handleGenreChange = (event) => {
		const { value } = event.target;
		setSelectedGenres((prevSelectedGenres) => {
			if (prevSelectedGenres.includes(value)) {
				console.log(prevSelectedGenres);
				return prevSelectedGenres.filter((genre) => genre !== value);
			} else {
				return [...prevSelectedGenres, value];
			}
		});
	};

	const confirmHandler = (data) => {
		const formData = new FormData();

		formData.append('title', data.title);
		formData.append('director', data.director);
		for (let i = 0; i < productions.length; i++) {
			formData.append(
				`productions[${i}][productionName]`,
				data.productions[i].productionName
			);
		}
		for (let i = 0; i < screenwriters.length; i++) {
			formData.append(
				`screenwriters[${i}][screenwriterName]`,
				data.screenwriters[i].screenwriterName
			);
		}

		for (let i = 0; i < selectedGenres.length; i++) {
			formData.append(`genres[${i}][genreName]`, data.genres[i].genreName);
		}

		console.log(data);

		formData.append('directorOfPhotography', data.directorOfPhotography);
		formData.append('synopsis', data.synopsis);
		formData.append('duration', data.duration);
		formData.append('year', data.year);
		formData.append('slug', slugCreation(data.title));
		formData.append('type', data.type);
		formData.append('file', file);

		if (dataUpdateFilm?._id) {
			formData.append('_id', dataUpdateFilm?._id);
		}

		if (formData !== {}) {
			setIsLoading(true);

			const apiUrl = process.env.REACT_APP_API_LOCAL_PORT;
			const addFilmUrl = `${apiUrl}/add-film`;
			const updateFilmUrl = `${apiUrl}/update-film`;
			const requestUrl = uriLocation.includes('admin/add-new-film')
				? addFilmUrl
				: uriLocation.includes('/admin/update-film')
				? updateFilmUrl
				: '';

			if (requestUrl !== '') {
				axios
					.request({
						method: requestUrl.includes('add-film') ? 'post' : 'put',
						url: requestUrl,
						data: formData,
					})
					.then((res) => {
						console.log(res.data);
					})
					.catch((err) => {
						console.error(
							`There is an error for ${
								requestUrl.includes('add-film') ? 'adding' : 'updating'
							} a film:`,
							err
						);
						setError(err);
					})
					.finally(() => {
						dispatch(dataFilmActions.resetFilmData());
						setIsLoading(false);
						navigate('/admin/films');
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
						<h4>{t('labels.addDbFilm')}</h4>
					) : (
						isUpdate && <h4>{t('labels.modifyDbFilm')}</h4>
					)}
					<label htmlFor='Title'>{t('title')}</label>
					<input
						defaultValue={formState.defaultValues?.payload?.title ?? ''}
						{...register('title')}
						type='text'
						onChange={handleInputChange}
					/>
					{errors.title?.message && <small>{errors.title?.message}</small>}
				</div>
				<div className={classes.form__container__item}>
					<label htmlFor='Director'>{t('director')}</label>
					<input
						defaultValue={formState.defaultValues?.payload?.director ?? ''}
						{...register('director')}
						type='text'
						onChange={handleInputChange}
					/>
					{errors.director?.message && (
						<small>{errors.director?.message}</small>
					)}
				</div>
				{productions.map((production, index) => (
					<div
						className={classes.form__container__item}
						key={index}>
						<label htmlFor='ProductionName'>
							{t('productionsLabels.production')}
						</label>
						<input
							defaultValue={
								formState.defaultValues?.payload?.production?.[index]
									?.productionName ?? ''
							}
							{...register(`productions.${index}.productionName`)}
							type='text'
							onChange={(e) =>
								handleDynamicFieldChange(
									e,
									index,
									'productionName',
									productions,
									setProductions
								)
							}
						/>
						{errors.productions?.[index]?.productionName?.message && (
							<small>
								{errors.productions?.[index]?.productionName.message}
							</small>
						)}
						{index !== 0 && (
							<button
								onClick={() =>
									handleDynamicFieldDelete(index, productions, setProductions)
								}
								className={
									classes.secondary__button + ' ' + classes.extra__margin__top
								}
								type='button'>
								{t('productionsLabels.deleteProduction')}
							</button>
						)}
					</div>
				))}
				<div className={classes.form__container__item}>
					<button
						onClick={() =>
							handleDynamicFieldAdd(productions, setProductions, {
								productionName: '',
							})
						}
						className={classes.secondary__button}
						type='button'>
						{t('productionsLabels.addProduction')}
					</button>
				</div>
				{screenwriters.map((screenwriter, index) => (
					<div
						className={classes.form__container__item}
						key={index}>
						<label htmlFor='ScreenwriterName'>
							{t('screenwritersLabels.screenwriter')}
						</label>
						<input
							defaultValue={
								formState.defaultValues?.payload?.screenwriter?.[index]
									?.screenwriterName ?? ''
							}
							{...register(`screenwriters.${index}.screenwriterName`)}
							type='text'
							onChange={(e) =>
								handleDynamicFieldChange(
									e,
									index,
									'screenwriterName',
									screenwriters,
									setScreenwriters
								)
							}
						/>
						{errors.screenwriters?.[index]?.screenwriterName?.message && (
							<small>
								{errors.screenwriters?.[index]?.screenwriterName.message}
							</small>
						)}
						{index !== 0 && (
							<button
								onClick={() =>
									handleDynamicFieldDelete(
										index,
										screenwriters,
										setScreenwriters
									)
								}
								className={
									classes.secondary__button + ' ' + classes.extra__margin__top
								}
								type='button'>
								{t('screenwritersLabels.deleteScreenwriter')}
							</button>
						)}
					</div>
				))}
				<div className={classes.form__container__item}>
					<button
						onClick={() =>
							handleDynamicFieldAdd(screenwriters, setScreenwriters, {
								productionName: '',
							})
						}
						className={classes.secondary__button}
						type='button'>
						{t('screenwritersLabels.addScreenwriter')}
					</button>
				</div>
				<div className={classes.form__container__item}>
					<label>Generi</label>
					<div className={classes.genres__checkboxes__container}>
						{genresOptions.map((genre, index) => (
							<div
								key={genre.value}
								className={classes.genres__checkboxes__internal__wrapper}>
								<label htmlFor={`GenreName_${index}`}>
									<input
										defaultChecked={selectedGenres.includes(genre.value)}
										{...register(`genres[${index}].genreName`)}
										className={classes.genres}
										type='checkbox'
										value={genre.value}
										onChange={handleGenreChange}
										id={`genreName_${index}`}
									/>
									{genre.label}
								</label>
								{errors.genres?.[index]?.genreName && (
									<small>{errors.genres?.[index]?.genreName.message}</small>
								)}
							</div>
						))}
					</div>
				</div>
				<div className={classes.form__container__item}>
					<label htmlFor='DirectorOfPhotography'>
						{t('directorOfPhotography')}
					</label>
					<input
						defaultValue={
							formState.defaultValues?.payload?.directorOfPhotography ?? ''
						}
						{...register('directorOfPhotography')}
						type='text'
						onChange={handleInputChange}
					/>
					{errors.directorOfPhotography?.message && (
						<small>{errors.directorOfPhotography?.message}</small>
					)}
				</div>
				<div className={classes.form__container__item}>
					<label htmlFor='Synopsis'>{t('synopsis')}</label>
					<textarea
						defaultValue={formState.defaultValues?.payload?.synopsis ?? ''}
						{...register('synopsis')}
						type='text'
						onChange={handleInputChange}></textarea>
					{errors.synopsis?.message && (
						<small>{errors.synopsis?.message}</small>
					)}
				</div>
				<div className={classes.form__container__item}>
					<label htmlFor='Duration'>{t('duration')}</label>
					<input
						defaultValue={formState.defaultValues?.payload?.duration ?? ''}
						{...register('duration', { valueAsNumber: true })}
						type='number'
						onChange={handleInputChange}
					/>
					{errors.duration?.message && (
						<small>{errors.duration?.message}</small>
					)}
				</div>
				<div className={classes.form__container__item}>
					<label htmlFor='Year'>{t('year')}</label>
					<input
						defaultValue={formState.defaultValues?.payload?.year ?? ''}
						{...register('year', { valueAsNumber: true })}
						type='number'
						onChange={handleInputChange}
					/>
					{errors.year?.message && <small>{errors.year?.message}</small>}
				</div>
				<div className={classes.form__container__item}>
					<label htmlFor='Type'>{t('typology')}</label>
					<TypeSelect
						onChange={handleSelectChange}
						value={field.value}
					/>
					{errors.type?.message && <small>{errors.type?.message}</small>}
				</div>
				<div className={classes.form__container__item}>
					<label htmlFor='Image'>{t('cover')}</label>
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

export default FilmForm;
