/** @format */

import classes from './contactInfo.module.scss';
import { useTranslation } from 'react-i18next';
import React from 'react';

const ContactInfo = () => {
	const { t } = useTranslation();

	return (
		<section className={classes.contact__info__wrapper}>
			<h4>{t('genericInfo.ideas')}</h4>
			<div>
				<p>
					Se pensi di avere progetti in linea con le nostre necessità non
					esitare a contattarci presso la nostra email aziendale:{' '}
					<a href='mailto:"fabriquesrl@gmail.com"'>fabriquesrl@gmail.com</a>
				</p>
			</div>
		</section>
	);
};

export default ContactInfo;
