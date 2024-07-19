async function saveData(obj) {
    await chrome.storage.local.set(obj);
}

async function getAllData() {
    //if arg === null all data in storage will be returned
    let data = await chrome.storage.local.get(null);
    if (!Object.hasOwn(data, 'productStorage')) {
        data.productStorage = {};
    }
    if (!Object.hasOwn(data, 'settings')) {
        data.settings = {};
    }
    return data;
}

async function delGivenProduct(productId) {
    let data = await getAllData();
    delete data.productStorage[productId];
    await saveData(data);
}

async function delAllStoredData() {
    await chrome.storage.local.clear();
}

async function storeNewProduct(product) {
    const { productId, dataToSave } = product;
    let data = await getAllData();
    data.productStorage[productId] = dataToSave;
    await saveData(data);
}

async function delAllProductsInStorage() {
    let data = await getAllData();
    data.productStorage = {};
    await saveData(data);
}

async function getAllProducts() {
    let data = await getAllData();
    return data.productStorage;
}

export const data = {
    saveData,
    getAllData,
    delGivenProduct,
    delAllStoredData,
    storeNewProduct,
    delAllProductsInStorage,
    getAllProducts
};