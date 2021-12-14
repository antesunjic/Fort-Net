import React from "react";

import fortHand from "../../../assets/fortHand.png";
import googlePlay from "../../../assets/getGoogle.png";
import appStore from "../../../assets/appStore.png";

import "./DownloadAppPart.scss";

const DownloadAppPart = () => {
  return (
    <div className="downloadAppPart">
      <div className="downloadTitle">Preuzmi aplikaciju</div>
      <div className="upperPart">
        <p>
          Poboljšanje kvalitete i raznolikosti turističke ponude koja se temelji
          na prirodnoj i kulturnoj baštini na graničnim ruralnim područjima
          Bosne i Hercegovine i Crne Gore.
        </p>
        <img alt="Hand" src={fortHand} className="fortHand" />
        <div className="lowerPart">
          <img alt="AppStore" src={appStore} className="appStore" />
          <img alt="GooglePlay" src={googlePlay} className="googlePlay" />
        </div>
      </div>
    </div>
  );
};

export default DownloadAppPart;
