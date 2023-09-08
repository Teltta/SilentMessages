import { types } from "replugged";

const patches: types.PlaintextPatch[] = [
  {
    find: "GIFT_BUTTON).analyticsLocations",
    replacements: [
      {
        match: /(.)\.push.{1,}\(.{1,3},\{.{1,30}\},"gift"\)\)/,
        replace:
          "$&;try{$1.push(window.replugged.plugins.getExports('dev.Teltta.SilentMessages')?.Icon($1)??null)}catch{}",
      },
    ],
  },
];

export default patches;
