
export function generateQueryString(params: any, ignore: string[]): string {
    let str = '';
    ignore = ignore || [];

    if (params) {
        for (let key in params) {
            if (params.hasOwnProperty(key) && ignore.indexOf(key) < 0) {
                let val = JSON.stringify(params[key]);
                if (val && (Array.isArray(val) || typeof val === 'object')) {
                    val = JSON.stringify(val);
                }

                str = str + (str ? '&' : '?');
                str += key + '=' + encodeURIComponent(val);
            }
        }
    }

    return str;
}

interface HttpRequestOpts {

}

export function getApiUrl(method: string, url: string, params: any): string {
    let ignoreParams = ['_id', 'data', 'showErr'];
    let data = params.data;
    let _id = params._id || (data && data._id);

    // add the _id to the URL if it exists
    if (_id && url.indexOf('{_id}') >= 0) {
        url = url.replace('{_id}', _id);
    } else if (_id && method === 'GET') {
        url += '/' + _id;
    }

    return url + generateQueryString(params, ignoreParams);
}
