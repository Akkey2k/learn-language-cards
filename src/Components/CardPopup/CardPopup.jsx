import React from 'react';

import CardPopupStore from "../../Store/Popup/CardPopupStore";
import VocabularyStore from "../../Store/VocabularyStore";
import store from "store";

import PopupUi from "../../UI/PopupUI/PopupUI";
import InputUi from "../../UI/InputUI/InputUI";
import ButtonUi from "../../UI/ButtonUI/ButtonUI";

import classes from "./CardPopup.module.css";
import {Observer} from "mobx-react-lite";

const CardPopup = () => {
    return (
        <Observer>
            {() => (
                <PopupUi header={"Добавить термин"} active={CardPopupStore.active}
                         setActive={() => CardPopupStore.setActive(false)}>
                    <form className={classes.vocabularyForm} onSubmit={(e) => createCardHandler(e)}>
                        <InputUi name={"word"} placeholder={"Word"} className={classes.vocabularyForm_input}/>
                        <InputUi name={"description"} placeholder={"Description"}
                                 className={classes.vocabularyForm_input}/>
                        <InputUi name={"imgSrc"} placeholder={"Image url"} className={classes.vocabularyForm_input}/>
                        {/*<PanelUi className={style.vocabularyForm_pictures}>*/}
                        {/*    dsf*/}
                        {/*</PanelUi>*/}
                        <ButtonUi icon={"fa fa-plus"} className={classes.vocabularyForm_submit} type={"submit"}>
                            Добавить
                        </ButtonUi>
                    </form>
                </PopupUi>
            )}
        </Observer>
    );
};

/**
 * Обработчик формы для создания карточки в словаре
 *
 * @param {Event} e
 */
const createCardHandler = e => {
    console.log(e)
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

export default CardPopup;