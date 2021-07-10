"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.A09Server = void 0;
const Http = require("http");
const Url = require("url");
const mongodb_1 = require("mongodb");
var A09Server;
(function (A09Server) {
    const uri = "mongodb+srv://MarylinE:Karlsruhe76189@marylingis2020.jofyo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    const client = new mongodb_1.MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect((err) => {
        if (err) {
            console.error(err);
            client.close();
        }
        else {
            console.log("DB CONNECTED");
        }
    });
    console.log("Starting server");
    let port = Number(process.env.PORT || 8000);
    let server = Http.createServer();
    server.addListener("request", handleRequest);
    server.addListener("listening", handleListen);
    server.listen(port);
    function handleListen() {
        console.log("Listening");
    }
    async function handleRequest(_request, _response) {
        let urlWithQuery = Url.parse(_request.url, true);
        _response.setHeader("Access-Control-Allow-Origin", "*");
        //protokoll     host         port        path             query(parameter)
        //http://     localhost    :8000      /updateImages       ?data=1
        switch (urlWithQuery.pathname) {
            case "/getImages":
                await getImages(_response, urlWithQuery.query);
                break;
            case "/updateImages":
                await updateImages(_response, urlWithQuery.query);
                break;
            case "/getScores":
                await getScores(_response, urlWithQuery.query);
                break;
            case "/submitScore":
                await submitScore(_response, urlWithQuery.query);
                break;
            case "/getAllowedImages":
                await getAllowedImages(_response, urlWithQuery.query);
                break;
            default:
                _response.setHeader("content-type", "text/html; charset=utf-8");
                _response.write(_request.url);
        }
        _response.end();
    }
    async function getImages(_response, _query) {
        _response.setHeader("content-type", "application/json");
        let images = await client.db("memory").collection("images").find({}).toArray();
        _response.write(JSON.stringify({ success: true, images: images }));
    }
    async function getAllowedImages(_response, _query) {
        _response.setHeader("content-type", "application/json");
        let images = await client.db("memory").collection("images").find({ enabled: true }).toArray();
        _response.write(JSON.stringify({ success: true, images: images }));
    }
    async function getScores(_response, _query) {
        _response.setHeader("content-type", "application/json");
        let scores = await client.db("memory").collection("scores").find({}).sort({ time: 1 }).limit(10).toArray();
        _response.write(JSON.stringify({ success: true, scores: scores }));
    }
    async function submitScore(_response, _query) {
        _response.setHeader("content-type", "application/json");
        if (!_query.user || !_query.time) {
            _response.write(JSON.stringify({ success: false }));
        }
        else {
            await client.db("memory").collection("scores").insertOne({ user: _query.user, time: _query.time });
            _response.write(JSON.stringify({ success: true }));
        }
    }
    async function updateImages(_response, _query) {
        _response.setHeader("content-type", "application/json");
        if (!_query.data) {
            _response.write(JSON.stringify({ success: false }));
        }
        else {
            let updatedData = JSON.parse(_query.data);
            if (updatedData.length) {
                for (let data of updatedData) {
                    await client.db("memory").collection("images").findOneAndUpdate({ source: data.source }, { $set: { enabled: data.enabled } });
                }
                _response.write(JSON.stringify({ success: true }));
            }
            else {
                _response.write(JSON.stringify({ success: false }));
            }
        }
    }
})(A09Server = exports.A09Server || (exports.A09Server = {}));
//# sourceMappingURL=server.js.map