/*
 * import type { Settings, Commands, Keybinds, Notifications, Popups, Routes, I18N, RPC } from './api';
 * import { discord as Discord } from './modules';
 */

/**
 * This namespace is used for internal Discord structures that vary from their Gateway
 * equivalents. As far as the client modification goes, the internal structures are what
 * we will mostly care about, but there are times where we will use the Gateway REST
 * structures as well.
 */
export namespace Internal {
  /**
   * Represents a guild or DM channel within Discord.
   * @see {@link https://discord.com/developers/docs/resources/channel#channels-resource|Channels}
   */
  export interface Channel {
    /**
     * The application ID of the group DM creator if it is bot-created.
     */
    application_id?: Snowflake;
    applicatedTags: unknown[], // unfinished
    availableTags: unknown[], // unfinished
    /**
     * The bitrate (in bits) of the voice channel.
     */
    bitrate?: number,
    /**
     * The default duration that the clients (not the API) will use for newly created
     * threads,in minutes, to automatically archive the thread after recent activity, can
     * be set to: 60, 1440, 4320, 10080.
     */
    defaultAutoArchiveDuration?: number,
    /**
     * Channel flags combined as a bitfield.
     */
    flags?: ChannelFlags,
    /**
     * The ID of the guild (may be missing for some channel objects received over gateway
     * guild dispatches).
     */
    guild_id?: Snowflake,
    /**
     * The icon hash of the group DM.
     */
    icon?: string | null,
    /**
     * The ID of the channel.
     */
    id: Snowflake,
    /**
     * The ID of the last message sent in the channel (or thread for `GUILD_FORUM` channels)
     * (may not point to an existing or valid message or thread).
     */
    lastMessageId?: Snowflake | null,
    /**
     * When the last pinned message was pinned. This may be null in events such as `GUILD_CREATE`
     * when a message is not pinned.
     */
    lastPinTimestamp?: number | null,
    /**
     * The thread member object for the current user, if they have joined the thread; only
     * included on certain API endpoints.
     */
    member?: ThreadMember,
    /**
     * An approximate count of users in a thread, stops counting at 50.
     */
    memberCount?: number,
    memberIdsPreview: unknown | undefined, // unfinished
    memberListId: unknown | undefined, // unfinished
    /**
     * An approximate count of messages in a thread, stops counting at 50.
     */
    messageCount?: number,
    /**
     * The name of the channel (1-100 characters).
     */
    name?: string | null,
    nicks: Record<any, unknown>, // unfinished
    /**
     * Whether or not the channel is NSFW (Not Safe For Work).
     */
    nsfw?: boolean,
    originalChannelId: Snowflake | undefined, // unfinished
    /**
     * The ID of the creator of the group DM or thread.
     */
    ownerId?: Snowflake,
    parentChannelThreadType: unknown | undefined, // unfinished
    /**
     * For guild channels: ID of the parent category for a channel (each parent category can
     * contain up to 50 channels); for threads: ID of the text channel this thread was created.
     */
    parent_id?: Snowflake | null,
    /**
     * The computed permissions for the invoking user in the channel, including overwrites,
     * only included when part of the resolved data received on a slash command interaction
     */
    permissions?: string,
    /**
     * The explicit permission overwrites for members and roles.
     */
    permissionOverwrites?: PermissionOverwrite[],
    /**
     * The sorting position of the channel.
     */
    position?: number,
    /**
     * The amount of seconds a user has to wait before sending another message (0-21600);
     * bots, as well as users with the permission `manage_messages` or `manage_channel`, are
     * unaffected. `rateLimitPerUser` also applies to thread creation. Users can send one
     * message and create one thread during each `rateLimitPerUser` interval.
     */
    rateLimitPerUser?: number,
    /**
     * The recipients of the DM.
     */
    rawRecipients?: User[],
    /**
     * The voice region ID for the voice channel, automatic when set to null.
     */
    rtcRegion?: VoiceRegion | null,
    template: unknown | undefined, // unfinished
    /**
     * Thread-specific fields not needed by other channels.
     */
    threadMetadata?: ThreadMetadata,
    /**
     * The channel topic (0-1024 characters).
     */
    topic: string,
    /**
     * The type of the channel.
     */
    type: valueof<ChannelTypes>,
    /**
     * The user limit of the voice channel.
     */
    userLimit?: number,
    /**
     * The camera video quality mode of the voice channel; 1 when not present.
     */
    videoQualityMode?: valueof<VideoQualityModes>
  }
}

/**
 * This namespace is used for Gateway Discord structures that vary from their internal
 * equivalents. As far as the client modification goes, the internal structures are what
 * we will mostly care about, but there are times where we will use the Gateway REST
 * structures as well.
 */
export namespace Gateway {

}

/**
 * All of the main typings used throughout the Vizality client modification project.
 * We'll start by wrapping all of the types in global to eliminate the need to import them.
 */
/**
 *
 */
type Channel = Internal.Channel | Gateway.Channel;

/**
 * Discord utilizes Twitter's snowflake format for uniquely identifiable descriptors (IDs).
 * These IDs are guaranteed to be unique across all of Discord, except in some unique
 * scenarios in which child objects share their parent's ID.
 * @see {@link https://discord.com/developers/docs/reference#snowflakes|Snowflakes}
 */
type Snowflake = string;

/**
 * A deconstructed snowflake, showing various information about a snowflake's origin.
 */
interface DeconstructedSnowflake {
  /**
   * The timestamp of when the snowflake was created.
   */
  timestamp: Timestamp,
  /**
   * The worker's ID in the snowflake.
   */
  workerID: number,
  /**
   * The process's ID in the snowflake.
   */
  processID: number,
  /**
   * The increment in the snowflake.
   */
  increment: number,
  /**
   * The binary representation of the snowflake.
   */
  binary: string,
  /**
   * The date the snowflake was created.
   */
  get date (): Date
}

/**
 * The thread metadata object contains a number of thread-specific channel fields that
 * are not needed by other channel types.
 * @see {@link https://discord.com/developers/docs/resources/channel#thread-metadata-object|Thread Metadata}
 */
interface ThreadMetadata {
  /**
   * Whether or not the thread is archived.
   */
  archived: boolean,
  /**
   * The duration in minutes to automatically archive the thread after recent activity;
   * can be set to: 60, 1440, 4320, 10080.
   */
  auto_archive_duration: number,
  /**
   * The timestamp when the thread's archive status was last changed, used for calculating
   * recent activity.
   */
  archive_timestamp: Timestamp,
  /**
   * Whether or not the thread is locked; when a thread is locked, only users with
   * `MANAGE_THREADS` can unarchive it.
   */
  locked: boolean,
  /**
   * Whether or not non-moderators can add other non-moderators to a thread; only
   * available. on private threads
   */
  invitable?: boolean,
  /**
   * The timestamp when the thread was created; only populated for threads created
   * after 2022-01-09.
   */
  create_timestamp?: Timestamp
}

/**
 * A thread member is used to indicate whether a user has joined a thread or not.
 * @see {@link https://discord.com/developers/docs/resources/channel#thread-member-object|Thread Member}
 */
interface ThreadMember {
  /**
   * The ID of the thread; this field is omitted on the member sent within each thread in
   * the `GUILD_CREATE` event.
   */
  id?: Snowflake,
  /**
   * The ID of the user; this field is omitted on the member sent within each thread in
   * the `GUILD_CREATE` event.
   */
  user_id?: Snowflake,
  /**
   * The time the current user last joined the thread.
   */
  join_timestamp: Timestamp,
  /**
   * Any user-thread settings; currently only used for notifications.
   */
  flags: number
}

/**
 * Represents a guild category channel.
 * @see {@link https://support.discord.com/hc/en-us/articles/115001580171-Channel-Categories-101|Channel Categories}
 */
interface CategoryChannel extends GuildChannel {}

/**
 * Represents a guild channel.
 */
interface GuildChannel extends Channel {}

/**
 * The camera video quality mode of the voice channel, 1 when not present
 * @see {@link https://discord.com/developers/docs/resources/channel#channel-object-video-quality-modes|Video Quality Modes}
 */
interface VideoQualityModes {
  /**
   * Discord chooses the quality for optimal performance.
   */
  AUTO: number,
  /**
   * 720p.
   */
  FULL: number
}

/**
 * See permissions for more information about the allow and deny fields.
 * @see {@link https://discord.com/developers/docs/resources/channel#overwrite-object|Permission Overwrite}
 * @see {@link https://discord.com/developers/docs/topics/permissions#permissions|Permissions}
 */
type PermissionOverwrite = Record<Snowflake, {
  allow: bigint,
  deny: bigint,
  id: Snowflake,
  type: number
}>

/**
 * All available channel types.
 * @see {@link https://discord.com/developers/docs/resources/channel#channel-object-channel-types|Channel Types}
 * @remarks
 * - Type `GUILD_NEWS_THREAD`, `GUILD_PUBLIC_THREAD`, and `GUILD_PRIVATE_THREAD` are only
 *   available in API v9.
 * - The `GUILD_FORUM` channel type is still in active development. Avoid implementing any
 *   features that are not documented, since they are subject to change without notice!
 */
interface ChannelTypes {
  /**
   * A text channel within a server.
   */
  GUILD_TEXT: number,
  /**
   * A direct message between users.
   */
  DM: number,
  /**
   * A voice channel within a server.
   */
  GUILD_VOICE: number,
  /**
   * A direct message between multiple users.
   */
  GROUP_DM: number,
  /**
   * An organizational category that contains up to 50 channels.
   * @see {@link https://support.discord.com/hc/en-us/articles/115001580171-Channel-Categories-101|Channel Categories}
   */
  GUILD_CATEGORY: number,
  /**
   * A channel that users can follow and crosspost into their own server.
   */
  GUILD_NEWS: number,
  /**
   * A temporary sub-channel within a `GUILD_NEWS` channel.
   */
  GUILD_NEWS_THREAD: number,
  /**
   * A temporary sub-channel within a `GUILD_TEXT` channel.
   */
  GUILD_PUBLIC_THREAD: number,
  /**
   * A temporary sub-channel within a `GUILD_TEXT` channel that
   * is only viewable by those invited and those with the `MANAGE_THREADS` permission.
   */
  GUILD_PRIVATE_THREAD: number,
  /**
   * A voice channel for hosting events with an audience.
   * @see {@link https://support.discord.com/hc/en-us/articles/1500005513722|Stage Channels}
   */
  GUILD_STAGE_VOICE: number,
  /**
   * The channel in a hub containing the listed servers.
   * @see {@link https://support.discord.com/hc/en-us/articles/4406046651927-Discord-Student-Hubs-FAQ|Student Hubs}
   */
  GUILD_DIRECTORY: number,
  /**
   * [STILL IN DEVELOPMENT] A channel that can only contain threads.
   */
  GUILD_FORUM: number
}

/**
 *
 */
export namespace Vizality {
  /**
   *
   */
  namespace Modules {
    interface Discord {

    }
  }

  /**
   *
   */
  namespace API {
    interface Action {
      id: string,
      executor: Function
    }

    interface Routes {

    }

    interface Settings {

    }

    interface Commands {

    }

    interface Keybinds {

    }

    /**
     *
     */
    interface Actions extends API {
      /**
       * A storage array for all registered actions.
       */
      private _actions: Action[],
      /**
       * Registers an action.
       * @param actionId The action ID
       * @param executor The function to be called when invoking the action
       */
      public registerAction (actionId: string, executor: Function): void,
      /**
       * Calls an action's `executor` callback function.
       * @param actionId The action ID
       */
      public invokeAction (actionId: string): Promise<unknown>,
      /**
       * Checks if there is any action registered with a specified ID.
       * @param actionId The action ID
       */
      public isAction (actionId: string): boolean,
      /**
       * Gets an action that passes the test implemented by the provided filter function.
       * @param filter The filter callback function
       */
      public getAction (filter: Function): Action | null,
      /**
       * Gets an action by its ID.
       * @param actionId The action ID
       */
      public getActionById (actionId: string): Action | null,
      /**
       * Gets all actions that pass the test implemented by the provided filter function.
       * @param filter The filter callback function
       */
      public getActions (filter: Function): Action[],
      /**
       * Getss all actions registered by a specified addon.
       * @param addonId The addon ID
       */
      public getActionsByCaller (addonId: string): Action[],
      /**
       * Gets all actions.
       */
      public getAllActions (): Action[],
      /**
       * Unregisters an action with a specified ID.
       * @param actionId The action ID
       */
      public unregisterAction (actionId: string): void,
      /**
       * Unregisters all actions registered by a specified addon.
       * @param addonId The addon ID
       */
      public unregisterActionsByCaller (addonId: string): void,
      /**
       * Unregisters all actions.
       */
      public unregisterAllActions (): void
    }

    interface Notifications {

    }

    interface Popups {

    }

    interface I18N {

    }

    interface RPC {

    }
  }
}

/**
 *
 */
export namespace $vz {
  /**
   *
   */
  const api: {
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
  };

  /**
   *
   */
  // const modules: Vizality.Modules;
}

/**
 *
 */
export namespace $discord {
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
}

/**
 *
 */
export namespace DiscordNative {

}

/**
 * Discor's publically accessible builds, each slightly more unstable then the previous.
 * Stable > PTB > Canary
 */
export enum Builds {
  /**
   * The standard build. This usually doesn't have a lot of bugs and everyone can use it.
   */
  STABLE = 'Discord Stable',
  /**
   * The Public Test Build (PTB). This version usually has more bugs than Stable but
   * should not hinder your normal usage.
   */
  PTB = 'Discord PTB',
  /**
   * This is the most unstable version of Discord, with lots of updates. Bugs usually
   * happen here so use this build at your own risk.
   */
  CANARY = 'Discord Canary'
}

/**
 *
 */
export type Collection<V> = Record<Snowflake, V>;

/**
 *
 */
export type UpperCaseCharacters = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z';

/**
 *
 */
export type WordSeparators = '-' | '_' | ' ';

/**
 *
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
 * Cconvert this file into a module by adding an empty export statement.
 */
export {};
