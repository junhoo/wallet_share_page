import md5 from "./md5.js"

//Tonken
var token = "MTIzQHFxLmNvbSxOb3Nzd1QsMTkyLjE2OC4xLjEw";

//登录成功返回密钥
var token_key = "";

/**
 * json请求头部信息拼接
 */
function json_head(requestBody) {
    var head = {};
    head.time = (new Date()).getTime();
    head.version = "1.0.1";
    head.token = token;
    head.token_key = token_key;

    var data = JSON.stringify(requestBody);//对象转字符串

    head.encrypt = md5.hex_md5(data + head.token);

    return head;
}

//请求报文
// var body = new Object();
// body.mark = "article";
// body.nav_id = 0;
// body.recommend = 1;
// body.page = 1;
// body.size = 3;
// const body = {
//     'mark': "article",
//     'nav_id': 0,
//     'recommend': 1,
//     'page': 1,
//     'size': 10
// }

//最终请求报文拼接
// var data = {};
// data.head = json_head(body);
// data.body = body;

//页面大于字符串
// var res = JSON.stringify(data);



export default {
    fnFormat (body, tokenKey) {
        var data = {}
        data.head = json_head(body)
        data.head.token_key = tokenKey
        data.body = body
        return data
    }
}