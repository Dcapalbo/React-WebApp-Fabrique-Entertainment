/** @format */

import HeroVideo from '../../assets/img/80 - Fabrique_E_Logo_Animato.mp4';
import classes from './hero.module.scss';
import React from 'react';

const Hero = () => {
	return (
		<section className={classes.hero}>
			<video
				className={classes.fabrique__video}
				autoPlay='autoPlay'
				controls={false}
				muted
				loop>
				<source
					src={HeroVideo}
					type='video/mp4'
				/>
			</video>
		</section>
	);
};

export default Hero;
