import "./Blog.css"
import bottle from '../../assets/images/bottle.png'
import facebook from '../../assets/images/facebook_img.png'
import instagram from '../../assets/images/istagram_img.png'
import twitter from '../../assets/images/x_img.png'
import reddit from '../../assets/images/reddit_img.png'
import pinterest from '../../assets/images/printerest_img.png'
import starbucks from '../../assets/images/starbucks.png'
import coffie from '../../assets/images/coffie.png'
import { useTranslation } from "react-i18next"
import { useEffect } from "react"
function Blog() {

  const {t,i18n}=useTranslation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [i18n]);
  
  // useEffect(() => {
  //   // i18n.changeLanguage('ar'); 
  // },[i18n])


  return (
    <div className="blog-page d-flex justify-content-evenly">
      <div className="left">
        <div className="water-bottle">
          <img src={bottle} alt="water" />
        </div>
        <div className="grocery1 grocery">
          <p className="text-muted">{t("Grocery")}</p>
          <h2>{t("Customer Success Stories: How Our Products Transformed Their Wardrobes")}</h2>
          <span className="text-muted">jan 13 2025 &nbsp; <span className="text-dark">{t("Sinan ISIK")}</span> </span>
          <p>{t("Read about our customers' experiences and how they revamped their style with our products. Join our story today!")}</p>
        </div>
        <div className="coffie-nut">
          <img src={coffie} alt="coffie" />
        </div>
        <div className="grocery2 grocery">
          <p className="text-muted">{t("Grocery")}</p>
          <h2>{t("How to Choose the Perfect Accessories for Every Outfit")}</h2>
          <span className="text-muted">jan 13 2025 &nbsp; <span className="text-dark">{t("Sinan ISIK")}</span> </span>
          <p>{t("Learn how to complete your look with accessories that suit every occasion. From simple earrings to bold necklaces, here are secrets to pairing them with your wardrobe from our collection!")}</p>
        </div>
      </div>
      <div className="right">
        <div className="recent-posts mb-4">
          <h2>{t("RECENT POSTS")}</h2>
          <div className="border p-3">
            <div className="d-flex justify-content-between posts-content">
              <img src={bottle} alt="water" width={40} height={40} />
              <p>{t("Customer Success Stories: How Our Products Transformed Their Wardrobes")}</p>
            </div>
            <div className="d-flex justify-content-between posts-content">
              <img src={coffie} alt="coffie" width={40} height={40} />
              <p>{t("How to Choose the Perfect Accessories for Every Outfit")}</p>
            </div>
          </div>
        </div>
        <div className="social-media mb-4">
          <h2>{t("SOCIAL MEDIA")}</h2>
          <img src={facebook} alt="facebook" className="rounded" />
          <img src={instagram} alt="instagram"  className="rounded"/>
          <img src={twitter} alt="x"  className="rounded"/>
          <img src={reddit} alt="reddit" className="rounded" />
          <img src={pinterest} alt="pinterest"  className="rounded"/>
        </div>
        <div className="banner">
          <h2>{t("WIDGET BANNER")}</h2>
          <img src={starbucks} alt="starbucks" />
        </div>
        <div className="tags">
        <h2>{t("Tags")}</h2>
        <span>{t("ecommerce")}</span>
        <span>{t("food")}</span>
        <span>{t("Grocery")}</span>
        <span>{t("kiptheme")}</span>
        <span>{t("organic")}</span>
        <span>{t("shop")}</span>
        <span>{t("shopify")}</span>
        <span>{t("store")}</span>
      </div>
      </div>
    </div >
  )
}

export default Blog