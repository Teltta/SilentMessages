import { common, components, util } from "replugged";
import { cfg, toggleDisabledIndicator } from ".";

const { React } = common;
const { SwitchItem, Category } = components;

export function Settings(): React.ReactElement {
  let [silent, setSilent] = React.useState(cfg.get("silent", true));
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
      <Category title="Auto Disabling">
        <SwitchItem
          {...util.useSetting(cfg, "autoToggle", false)}
          note="Automatically disable after sending a message">
          Auto Disable
        </SwitchItem>
        <SwitchItem
          {...util.useSetting(cfg, "autoToggleOnlyOnPing", true)}
          note="Automatically disable only if the message contains a ping">
          Auto Disable Only On Ping
        </SwitchItem>
      </Category>
      <Category
        title="Whitelisting/Blacklisting"
        note="Allows customization on when to use silent messages">
        <SwitchItem
          {...util.useSetting(cfg, "ignorePings", false)}
          note="Ignores silent messages if you send a ping">
          Ignore Pings
        </SwitchItem>
        <SwitchItem
          {...util.useSetting(cfg, "ignoreReplyPings", false)}
          note="Ignores silent messages if you reply with ping turned on">
          Ignore Reply Pings
        </SwitchItem>
        <SwitchItem
          {...util.useSetting(cfg, "onlyOnPings", true)}
          note="Only make pings silent.
          NOTE: This overrides all other options">
          Only On Pings
        </SwitchItem>
      </Category>
    </>
  );
}
