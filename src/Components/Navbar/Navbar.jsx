import React, {useState} from 'react';
import {useHistory} from "react-router-dom";

import CardPopupStore from "../../Store/Popup/CardPopupStore"
import VocabularyPopupStore from "../../Store/Popup/VocabularyPopupStore"
import store from "store";

import PanelUi from "../../UI/PanelUI";
import ButtonUi from "../../UI/ButtonUI";

import cl from "./Navbar.module.css"
import { useMediaQuery } from 'react-responsive'

let ButtonUiExtraStyle = {
    padding: 1 + "em",
    marginRight: 1 + "em"
}

const Navbar = ({style, className}) => {
    let history = useHistory();

    const [location, setLocation] = useState(history.location.pathname);

    history.listen((location, action) => {
        setLocation(location.pathname);
    });

    const isGoBackVisible = location === "/";

    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' })

    let navbarClasses = [className];

    if(isTabletOrMobile) {
        navbarClasses.push(cl.navbarMobile)
    }
    else{
        navbarClasses.push(cl.navbar)
    }

    return (
        <div className={navbarClasses.join(" ")}>
            <PanelUi style={style}>
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
            addNewVocabularyCard()
            break;
        default:
            break;
    }
}

const addNewVocabulary = () => {
    VocabularyPopupStore.setActive(true);
}

const addNewVocabularyCard = () => {
    CardPopupStore.setActive(true);
}

export default Navbar;