import React from "react";

import grayLogo from "../../assets/fortLogoGray.svg";
import EU from "../../assets/EU.png";
import ipaLogo from "../../assets/ipaLogo.png";
import logoLjubuski from "../../assets/logoLjubuski.png";
import logoCentre from "../../assets/logoCentre.png";
import logoHerag from "../../assets/logoHerag.png";
import montenegro from "../../assets/Montenegro.png";

import "./Footer.scss";
import { useEffect } from "react";
import { useState } from "react";
import NavigationItemsHeader from "../Header/NavigationItemsHeader/NavigationItemsHeader";
import DownloadAppPart from "./DownloadAppPart/DownloadAppPart";
import "./DownloadAppPart/DownloadAppPart.scss";

const Footer = () => {
  const [isDesktopView, setIsDesktopView] = useState(
    window.matchMedia("(min-width: 770px)").matches
  );

  useEffect(() => {
    window
      .matchMedia("(min-width: 770px)")
      .addEventListener("change", (e) => setIsDesktopView(e.matches));
  }, []);
  return (
    <>
      <DownloadAppPart />
      <div className="footer">
        <div className="footerNav">
          <img alt="Logo" src={grayLogo} className="logo" />
          {isDesktopView ? <NavigationItemsHeader /> : null}
        </div>
        <div className="EUandIPA">
          <img alt="EU" src={EU} className="EU" />
          <img alt="IPA" src={ipaLogo} className="IPA" />
          <p>
            Ova web stranica dio je projekta FORT-NET „Od srednjovjekovnih
            utvrda u Hercegovini do austrougarskih utvrda u Crnoj Gori“
            financiranog uz pomoć Europske unije. Sadržaj ove web stranice je
            isključiva odgovornost projektnih partnera i nužno ne predstavlja
            stanovišta Europske unije.
          </p>
          <h2 className="projectPartnersHeader">Partneri projekta</h2>
          <div className="projectPartners">
            <div className="partners1">
              <img alt="GradLjubuski" src={logoLjubuski} />
              <img alt="Centre" src={logoCentre} />
            </div>
            <div className="partners2">
              <img alt="Herag" src={logoHerag} />
              <img alt="Montenegro" src={montenegro} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
