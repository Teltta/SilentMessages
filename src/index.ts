import { Injector, common, settings } from "replugged";
import "./style.css";

const injector = new Injector();
const userPingRegex = /<@([0-9]{18,19})>/;

export { Settings } from "./Settings";
export { Icon } from "./Icon";

export interface SettingsType {
  buttonEnabled?: boolean;
  silent?: boolean;
  autoToggle?: boolean;
  ignorePings?: boolean;
  ignoreReplyPings?: boolean;
}

export const cfg = await settings.init<SettingsType>("dev.Teltta.SilentMessages");

export function start(): void {
  injectMessageContent();
}

export function toggleDisabledIndicator(visible: boolean): void {
  const disabledIndicator = document.getElementsByClassName("disabled-indicator")[0];
  console.log(`${visible} ${disabledIndicator.classList}`);
  if (disabledIndicator.classList.contains("silent-disabled") && !visible) {
    disabledIndicator.classList.remove("silent-disabled");
  } else if (!disabledIndicator.classList.contains("silent-disabled") && visible) {
    disabledIndicator.classList.add("silent-disabled");
  }
}

function injectMessageContent(): void {
  injector.before(common.messages, "sendMessage", (args) => {
    if (
      args[1].content.startsWith("@silent ") ||
      !cfg.get("silent", false) ||
      (cfg.get("ignorePings", false) && args[1].content.search(userPingRegex) !== -1) ||
      (cfg.get("ignoreReplyPings", false) &&
        args[3]?.messageReference instanceof Object &&
        args[3]?.allowedMentions?.replied_user !== false)
    ) {
      return args;
    }
    args[1].content = `@silent ${args[1].content}`;
    if (cfg.get("autoToggle", false)) {
      cfg.set("silent", false);
      toggleDisabledIndicator(false);
    }
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
