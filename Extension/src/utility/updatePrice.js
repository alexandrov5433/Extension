import { rest } from "../rest/rest.js";
import { data } from "./data.js";

const tempContainer = document.createElement('div');

export async function updatePriceOfAllProducts() {
    let prods = await data.getAllProducts();
    for (let [prodId, prodData] of Object.entries(prods)) {
        const priceComponentData = prodData.data[1];
        const pageHTML = await rest.getPageHTML(prodData.tabUrl);
        let newPriceStr = extractPrice(pageHTML, priceComponentData);
        let priceData = reworkPrice(newPriceStr);
        const currentTime = (new Date()).getTime();
        prodData.postAdditionPriceChange[currentTime] = priceData.price;
        await data.updateExistingProduct(prodData);
    }

    function extractPrice(pageHTML, priceComponentData) {
        let tagName = priceComponentData.tagName.toLowerCase();
        let classStr = Object.values(priceComponentData.classList).join(' ');
        let selector = `${tagName}[class="${classStr}"]`;
        tempContainer.innerHTML = pageHTML;
        return tempContainer.querySelector(selector).textContent;
    }

    function reworkPrice(str) {
        const curSymb = ['€', '$', 'lev', '£', 'R$', '₹'];
        let data = {};
        let chars = str.trim().split('');
        let nonNums = chars.filter(c => Number(c) != c);
        for (let c of nonNums) {
            if (curSymb.includes(c)) {
                data['currency'] = c;
                break;
            }
        }
        if (!data['currency']) {
            data['currency'] = '€';
        }
        for (let i = 0; i < chars.length; i++) {
            if (chars[i] != Number(chars[i])) {
                chars[i] = '';
            } else {
                break;
            }
        }
        for (let i = chars.length - 1; i >= 0; i--) {
            if (chars[i] != Number(chars[i])) {
                chars[i] = '';
            } else {
                break;
            }
        }
        data['price'] = Number(chars.join('').trim().replace(',', '.'));
        return data;
    }

}