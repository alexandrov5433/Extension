class ClickConter {
    constructor() {
        this._count = 0;
        this.target = 2;
    }
    get count() {
        return this._count;
    }
    set count(arg) {
        this._count += arg;
        if (this._count === 2) {
            this.stopCountingAndSaveData();
        }
    }
    stopCountingAndSaveData() {
        document.getElementsByTagName('body')[0].removeEventListener('click', clicker);
        console.log(selectedElsStorage);
    }
}

let selectedElsStorage = [];
const clickCounter = new ClickConter();
document.getElementsByTagName('body')[0].addEventListener('click', clicker);

function clicker(e) {
    selectedElsStorage.push(e.target);
    clickCounter.count = 1;
}

function getElsStorage() {
    return new Promise((resolve, reject) => {

    });
}

export const addingProduct = {
    selectedElsStorage,
    getElsStorage
};