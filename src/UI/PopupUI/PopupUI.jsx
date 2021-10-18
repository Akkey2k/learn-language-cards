import React from 'react';

import style from "./PopupUI.module.css"
import ButtonUi from "../ButtonUI/ButtonUI";

const closeBtnExtraStyle = {
    padding: 0.5 + "em",
    borderRadius: 0.5 + "em"
}

const PopupUi = ({active, setActive, header, children}) => {
    return (
        <div className={active ? style.popupWrapper + ` ${style.active}` : style.popupWrapper}>
            <div className={active ? style.popupInner + ` ${style.active}` : style.popupInner}>
                <div className={style.popupHeader}>
                    {header || ""}
                    <ButtonUi style={closeBtnExtraStyle} icon={"fa fa-times"} onClick={() => setActive(false)}/>
                </div>
                {children}
            </div>
        </div>
    );
};

export default PopupUi;