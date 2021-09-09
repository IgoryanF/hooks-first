import React from 'react';
import classes from "./modal.module.css";

const MyModal = ({ active, setActive, children }) => {

    const rootClasses = [classes.modal];
    const contentClasses = [classes.modal__content];

    if (active) {
        rootClasses.push(classes.active);
        contentClasses.push(classes.active)
    }

    return (
        <div className={rootClasses.join(' ')} onClick={() => setActive(false)}>
            <div className={contentClasses.join(' ')} onClick={event => event.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default MyModal;