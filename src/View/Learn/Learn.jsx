import React from 'react';

import {useParams} from "react-router-dom";
import VocabularyStore from "../../Store/VocabularyStore";
import store from "store";

const URL = "/learn";

const Learn = () => {
    let {vocabularyCode} = useParams();
    vocabularyCode = Number(vocabularyCode);

    const selectedVocabulary = VocabularyStore.getVocabularyByCode(vocabularyCode);
    store.set("selectedVocabulary", selectedVocabulary);
    store.set("currentURL", URL);

    return (
        <div>
           Learn
        </div>
    );
};

export default Learn;