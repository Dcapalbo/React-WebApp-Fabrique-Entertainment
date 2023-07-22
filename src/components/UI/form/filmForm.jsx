/** @format */

import { dataFilmActions } from '../../../store/data-film-slice';
import LoadingSpinner from '../loadingSpinner/loadingSpinner';
import { filmSchema } from '../../../schema/filmSchema';
import { slugCreation } from '../../../utils/functions';
import { useDispatch, useSelector } from 'react-redux';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import classes from './genericForm.module.scss';
import GenreSelect from '../select/genreSelect';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
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

	const producersData = dataUpdateFilm?.producers || [
		{ producerName: '' },
	];

	const screenwritersData = dataUpdateFilm?.screenwriters || [
		{ screenwriterName: '' },
	];

	const festivalsData = dataUpdateFilm?.festivals || [{ festivalName: '' }];

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

	const [screenwriters, setScreenwriters] = useState(screenwritersData);
	const [productions, setProductions] = useState(productionsData);
	const [producers, setProducers] = useState(producersData);
	const [festivals, setFestivals] = useState(festivalsData);
	const [isLoading, setIsLoading] = useState(false);
	const [isUpdate, setIsUpdate] = useState(false);
	const [error, setError] = useState(null);
	const [file, setFile] = useState(null);

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

	const handleDynamicFieldChange = (
		event,
		index,
		fieldName,
		stateArray,
		setState
	) => {
		const { value } = event.target;
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
	
	const confirmHandler = (data) => {
		const formData = new FormData();

		formData.append('title', data.title);
		formData.append('director', data.director);

		if(productions.length > 0 && productions.length[0] !== "") {
			for (let i = 0; i < productions.length; i++) {
				formData.append(
					`productions[${i}][productionName]`,
					data.productions[i].productionName
				);
			}
		}

		if(producers.length > 0 && producers.length[0] !== "") {
			for (let i = 0; i < producers.length; i++) {
				formData.append(
					`producers[${i}][producerName]`,
					data.producers[i].producerName
				);
			}
		}

		if(screenwriters.length > 0 && screenwriters.length[0] !== "") {
			for (let i = 0; i < screenwriters.length; i++) {
				formData.append(
					`screenwriters[${i}][screenwriterName]`,
					data.screenwriters[i].screenwriterName
				);
			}
		}

		formData.append('genre', data.genre);
		formData.append('directorOfPhotography', data.directorOfPhotography);
		formData.append('editing', data.editing);
		formData.append('scenography', data.scenography);
		formData.append('costumes', data.costumes);
		formData.append('music', data.music);
		formData.append('sound', data.sound);
		formData.append('soundDesign', data.soundDesign);
		formData.append('casting', data.casting);
		formData.append('lineProducer', data.lineProducer);
		formData.append('executiveProduction', data.executiveProduction);
		formData.append('firstAssistantDirector', data.firstAssistantDirector);
		formData.append('synopsis', data.synopsis);

		if(data.productionNotes) {
			formData.append('productionNotes', data.productionNotes)
		}

		formData.append('duration', data.duration);
		formData.append('year', data.year);

		if(
			festivals.length > 0 && 
			festivals.length[0] !== "" && 
			data.festivals[0].festivalName !== ""
		) {
			for (let i = 0; i < festivals.length; i++) {
				console.log(festivals);
				formData.append(
					`festivals[${i}][festivalName]`,
					data.festivals[i].festivalName
				);
				console.log(data.festivals[i].festivalName);
			}
		}

		formData.append('slug', slugCreation(data.title));
		formData.append('type', data.type);

		if(data.trailer) {
			formData.append('trailer', data.trailer);
		}

		if(data.imdb) {
			formData.append('imdb', data.imdb);
		}

		if(data.instagram) {
			formData.append('instagram', data.instagram);
		}

		if(data.facebook) {
			formData.append('facebook', data.facebook);
		}
		
		if (dataUpdateFilm?._id) {
			formData.append('_id', dataUpdateFilm?._id);
		}

		formData.append('file', file);
		
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
					<label htmlFor='Title'>
						{t('title')}
						<span>*</span>
					</label>
					<input
						defaultValue={formState.defaultValues?.payload?.title ?? ''}
						{...register('title')}
						type='text'
						onChange={handleInputChange}
					/>
					{errors.title?.message && <small>{errors.title?.message}</small>}
				</div>
				<div className={classes.form__container__item}>
					<label htmlFor='Director'>
						{t('director')}
						<span>*</span>
					</label>
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
							<span>*</span>
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
				{producers.map((producer, index) => (
					<div
						className={classes.form__container__item}
						key={index}>
						<label htmlFor='ProducerName'>
							{t('producersLabels.producer')}
							<span>*</span>
						</label>
						<input
							defaultValue={
								formState.defaultValues?.payload?.production?.[index]
									?.productionName ?? ''
							}
							{...register(`producers.${index}.producerName`)}
							type='text'
							onChange={(e) =>
								handleDynamicFieldChange(
									e,
									index,
									'producerName',
									producers,
									setProducers
								)
							}
						/>
						{errors.producers?.[index]?.producerName?.message && (
							<small>
								{errors.producers?.[index]?.producerName.message}
							</small>
						)}
						{index !== 0 && (
							<button
								onClick={() =>
									handleDynamicFieldDelete(index, producers, setProducers)
								}
								className={
									classes.secondary__button + ' ' + classes.extra__margin__top
								}
								type='button'>
								{t('producersLabels.deleteProducer')}
							</button>
						)}
					</div>
				))}
				<div className={classes.form__container__item}>
					<button
						onClick={() =>
							handleDynamicFieldAdd(producers, setProducers, {
								productionName: '',
							})
						}
						className={classes.secondary__button}
						type='button'>
						{t('producersLabels.addProducer')}
					</button>
				</div>
				{screenwriters.map((screenwriter, index) => (
					<div
						className={classes.form__container__item}
						key={index}>
						<label htmlFor='ScreenwriterName'>
							{t('screenwritersLabels.screenwriter')}
							<span>*</span>
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
					<label htmlFor="Genre">
						{t('genres')}
						<span>*</span>
					</label>
					<Controller
						name="genre"
						control={control}
						defaultValue={""}
						render={({ field }) => (
							<GenreSelect
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
					<label htmlFor='DirectorOfPhotography'>
						{t('directorOfPhotography')}
						<span>*</span>
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
					<label htmlFor='Editing'>
						{t('editing')}
						<span>*</span>
					</label>
					<input
						defaultValue={
							formState.defaultValues?.payload?.editing ?? ''
						}
						{...register('editing')}
						type='text'
						onChange={handleInputChange}
					/>
					{errors.editing?.message && (
						<small>{errors.editing?.message}</small>
					)}
				</div>
				<div className={classes.form__container__item}>
					<label htmlFor='Scenography'>
						{t('scenography')}
						<span>*</span>
					</label>
					<input
						defaultValue={
							formState.defaultValues?.payload?.scenography ?? ''
						}
						{...register('scenography')}
						type='text'
						onChange={handleInputChange}
					/>
					{errors.scenography?.message && (
						<small>{errors.scenography?.message}</small>
					)}
				</div>
				<div className={classes.form__container__item}>
					<label htmlFor='costumes'>
						{t('costumes')}
						<span>*</span>
					</label>
					<input
						defaultValue={
							formState.defaultValues?.payload?.costumes ?? ''
						}
						{...register('costumes')}
						type='text'
						onChange={handleInputChange}
					/>
					{errors.costumes?.message && (
						<small>{errors.costumes?.message}</small>
					)}
				</div>
				<div className={classes.form__container__item}>
					<label htmlFor='music'>
						{t('music')}
						<span>*</span>
					</label>
					<input
						defaultValue={
							formState.defaultValues?.payload?.music ?? ''
						}
						{...register('music')}
						type='text'
						onChange={handleInputChange}
					/>
					{errors.music?.message && (
						<small>{errors.music?.message}</small>
					)}
				</div>
				<div className={classes.form__container__item}>
					<label htmlFor='sound'>
						{t('sound')}
						<span>*</span>
					</label>
					<input
						defaultValue={
							formState.defaultValues?.payload?.sound ?? ''
						}
						{...register('sound')}
						type='text'
						onChange={handleInputChange}
					/>
					{errors.sound?.message && (
						<small>{errors.sound?.message}</small>
					)}
				</div>
				<div className={classes.form__container__item}>
					<label htmlFor='soundDesign'>
						{t('soundDesign')}
						<span>*</span>
					</label>
					<input
						defaultValue={
							formState.defaultValues?.payload?.soundDesign ?? ''
						}
						{...register('soundDesign')}
						type='text'
						onChange={handleInputChange}
					/>
					{errors.soundDesign?.message && (
						<small>{errors.soundDesign?.message}</small>
					)}
				</div>
				<div className={classes.form__container__item}>
					<label htmlFor='casting'>
						{t('casting')}
						<span>*</span>
					</label>
					<input
						defaultValue={
							formState.defaultValues?.payload?.casting ?? ''
						}
						{...register('casting')}
						type='text'
						onChange={handleInputChange}
					/>
					{errors.casting?.message && (
						<small>{errors.casting?.message}</small>
					)}
				</div>
				<div className={classes.form__container__item}>
					<label htmlFor='lineProducer'>
						{t('lineProducer')}
						<span>*</span>
					</label>
					<input
						defaultValue={
							formState.defaultValues?.payload?.lineProducer ?? ''
						}
						{...register('lineProducer')}
						type='text'
						onChange={handleInputChange}
					/>
					{errors.lineProducer?.message && (
						<small>{errors.lineProducer?.message}</small>
					)}
				</div>
				<div className={classes.form__container__item}>
					<label htmlFor='ExecutiveProduction'>
						{t('executiveProduction')}
						<span>*</span>
					</label>
					<input
						defaultValue={
							formState.defaultValues?.payload?.executiveProduction ?? ''
						}
						{...register('executiveProduction')}
						type='text'
						onChange={handleInputChange}
					/>
					{errors.executiveProduction?.message && (
						<small>{errors.executiveProduction?.message}</small>
					)}
				</div>
				<div className={classes.form__container__item}>
					<label htmlFor='firstAssistantDirector'>
						{t('firstAssistantDirector')}
						<span>*</span>
					</label>
					<input
						defaultValue={
							formState.defaultValues?.payload?.firstAssistantDirector ?? ''
						}
						{...register('firstAssistantDirector')}
						type='text'
						onChange={handleInputChange}
					/>
					{errors.firstAssistantDirector?.message && (
						<small>{errors.firstAssistantDirector?.message}</small>
					)}
				</div>
				<div className={classes.form__container__item}>
					<label htmlFor='Synopsis'>
						{t('synopsis')}
						<span>*</span>
					</label>
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
					<label htmlFor='ProductionNotes'>
						{t('productionNotes')}
					</label>
					<textarea
						defaultValue={formState.defaultValues?.payload?.productionNotes ?? ''}
						{...register('productionNotes')}
						type='text'
						onChange={handleInputChange}></textarea>
					{errors.productionNotes?.message && (
						<small>{errors.productionNotes?.message}</small>
					)}
				</div>
				<div className={classes.form__container__item}>
					<label htmlFor='Duration'>
						{t('duration')}
						<span>*</span>
					</label>
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
					<label htmlFor='Year'>
						{t('year')}
						<span>*</span>
					</label>
					<input
						defaultValue={formState.defaultValues?.payload?.year ?? ''}
						{...register('year', { valueAsNumber: true })}
						type='number'
						onChange={handleInputChange}
					/>
					{errors.year?.message && <small>{errors.year?.message}</small>}
				</div>
				{festivals.map((festival, index) => (
					<div
						className={classes.form__container__item}
						key={index}>
						<label htmlFor='festivalName'>
							{t('festivalsLabels.festival')}
						</label>
						<input
							defaultValue={
								formState.defaultValues?.payload?.festival?.[index]
									?.festivalName ?? ''
							}
							{...register(`festivals.${index}.festivalName`)}
							type='text'
							onChange={(e) =>
								handleDynamicFieldChange(
									e,
									index,
									'festivalName',
									festivals,
									setFestivals
								)
							}
						/>
						{errors.festivals?.[index]?.festivalName?.message && (
							<small>{errors.festivals?.[index]?.festivalName.message}</small>
						)}
						{index !== 0 && (
							<button
								onClick={() =>
									handleDynamicFieldDelete(index, festivals, setFestivals)
								}
								className={
									classes.secondary__button + ' ' + classes.extra__margin__top
								}
								type='button'>
								{t('festivalsLabels.deleteFestival')}
							</button>
						)}
					</div>
				))}
				<div className={classes.form__container__item}>
					<button
						onClick={() =>
							handleDynamicFieldAdd(festivals, setFestivals, {
								festivalName: '',
							})
						}
						className={classes.secondary__button}
						type='button'>
						{t('festivalsLabels.addFestival')}
					</button>
				</div>
				<div className={classes.form__container__item}>
					<label htmlFor="Type">
						{t('typology')}
						<span>*</span>
					</label>
					<Controller
						name="type"
						control={control}
						defaultValue=""
						render={({ field }) => (
							<TypeSelect
								onChange={(selectedValue) => {
									field.onChange(handleSelectChange(selectedValue));
								}}
								value={field.value}
							/>
						)}
					/>
					{errors.type?.message && <small>{errors.type?.message}</small>}
				</div>
				<div className={classes.form__container__item}>
					<label htmlFor='Trailer'>
						{t('links.trailer')}
					</label>
					<input
						defaultValue={formState.defaultValues?.payload?.trailer ?? ''}
						{...register('trailer')}
						type='text'
						onChange={handleInputChange}
					/>
					{errors.trailer?.message && (
						<small>{errors.trailer.message}</small>
					)}
				</div>
				<div className={classes.form__container__item}>
					<label htmlFor='Imdb'>
						{t('links.imdb')}
					</label>
					<input
						defaultValue={
							formState.defaultValues?.payload?.imdb ?? ''
						}
						{...register('imdb')}
						type='text'
						onChange={handleInputChange}
					/>
					{errors.imdb?.message && (
						<small>{errors.imdb?.message}</small>
					)}
				</div>
				<div className={classes.form__container__item}>
					<label htmlFor='Instagram'>
						{t('links.instagram')}
					</label>
					<input
						defaultValue={
							formState.defaultValues?.payload?.instagram ?? ''
						}
						{...register('instagram')}
						type='text'
						onChange={handleInputChange}
					/>
					{errors.instagram?.message && (
						<small>{errors.instagram?.message}</small>
					)}
				</div>
				<div className={classes.form__container__item}>
					<label htmlFor='Facebook'>
						{t('links.facebook')}
					</label>
					<input
						defaultValue={
							formState.defaultValues?.payload?.facebook ?? ''
						}
						{...register('facebook')}
						type='text'
						onChange={handleInputChange}
					/>
					{errors.facebook?.message && (
						<small>{errors.facebook?.message}</small>
					)}
				</div>
				<div className={classes.form__container__item}>
					<label htmlFor='Image'>
						{t('cover')}
						<span>*</span>	
					</label>
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
				<small className={classes.obligatory}>Campi contrassegnati con (*) sono obbligatori</small>
				{isLoading && <LoadingSpinner />}
			</form>
		</section>
	);
};

export default FilmForm;
