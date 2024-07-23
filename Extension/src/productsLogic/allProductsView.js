import { html } from "../../node_modules/lit-html/lit-html.js";

import { data } from "../utility/data.js";
import { productUtil } from "../utility/productUtil.js";

const fragment = (products) => html`
    <!-- <div id="space"></div> -->
    ${products.map(p => productCard(p))}`;


const productCard = (product) => html`
        <div class="product">
            <span class="image holder">
                    <img src=${product.data[2].src} alt="">
            </span>
            <span class="prod-info holder">
                <div class="info-container">

                    <div class="card">
                        <div class="card__data">
                          <div class="card__right">
                            <div class="item">Product:</div>
                            <div class="item">Price:</div>
                            <div class="item">Added On:</div>
                            <div class="item">Still On Site:</div>
                          </div>
                          <div class="card__left">
                            <div class="item">${(product.data[0].textContent).trim().slice(0, 11)}</div>
                            <div class="item">${(product.data[1].textContent).trim()}</div>
                            <div class="item">${productUtil.addedOnDate(product._id).split(', ')[0]}</div>
                            <div class="item">${product.activeOnSite ? 'Yes!' : 'No!'}</div>
                          </div>
                        </div>
                      </div>
                      
                </div>
            </span>
            <span class="actions holder">
                <div class="btn-container">
                    <button class="action" data-path=${'/details/' + product._id} @click=${onClick}>Details</button>
                    <button class="action" data-path=${'/edit/' + product._id} @click=${onClick}>Edit</button>
                    <button class="action" data-path=${'/delete/' + product._id} @click=${onClick}>Delete</button>
                    <button class="action" data-path=${'/visite-website/' + product._id} @click=${onClick}>Visite Website</button>
                </div>
            </span>
        </div>`;

let context = null;

export async function showAllProducts(ctx) {
    context = ctx;
    let products = [];
    let dataProducts = await data.getAllProducts();
    Object.values(dataProducts).map(p => products.push(p));
    ctx.render(fragment(products));
}

function onClick(e) {
  const path = e.currentTarget.dataset.path;
  context.goTo(path);
}