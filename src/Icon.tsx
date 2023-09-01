import { components } from "replugged";

import { cfg } from ".";

export const Icon = (f: React.JSX.Element[]): React.JSX.Element | null => {
  f.forEach((element) => {
    if (element.key == "silent") {
      return null;
    }
  });
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
            cfg.set("silent", !cfg.get("silent"));
            const disabledIndicator = document.getElementsByClassName("disabled-indicator")[0];
            disabledIndicator.classList.toggle("silent-disabled");
          }}>
          <button className="silentmessages-button">
            <svg width="25" height="25" viewBox="0 0 25 25">
              <path
                fill="currentColor"
                d="M 17.909189,8.9820245 C 17.902694,5.7106061 15.33822,2.9936935 12,3 8.6860058,3.0062608 6,5.686 6,9 v 5 c 0,1.657 -1.344,3 -3,3 v 1 h 18 v -1 c -1.656,0 -2.970018,-1.343271 -3,-3 z M 8.55493,19 c 0.693,1.19 1.96897,2 3.44497,2 1.476,0 2.752,-0.81 3.445,-2 z"
              />
              <rect
                key={`${silent}`}
                className={`disabled-indicator${!silent ? " silent-disabled" : " silent-enabled"}`}
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
