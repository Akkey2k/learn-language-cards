import React, {useState, useEffect} from 'react';

import {Observer} from "mobx-react-lite";
import CardPopupStore from "../../Store/Popup/CardPopupStore";
import VocabularyStore from "../../Store/VocabularyStore";
import store from "store";

import PopupUi from "../../UI/PopupUI/PopupUI";
import InputUi from "../../UI/InputUI/InputUI";
import ButtonUi from "../../UI/ButtonUI/ButtonUI";
import PanelUi from "../../UI/PanelUI/PanelUI";

import cl from "./CardPopup.module.css";

const ACCESS_KEY = process.env.REACT_APP_UNSPLASH_API_KEY;

const CardPopup = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [wordForFetchPhoto, setWordForFetchPhoto] = useState("word");
    const [photos, setPhotos] = useState(null);
    const [chosenPhoto, setChosenPhoto] = useState("");


    useEffect(() => {
        const URL = `https://api.unsplash.com/search/photos?page=1&query=${wordForFetchPhoto}&client_id=${ACCESS_KEY}`;

        async function fetchPhotos() {
            const response = await fetch(URL); // Использует проп productId
            const json = await response.json();
            return json.results;
        }

        fetchPhotos().then((json) => {
            setIsLoaded(true);

            let photos = [];

            for (const photo of json) {
                photos.push(photo.urls.thumb)
            }

            setPhotos(photos);
        });
    }, [wordForFetchPhoto])

    if(!isLoaded){
        return null
    }

    /**
     * Если слово длинное, запрашивает данные по API
     *
     * @param {String} word
     */
    const searchPhotoHandler = word => {
        if(word.length >= 3) {
            setWordForFetchPhoto(word)
        }
    }

    /**
     * Обработчик клика по фото
     *
     * @param {String} photoUrl
     */
    const choosePhotoHandler = photoUrl => {
        setChosenPhoto(photoUrl);
    }

    /**
     * Обработчик формы для создания карточки в словаре
     *
     * @param {Event} e
     */
    const createCardHandler = e => {
        console.log(e)
        e.preventDefault();

        const selectedVocabulary = store.get("selectedVocabulary");

        const inputs = e.target.querySelectorAll("input");

        let cardData = {
            code: Date.now(),
            imgSrc: chosenPhoto
        }

        inputs.forEach(input => {
            cardData[input.name] = input.value;
        });

        VocabularyStore.addCardToVocabulary(Number(selectedVocabulary.code), cardData);

        inputs.forEach(input => {
            input.value = "";
        });

        CardPopupStore.setActive(false);
    }

    return (
        <Observer>
            {() => (
                <PopupUi header={"Добавить термин"} active={CardPopupStore.active}
                         setActive={() => CardPopupStore.setActive(false)}>
                    <form className={cl.vocabularyForm} onSubmit={(e) => createCardHandler(e)}>
                        <InputUi name={"word"} placeholder={"Word"} className={cl.vocabularyForm_input} onChange={(e) => searchPhotoHandler(e.target.value)}/>
                        <InputUi name={"description"} placeholder={"Description"}
                                 className={cl.vocabularyForm_input}/>
                        <PanelUi className={cl.vocabularyForm_pictures}>
                            {
                                photos
                                ?
                                photos.map(photo =>
                                    chosenPhoto === photo ?
                                        <div key={photo} onClick={() => choosePhotoHandler(photo)} className={[cl.vocabularyForm_photo, cl.vocabularyForm_photo_active].join(" ")}>
                                            <img src={photo} alt={wordForFetchPhoto}/>
                                        </div>
                                        :
                                    <div key={photo} onClick={() => choosePhotoHandler(photo)} className={cl.vocabularyForm_photo}>
                                        <img src={photo} alt={wordForFetchPhoto}/>
                                    </div>
                                )
                                :
                                "Фото не найдено"
                            }
                        </PanelUi>
                        <ButtonUi icon={"fa fa-plus"} className={cl.vocabularyForm_submit} type={"submit"}>
                            Добавить
                        </ButtonUi>
                    </form>
                </PopupUi>
            )}
        </Observer>
    );
};

export default CardPopup;