import React, {useState} from 'react';

import cl from "./InputUI.module.css"


const InputUi = ({type, className, name, style, placeholder, onChange}) => {
    const [isFocused, setFocused] = useState(false);

    let inputClasses = [className, cl.input]

    if (isFocused) {
        inputClasses.push(cl.input_focused);
    }

    return (
        <div className={cl.inputWrapper}>
            <input
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                className={inputClasses.join(" ")}
                style={style}
                name={name}
                type={type}
                placeholder={placeholder}
                onChange={onChange}
            />
        </div>
    );
};

export default InputUi;