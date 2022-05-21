/**
 * Globally declared types that don't require importing. Mostly used for general-purpose
 * utility types and window-assigned global variable namespaces.
 */
declare global {
  /**
   * A string consisting of one of each word characters.
   */
  export type WordCharacter = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' | 'l' | 'm' | 'n' | 'o' | 'p' | 'q' | 'r' | 's' | 't' | 'u' | 'v' | 'w' | 'x' | 'y' | 'z';

  /**
   * Word separated——specifically a dash, underscore, or space.
   */
  export type WordSeparator = '-' | '_' | ' ';

  /**
   * A string consisting of a single digit.
   */
  export type StringDigit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

  /**
   * Helper type for a union of all possible property value types, analogous to the way
   * keyof gives you the union of all possible property key types.
   * @see {@link https://stackoverflow.com/a/49286056/997167}
   */
  export type valueof<T> = T[keyof T];

  /**
   * The number of milliseconds that have passed since January 1, 1970.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/EpochTimeStamp|Epoch Timestamp}
   */
  export type Timestamp = number;

  /**
   * These types are to make it easier to recognize when we're expecting a file path specifically,
   * and which kind of file path.
   */
  export type RelativeFilePath = string;
  export type AbsoluteFilePath = string;
  export type FilePath = RelativeFilePath | AbsoluteFilePath;

  /**
   * @todo
   */
  interface VizalityGlobal {
    webpack: {
      getModule (filter): object
    },

    api: {
      /*
       * routes: Vizality.API.Routes,
       * settings: Settings,
       * commands: Commands,
       * keybinds: Keybinds,
       * actions: Vizality.API.Actions,
       * notifications: Notifications,
       * popups: Popups,
       * i18n: I18N,
       * rpc: RPC
       */
    }
  }

  /**
   * @todo
   */
  interface DiscordGlobal {}

  /**
   * @todo
   */
  interface DiscordNativeGlobal {}

  /**
   * Global variable for Vizality's managers, APIs, modules, components, etc.
   */
  export const $vz: VizalityGlobal;

  /**
   * Global variable for Vizality's Discord module.
   * @todo
   */
  export const $discord: {
    /**
     *
     */
    /*
     * const snowflake: Vizality.Modules.Discord.Snowflake;
     * const user: VizalityModules.Discord.User;
     * const channel: VizalityModules.Discord.Channel;
     * const component: VizalityModules.Discord.Component;
     * const constants: VizalityModules.Discord.Constants;
     * const modules: VizalityModules.Discord.Modules;
     */
  };

  /**
   * @todo
   */
  export const DiscordNative: {

  };

  /**
   * Window-assigned global variables.
   */
  interface Window {
    $vz: VizalityGlobal,
    $discord: DiscordGlobal,
    DiscordNative: DiscordNativeGlobal
  }

  interface String {
    toLowerCase<T extends string> (this: T): Lowercase<T>;
    toUpperCase<T extends string> (this: T): Uppercase<T>;
  }
}

/**
 * Cconvert this file into a module by adding an empty export statement.
 */
export {};
