import { components, util } from "replugged";
import { cfg } from ".";

const { SwitchItem } = components;

export function Settings(): React.ReactElement {
  return (
    <>
      <SwitchItem {...util.useSetting(cfg, "buttonEnabled", true)}>
        Show Button on Chatbar
      </SwitchItem>
      <SwitchItem
        {...util.useSetting(cfg, "silent", true)}
        disabled={true}
        note="Currently the only way to enable is throught the chatbar button.">
        Enabled
      </SwitchItem>
    </>
  );
}
