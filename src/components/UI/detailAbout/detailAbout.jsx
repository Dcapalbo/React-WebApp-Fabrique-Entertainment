/** @format */

import { BsFillEnvelopeFill, BsTelephone } from 'react-icons/bs';
import LoadingSpinner from '../loadingSpinner/loadingSpinner';
import classes from '../../../assets/detailCard.module.scss';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const DetailAboutContact = () => {
	const contact = useSelector((state) => state.dataContact.contactData);
	const [loading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const { t } = useTranslation();

	useEffect(() => {
		setIsLoading(true);
		if (contact) {
			setIsLoading(false);
		} else {
			setError(true);
		}
	}, [contact]);

	if (loading) {
		return <LoadingSpinner />;
	} else if (error) {
		<h1>{t('errors.contactError')}</h1>;
	} else {
		return (
			contact && (
				<section className={classes.detail__container}>
					<div className={classes.detail__card__container}>
						<img
							className={classes.detail__card__image}
							src={contact.contactImageUrl ?? ''}
							alt={contact.name ?? ''}
							name={contact.name ?? ''}
							loading='lazy'
						/>
						<div className={classes.detail__card__info__flex}>
							<div className={classes.detail__card__left}>
								{contact?.name && contact?.surname && (
									<>
										<p>{t('genericInfo.name')}</p>
										<div className={classes.detail__card__info__wrapper}>
											<p>{contact?.name + ' ' + contact?.surname}</p>
										</div>
									</>
								)}
								{contact?.role && (
									<>
										<p>{t('role')}</p>
										<div className={classes.detail__card__info__wrapper}>
											<p>{contact.role ?? ''}</p>
										</div>
									</>
								)}
								{contact?.bio && (
									<>
										<p>{t('bio')}</p>
										<div className={classes.detail__card__info__wrapper}>
											<p>{contact?.bio ?? ''}</p>
										</div>
									</>
								)}
							</div>
							<div className={classes.detail__card__right}>
								{contact?.email && (
									<>
										<p>{t('genericInfo.email')}</p>
										<div className={classes.detail__card__right__container}>
											<div className={classes.detail__card__right__item}>
												<a href={`mailto:${contact?.email}`}>
													{contact?.email}
												</a>
												<BsFillEnvelopeFill />
											</div>
										</div>
									</>
								)}
								{contact?.phoneNumber && (
									<>
										<p>{t('genericInfo.number')}</p>
										<div className={classes.detail__card__right__container}>
											<div className={classes.detail__card__right__item}>
												<a href={`tel:${contact?.phoneNumber}`}>
													{contact?.phoneNumber}
												</a>
												<BsTelephone />
											</div>
										</div>
									</>
								)}
							</div>
						</div>
					</div>
				</section>
			)
		);
	}
};

export default DetailAboutContact;
