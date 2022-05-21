/**
 *
 */
export namespace Vizality {
  /**
   *
   */
  export namespace Modules {
    export interface Discord {

    }
  }

  /**
   *
   */
  export namespace API {

    export interface Routes {

    }

    export interface Settings {

    }

    export interface Commands {

    }

    export interface Keybinds {

    }

    /**
     *
     */
    export namespace Actions {
      /**
       *
       */
      export interface Action {
        id: string,
        executor: Function
      }

      /**
       * A storage array for all registered actions.
       */
      export const _actions: Action[];

      /**
       * Registers an action.
       * @param actionId The action ID
       * @param executor The function to be called when invoking the action
       */
      export function registerAction (actionId: string, executor: Function): void;

      /**
       * Calls an action's `executor` callback function.
       * @param actionId The action ID
       */
      export function invokeAction (actionId: string): Promise<unknown>;

      /**
       * Checks if there is any action registered with a specified ID.
       * @param actionId The action ID
       */
      export function isAction (actionId: string): boolean;

      /**
       * Gets an action that passes the test implemented by the provided filter function.
       * @param filter The filter callback function
       */
      export function getAction (filter: Function): Action | null;

      /**
       * Gets an action by its ID.
       * @param actionId The action ID
       */
      export function getActionById (actionId: string): Action | null;

      /**
       * Gets all actions that pass the test implemented by the provided filter function.
       * @param filter The filter callback function
       */
      export function getActions (filter: Function): Action[];

      /**
       * Getss all actions registered by a specified addon.
       * @param addonId The addon ID
       */
      export function getActionsByCaller (addonId: string): Action[];

      /**
       * Gets all actions.
       */
      export function getAllActions (): Action[];

      /**
       * Unregisters an action with a specified ID.
       * @param actionId The action ID
       */
      export function unregisterAction (actionId: string): void;

      /**
       * Unregisters all actions registered by a specified addon.
       * @param addonId The addon ID
       */
      export function unregisterActionsByCaller (addonId: string): void;

      /**
       * Unregisters all actions.
       */
      export function unregisterAllActions (): void;
    }

    export interface Notifications {

    }

    export interface Toasts {

    }

    export interface Popups {

    }

    export interface I18N {

    }

    export interface RPC {

    }
  }
}
