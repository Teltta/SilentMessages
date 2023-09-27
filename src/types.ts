interface messageReference {
  guild_id: string; // eslint-disable-line
  channel_id: string; // eslint-disable-line
  message_id: string; // eslint-disable-line
}
interface allowedMentions {
  parse: string[];
  replied_user: boolean; // eslint-disable-line
}
interface parsedMessage {
  content: string;
  tts: boolean;
  invalidEmojis: unknown[];
  validNonShortcutEmojis: unknown[];
}
interface options {
  stickerIds: string[];
  allowedMentions: allowedMentions | undefined;
  messageReference?: messageReference;
}
export interface UploadArguments {
  channelId: string;
  uploads: object[];
  draftType: number;
  parsedMessage: parsedMessage;
  options: options;
}
