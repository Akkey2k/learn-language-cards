import React, {useState} from 'react';

import cl from "./CardUI.module.css"

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
    const [isFlipped, setFlipped] = useState(true);

    let cardClasses = [className, cl.card];

    if(isFlipped){
        cardClasses.push(cl.card_clicked)
    }

    return (
        <div onClick={() => setFlipped(!isFlipped)} className={cardClasses.join(" ")} style={style}>
            <div className={cl.front}>
                <div className={cl.cardWord}>
                    {word}
                </div>
            </div>
            <div className={cl.back}>
                <div className={cl.cardDescription}>
                    {description}
                </div>
                <div className={cl.cardImg}>
                    <img className={cl.cardImg} src={imgSrc} alt={word}/>
                </div>
            </div>
        </div>
    );
};

export default CardUi;