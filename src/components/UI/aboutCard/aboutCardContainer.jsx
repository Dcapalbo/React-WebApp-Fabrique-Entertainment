/** @format */

import { dataContactActions } from '../../../store/data-contact-slice';
import LoadingSpinner from '../loadingSpinner/loadingSpinner';
import classes from './aboutCardContainer.module.scss';
import StateGetHook from '../../../hooks/stateGetHook';
import { serverUrl } from '../../../utils/constants';
import ApiGetHook from '../../../hooks/apiGetHook';
import { useDispatch } from 'react-redux';
import AboutCard from './aboutCard';
import React from 'react';

const AboutAuthCardContainer = () => {
	let uriLocation = window.location.href;
	const dispatch = useDispatch();

	let contacts;
	let loading;
	let error;

	if (uriLocation.includes('/admin/contacts')) {
		const apiData = ApiGetHook(`${serverUrl}/get-contacts`);

		contacts = apiData.contacts;
		loading = apiData.loading;
		error = apiData.error;

		dispatch(dataContactActions.setContactsData(contacts));
	} else {
		const stateData = StateGetHook((state) => state.dataContact.contactsData);

		contacts = stateData.contacts;
		loading = stateData.loading;
		error = stateData.error;
	}

	if (loading) {
		return <LoadingSpinner />;
	} else if (error) {
		return (
			<h1 className={classes.text__align__center}>
				There are some problems, please try to refresh
			</h1>
		);
	} else {
		return (
			<section className={classes.about__wrapper__card__container}>
				<div className={classes.about__card__container}>
					{contacts.length > 0 ? (
						contacts.map((contact) => (
							<AboutCard
								name={contact.name}
								surname={contact.surname}
								role={contact.role}
								bio={contact.bio}
								email={contact.email}
								phoneNumber={contact.phoneNumber}
								slug={contact.slug}
								contactImageKey={contact?.profileCover?.contactImageKey}
								contactImageUrl={contact?.profileCover?.contactImageUrl}
								key={contact._id}
								_id={contact._id}
							/>
						))
					) : (
						<h1>{t('errors.contactExistenceError')}</h1>
					)}
				</div>
			</section>
		);
	}
};

export default AboutAuthCardContainer;
