import { html } from "../node_modules/lit-html/lit-html.js";

const productTempl = (prodId, imgSrc, altSrc, title, price, onEdit, onDelete, onVisit) => html`
    <div class="product" data-prodId=${prodId}>
        <div class="imgOfProd">
            <img src=${imgSrc} alt=${altSrc}>
        </div>
        <div class="sontrolOfProd">
            <span>${title}</span>
            <span>${price}</span>
            <button type="button" @click=${onEdit}>Edit</button>
            <button type="button" @click=${onDelete}>Delete</button>
            <button type="button" @click=${onVisit}>Visite Website</button>
            <div>
                <input type="checkbox" name="compare${prodId}" id="compare${prodId}">
                <label for="compare${prodId}"></label>
            </div>
        </div>
    </div>`;


export const templates = {
    productTempl
};