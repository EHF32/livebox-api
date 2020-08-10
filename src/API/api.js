const fetch = require("node-fetch");
const {
  autologin,
  user,
  password,
  url: routerURL,
  urls
} = require("../constants/config");
const md5 = require("md5");

/**
 * Login and get the acess token
 * @return {string} the token
 */
const login = async () => {
  const res = await fetch(`${routerURL}${urls.login}`, {
    body: new URLSearchParams({
      GO: "status.htm",
      pws: md5(password),
      usr: user,
      ui_pws: password,
      login: "acceso"
    }).toString(),
    method: "POST"
  });
  let result = await res.text();

  return result.split("'")[1];
};

/**
 * Actualiza los parametros enviados.
 * @param {string} formContainer URL del contenedor del formulario
 * @param {string} optionsURL URL de la pagina CGI asignada a ese formulario
 * @param {object} body body con los datos a enviar
 * @param {string} token si no se define un token se iniciara una nueva sesion
 */
const postWifiParameters = async (
  formContainer,
  optionsURL,
  body,
  token = ""
) => {
  let options = [];
  let paramsValue = [];
  Object.entries(body).forEach((param, i) => {
    options[i] = param[0];
    paramsValue[i] = param[1];
  });

  if (autologin) token = await login();
  let pi = await getPostId(formContainer, token);
  let optionsId = await getParameterId(optionsURL, token, options);

  var toSend = { CMD: "", GO: "index.htm", pi: pi };
  Object.entries(optionsId).forEach((param, i) => {
    toSend = {
      ...toSend,
      ...{ ["SET" + i]: `${param[1].id}=${paramsValue[i]}` }
    };
  });
  const toPost = {};
  const finalData = await fetch(`${routerURL}${urls.apply}`, {
    method: "POST",
    headers: {
      Cookie: new URLSearchParams({ urn: token })
    },
    body: new URLSearchParams(toSend)
  });

  return await finalData.text();
};

/**
 * Devuelve los valores de los parametros que se estan solicitando
 * @param {string} optionsURL URL de la pagina CGI asignada al formulario
 * @param {array} options Las opciones que se estan solicitando
 * @param {string} token si no se define un token se iniciara una nueva sesion
 */
const getParameters = async (optionsURL, options, token = "") => {
  if (autologin) token = await login();
  let optionsId = await getParameterId(optionsURL, token, options);

  toSend = {};
  Object.entries(optionsId).forEach((param, i) => {
    toSend = {
      ...toSend,
      ...{ [param[0]]: param[1].value }
    };
  });
  return toSend;
};

/**
 * Devuelve la id de un parametro
 * @param {string} cgi_url URL de la pagina CGI asignada al formulario
 * @param {string} token token para hacer la solicitud (obligatorio)
 * @param {array} option nombre de las opciones
 */
const getParameterId = async (cgi_url, token, option) => {
  const res = await fetch(`${routerURL}${cgi_url}`, {
    method: "GET",
    headers: {
      Cookie: new URLSearchParams({ urn: token })
    }
  });
  const body = await res.text();
  var result = {};
  option.forEach((item, i) => {
    result[item] = {
      id: String(body).split(option[i])[1].split(",")[1],
      value: decodeURIComponent(String(body).split(option[i])[1].split("'")[1])
    };
  });
  return result;
};

/**
 * Obtener el codigo PI (PostId) para el formulario.
 * @param formUrl url contenedor del formulario
 * @param token obligatorio para hacer la solicitud
 */
const getPostId = async (formUrl, token) => {
  const res = await fetch(`${routerURL}${formUrl}`, {
    method: "GET",
    headers: {
      Cookie: new URLSearchParams({ urn: token })
    }
  });
  const pi = String(await res.text()).split('"')[7];
  return pi;
};

module.exports = {
  login,
  postWifiParameters,
  getParameters
};
