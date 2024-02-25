/** @format */

import classes from '../../../assets/cardContainer.module.scss';
import LoadingSpinner from '../loadingSpinner/loadingSpinner';
import useApiGetHook from '../../../hooks/apiGetHook';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const CardContainer = ({
	component: CardComponent,
	fetchDataUrl,
	childComponentType,
	useFilter = false,
}) => {
	const { t } = useTranslation();
	const typeData = useSelector((state) => state.dataType.dataType) || '';
	const { data, loading } = useApiGetHook(fetchDataUrl);
	const [filteredData, setFilteredData] = useState([]);

	let cardContainerStyle = classes.card__container;

	if (childComponentType === 'Article') {
		cardContainerStyle += ` ${classes.width__article__card}`;
	} else {
		cardContainerStyle += ` ${classes.width__generic__card}`;
	}

	useEffect(() => {
		if (data && useFilter) {
			const newData = typeData
				? data.filter((item) => {
						if (item.type) {
							return item.type === typeData;
						} else if (item.tag) {
							return (
								item.tag.trim().toLowerCase() === typeData.trim().toLowerCase()
							);
						}
				  })
				: data;
			setFilteredData(newData);
		}
	}, [typeData, data, useFilter]);

	if (loading) {
		return <LoadingSpinner />;
	}

	let contentToDisplay;
	if (useFilter && filteredData.length > 0) {
		contentToDisplay = filteredData.map((item) => (
			<CardComponent
				{...item}
				key={item._id}
			/>
		));
	} else if (!useFilter && data && data.length > 0) {
		contentToDisplay = data.map((item) => (
			<CardComponent
				{...item}
				key={item._id}
			/>
		));
	} else {
		contentToDisplay = <h1>{t('errors.dataExistenceError')}</h1>;
	}

	return (
		<section className={classes.wrapper__card__container}>
			<div className={cardContainerStyle}>{contentToDisplay}</div>
		</section>
	);
};

export default CardContainer;
