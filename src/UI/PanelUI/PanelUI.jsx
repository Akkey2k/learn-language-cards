import React from 'react';

import cl from "./PanelUI.module.css"

const PanelUi = ({style, className, children}) => {
    let panelClasses = [className, cl.panel]

    return (
        <div style={style} className={panelClasses.join(" ")}>
            {children}
        </div>
    );
};

export default PanelUi;