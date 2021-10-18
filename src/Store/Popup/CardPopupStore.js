import {makeAutoObservable} from "mobx";

class CardPopupStore {
    active = false;

    constructor() {
        makeAutoObservable(this);
    }

    setActive(isActive = true){
        this.active = isActive;
    }
}

export default new CardPopupStore();