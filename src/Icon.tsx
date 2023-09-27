import { components } from "replugged";

import { cfg, toggleDisabledIndicator } from ".";

export const Icon = (f: React.JSX.Element[]): React.JSX.Element | null => {
  if (f.some((element) => element.key == "silent")) return null;
  const silent = cfg.get("silent", true);
  const buttonEnabled = cfg.get("buttonEnabled", true);

  return (
    <div
      key="silent"
      className={`silentmessages-button-main ${
        buttonEnabled ? "silentmessages-button-enabled" : "silentmessages-button-disabled"
      }`}>
      <components.Tooltip text="Toggle Silent Messages">
        <components.Clickable
          style={{ marginTop: 5 }}
          onClick={() => {
            toggleDisabledIndicator(cfg.get("silent"));
            cfg.set("silent", !cfg.get("silent"));
          }}>
          <button className="silentmessages-button">
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M18 9V14C18 15.657 19.344 17 21 17V18H3V17C4.656 17 6 15.657 6 14V9C6 5.686 8.686 3 12 3C15.314 3 18 5.686 18 9ZM11.9999 21C10.5239 21 9.24793 20.19 8.55493 19H15.4449C14.7519 20.19 13.4759 21 11.9999 21Z"
              />
              <rect
                key={`${silent}`}
                className={`disabled-indicator${!silent ? " silent-disabled" : ""}`}
                x="10"
                y="10"
                width="32px"
                height="3px"
                fill="#f04747"
              />
            </svg>
          </button>
        </components.Clickable>
      </components.Tooltip>
    </div>
  );
};
