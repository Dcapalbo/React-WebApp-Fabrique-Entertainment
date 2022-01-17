
import { useState } from 'react';
import classes from './accordion.module.scss';

const Accordion = () => {

const [selected, setSelected] = useState(null);

const toggleAccordion = (i) => {
    let firstElm = document.querySelector(`.${classes.accordion__description__show}`);
    console.log(firstElm);
    if (i === 0) {
        firstElm.classList.remove(`${classes.accordion__description__show}`);
        firstElm.classList.add(`${classes.accordion__description}`);
    } else if (selected === i) {
        return setSelected(null);
    } 
    setSelected(i);
}
    return(
        <div className={classes.wrapper__accordion}>
            <div className={classes.accordion}>
                {accordionData.map((item, i) => (
                   <div key={i} className={classes.item} onClick={() => toggleAccordion(i, item)}>
                       <div>
                           <h2 className={selected === i ? `${classes.active}` : `${classes.accordion__title}`}>{item.headline}</h2>
                       </div>
                        <div className={
                            i === 0 && !selected ? 
                            `${classes.accordion__description__show}` : selected === i ? 
                            `${classes.accordion__description__show}` : `${classes.accordion__description}`
                            }
                        >{item.description}
                        </div>
                   </div> 
                ))}
            </div>
        </div>
    );
}

const accordionData = [
    {
        headline: 'Vision',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
    },
    {
        headline: 'Ethics',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
    },
    {
        headline: 'Team',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
    }

]

export default Accordion;