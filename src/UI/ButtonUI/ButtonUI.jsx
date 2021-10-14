import React from 'react';

import style from "./ButtonUI.module.css"

const ButtonUi = (props) => {
    let buttonCls = "" // props.variant === "black" ?

    switch(props.variant){
        case "dark":
            buttonCls = style.button;
            break;
        case "white":
            buttonCls = style.button + " " + style.button_white;
            break;
        default:
            buttonCls = style.button;
            break;
    }

    if(!props.hidden){
        return (
            <div style={props.style} className={buttonCls} onClick={props.onClick}>
                <span className={props.icon + " " + style.button__icon}></span>

                {props.children
                    ?
                    <span className={style.button__text}>{props.children}</span>
                    :
                    ""
                }
            </div>
        );
    }
    else{
        return (
            ""
        );
    }
};

export default ButtonUi;