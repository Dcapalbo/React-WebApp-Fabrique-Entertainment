/** @format */

import classes from '../../../assets/cardContainer.module.scss';
import LoadingSpinner from '../loadingSpinner/loadingSpinner';
import { serverUrl } from '../../../utils/constants';
import ApiGetHook from '../../../hooks/apiGetHook';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ArticleCard from './articleCard';
import React from 'react';

const ArticleCardContainer = () => {
	const { t } = useTranslation();
	const { articles, error, loading } = ApiGetHook(`${serverUrl}/get-articles`);

	const typeData = useSelector((state) => state.dataType.dataType) || '';
	const [filteredData, setFilteredData] = useState([]);

	useEffect(() => {
		if (articles) {
			setFilteredData(articles);
			if (typeData) {
				const filteredarticles = articles.filter(
					(article) => article.type === typeData
				);
				setFilteredData(filteredarticles);
			}
		}
	}, [typeData, articles]);

	if (loading) {
		return <LoadingSpinner />;
	} else if (error) {
		return (
			<h1 className={classes.text__align__center}>
				Non sono presenti articoli, prova a ricaricare la pagina
			</h1>
		);
	} else {
		return (
			<section className={classes.wrapper__card__container}>
				<div
					className={
						(filteredData.length > 2
							? classes.card__container
							: classes.card__container,
						classes.justify__content__center)
					}>
					{filteredData.length > 0 ? (
						filteredData.map((article) => (
							<ArticleCard
								title={article.title}
								date={article.date}
								tag={article.tag}
								link={article.link}
								coverImageUrl={article?.cover?.coverImageUrl}
								coverImageKey={article?.cover?.coverImageKey}
								key={article._id}
								_id={article._id}
							/>
						))
					) : (
						<h1>{t('errors.articleExistenceError')}</h1>
					)}
				</div>
			</section>
		);
	}
};

export default ArticleCardContainer;
