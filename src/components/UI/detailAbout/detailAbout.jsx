/** @format */

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
			Il contatto selezionato non è stato trovato, tornare alla pagina
			precedente
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
								{contacts?.name && (
									<div className={classes.detail__card__info__wrapper}>
										<p>{contacts.name ?? ''}</p>
									</div>
								)}
								{contacts?.surname && (
									<div className={classes.detail__card__info__wrapper}>
										<p>{contacts.surname ?? ''}</p>
									</div>
								)}
								{contacts?.role && (
									<div className={classes.detail__card__info__wrapper}>
										<p>{contacts.role ?? ''}</p>
									</div>
								)}
								{contacts?.bio && (
									<>
										<p>Biografia</p>
										<div className={classes.detail__card__info__wrapper}>
											<p>{contacts?.bio ?? ''}</p>
										</div>
									</>
								)}
							</div>
							<div className={classes.detail__card__left}>
								{contacts?.email && (
									<>
										<div className={classes.detail__card__info__wrapper}>
											<p>{contacts?.email ?? ''}</p>
										</div>
									</>
								)}
								{contacts?.phoneNumber && (
									<>
										<div className={classes.detail__card__info__wrapper}>
											<p>{contacts?.phoneNumber ?? ''}</p>
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
