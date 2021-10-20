import React from 'react';

import {useParams} from "react-router-dom";
import VocabularyStore from "../../Store/VocabularyStore";
import CardPopupStore from "../../Store/Popup/CardPopupStore"
import store from "store";
import {observer, Observer} from "mobx-react-lite";

import PanelUi from "../../UI/PanelUI/PanelUI";

import style from "./Vocabulary.module.css"
import ButtonUi from "../../UI/ButtonUI/ButtonUI";
import PopupUi from "../../UI/PopupUI/PopupUI";
import InputUi from "../../UI/InputUI/InputUI";

const URL = "/vocabulary";

const Vocabulary = observer(() => {
    let {vocabularyCode} = useParams();
    vocabularyCode = Number(vocabularyCode);

    const selectedVocabulary = VocabularyStore.getVocabularyByCode(vocabularyCode);
    store.set("selectedVocabulary", selectedVocabulary);
    store.set("currentURL", URL);

    const wordPanelExtraStyle = {
        width: 60 + "%",
        marginTop: 1 + "em",
        display: "flex",
        justifyContent: "space-between"
    }

    const removeBtnExtraStyle = {
        padding: 0.5 + "em",
        borderRadius: 0.5 + "em"
    }

    return (
        <>
            <div className={style.cardList}>
                {selectedVocabulary.cards.map(card =>
                    <PanelUi key={card.code} style={wordPanelExtraStyle}>
                        <span className={style.word}>{card.word}</span>
                        <span className={style.word}>{card.description}</span>

                        <ButtonUi onClick={() => removeBtnHandler(vocabularyCode, Number(card.code))} style={removeBtnExtraStyle} icon={"fa fa-times"}/>
                    </PanelUi>
                )}
            </div>
            <Observer>
                {() => (
                    <PopupUi header={"Добавить термин"} active={CardPopupStore.active} setActive={() => CardPopupStore.setActive(false)}>
                        <form className={style.vocabularyForm} onSubmit={(e) => createCardHandler(e)}>
                            <InputUi name={"word"} placeholder={"Word"} className={style.vocabularyForm_input}/>
                            <InputUi name={"description"} placeholder={"Description"} className={style.vocabularyForm_input}/>
                            <InputUi name={"imgSrc"} placeholder={"Image url"} className={style.vocabularyForm_input}/>
                            {/*<PanelUi className={style.vocabularyForm_pictures}>*/}
                            {/*    dsf*/}
                            {/*</PanelUi>*/}
                            <ButtonUi icon={"fa fa-plus"} className={style.vocabularyForm_submit} type={"submit"}>
                                Добавить
                            </ButtonUi>
                        </form>
                    </PopupUi>
                )}
            </Observer>
        </>
    );
});

/**
 * Обработчик удаления карточки из словаря
 *
 * @param {Number} vocabularyCode    Код словаря
 * @param {Number} cardCode          Код карточки
 */
const removeBtnHandler = (vocabularyCode, cardCode) => {
    VocabularyStore.removeCardFromVocabulary(vocabularyCode, cardCode);
}

/**
 * Обработчик формы для создания карточки в словаре
 *
 * @param {Event} e
 */
const createCardHandler = e => {
    e.preventDefault();

    const selectedVocabulary = store.get("selectedVocabulary");

    const inputs = e.target.querySelectorAll("input");

    let cardData = {
        code: Date.now(),
    }

    inputs.forEach(input => {
        cardData[input.name] = input.value;
    });

    VocabularyStore.addCardToVocabulary(Number(selectedVocabulary.code), cardData);

    inputs.forEach(input => {
        input.value = "";
    });

    CardPopupStore.setActive(false);
}

export default Vocabulary;