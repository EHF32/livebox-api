# LiveBox API

![License](https://img.shields.io/github/license/EHF32/livebox-api?color=yellow&style=flat-square)
![Maintenance](https://img.shields.io/maintenance/yes/2020?style=flat-square)
![GitHub package.json version](https://img.shields.io/github/package-json/v/ehf32/livebox-api?style=flat-square)

> EN: 📶 This api is packed full with all functions from administration website from the livebox router, and extract/modify data. This includes WIFI configuration, NAT, softphones, DNS, firewall, etc.

> ES: Esta api permite todas las funciones disponibles en la pagina de administración del router livebox y extraer/modificar datos. Esto incluye configuración WIFI, configuración NAT, softphones, dns, firewall, etc.

---

<img  width=400 src="https://i.imgur.com/56xwor9.png" />

## **Developer usage**

### **Set up project**

Before cloning the repo **be sure** you have installed:

- [**NODE**](https://www.google.com/search?q=how+to+install+node) (version >= v12.16.x)
- [**NPM**](https://www.google.com/search?q=how+to+install+npm) (version >= 6.14.x)

Then:

- Choose a folder project in your system and switch in `cd [folder path]`
- Clone the repo in your folder path `git clone https://github.com/EHF32/livebox-api.git`

---

### **Installation**

In order to install the project and all dependencies, enter in the project folder and run `npm install`

---

### Start Server using node

```bash
npm run start
```

### Start Server using hot reload

```bash
npm run watch
```

### Configure your session
Go to `src/constants/config.js` and change this values to your credentials.
``` javascript
module.exports = {
  autologin: true,
  user: "admin",
  password: "12345678",
  url: "http://192.168.1.1",
  ...
}
  ```
 It's recommended to enable `autologin`, this will login every time you make a request, but if you are going to make a lot of request in short amount of time, instead pass the token manually. 

---

## Request & Response Examples

Examples using the API

### login

To login into the router:

```javascript
// http://localhost:3000/api/v1/login
login().then(token => {
    console.log(token);
  })
```
With this you receive a token, that let you use all the others functions. It is not necesary if you have enabled `autologin` in `src/constants/config.js`.

### Example: turn ON/OFF wifi and other options
Example, sending a `POST` request to `http://localhost:3000/api/v1/wifi_main` with this body params:
```json
{
	  "wlan_enable1": "0"
}
```
The `0` means to turn off, and `1` to turn on the wifi.
We can send all the parameters we want to change, for example:
```json
{
          "wlan_enable1": "1",
	  "bss_broadcast1": "1",
	  "bss_broadcast6": "1"
}
```
This example will enable wifi, and set wifi to visible.

The list of all parameters is on `/parameter list` folder <a href="https://github.com/EHF32/livebox-api/tree/master/parameter%20list">here </a>
You have to send the request to the file of the container of the param, for example if you want to change `lan_port1` on <a href="https://github.com/EHF32/livebox-api/blob/master/parameter%20list/nat.md">nat</a> params, make the request to `/api/v1/nat`

full list on:

```json
//http://localhost:3000/api/v1/
{
  "message": "LiveBox API v1 👋",
  "author": "Ángel Herrador",
  "entries": {
    "wifi_main": "/api/v1/wifi_main",
    "phones": "/api/v1/phones",
    "softphones": "/api/v1/softphones",
    "system": "/api/v1/system",
    "lan": "/api/v1/lan",
    "status": "/api/v1/status",
    "nat": "/api/v1/nat",
    "dns": "/api/v1/dns",
    "upnp": "/api/v1/upnp",
    "ddns": "/api/v1/ddns",
    "fw_dmz": "/api/v1/fw_dmz",
    "ntp": "/api/v1/ntp",
    "firewall": "/api/v1/firewall",
    "remote_mgmt": "/api/v1/remote_mgmt",
    "infoWifi": "/api/v1/infoWifi",
    "infoLan": "/api/v1/infoLan",
    "infoSip": "/api/v1/infoSip"
  }
}
```
| url | parameter-list |
| --- | --- |
| `/api/v1/wifi_main` | <a href="https://github.com/EHF32/livebox-api/blob/master/parameter%20list/wifi_main.md">wifi_main.md</a> |
| `/api/v1/phones` | <a href="https://github.com/EHF32/livebox-api/blob/master/parameter%20list/phones.md">phones.md</a> |
| `/api/v1/softphones`| <a href="https://github.com/EHF32/livebox-api/blob/master/parameter%20list/softphones.md">softphones.md</a> |
| `/api/v1/system` | <a href="https://github.com/EHF32/livebox-api/blob/master/parameter%20list/system.md">system.md</a> |
| `/api/v1/lan` | <a href="https://github.com/EHF32/livebox-api/blob/master/parameter%20list/lan.md">lan.md</a> |
| `/api/v1/status` | <a href="https://github.com/EHF32/livebox-api/blob/master/parameter%20list/status.md">status.md</a> |
| `/api/v1/nat` | <a href="https://github.com/EHF32/livebox-api/blob/master/parameter%20list/nat.md">nat.md</a> |
| `/api/v1/dns` | <a href="https://github.com/EHF32/livebox-api/blob/master/parameter%20list/dns.md">dns.md</a> |
| `/api/v1/upnp` | <a href="https://github.com/EHF32/livebox-api/blob/master/parameter%20list/upnp.md">upnp.md</a> |
| `/api/v1/ddns` | <a href="https://github.com/EHF32/livebox-api/blob/master/parameter%20list/ddns.md">ddns.md</a> |
| `/api/v1/fw_dmz` | <a href="https://github.com/EHF32/livebox-api/blob/master/parameter%20list/fw_dmz.md">fw_dmz.md</a> |
| `/api/v1/ntp` | <a href="https://github.com/EHF32/livebox-api/blob/master/parameter%20list/ntp.md">ntp.md</a> |
| `/api/v1/firewall` | <a href="https://github.com/EHF32/livebox-api/blob/master/parameter%20list/firewall.md">firewall.md</a> |
| `/api/v1/remote_mgmt` | <a href="https://github.com/EHF32/livebox-api/blob/master/parameter%20list/remote_ngmt.md">remote_mgmt.md</a> |
| `/api/v1/infoWifi` | <a href="https://github.com/EHF32/livebox-api/blob/master/parameter%20list/infoWifi.md">infoWifi.md</a> |
| `/api/v1/infoLan` | <a href="https://github.com/EHF32/livebox-api/blob/master/parameter%20list/infoLan.md">infoLan.md</a> |
| `/api/v1/infoSip` | <a href="https://github.com/EHF32/livebox-api/blob/master/parameter%20list/infoSip.md">infoSip.md</a> |


### Example: read wifi status and other options
Following the last example, if we want now to get the value of especific param, we do the same process, but in this case with `GET` method.
```json
// BODY GET: http://localhost:3000/api/v1/wifi_main
[
	"wlan_enable1",
	"bss_broadcast1",
	"bss_broadcast6"
]
```
We get this result:
```json
// RESULT: http://localhost:3000/api/v1/wifi_main
{
  "wlan_enable1": "0",
  "bss_broadcast1": "1",
  "bss_broadcast6": "1"
}
```



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/NewFeature`)
3. Commit your Changes (`git commit -m 'Add some NewFeature'`)
4. Push to the Branch (`git push origin feature/NewFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Ángel Herrador - <a href="https://github.com/EHF32">GitHub</a>
