import { Injector, common, settings, webpack } from "replugged";
import "./style.css";
import { UploadArguments } from "./types";

const injector = new Injector();
const userPingRegex = /<@([0-9]{18,19})>/;

export { Settings } from "./Settings";
export { Icon } from "./Icon";

export interface SettingsType {
  buttonEnabled?: boolean;
  silent?: boolean;
  autoToggle?: boolean;
  autoToggleOnlyOnPing?: boolean;
  ignorePings?: boolean;
  ignoreReplyPings?: boolean;
  onlyOnPings?: boolean;
}

export const cfg = await settings.init<SettingsType>("dev.Teltta.SilentMessages", {
  buttonEnabled: true,
  silent: true,
  autoToggle: false,
  autoToggleOnlyOnPing: true,
  ignorePings: false,
  ignoreReplyPings: false,
  onlyOnPings: true,
});

export async function start(): Promise<void> {
  injectMessageContent();
  await injectSendAttachments();
}

export function toggleDisabledIndicator(visible: boolean): void {
  const disabledIndicator = document.getElementsByClassName("disabled-indicator")[0];
  if (disabledIndicator.classList.contains("silent-disabled") && !visible) {
    disabledIndicator.classList.remove("silent-disabled");
  } else if (!disabledIndicator.classList.contains("silent-disabled") && visible) {
    disabledIndicator.classList.add("silent-disabled");
  }
}

function autoDisable(): void {
  if (cfg.get("autoToggle") && cfg.get("silent")) {
    cfg.set("silent", false);
    toggleDisabledIndicator(true);
  }
}

function injectMessageContent(): void {
  injector.before(common.messages, "sendMessage", (args) => {
    const silent = cfg.get("silent");
    if (!cfg.get("autoToggleOnlyOnPing")) {
      autoDisable();
    } else if (
      args[1].content.search(userPingRegex) !== -1 ||
      (args[3]?.messageReference instanceof Object &&
        args[3]?.allowedMentions?.replied_user !== false)
    ) {
      autoDisable();
    }

    if (cfg.get("onlyOnPings")) {
      if (
        !args[1].content.startsWith("@silent ") &&
        silent &&
        ((args[3]?.messageReference instanceof Object &&
          args[3]?.allowedMentions?.replied_user !== false) ||
          args[1].content.search(userPingRegex) !== -1)
      ) {
        args[1].content = `@silent ${args[1].content}`;
      }
      return args;
    }

    if (
      args[1].content.startsWith("@silent ") ||
      !silent ||
      (cfg.get("ignorePings") && args[1].content.search(userPingRegex) !== -1) ||
      (cfg.get("ignoreReplyPings") &&
        args[3]?.messageReference instanceof Object &&
        args[3]?.allowedMentions?.replied_user !== false)
    ) {
      return args;
    }

    args[1].content = `@silent ${args[1].content}`;
    return args;
  });
}

async function injectSendAttachments(): Promise<void> {
  const attachmentStore = await webpack.waitForModule<{
    uploadFiles: (args: UploadArguments) => void;
  }>(webpack.filters.byProps("uploadFiles"));

  injector.before(attachmentStore, "uploadFiles", (args) => {
    const silent = cfg.get("silent");
    if (!cfg.get("autoToggleOnlyOnPing")) {
      autoDisable();
    } else if (
      args[0].parsedMessage.content.search(userPingRegex) !== -1 ||
      (args[0].options?.messageReference instanceof Object &&
        args[0].options?.allowedMentions?.replied_user !== false)
    ) {
      autoDisable();
    }

    if (cfg.get("onlyOnPings")) {
      if (
        !args[0].parsedMessage.content.startsWith("@silent ") &&
        silent &&
        ((args[0].options?.messageReference instanceof Object &&
          args[0].options?.allowedMentions?.replied_user !== false) ||
          args[0].parsedMessage.content.search(userPingRegex) !== -1)
      ) {
        args[0].parsedMessage.content = `@silent ${args[0].parsedMessage.content}`;
      }
      return args;
    }

    if (
      args[0].parsedMessage.content.startsWith("@silent ") ||
      !silent ||
      (cfg.get("ignorePings") && args[0].parsedMessage.content.search(userPingRegex) !== -1) ||
      (cfg.get("ignoreReplyPings") &&
        args[0].options?.messageReference instanceof Object &&
        args[0].options?.allowedMentions?.replied_user !== false)
    ) {
      return args;
    }

    args[0].parsedMessage.content = `@silent ${args[0].parsedMessage.content}`;
    return args;
  });
}

export function stop(): void {
  injector.uninjectAll();
  common.toast.toast(
    "Restarting the client is recommended after unloading Silent Messages",
    common.toast.Kind.FAILURE,
  );
}
