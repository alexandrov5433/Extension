import  page  from "../../node_modules/page/page.mjs";
import { render } from "../../node_modules/lit-html/lit-html.js";

import { data } from "../utility/data.js";
import { productUtil } from "../utility/productUtil.js";
import { rest } from "../rest/rest.js";

import { showAllProducts } from "./allProductsView.js";
import { visiteWebsite } from "./visiteWebsiteView.js";
import { deleteProductCard } from "./deleteView.js";
import { showEdit } from "./editView.js";

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
const modalContainer = document.getElementById('modal-overlay');
const editModalContainer = document.getElementById('edit-overlay');

page(addToCtx);
page('/all-products', showAllProducts);
// page('/details/:id', );
page('/edit/:id', showEdit);
page('/delete/:id', deleteProductCard);
page('/visite-website/:id', visiteWebsite);

page.start();
page.redirect('/all-products');

function addToCtx(ctx, next) {
    ctx.render = function (fragment) {
        render(fragment, root);
    }
    ctx.goTo = function (path) {
        page.redirect(path);
    }
    ctx.renderModal = function (fragment) {
        render(fragment, modalContainer);
    }
    ctx.renderEditModal = function (fragment) {
        render(fragment, editModalContainer);
    }

    next();
}

//TODO remove
window.rest = rest;