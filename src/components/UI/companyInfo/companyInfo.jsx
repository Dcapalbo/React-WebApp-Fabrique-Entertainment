/** @format */

import classes from './companyInfo.module.scss';
import { useTranslation } from 'react-i18next';
import React from 'react';

const CompanyInfo = () => {
	const { t } = useTranslation();

	return (
		<section className={classes.companyInfo}>
			<h2>{t('about')}</h2>
			<div>
				<p>{t('aboutDescription')}</p>
			</div>
		</section>
	);
};

export default CompanyInfo;
