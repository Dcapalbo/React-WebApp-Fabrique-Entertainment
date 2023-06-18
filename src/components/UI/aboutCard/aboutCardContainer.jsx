/** @format */

import { dataContactActions } from '../../../store/data-contact-slice';
import classes from './aboutCardContainer.module.scss';
import StateGetHook from '../../../hooks/stateGetHook';
import base64ArrayBuffer from '../../../utils/base64';
import ApiGetHook from '../../../hooks/apiGetHook';
import { useDispatch } from 'react-redux';
import AboutCard from './aboutCard';
import LoadingSpinner from '../loadingSpinner/loadingSpinner';

const AboutAuthCardContainer = () => {
	const dispatch = useDispatch();
	let uriLocation = window.location.href;

	let contacts;
	let loading;
	let error;

	if (uriLocation.includes('/admin/contacts')) {
		const apiData = ApiGetHook(
			`${process.env.REACT_APP_API_LOCAL_PORT}/get-contacts`
		);

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
								imageUrl={`data:image/png;base64,${base64ArrayBuffer(contact)}`}
								key={contact._id}
								_id={contact._id}
							/>
						))
					) : (
						<h1>
							Non ci sono elementi per questa ricerca, inserirli manualmente
							presso la sezione del Database dedicata ai contatti
						</h1>
					)}
				</div>
			</section>
		);
	}
};

export default AboutAuthCardContainer;
