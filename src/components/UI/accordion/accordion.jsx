/** @format */

import classes from './accordion.module.scss';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import React from 'react';

const Accordion = () => {
	const { t } = useTranslation();
	const [selected, setSelected] = useState(1);

	const accordionData = [
		{
			headline: t('company'),
			description: t('companyDescription'),
		},
		{
			headline: t('vision'),
			description: t('visionDescription'),
		},
		{
			headline: t('ethics'),
			description: t('ethicsDescription'),
		},
	];

	const toggleAccordion = (i) => {
		if (selected === i) {
			return setSelected(null);
		}
		setSelected(i);
	};
	return (
		<div className={classes.wrapper__accordion}>
			<div className={classes.accordion}>
				{accordionData.map((item, i) => (
					<div
						key={i}
						className={classes.item}
						onClick={() => toggleAccordion(i)}>
						<div>
							<h2
								className={
									selected === i || (i === 0 && !selected)
										? `${classes.active}`
										: `${classes.accordion__title}`
								}>
								{item.headline}
							</h2>
						</div>
						<div
							className={
								i === 0 && !selected
									? `${classes.accordion__description__show}`
									: selected === i
									? `${classes.accordion__description__show}`
									: `${classes.accordion__description}`
							}>
							{item.description}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Accordion;
