/** @format */

import { BiLogoFacebookCircle } from 'react-icons/bi';
import { BsInstagram } from 'react-icons/bs';
import classes from './footer.module.scss';
import React from 'react';

const Footer = () => {
	return (
		<footer className={classes.footer}>
			<div className={classes.footer__container}>
				<div className={classes.footer__container__elm}>
					<h2>Dati Finanziari</h2>
					<p>Fabrique Entertainment S.r.l.</p>
					<p>Codice fiscale e P.IVA: 12753751002</p>
					<p>Cap. sociale interamente versato 50.000€</p>
				</div>
				<div className={classes.footer__container__elm}>
					<h2>Recapiti Aziendali</h2>
					<p>Sede Legale: ROMA (RM) Via Paolo Emilio 34, CAP 00192</p>
					<p>Sede Operativa: ROMA (RM) Via Petrarca 8, CAP 00185</p>
					<p>
						email aziendale:{' '}
						<a href='mailto:"fabriquesrl@gmail.com"'>fabriquesrl@gmail.com</a>
					</p>
					<p>
						pec aziendale:{' '}
						<a href='mailto:fabriquesrl@pec.it'>fabriquesrl@pec.it</a>
					</p>
					<p>
						Recapito telefonico: <a href='tel:+393337066526'>+39|3337066526</a>
					</p>
				</div>
				<div className={classes.footer__container__elm}>
					<h2>Social</h2>
					<a
						href='https://www.instagram.com/fabrique_entertainment/?hl=it'
						target='_blank'
						rel='noreferrer'>
						<BsInstagram size={30} />
					</a>
					<a
						href='https://www.facebook.com/FabriqueEntertainment/?locale=it_IT'
						target='_blank'
						rel='noreferrer'>
						<BiLogoFacebookCircle size={30} />
					</a>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
