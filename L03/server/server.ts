import * as Http from "http";
import * as Url from "url";
import { ParsedUrlQuery } from "querystring"; 

export namespace A09Server {
  console.log("Starting server");
  let port: number = Number(8000);

  let server: Http.Server = Http.createServer();
  server.addListener("request", handleRequest);
  server.addListener("listening", handleListen);
  server.listen(port);

  function handleListen(): void {
    console.log("Listening");
  }

  function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
    let urlWithQuery: Url.UrlWithParsedQuery = Url.parse(_request.url!, true);
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

  function createHtmlResponse(_response: Http.ServerResponse, _query: ParsedUrlQuery): void {
    _response.setHeader("content-type", "text/html; charset=utf-8");
    let resultHTML: string = "";
    for (let q in _query) {
      resultHTML += `<p>${q}: ${_query[q]}</p>`;
    }
    _response.write(resultHTML);
  }
  function createJSONResponse(_response: Http.ServerResponse, _query: ParsedUrlQuery): void {
    _response.setHeader("content-type", "application/json");
    let jsonString: string = JSON.stringify(_query);
    _response.write(jsonString);
  }
}