import { common, components, util } from "replugged";
import { cfg, toggleDisabledIndicator } from ".";

const { React } = common;
const { SwitchItem } = components;

export function Settings(): React.ReactElement {
  let [silent, setSilent] = React.useState(cfg.get("silent", false));
  return (
    <>
      <SwitchItem {...util.useSetting(cfg, "buttonEnabled", true)}>
        Show Button on Chatbar
      </SwitchItem>
      <SwitchItem
        value={silent}
        onChange={(value: boolean) => {
          toggleDisabledIndicator(!value);
          cfg.set("silent", value);
          setSilent(value);
        }}>
        Enabled
      </SwitchItem>
      <SwitchItem
        {...util.useSetting(cfg, "autoToggle", false)}
        note="Automatically disable after sending a message">
        Auto Disable
      </SwitchItem>
    </>
  );
}
