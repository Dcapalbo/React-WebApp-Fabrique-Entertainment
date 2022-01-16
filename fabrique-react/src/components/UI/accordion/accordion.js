
import { useState } from 'react';
import classes from './accordion.module.scss';

const accordionData = [
    {
        headline: 'Vision',
        description: 'this is our society vision'
    },
    {
        headline: 'About',
        description: 'this is our about'
    },
    {
        headline: 'News',
        description: 'those are our news'
    },
    {
        headline: 'Team',
        description: 'this is our team'
    }
]

const Accordion = () => {

const [selected, setSelected] = useState(null);

const toggle = (i) => {
    if (selected === i) {
        return setSelected(null);
    }
    setSelected(i);
}

    return(
        <div className={classes.wrapper__accordion}>
            <div className={classes.accordion}>
                {accordionData.map((item, i) => (
                   <div className={classes.item} onClick={() => toggle(i)}>
                       <div className={classes.accordion__title}>
                           <h2>{item.headline}</h2>
                           <span>{selected === i ? '-' : '+'}</span>
                       </div>
                        <div className={
                            selected === i ? `${classes.accordion__description__show}` : `${classes.accordion__description}`
                            }>{item.description}
                        </div>
                   </div> 
                ))}
            </div>
        </div>
    );
}

export default Accordion;