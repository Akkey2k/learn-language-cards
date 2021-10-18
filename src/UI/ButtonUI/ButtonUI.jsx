import React from 'react';

import classes from "./ButtonUI.module.css"

const ButtonUi = ({variant, type, style, onClick, icon, hidden, children}) => {
    let buttonCls = "" // props.variant === "black" ?

    switch(variant){
        case "dark":
            buttonCls = classes.button;
            break;
        case "white":
            buttonCls = classes.button + " " + classes.button_white;
            break;
        default:
            buttonCls = classes.button;
            break;
    }

    if(!hidden){
        return (
            <button type={type} style={style} className={buttonCls} onClick={onClick}>
                <span className={icon + " " + classes.button__icon}></span>

                {children
                    ?
                    <span className={classes.button__text}>{children}</span>
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