import { components, util } from "replugged";
import { cfg } from ".";

const { SwitchItem } = components;

export function Settings(): React.ReactElement {
  return (
    <>
      <SwitchItem {...util.useSetting(cfg, "buttonEnabled", true)}>
        Show Button on Chatbar
      </SwitchItem>
      <SwitchItem {...util.useSetting(cfg, "silent", true)}>Enabled</SwitchItem>
      <SwitchItem
        {...util.useSetting(cfg, "autoToggle", false)}
        note="Automatically disable after sending a message">
        Auto Disable
      </SwitchItem>
    </>
  );
}
