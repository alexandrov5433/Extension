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
        chrome.runtime.sendMessage({event: 'NewProductAdded', data: selectedEls});  //works !
    }
}

let selectedEls = [];
const clickCounter = new ClickConter();
document.getElementsByTagName('body')[0].addEventListener('click', clicker);
console.log('Injected');

function clicker(e) {
    let data = {
        tagName: e.target.tagName,
        attributes: Array.from(e.target.attributes),
        classList: Array.from(e.target.classList),
        textContent: e.target.textContent,
        innerHtml: e.target.innerHtml
    };
    selectedEls.push(data);
    clickCounter.count = 1;
}
