import { components } from "replugged";

import { cfg } from ".";

export const Icon = (): React.JSX.Element => {
  const silent = cfg.get("silent", true);
  const buttonEnabled = cfg.get("buttonEnabled", true);
  
  return (
    <div key={`${silent}`} className={`${buttonEnabled ? "silentmessages-button-enabled" : "silentmessages-button-disabled"}`}>
      <components.Tooltip text={!silent ? "Disable Silent Messages" : "Enable Silent Messages"}>
        <components.Clickable
          style={{ marginTop: 5 }}
          onClick={() => {
            cfg.set("silent", !cfg.get("silent"))
          }}>
          <button className="silentmessages-button">
            <svg width="25" height="25" viewBox="0 0 576 512">
              <path
                fill="currentColor"
                d="M18 10.7101C15.1085 9.84957 13 7.17102 13 4C13 3.69264 13.0198 3.3899 13.0582 3.093C12.7147 3.03189 12.3611 3 12 3C8.686 3 6 5.686 6 9V14C6 15.657 4.656 17 3 17V18H21V17C19.344 17 18 15.657 18 14V10.7101ZM8.55493 19C9.24793 20.19 10.5239 21 11.9999 21C13.4759 21 14.7519 20.19 15.4449 19H8.55493Z"
              />
              <path
                fill="currentColor"
                d="M18.2624 5.50209L21 2.5V1H16.0349V2.49791H18.476L16 5.61088V7H21V5.50209H18.2624Z"
              />
              <rect
                key={`${silent}`}
                className={`disabled-stroke-through${!silent ? " silent-disabled" : ""}`}
                x="10"
                y="10"
                width="600pt"
                height="70px"
                fill="#f04747"
              />
            </svg>
          </button>
        </components.Clickable>
      </components.Tooltip>
    </div>
  );
};
