import {makeAutoObservable} from "mobx";

class VocabularyPopupStore {
    active = false;

    constructor() {
        makeAutoObservable(this);
    }

    setActive(isActive = true){
        this.active = isActive;
    }
}

export default new VocabularyPopupStore();