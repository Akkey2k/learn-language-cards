import React from 'react';

import cl from "./vocabularyUI.module.css";

const VocabularyUi = ({count, style, word, children}) => {
    const counterWord = getCounterWord(count);

    return (
        <div style={style} className={cl.vocabulary}>
            <span className={cl.vocabulary__text}>{word}</span>

            <span className={cl.vocabulary__counter}>
                {count}
                {counterWord}
            </span>

            {children}
        </div>
    );
};


// Methods

/**
 * Возвращает корректное слово для кол-ва терминов
 *
 * @param {Number} count
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