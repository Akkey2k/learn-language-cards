import React from 'react';

import cl from "./PopupUI.module.css"
import ButtonUi from "../ButtonUI/ButtonUI";

const closeBtnExtraStyle = {
    padding: 0.5 + "em",
    borderRadius: 0.5 + "em"
}

const PopupUi = ({active, setActive, header, children}) => {
    return (
        <div className={active ? cl.popupWrapper + ` ${cl.active}` : cl.popupWrapper}>
            <div className={active ? cl.popupInner + ` ${cl.active}` : cl.popupInner}>
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