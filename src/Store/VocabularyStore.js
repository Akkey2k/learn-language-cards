import { autorun, toJS, makeAutoObservable } from "mobx";
import store from "store";

let emptyData = [
    {
        code: Date.now(),
        name: "Новый",
        cards: []
    }
]

class VocabularyStore {
    data = store.get("vocabularyData") || emptyData;

    constructor() {
        makeAutoObservable(this);

        autorun(() => {
            store.set("vocabularyData", toJS(this.data))
        });
    }

    /**
     * @param {String} vocabularyName
     */
    addVocabulary(vocabularyName) {
        this.data.push(
            {
                code: Date.now(),
                name: vocabularyName,
                cards: []
            }
        )
    }

    /**
     * @param {Number} vocabularyCode
     */
    removeVocabulary(vocabularyCode){
        this.data = this.data.filter(voc => voc.code !== vocabularyCode);
    }

    /**
     * @param {Number} code
     * @returns {Object}
     */
    getVocabularyByCode(code){
        return this.data.filter(voc => voc.code === code)[0];
    }

    /**
     * @param {Number} vocabularyCode
     * @param {Object} cardData
     */
    addCardToVocabulary(vocabularyCode, cardData){
        const vocabulary = this.getVocabularyByCode(vocabularyCode);
        vocabulary.cards.push(cardData);
    }

    /**
     * @param {Number} vocabularyCode
     * @param {Number} cardCode
     */
    removeCardFromVocabulary(vocabularyCode, cardCode){
        let vocabulary = this.getVocabularyByCode(vocabularyCode);
        vocabulary.cards = vocabulary.cards.filter(card => card.code !== cardCode);
    }
}

export default new VocabularyStore();