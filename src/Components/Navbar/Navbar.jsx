import React, {useState} from 'react';
import {useHistory} from "react-router-dom";

import VocabularyStore from "../../Store/VocabularyStore"
import CardPopupStore from "../../Store/Popup/CardPopupStore"
import VocabularyPopupStore from "../../Store/Popup/VocabularyPopupStore"
import store from "store";

import PanelUi from "../../UI/PanelUI";
import ButtonUi from "../../UI/ButtonUI";


import style from "./Navbar.module.css"

let ButtonUiExtraStyle = {
    padding: 1 + "em",
    marginRight: 1 + "em"
}

const Navbar = (props) => {
    let history = useHistory();

    const [location, setLocation] = useState(history.location.pathname);

    history.listen((location, action) => {
        setLocation(location.pathname);
    });

    const isGoBackVisible = location === "/";

    return (
        <div className={style.navbar}>
            <PanelUi style={props.style}>
                <ButtonUi hidden={isGoBackVisible} style={ButtonUiExtraStyle} icon={"fa fa-arrow-left"} onClick={() => history.goBack()}/>

                <ButtonUi style={ButtonUiExtraStyle} icon={"fa fa-plus"} onClick={() => addButtonHandler()}>
                    Добавить
                </ButtonUi>
            </PanelUi>
        </div>
    );
};

// Methods

/**
 * Определяет метод для выполнения по URL
 */
const addButtonHandler = () => {
    let pathname = store.get("currentURL");

    switch (pathname) {
        case "/":
            console.log("/")
            addNewVocabulary()
            break;
        case "/vocabulary":
            console.log("/vocabulary")
            addNewVocabularyCard()
            break;
        case "/learn":
            console.log("/learn")
            break;
        default:
            break;
    }
}

const addNewVocabulary = () => {
    VocabularyPopupStore.setActive(true);

    VocabularyStore.addVocabulary("Имя нового словаря");
}

const addNewVocabularyCard = () => {
    const selectedVocabulary = store.get("selectedVocabulary");

    CardPopupStore.setActive(true);

    let cardData = {
        code: Date.now(),
        word: "pronounce",
        description: "i know that word, but i dont remember how to ____ it",
        imgSrc: "https://www.wikihow.com/images/thumb/e/e3/Pronounce-Wikipedia-Step-2-Version-2.jpg/v4-460px-Pronounce-Wikipedia-Step-2-Version-2.jpg.webp"
    }

    VocabularyStore.addCardToVocabulary(Number(selectedVocabulary.code), cardData);
}

export default Navbar;