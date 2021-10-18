import React from 'react';

import {useHistory} from "react-router";
import {Link} from "react-router-dom";
import {observer} from "mobx-react-lite";
import VocabularyStore from "../../Store/VocabularyStore";

import VocabularyUi from "../../UI/VocabularyUI";
import ButtonUi from "../../UI/ButtonUI/ButtonUI";

import style from "./menu.module.css"

const EditButtonExtraStyle = {
    padding: 0.5 + "em",
    borderRadius: 0.3 + "em",
}

const Menu = observer(() => {
    const history = useHistory();

    const vocs = VocabularyStore.data;

    return (
        <div className={style.menu}>
            {vocs.map(voc =>
                <Link key={voc.code} to={`/learn/${voc.code}`} className={style.menu__item}>
                    <VocabularyUi word={voc.name} count={voc.cards.length}>
                        <ButtonUi variant={"white"} style={EditButtonExtraStyle} onClick={(e) => editVocabularyHandler(e, history, voc.code)} icon={"fas fa-pencil-alt"}/>
                    </VocabularyUi>
                </Link>
            )}
        </div>
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

export default Menu;