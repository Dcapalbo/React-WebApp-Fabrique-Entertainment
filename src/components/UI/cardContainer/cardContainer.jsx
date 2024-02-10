/** @format */

import classes from '../../../assets/cardContainer.module.scss';
import LoadingSpinner from '../loadingSpinner/loadingSpinner';
import useApiGetHook from '../../../hooks/apiGetHook';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const CardContainer = ({ component: CardComponent, fetchDataUrl }) => {
	const { t } = useTranslation();

	const typeData = useSelector((state) => state.dataType.dataType) || '';
	const { data, error, loading } = useApiGetHook(fetchDataUrl);
	const [filteredData, setFilteredData] = useState([]);

	useEffect(() => {
		if (data) {
			const newData = typeData
				? data.filter((item) => {
						if (item.type) {
							return item.type === typeData;
						} else if (item.tag) {
							return (
								//make it better mind the name of the tag in BE
								item.tag.trim().toLowerCase() === typeData.trim().toLowerCase()
							);
						}
				  })
				: data;
			setFilteredData(newData);
		}
	}, [typeData, data]);

	if (loading) {
		return <LoadingSpinner />;
	}

	if (error) {
		return (
			<h1 className={classes.text__align__center}>
				{t('errors.genericError')}
			</h1>
		);
	}

	return (
		<section className={classes.wrapper__card__container}>
			<div className={classes.card__container}>
				{filteredData.length > 0 ? (
					filteredData.map((item) => (
						<CardComponent
							{...item}
							key={item._id}
						/>
					))
				) : (
					<h1>{t('errors.dataExistenceError')}</h1>
				)}
			</div>
		</section>
	);
};

export default CardContainer;
