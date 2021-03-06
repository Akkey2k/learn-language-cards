import React from 'react';

import {useParams} from "react-router-dom";
import {observer} from "mobx-react-lite";

import VocabularyStore from "../../Store/VocabularyStore";
import store from "store";

import PanelUi from "../../UI/PanelUI/PanelUI";
import ButtonUi from "../../UI/ButtonUI/ButtonUI";
import CardPopup from "../../Components/CardPopup";

import cl from "./Vocabulary.module.css"
import {useMediaQuery} from "react-responsive";

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

    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' })

    if(isTabletOrMobile) {
        wordPanelExtraStyle.width = 90 + "%"
    }

    return (
        <>
            <div className={cl.cardList}>
                {selectedVocabulary.cards.map(card =>
                    <PanelUi key={card.code} style={wordPanelExtraStyle}>
                        <span className={cl.word}>{card.word}</span>

                        {
                            isTabletOrMobile ?
                            ""
                            :
                            <span className={cl.word}>{card.description}</span>
                        }

                        <ButtonUi onClick={() => removeBtnHandler(vocabularyCode, Number(card.code))} style={removeBtnExtraStyle} icon={"fa fa-times"}/>
                    </PanelUi>
                )}
            </div>
            <CardPopup/>
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

export default Vocabulary;