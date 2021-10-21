import React from 'react';

import classes from "./ButtonUI.module.css"

const ButtonUi = ({variant, type, style, className, onClick, icon, hidden, disabled, children}) => {
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

    let btnClasses = [buttonCls, className];

    if(disabled){
        btnClasses.push(classes.button_disabled)
    }

    if(!hidden){
        return (
            <button disabled={disabled} type={type} style={style} className={btnClasses.join(" ")} onClick={onClick}>
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