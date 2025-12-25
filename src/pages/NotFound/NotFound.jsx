import "./NotFound.css"
import { useTranslation } from "react-i18next"
import { useEffect } from "react"

function NotFound() {
  const { t, i18n } = useTranslation()

  useEffect(() => {
    // i18n.changeLanguage("ar")
  }, [i18n])

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center">
      <div className="page-404">
        <h1>404</h1>
        <p>{t("PageNotFound", "الصفحة غير موجودة")}</p>
        <a href="/" className="btn">
          {t("GoHome", "العودة للرئيسية")}
        </a>
      </div>
    </div>
  )
}

export default NotFound
