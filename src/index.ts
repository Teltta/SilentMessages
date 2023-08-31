import { Injector, common, settings } from "replugged";
import { Icon } from "./Icon";
import "./style.css";

const injector = new Injector();

export { Settings } from "./Settings";
export { Icon } from "./Icon";

export interface SettingsType {
  buttonEnabled?: boolean;
  silent?: boolean;
}

export const cfg = await settings.init<SettingsType>("dev.Teltta.SilentMessages");

export function start(): void {
  injectMessageContent();

  // @ts-expect-error limol
  window.silenttyping = {
    Icon,
  };
}

function injectMessageContent(): void {
  injector.before(common.messages, "sendMessage", (args) => {
    if (args[1].content.startsWith("@silent") || !cfg.get("silent", false)) return args;
    args[1].content = `@silent ${args[1].content}`;
    return args;
  });
}

export function stop(): void {
  injector.uninjectAll();
  // @ts-expect-error limol
  delete window.silenttyping;
}
