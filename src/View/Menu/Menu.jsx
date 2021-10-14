import React from 'react';

import VocabularyUi from "../../UI/VocabularyUI";
import ButtonUi from "../../UI/ButtonUI/ButtonUI";

import style from "./menu.module.css"
import {useHistory} from "react-router";
import {Link} from "react-router-dom";

const EditButtonExtraStyle = {
    padding: 0.5 + "em",
    borderRadius: 0.3 + "em",
}

const Menu = () => {
    const history = useHistory();

    return (
        <div className={style.menu}>
            <Link to={"/learn"} className={style.menu__item}>

                <VocabularyUi word={"First"} count={0}>
                    <ButtonUi variant={"white"} style={EditButtonExtraStyle} onClick={(e) => editVocabularyHandler(e, history)} icon={"fas fa-pencil-alt"}/>
                </VocabularyUi>
            </Link>
        </div>
    );
};


// Methods

const editVocabularyHandler = (e, history) => {
    e.preventDefault()
    history.push("/vocabulary");
}

export default Menu;