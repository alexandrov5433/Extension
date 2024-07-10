import { view } from "./view.js";
import { addingProduct } from "./addingProduct.js";

const addBtn = document.getElementById('add');
const viewBtn = document.getElementById('view');
const divMain = document.getElementById('main');
const divAdding = document.getElementById('adding');

addBtn.addEventListener('click', async () => {
    let queryOptions = { currentWindow: true, active: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    let exec = await chrome.scripting.executeScript({
        target: {
            tabId: tab.id
        },
        files: ['./src/addingProduct.js']
    });
    console.log('Change view');
    view.togglePopupView();
    exec.then(() => console.log('Exec done'));
});



















// addBtn.addEventListener('click', () => {
//     divMain.style.display = 'none';
//     divAdding.style.display = 'block';
//     getCurrentTab()
//         .then(tab => {
//             console.log(tab);
//             // chrome.tabs.executeScript(tab.windowId, {
//             //     code: `console.log('location:', window.location.href);`
//             //     // frameId: tab.windowId
//             // })
//         })


// });

// async function getCurrentTab() {
//     let queryOptions = { currentWindow: true, active: true };
//     // `tab` will either be a `tabs.Tab` instance or `undefined`.
//     let [tab] = await chrome.tabs.query(queryOptions);
//     return tab;
// }