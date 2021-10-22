import React from 'react';

import cl from "./ButtonUI.module.css"

const ButtonUi = ({variant, type, style, className, onClick, icon, hidden, disabled, children}) => {
    let buttonCls = "" // props.variant === "black" ?

    switch(variant){
        case "dark":
            buttonCls = cl.button;
            break;
        case "white":
            buttonCls = cl.button + " " + cl.button_white;
            break;
        default:
            buttonCls = cl.button;
            break;
    }

    let btnClasses = [buttonCls, className];

    if(disabled){
        btnClasses.push(cl.button_disabled)
    }

    if(!hidden){
        return (
            <button disabled={disabled} type={type} style={style} className={btnClasses.join(" ")} onClick={onClick}>
                <span className={icon + " " + cl.button__icon}></span>
                {children
                    ?
                    <span className={cl.button__text}>{children}</span>
                    :
                    ""
                }
            </button>
        );
    }
    else{
        return (
            ""
        );
    }
};

export default ButtonUi;