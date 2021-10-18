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

    addVocabulary(vocabularyName) {
        this.data.push(
            {
                code: Date.now(),
                name: vocabularyName,
                cards: []
            }
        )
    }
}

export default new VocabularyStore();