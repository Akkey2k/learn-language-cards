import React from 'react';

import ButtonUi from "../ButtonUI/ButtonUI";

import cl from "./PopupUI.module.css"
import {useMediaQuery} from "react-responsive";

const closeBtnExtraStyle = {
    padding: 0.5 + "em",
    borderRadius: 0.5 + "em"
}

const PopupUi = ({active, setActive, header, children}) => {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' })

    let wrapperClasses = [cl.popupWrapper];
    let innerClasses = [cl.popupInner];

    if(active){
        wrapperClasses.push(cl.active)
        innerClasses.push(cl.active)
    }

    if(isTabletOrMobile){
        innerClasses.push(cl.popupInnerMobile)
    }

    return (
        <div className={wrapperClasses.join(" ")}>
            <div className={innerClasses.join(" ")}>
                <div className={cl.popupHeader}>
                    {header || ""}
                    <ButtonUi style={closeBtnExtraStyle} icon={"fa fa-times"} onClick={() => setActive(false)}/>
                </div>
                {children}
            </div>
        </div>
    );
};

export default PopupUi;