"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.A09Server = void 0;
const Http = require("http");
const Url = require("url");
var A09Server;
(function (A09Server) {
    console.log("Starting server");
    let port = Number(8000);
    let server = Http.createServer();
    server.addListener("request", handleRequest);
    server.addListener("listening", handleListen);
    server.listen(port);
    function handleListen() {
        console.log("Listening");
    }
    function handleRequest(_request, _response) {
        let urlWithQuery = Url.parse(_request.url, true);
        _response.setHeader("Access-Control-Allow-Origin", "*");
        switch (urlWithQuery.pathname) {
            case "/html":
                createHtmlResponse(_response, urlWithQuery.query);
                break;
            case "/json":
                createJSONResponse(_response, urlWithQuery.query);
                break;
            default:
                _response.setHeader("content-type", "text/html; charset=utf-8");
                _response.write(_request.url);
        }
        _response.end();
    }
    function createHtmlResponse(_response, _query) {
        _response.setHeader("content-type", "text/html; charset=utf-8");
        let resultHTML = "";
        for (let q in _query) {
            resultHTML += `<p>${q}: ${_query[q]}</p>`;
        }
        _response.write(resultHTML);
    }
    function createJSONResponse(_response, _query) {
        _response.setHeader("content-type", "application/json");
        let jsonString = JSON.stringify(_query);
        _response.write(jsonString);
    }
})(A09Server = exports.A09Server || (exports.A09Server = {}));
//# sourceMappingURL=server.js.map