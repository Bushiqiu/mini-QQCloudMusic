import config from "./config";

export default (url: string, data?: object, method?:
    | 'OPTIONS'
    | 'GET'
    | 'HEAD'
    | 'POST'
    | 'PUT'
    | 'DELETE'
    | 'TRACE'
    | 'CONNECT'
) => {
    return new Promise((resolve, reject) => {
        wx.request({
            url: config.host + url,
            data,
            method,
            success: (res) => {
                resolve(res.data);
            },
            fail: (err) => {
                reject(err)
            }
        })
    })
}