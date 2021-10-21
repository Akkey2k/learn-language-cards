import React, {useState} from 'react';

import classes from "./CardUI.module.css"

/**
 *
 * @param {String} className
 * @param {Object} style
 * @param {Object} cardData
 *
 * @return {*}
 * @constructor
 */
const CardUi = ({className, style, cardData}) => {
    let {word, description, imgSrc} = cardData;
    const [isFlipped, setFlipped] = useState(false);

    let cardClasses = [className, classes.card];

    if(isFlipped){
        cardClasses.push(classes.card_clicked)
    }

    return (
        <div onClick={() => setFlipped(!isFlipped)} className={cardClasses.join(" ")} style={style}>
            <div className={classes.front}>
                <div className={classes.cardWord}>
                    {word}
                </div>
            </div>
            <div className={classes.back}>
                <div className={classes.cardDescription}>
                    {description}
                </div>
                <div className={classes.cardImg}>
                    <img className={classes.cardImg} src={imgSrc} alt={word}/>
                </div>
            </div>
        </div>
    );
};

export default CardUi;