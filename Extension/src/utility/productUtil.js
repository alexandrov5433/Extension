function generateProductId() {
    let date = String(new Date().getTime());
    let apendix = '';
    for (let i = 0; i < 10; i++) {
        apendix += String(Math.floor(Math.random() * 8));
    }
    return date + '-' + apendix;
}

function addedOnDate(productId) {
    let [ msecs, _ ] = productId.split('-');
    let date = new Date(Number(msecs));
    return date.toLocaleString();
}

export const productUtil = {
    generateProductId,
    addedOnDate
};