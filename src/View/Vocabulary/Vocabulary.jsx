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
                        <form>
                            <input type="text"/>
                            <input type="text"/>
                            <input type="text"/>
                        </form>
                    </PopupUi>
                )}
            </Observer>
        </>
    );
});

const removeBtnHandler = (vocabularyCode, cardCode) => {
    VocabularyStore.removeCardFromVocabulary(vocabularyCode, cardCode);
}

export default Vocabulary;