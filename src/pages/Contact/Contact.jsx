import "./Contact.css";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

function Contact() {
  const {t, i18n} = useTranslation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [i18n]);

  return (
    <div className="container my-5">

      <h2 className="text-center mb-3">{t("Get In Touch")}</h2>
      <p className="text-center text-muted mb-5">{t("We’re here to assist you every step of the way! Whether you need help choosing products or have questions about your order, our team is ready to support you. Feel free to reach out via email, phone, or visit us in-store.")}</p>

      <div className="row text-center mb-5">
        <div className="col-md-4 mb-3">
          <div className="card border-0 shadow-sm p-4 h-100 text-center">
            <div className="d-flex justify-content-center mb-3">
              <i className="fas fa-map-marker-alt fa-3x text-teal"></i>
            </div>
            <h6 className="fw-bold">{t("10 Nile Street, Cairo, Egypt")}</h6>
            <p className="text-muted">{t("Visit us for a unique shopping experience!")}</p>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card border-0 shadow-sm p-4 h-100 text-center">
            <div className="d-flex justify-content-center mb-3">
              <i className="fas fa-phone-alt fa-3x text-teal"></i>
            </div>
            <h6 className="fw-bold">+02 1234 567 88</h6>
            <p className="text-muted">{t("Available from 9 AM to 6 PM, 7 days a week")}</p>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card border-0 shadow-sm p-4 h-100 text-center">
            <div className="d-flex justify-content-center mb-3">
              <i className="fas fa-envelope fa-3x text-teal"></i>
            </div>
            <h6 className="fw-bold">info@example.com</h6>
            <p className="text-muted">{t("Contact us for any inquiries or complaints!")}</p>
          </div>
        </div>
      </div>

      <div className="card shadow-sm p-5 border-0">
        <h2 className="text-center mb-3">{t("Send Us")}</h2>
        <p className="text-center text-muted">
          {t("Contact us for all your questions and opinions, or you can solve your problems in a shorter time with our contact offices.")}
        </p>
        <hr />
        <form>
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">{t("Name")}</label>
              <input
                type="text"
                className="form-control"
                placeholder={t("Your Name")}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">{t("Email *")}</label>
              <input
                type="email"
                className="form-control"
                placeholder={t("Your Email")}
                required
              />
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">{t("Phone number")}</label>
            <input
              type="text"
              className="form-control"
              placeholder={t("Your Phone Number")}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">{t("Your message")}</label>
            <textarea
              className="form-control"
              rows="4"
              placeholder={t("Write your message here...")}
            ></textarea>
          </div>
          <button type="submit" className="btn btn-teal px-4">
            {t("Send Message")}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
