const express = require("express");
const api = require("./api");
const apiRoute = express();
const { parameters } = require("../constants/config");

apiRoute.all("/", (req, res) => {
  var entradas = {};
  Object.entries(parameters).forEach((param, i) => {
    entradas = { ...entradas, ...{ [param[1][1]]: "/api/v1/" + param[0] } };
  });
  api
    .login()
    .then(token => {
      res.status(200).json({
        message: "LiveBox API v1 👋",
        author: "Ángel Herrador",
        entries: entradas
      });
    })
    .catch(err => {
      console.error(err);
    });
});

apiRoute.all("/login", (req, res) => {
  api
    .login()
    .then(token => {
      res.status(200).json({
        token
      });
    })
    .catch(err => {
      console.error(err);
    });
});

Object.entries(parameters).forEach((param, i) => {
  addRouteParameter(param[1][0], param[1][1], param[0]);
});

function addRouteParameter(name, cgi = name, customRoute = name) {
  apiRoute
    .route("/" + customRoute)
    .post(function (req, res) {
      let body = req.body;
      api
        .postWifiParameters(`/${name}.htm`, `/cgi/cgi_${cgi}.js`, body)
        .then(response => res.json(response))
        .catch(error => res.json({ status: error }));
    })
    .get(function (req, res) {
      let body = req.body;
      api
        .getParameters(`/cgi/cgi_${cgi}.js`, body)
        .then(response => res.json(response))
        .catch(() => res.json({ status: "error" }));
    });
}

module.exports = apiRoute;
