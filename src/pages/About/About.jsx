import "./About.css";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import Dby from "../../components/D-by/Dby"
import HeroAbout from "../../assets/images/HeroAbout.png"



function About() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [i18n]);

  return (
    <div>
    <div className="about-container container py-4 d-block">
      <div className="img-header mb-4">
        <img
          src={HeroAbout}
          alt="Header"
          className="img-fluid w-100"
        />
      </div>

      <div className="about-content row mx-auto">
        <div className="col-12 mb-4">
          <p>
            {t("We are a passionate team dedicated to fashion and style since our founding in 2020. Our journey began with a simple idea: to provide clothing and accessories that meet everyone’s needs at affordable prices and modern designs. Over the years, we’ve grown to become one of the leading players in e-commerce, always aiming to deliver an exceptional shopping experience that combines high quality and striking elegance.")}
          </p>
        </div>

        <div className="col-12 mb-4">
          <h2 className="text-primary">{t("Our Vision and Goals")}</h2>
          <p>
            {t("We aspire to be the preferred destination for fashion enthusiasts in the region. We aim to expand our collection to include over 500 new products each season, focusing on sustainability and quality. We also strive to offer outstanding customer service, ensuring fast shipping and a hassle-free 30-day return policy.")}
          </p>
        </div>

        <div className="col-lg-4 col-md-6 mb-4">
          <div
            className="img-box"
          ></div>
        </div>

        <div className="col-lg-8 col-md-6 mb-4 d-flex flex-column justify-content-center">
          <h3>{t("Our Story")}</h3>
          <p>
            {t("It all started in a small room where we combined our love for design with the goal of building a trusted brand. Over time, we grew thanks to the support of our loyal customers, who inspired us to keep innovating. Today, we’re proud to have over 10,000 satisfied customers, and we aim to reach many more.")}
          </p>
        </div>

        <div className="col-12 mt-5">
          <h3>{t("Get in Touch")}</h3>
          <p>
            {t("If you’d like to join our journey or have any suggestions, feel free to visit us at 10 Nile Street, Cairo, or call us at +20 123 456 7890, or email us at info@fashionhub.com. Additional Notes: We continuously improve our services based on your feedback. Follow us on social media for the latest news and offers!")}
          </p>
        </div>
      </div>
    </div>
    <Dby />
    </div>
    
  );
}

export default About;
