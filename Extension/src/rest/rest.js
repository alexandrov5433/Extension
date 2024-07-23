async function requester(method, url, headers, data) {
    let options = {
        method,
        headers: {}
    };

    if (headers) {
        // options.headers = Object.assign({}, headers);
        options.headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,POST,PATCH,OPTIONS'
        };
    }

    if (data) {
        options.body = JSON.stringify(data);
    }

    try {
        let res = await fetch(url, options);
        let data = await res.json();
        if (!res.ok) {
            throw new Error(data.message);
        }
        return data;

    } catch (error) {
        console.error(`Error occured while fetching site:\n${url}\n${error}`);
        return error;
    }
}



async function getPageData(url) {
    return await requester('GET', url, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST,PATCH,OPTIONS'
    });
}

export const rest = {
    getPageData
};