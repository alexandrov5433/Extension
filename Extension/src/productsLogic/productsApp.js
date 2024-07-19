import  page  from "../../node_modules/page/page.mjs";
// import { render } from "../../node_modules/lit-html/lit-html.js";

import { data } from "../utility/data.js";
import { productUtil } from "../utility/productUtil.js";

document.querySelector('#data').addEventListener('click', async () => {
    let storedData = await data.getAllData();
    console.log(`productsView.js all data in store: ${JSON.stringify(storedData, null, 2)}`);
});

document.querySelector('#id').addEventListener('click', () => {
    console.log(productUtil.generateProductId());
});
document.querySelector('#deleteAllData').addEventListener('click', async () => {
    await data.delAllStoredData();
    console.log('All data deleted!');
});

window.addEventListener("load", (event) => {
    console.log("page is fully loaded");
});

const root = document.getElementById('main');