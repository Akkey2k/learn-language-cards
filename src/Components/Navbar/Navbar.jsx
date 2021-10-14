import React, {useState} from 'react';
import {useHistory} from "react-router-dom";

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

                <ButtonUi style={ButtonUiExtraStyle} icon={"fa fa-plus"} onClick={() => addButtonHandler(history.location.pathname)}>
                    Добавить
                </ButtonUi>
            </PanelUi>
        </div>
    );
};

// Methods

/**
 * Определяет метод для выполнения по history.location.pathname
 * @param pathname
 */
const addButtonHandler = (pathname) => {
    switch (pathname) {
        case "/":
            console.log("/")
            addNewVocabulary()
            break;
        case "/vocabulary":
            console.log("/vocabulary")
            break;
        case "/learn":
            console.log("/learn")
            break;
        default:
            break;
    }
}

const addNewVocabulary = () => {
    const oldStore = store.get("vocabularyData");
    store.set("vocabularyData", [{
        code: Date.now(),
        name: "Новый",
        cards: []
    }]);
}

export default Navbar;