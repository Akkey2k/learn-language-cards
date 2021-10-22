import React, {useState} from 'react';

import {useParams} from "react-router-dom";
import VocabularyStore from "../../Store/VocabularyStore";
import store from "store";

import CardPopup from "../../Components/CardPopup/CardPopup";
import CardUi from "../../UI/CardUI/CardUI";
import PanelUi from "../../UI/PanelUI/PanelUI";
import ButtonUi from "../../UI/ButtonUI/ButtonUI";

import cl from "./Learn.module.css";

const URL = "/learn";

const DefaultCardData = {
    code: Date.now(),
    description: "Вернитесь обратно и добавьте карточки для изучения",
    imgSrc: "https://bumper-stickers.ru/30160-thickbox_default/grustnyy-smaylik.jpg",
    word: "Карточки для изучения отсутствуют :( Тыкни на меня",
};

const Learn = () => {
    let {vocabularyCode} = useParams();
    vocabularyCode = Number(vocabularyCode);

    const selectedVocabulary = VocabularyStore.getVocabularyByCode(vocabularyCode);
    store.set("selectedVocabulary", selectedVocabulary);
    store.set("currentURL", URL);

    let [activeCard, setActiveCard] = useState(0);

    let cardsData = selectedVocabulary.cards;
    let cardData = cardsData[activeCard];

    if(!cardData){
        cardData = DefaultCardData
    }

    let [isPrevBtnDisabled, setPrevBtnDisabled] = useState(activeCard === 0);
    let [isNextBtnDisabled, setNextBtnDisabled] = useState(activeCard === cardsData.length);

    /**
     * Переключает активную карточку
     *
     * @param {String} way   Направление prev\next
     */
    const changeCardHandler = (way) => {
        const cardsCount = cardsData.length;
        switch (way) {
            case "prev":
                if(activeCard !== 0) {
                    setPrevBtnDisabled(false);
                    setNextBtnDisabled(false);

                    setActiveCard(activeCard-=1)

                    if(activeCard === 0){
                        setPrevBtnDisabled(true);
                    }
                }
                else{
                    setPrevBtnDisabled(true);
                }
                break;
            case "next":
                if(activeCard !== cardsCount - 1) {
                    setNextBtnDisabled(false);
                    setPrevBtnDisabled(false);

                    setActiveCard(activeCard+=1)

                    if(activeCard === cardsCount - 1){
                        setNextBtnDisabled(true);
                    }
                }
                else{
                    setNextBtnDisabled(true);
                }
                break;
            default:
                break;
        }
    }

    return (
        <div>
            <CardUi className={cl.card} cardData={cardData}/>
            <PanelUi className={cl.cardChanger}>
                <ButtonUi disabled={isPrevBtnDisabled} onClick={() => changeCardHandler("prev")} className={cl.btnPrev} icon={"fa fa-chevron-left"}/>
                <ButtonUi disabled={isNextBtnDisabled} onClick={() => changeCardHandler("next")} className={cl.btnNext} icon={"fa fa-chevron-right"}/>
            </PanelUi>
            <CardPopup/>
        </div>
    );
};

export default Learn;