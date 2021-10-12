export const HTTP = Object.freeze({
  CDN: 'https://cdn.vizality.com',
  WEBSITE: 'https://vizality.com',
  get API () { return `${this.WEBSITE}/api`; },
  get DOCS () { return `${this.WEBSITE}/docs`; },
  get ASSETS () { return `${this.CDN}/assets`; }
});

export const Repositories = Object.freeze({
  ORG: 'vizality',
  get VIZALITY () { return `${this.ORG}/vizality`; },
  get COMMUNITY () { return `${this.ORG}/community`; }
});

export const Guild = Object.freeze({
  INVITE: 'Fvmsfv2',
  ID: '689933814864150552'
});

export const Channels = Object.freeze({
  CSS_SNIPPETS: '705262981214371902',
  JS_SNIPPETS: '705262981214371902',
  PLUGINS: '700461738004578334',
  THEMES: '700461710972157954',
  DEVELOPMENT: '690452269753171998',
  STAFF: '690452551233175602',
  INSTALLATION_SUPPORT: '718478897695424613',
  PLUGINS_SUPPORT: '705264484528291956',
  THEMES_SUPPORT: '705264431831187496',
  MISC_SUPPORT: '705264513728905266'
});

/*
 * @todo These need proper testing and more added.
 */
export const Regexes = Object.freeze({
  DISCORD: '^(https?://)?(canary.|ptb.)?discord(?:app)?.com',
  get INVITE () { return `${this.DISCORD}/invite|.gg)/[a-zA-Z1-9]{2,}`; },
  get MESSAGE_LINK () { return `${this.DISCORD}/channels/(?:@me|\d{17,19}/)?\d{17,19}/\d{17,19}`; },
  get ASSET_LINK () { return `(?:${this.DISCORD})?/assets/(?:[0-9].)?[a-zA-Z0-9]{20,32}.?[a-z]{2,5}`; },
  EMOJI: '(:|<:|<a:)((\w{1,64}:\d{17,18})|(\w{1,64}))(:|>)',
  USER_ID: '^(\\d{17,19})$',
  USER_MENTION: '^<@!?(\\d+)>$',
  CHANNEL_MENTION: '^<#!?(\\d+)>$'
});

export const Events = Object.freeze({
  /*
   * Vizality Settings
   */
  VIZALITY_READY: 'VIZALITY_READY',
  VIZALITY_SETTINGS_READY: 'VIZALITY_SETTINGS_READY',
  VIZALITY_SETTING_UPDATE: 'VIZALITY_SETTING_UPDATE',
  VIZALITY_SETTING_TOGGLE: 'VIZALITY_SETTING_TOGGLE',

  /*
   * Addons
   */
  VIZALITY_ADDON_SETTINGS_REGISTER: 'VIZALITY_ADDON_SETTINGS_REGISTER',
  VIZALITY_ADDON_SETTINGS_UNREGISTER: 'VIZALITY_ADDON_SETTINGS_UNREGISTER',
  VIZALITY_ADDON_SETTING_UPDATE: 'VIZALITY_ADDON_SETTING_UPDATE',
  VIZALITY_ADDON_SETTING_TOGGLE: 'VIZALITY_ADDON_SETTING_TOGGLE',
  VIZALITY_ADDON_UNINSTALL_CONFIRM: 'VIZALITY_ADDON_UNINSTALL_CONFIRM',
  VIZALITY_ADDON_UNINSTALL: 'VIZALITY_ADDON_UNINSTALL',
  VIZALITY_ADDON_INSTALL_CONFIRM: 'VIZALITY_ADDON_INSTALL_CONFIRM',
  VIZALITY_ADDON_INSTALL: 'VIZALITY_ADDON_INSTALL',
  VIZALITY_ADDON_ENABLE: 'VIZALITY_ADDON_ENABLE',
  VIZALITY_ADDON_DISABLE: 'VIZALITY_ADDON_DISABLE',
  VIZALITY_ADDON_TOGGLE: 'VIZALITY_ADDON_TOGGLE',
  VIZALITY_ADDONS_READY: 'VIZALITY_ADDONS_READY',

  /*
   * Vizality APIs
   */
  VIZALITY_ACTION_ADD: 'VIZALITY_ACTION_ADD',
  VIZALITY_ACTION_REMOVE: 'VIZALITY_ACTION_REMOVE',
  VIZALITY_ACTION_REMOVE_ALL: 'VIZALITY_ACTION_REMOVE_ALL',
  VIZALITY_ACTION_REMOVE_ALL_BY_CALLER: 'VIZALITY_ACTION_REMOVE_ALL_BY_CALLER',
  VIZALITY_COMMAND_ADD: 'VIZALITY_COMMAND_ADD',
  VIZALITY_COMMAND_REMOVE: 'VIZALITY_COMMAND_REMOVE',
  VIZALITY_COMMAND_REMOVE_ALL: 'VIZALITY_COMMAND_REMOVE_ALL',
  VIZALITY_COMMAND_REMOVE_ALL_BY_CALLER: 'VIZALITY_COMMAND_REMOVE_ALL_BY_CALLER',
  VIZALITY_ROUTE_ADD: 'VIZALITY_ROUTE_ADD',
  VIZALITY_ROUTE_REMOVE: 'VIZALITY_ROUTE_REMOVE',
  VIZALITY_ROUTE_REMOVE_ALL: 'VIZALITY_ROUTE_REMOVE_ALL',
  VIZALITY_ROUTE_REMOVE_ALL_BY_CALLER: 'VIZALITY_ROUTE_REMOVE_ALL_BY_CALLER',
  VIZALITY_KEYBIND_ADD: 'VIZALITY_KEYBIND_ADD',
  VIZALITY_KEYBIND_REMOVE: 'VIZALITY_KEYBIND_REMOVE',
  VIZALITY_KEYBIND_REMOVE_ALL: 'VIZALITY_KEYBIND_REMOVE_ALL',
  VIZALITY_KEYBIND_REMOVE_ALL_BY_CALLER: 'VIZALITY_KEYBIND_REMOVE_ALL_BY_CALLER',
  VIZALITY_NOTICE_SEND: 'VIZALITY_NOTICE_SEND',
  VIZALITY_NOTICE_CLOSE: 'VIZALITY_NOTICE_CLOSE',
  VIZALITY_NOTICE_CLOSE_ALL: 'VIZALITY_NOTICE_CLOSE_ALL',
  VIZALITY_NOTICE_CLOSE_ALL_BY_CALLER: 'VIZALITY_NOTICE_CLOSE_ALL_BY_CALLER',
  VIZALITY_TOAST_SEND: 'VIZALITY_TOAST_SEND',
  VIZALITY_TOAST_CLOSE: 'VIZALITY_TOAST_CLOSE',
  VIZALITY_TOAST_CLOSE_ALL: 'VIZALITY_TOAST_CLOSE_ALL',
  VIZALITY_TOAST_CLOSE_ALL_QUEUED: 'VIZALITY_TOAST_CLOSE_ALL_QUEUED',
  VIZALITY_TOAST_CLOSE_ALL_ACTIVE: 'VIZALITY_TOAST_CLOSE_ALL_ACTIVE',
  VIZALITY_TOAST_CLOSE_ALL_BY_CALLER: 'VIZALITY_TOAST_CLOSE_ALL_BY_CALLER',
  VIZALITY_POPUP_WINDOW_OPEN: 'VIZALITY_POPUP_WINDOW_OPEN',
  VIZALITY_POPUP_WINDOW_CLOSE: 'VIZALITY_POPUP_WINDOW_CLOSE'
});

export const Avatars = Object.freeze({
  get DEFAULT_THEME_1 () { return 'vizality://assets/images/default-theme-1.png'; },
  get DEFAULT_THEME_2 () { return 'vizality://assets/images/default-theme-2.png'; },
  get DEFAULT_THEME_3 () { return 'vizality://assets/images/default-theme-3.png'; },
  get DEFAULT_THEME_4 () { return 'vizality://assets/images/default-theme-4.png'; },
  get DEFAULT_THEME_5 () { return 'vizality://assets/images/default-theme-5.png'; },
  // ---
  get DEFAULT_PLUGIN_1 () { return 'vizality://assets/images/default-plugin-1.png'; },
  get DEFAULT_PLUGIN_2 () { return 'vizality://assets/images/default-plugin-2.png'; },
  get DEFAULT_PLUGIN_3 () { return 'vizality://assets/images/default-plugin-3.png'; },
  get DEFAULT_PLUGIN_4 () { return 'vizality://assets/images/default-plugin-4.png'; },
  get DEFAULT_PLUGIN_5 () { return 'vizality://assets/images/default-plugin-5.png'; }
});

export const ActionTypes = Object.freeze({
  VIZALITY_UPDATE_SETTINGS: 'VIZALITY_SETTINGS_UPDATE',
  VIZALITY_TOGGLE_SETTING: 'VIZALITY_SETTING_TOGGLE',
  VIZALITY_UPDATE_SETTING: 'VIZALITY_SETTING_UPDATE',
  VIZALITY_DELETE_SETTING: 'VIZALITY_SETTING_DELETE'
});

export const IpcEvents = Object.freeze({
  VIZALITY_WINDOW_UNMAXIMIZE: 'VIZALITY_WINDOW_UNMAXIMIZE',
  VIZALITY_WINDOW_MAXIMIZE: 'VIZALITY_WINDOW_MAXIMIZE',
  VIZALITY_WINDOW_IS_MAXIMIZED: 'VIZALITY_WINDOW_IS_MAXIMIZED'
});

export const ErrorTypes = Object.freeze({

});

export const Developers = Object.freeze([
  /**
   * dperolio
   */
  '97549189629636608'
]);

export const Settings = Object.freeze({
  transparentWindow: false,
  experimentalWebPlatform: false,
  smoothScrolling: true,
  reactDeveloperTools: false,
  hotReload: false,
  replaceClyde: true
});

export default {
  HTTP,
  Repositories,
  Guild,
  Channels,
  Regexes,
  Events,
  Avatars,
  ActionTypes,
  IpcEvents,
  ErrorTypes,
  Developers,
  Settings
};
