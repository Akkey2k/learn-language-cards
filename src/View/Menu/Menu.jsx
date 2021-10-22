import React from 'react';

import {useHistory} from "react-router";
import {Link} from "react-router-dom";
import {observer} from "mobx-react-lite";

import VocabularyStore from "../../Store/VocabularyStore";
import VocabularyPopupStore from "../../Store/Popup/VocabularyPopupStore";
import store from "store";

import VocabularyUi from "../../UI/VocabularyUI";
import ButtonUi from "../../UI/ButtonUI/ButtonUI";
import PopupUi from "../../UI/PopupUI/PopupUI";
import InputUi from "../../UI/InputUI/InputUI";

import cl from "./menu.module.css";

const EditButtonExtraStyle = {
    padding: 0.5 + "em " + 0.7 + "em",
    borderRadius: 0.3 + "em",
    marginLeft: 1 + "em"
}

const URL = "/";

const Menu = observer(() => {
    store.set("currentURL", URL);

    const history = useHistory();

    const vocs = VocabularyStore.data;

    return (
        <>
            <div className={cl.menu}>
                {vocs.map(voc =>
                    <Link key={voc.code} to={`/learn/${voc.code}`} className={cl.menu__item}>
                        <VocabularyUi word={voc.name} count={voc.cards.length}>
                            <ButtonUi variant={"white"} style={EditButtonExtraStyle} onClick={(e) => editVocabularyHandler(e, history, voc.code)} icon={"fas fa-pencil-alt"}/>
                            <ButtonUi variant={"white"} style={EditButtonExtraStyle} onClick={(e) => removeVocabularyHandler(e, voc.code)} icon={"fas fa-trash"}/>
                        </VocabularyUi>
                    </Link>
                )}
            </div>
            <PopupUi header={"Добавить словарь"} active={VocabularyPopupStore.active} setActive={() => VocabularyPopupStore.setActive(false)}>
                <form className={cl.vocabularyForm} onSubmit={(e) => createVocabularyHandler(e)}>
                    <InputUi className={cl.vocabularyForm_input} name={"vocabularyName"} type={"text"}/>
                    <ButtonUi icon={"fa fa-plus"} className={cl.vocabularyForm_submit} type={"submit"}>
                        Добавить
                    </ButtonUi>
                </form>
            </PopupUi>
        </>
    );
});


// Methods

/**
 * Производит переход на страницу редактирования словаря
 *
 * @param e
 * @param history
 * @param code      код словаря
 *
 * @returns {void}
 */
const editVocabularyHandler = (e, history, code) => {
    e.preventDefault()
    history.push(`/vocabulary/${code}`);
}


/**
 * Удаляет словарь
 *
 * @param e
 * @param code
 */
const removeVocabularyHandler = (e, code) => {
    e.preventDefault();
    VocabularyStore.removeVocabulary(code);
}


/**
 * Обработчик формы для создания словаря
 *
 * @param e
 */
const createVocabularyHandler = (e) => {
    e.preventDefault();

    const input = e.target.querySelector("input");

    VocabularyStore.addVocabulary(input.value);

    input.value = "";
    VocabularyPopupStore.setActive(false)
}

export default Menu;