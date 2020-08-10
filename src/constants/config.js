module.exports = {
  /** =========
   * CHANGE THIS
   */
  autologin: true,
  user: "admin",
  password: "12345678",
  url: "http://192.168.1.1",
  /** ================== */

  urls: { login: "/login.cgi", apply: "/apply.cgi" },
  parameters: {
    wifi_main: ["wifi_main", "wifi_main"],
    phones: ["phones", "phones"],
    softphones: ["softphones", "softphones"],
    system: ["support_backup", "system"],
    lan: ["advanced_network_configuration", "lan"],
    status: ["advanced_network_configuration", "status"],
    nat: ["advanced_network_nat", "nat"],
    dns: ["advanced_network_dns", "dns"],
    upnp: ["advanced_network_upnp", "upnp"],
    ddns: ["advanced_network_dyndns", "ddns"],
    fw_dmz: ["advanced_network_dmz", "fw_dmz"],
    ntp: ["advanced_network_ntp", "ntp"],
    firewall: ["advanced_firewall", "firewall"],
    remote_mgmt: ["advanced_user_remote_access", "remote_mgmt"],
    infoWifi: ["support_information_wifi", "infoWifi"],
    infoLan: ["support_information_lan", "infoLan"],
    infoSip: ["support_information_voip", "infoSip"]
  }
};
