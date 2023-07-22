/** @format */

import { BsFillEnvelopeFill, BsTelephone } from 'react-icons/bs' 
import LoadingSpinner from '../loadingSpinner/loadingSpinner';
import classes from '../../../assets/detailCard.module.scss';
import StateGetHook from '../../../hooks/stateGetHook';
import { useTranslation } from 'react-i18next';
import React from 'react';

const DetailAboutContact = () => {
	const { t } = useTranslation();
	const { contacts, loading, error } = StateGetHook(
		(state) => state.dataContact.contactData
	);

	if (loading) {
		return <LoadingSpinner />;
	} else if (error) {
		<h1>
			{t("errors.contactError")}
		</h1>;
	} else {
		return (
			contacts && (
				<section className={classes.detail__container}>
					<div className={classes.detail__card__container}>
						<img
							className={classes.detail__card__image}
							src={contacts.imageUrl ?? ''}
							alt={contacts.name ?? ''}
							name={contacts.name ?? ''}
							loading='lazy'
						/>
						<div className={classes.detail__card__info__flex}>
							<div className={classes.detail__card}>
								{(contacts?.name && contacts?.surname) && (
									<div className={classes.detail__card__info__wrapper}>
										<p>{(contacts.name + " " + contacts.surname) ?? ''}</p>
									</div>
								)}
								{contacts?.role && (
									<>
										<p>{t("role")}</p>
										<div className={classes.detail__card__info__wrapper}>
											<p>{contacts.role ?? ''}</p>
										</div>
									</>
								)}
								{contacts?.bio && (
									<>
										<p>{t("bio")}</p>
										<div className={classes.detail__card__info__wrapper}>
											<p>{contacts?.bio ?? ''}</p>
										</div>
									</>
								)}
							</div>
							<div className={classes.detail__card__right}>
								{contacts?.email && (
									<>
										<p>{t("genericInfo.email")}</p>
										<div className={classes.detail__card__right__container}>
											<div className={classes.detail__card__right__item}>
												<a href={`mailto:${contacts?.email}`}>{contacts?.email}</a>
												<BsFillEnvelopeFill />	
											</div>
										</div>
									</>
								)}
								{contacts?.phoneNumber && (
									<>
										<p>{t("genericInfo.number")}</p>
										<div className={classes.detail__card__right__container}>
											<div className={classes.detail__card__right__item}>
												<a href={`tel:${contacts?.phoneNumber}`}>{contacts?.phoneNumber}</a>
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
