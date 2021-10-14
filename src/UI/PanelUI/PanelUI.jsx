import React from 'react';

import style from "./PanelUI.module.css"

const PanelUi = (props) => {
    return (
        <div style={props.style} className={style.panel}>
            {props.children}
        </div>
    );
};

export default PanelUi;