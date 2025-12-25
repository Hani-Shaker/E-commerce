import "./Home.css"
import BestSeller from "../../components/BestSeller/BestSeller"
import Slider from "../../components/Slider/Slider"
import Slider2 from "../../components/Slider2";
import Hero from "../../components/Hero/Hero"
import HomeBlog from "../../components/HomeBlog/HomeBlog"
import { useEffect } from "react"

function Home() {

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <>

{/* hero section */}
<Hero/>
{/* // Slider section */}
<Slider />
{/* // end Slider section */}

{/* // Best Seller section */}
<BestSeller />
{/* // end Best Seller section */}
{/* // Slider2 section */}
<Slider2 />
{/* // end Slider2 section */}
{/* // Home Blog section */}
<HomeBlog />
{/* // end Home Blog section */}

</>
  )
}

export default Home


