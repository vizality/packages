import './global';

/**
 *
 */
export namespace Discord {
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
      /**
       * @todo
       */
      applicatedTags: unknown[], // unfinished
      /**
       * @todo
       */
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
       * Channel flags combined as a bit field.
       * @see {@link https://en.wikipedia.org/wiki/Bit_field|Bit Field}
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
      /**
       * @todo
       */
      memberIdsPreview: unknown | undefined, // unfinished
      /**
       * @todo
       */
      memberListId: unknown | undefined, // unfinished
      /**
       * An approximate count of messages in a thread, stops counting at 50.
       */
      messageCount?: number,
      /**
       * The name of the channel (1-100 characters).
       */
      name?: string | null,
      /**
       * @todo
       */
      nicks: Record<any, unknown>, // unfinished
      /**
       * Whether or not the channel is NSFW (Not Safe For Work).
       */
      nsfw?: boolean,
      /**
       * @todo
       */
      originalChannelId: Snowflake | undefined, // unfinished
      /**
       * The ID of the creator of the group DM or thread.
       */
      ownerId?: Snowflake,
      /**
       * @todo
       */
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
      /**
       *
       */
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
    /**
     * @todo
     */
    export type Channel = Internal.Channel;
  }

  /**
   * @see {@link https://discord.com/developers/docs/resources/channel#channel-object-channel-flags|Channel Flags}
   * @see {@link }
   */
  export enum ChannelFlags {
    /**
     * The thread is pinned to the top of its parent forum channel.
     */
    PINNED = 1 << 1
  }

  /**
   * Used to represent a user's voice connection status.
   */
  export interface VoiceRegion {
    /**
     * The guild ID this voice state is for.
     */
    guild_id?: Snowflake,
    /**
     * The channel ID this user is connected to.
     */
    channel_id: Snowflake | null,
    /**
     * The user ID this voice state is for.
     */
    user_id: Snowflake,
    /**
     * The guild member this voice state is for.
     */
    member?: GuildMember,
    /**
     * The session id for this voice state.
     */
    session_id: string,
    /**
     * Whether or not this user is deafened by the server.
     */
    deaf: boolean,
    /**
     * Whether or not this user is muted by the server.
     */
    mute: boolean,
    /**
     * Whether or not this user is locally deafened.
     */
    self_deaf: boolean,
    /**
     * Whether or not this user is locally muted.
     */
    self_mute: boolean,
    /**
     * Whether or not this user is streaming using "Go Live."
     */
    self_stream?: boolean,
    /**
     * Whether or not this user's camera is enabled.
     */
    self_video: boolean,
    /**
     * Whether or not this user is muted by the current user.
     */
    suppress: boolean,
    /**
     * The time at which the user requested to speak.
     */
    request_to_speak_timestamp: Timestamp | null
  }

  /**
   * @todo
   */
  export interface User {}

    /**
     * @todo
     */
  export interface GuildMember {}

  /**
   *
   */
  export type Channel = Internal.Channel | Gateway.Channel;

  /**
   * Discord utilizes Twitter's snowflake format for uniquely identifiable descriptors (IDs).
   * These IDs are guaranteed to be unique across all of Discord, except in some unique
   * scenarios in which child objects share their parent's ID.
   * @see {@link https://discord.com/developers/docs/reference#snowflakes|Snowflakes}
   */
  export type Snowflake = string;

  /**
   * A deconstructed snowflake, showing various information about a snowflake's origin.
   */
  export interface DeconstructedSnowflake {
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
  export interface ThreadMetadata {
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
  export interface ThreadMember {
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
  export interface CategoryChannel extends GuildChannel {}

  /**
   * Represents a guild channel.
   */
  interface GuildChannel extends Channel {}

  /**
   * The camera video quality mode of the voice channel, 1 when not present
   * @see {@link https://discord.com/developers/docs/resources/channel#channel-object-video-quality-modes|Video Quality Modes}
   */
  export interface VideoQualityModes {
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
  export type PermissionOverwrite =Record<Snowflake, {
    allow: bigint,
    deny: bigint,
    id: Snowflake,
    type: number
  }>;

  /**
   * All available channel types.
   * @see {@link https://discord.com/developers/docs/resources/channel#channel-object-channel-types|Channel Types}
   * @remarks
   * - Type `GUILD_NEWS_THREAD`, `GUILD_PUBLIC_THREAD`, and `GUILD_PRIVATE_THREAD` are only
   *   available in API v9.
   * - The `GUILD_FORUM` channel type is still in active development. Avoid implementing any
   *   features that are not documented, since they are subject to change without notice!
   */
  export interface ChannelTypes {
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
  export type Collection<V> = Record<Discord.Snowflake, V>;
}
