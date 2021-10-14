import React from 'react';

import style from "./vocabularyUI.module.css";

const VocabularyUi = (props) => {
    const counterWord = getCounterWord(props.count);

    return (
        <div style={props.style} className={style.vocabulary}>
            <span className={style.vocabulary__text}>{props.word}</span>

            <span className={style.vocabulary__counter}>
                {props.count}
                {counterWord}
            </span>

            {props.children}
        </div>
    );
};


// Methods

/**
 * Возвращает корректное слово для кол-ва терминов
 *
 * @param count
 * @returns {string}
 */
const getCounterWord = (count) => {
    let word = "";

    if(count === 1){
        word = " term"
    }
    else {
        word = " terms"
    }

    return word;
}

export default VocabularyUi;