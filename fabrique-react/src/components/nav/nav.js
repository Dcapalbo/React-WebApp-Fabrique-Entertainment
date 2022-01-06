import { useState } from 'react';
import classes from './nav.module.scss';

const Navigation = (props) => {
    return(
        <nav>
            <ul className={classes.navigation}>
                <li>Home</li>
                <li>Projects</li>
                <li>Contacts</li>
            </ul>
        </nav>
    )
}

export default Navigation;