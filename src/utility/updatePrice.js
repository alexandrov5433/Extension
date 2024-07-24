import { rest } from "../rest/rest.js";
import { data } from "./data.js";

const tempContainer = document.createElement('div');

export async function updatePriceOfAllProducts() {
    let prods = await data.getAllProducts();
    for (let prodData of Object.values(prods)) {
        const priceComponentData = prodData.data[1];
        let pageHTML;
        try {
            pageHTML = await rest.getPageHTML(prodData.tabUrl);
        } catch (error) {
            console.error(`Site did not responde well. activeOnSite set to false:\n${error}`);
            prodData.activeOnSite = false;
            await data.updateExistingProduct(prodData);
            continue;
        }
        let newPriceStr = extractPrice(pageHTML, priceComponentData);
        let priceData = reworkPrice(newPriceStr);
        const currentTime = (new Date()).getTime();
        prodData.postAdditionPriceChange[currentTime] = priceData.price;
        await data.updateExistingProduct(prodData);
    }

    function extractPrice(pageHTML, priceComponentData) {
        let tagName = priceComponentData.tagName.toLowerCase();
        let classVals = Object.values(priceComponentData.classList);
        tempContainer.innerHTML = pageHTML;
        if (classVals.length > 0) {
            let classStr = classVals.join(' ');
            let selector = `${tagName}[class="${classStr}"]`;
            return tempContainer.querySelector(selector).textContent;
        } else if (classVals.length === 0) {
            let parentTagName = priceComponentData.parentTagName.toLowerCase();
            let [attrNameParent, attrValueParent] = Object.entries(priceComponentData.parentAttributes)[0];
            let selectorParent = `${parentTagName}[${attrNameParent}="${attrValueParent}"]`;
            let parentEl = tempContainer.querySelector(selectorParent);
            let targetElSelector = `${tagName}`;
            return parentEl.querySelector(targetElSelector).textContent;
        }
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
        data['price'] = parseToNum(chars.join('').trim());
        return data;
    }

    function parseToNum(str) {
        //example str = '2.460,80'
        const patterns = {
            'floatCommaDecimalSep': new RegExp(',[0-9]{1,2}$'),
            'floatPointDecimalSep': new RegExp('\\.[0-9]{1,2}$'),
            'intCommaThauSep': new RegExp('^([0-9]{1,3},)+[0-9]{3}$'),
            'intPointThauSep': new RegExp('^([0-9]{1,3}\.)+[0-9]{3}$')
        };
        const parseMeth = {
            'floatCommaDecimalSep': (arg) => {
                let [whole, dec] = arg.split(',');
                if (whole.includes('.')) {
                    whole = whole.replaceAll('.', '');
                }
                return Number(`${whole}.${dec}`);
            },
            'floatPointDecimalSep': (arg) => {
                let [whole, dec] = arg.split('.');
                if (whole.includes(',')) {
                    whole = whole.replaceAll(',', '');
                }
                return Number(`${whole}.${dec}`);
            },
            'intCommaThauSep': (arg) => {
                return Number(arg.replaceAll(',', ''));
            },
            'intPointThauSep': (arg) => {
                return Number(arg.replaceAll('.', ''));
            },
        };
    
        for (let pat in patterns) {
            let match = str.match(patterns[pat]);
            if (match) {
                return parseMeth[pat](str);
            }
        }
    }

}