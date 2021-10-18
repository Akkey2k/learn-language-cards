import React from 'react';

import {useHistory} from "react-router";
import {Link} from "react-router-dom";
import {observer} from "mobx-react-lite";
import VocabularyStore from "../../Store/VocabularyStore";
import VocabularyPopupStore from "../../Store/Popup/VocabularyPopupStore";
import store from "store";

import VocabularyUi from "../../UI/VocabularyUI";
import ButtonUi from "../../UI/ButtonUI/ButtonUI";

import style from "./menu.module.css"
import PopupUi from "../../UI/PopupUI/PopupUI";

const EditButtonExtraStyle = {
    padding: 0.5 + "em",
    borderRadius: 0.3 + "em",
}

const URL = "/";

const Menu = observer(() => {
    store.set("currentURL", URL);

    const history = useHistory();

    const vocs = VocabularyStore.data;

    return (
        <>
            <div className={style.menu}>
                {vocs.map(voc =>
                    <Link key={voc.code} to={`/learn/${voc.code}`} className={style.menu__item}>
                        <VocabularyUi word={voc.name} count={voc.cards.length}>
                            <ButtonUi variant={"white"} style={EditButtonExtraStyle} onClick={(e) => editVocabularyHandler(e, history, voc.code)} icon={"fas fa-pencil-alt"}/>
                        </VocabularyUi>
                    </Link>
                )}
            </div>
            <PopupUi header={"Добавить словарь"} active={VocabularyPopupStore.active} setActive={() => VocabularyPopupStore.setActive(false)}>
                <form onSubmit={(e) => createVocabularyHandler(e)}>
                    <input name={"vocabularyName"} type="text"/>
                    <ButtonUi type={"submit"}>
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
 * Обработчик формы для создания словаря
 *
 * @param e
 */
const createVocabularyHandler = (e) => {
    e.preventDefault();

    const input = e.target.querySelector("input");

    VocabularyStore.addVocabulary(input.value);
    VocabularyPopupStore.setActive(false)
}

export default Menu;