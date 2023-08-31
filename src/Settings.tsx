import { components, util } from "replugged";
import { cfg } from ".";
import React from "react";

const { SwitchItem } = components;

export function Settings(): React.ReactElement {
  return (
    <>
      <SwitchItem {...util.useSetting(cfg, "buttonEnabled", true)}>Show Button on ChatBar</SwitchItem>
      <SwitchItem {...util.useSetting(cfg, "silent", true)} disabled={true} >Enabled</SwitchItem>
    </>
  );
}
