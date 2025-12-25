import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Dby.css";

import imgAbdallah from "../../assets/images/Abdalla.jpg";
import imgHani from "../../assets/images/Hani.jpg";
import imgMohammed from "../../assets/images/Mohammd.jpg";
import imgSalah from "../../assets/images/Salah.jpg";

function Dby() {
  const developers = [
    { name: "Abdallah Mohamed Abo Bakr", img: imgAbdallah , urlGitHub:"https://github.com/Abdallah-m-Bakr" , urlLinkedin:"https://www.linkedin.com/in/abdallah-mohamed-690431381/"},
    { name: "Hani Shaker", img: imgHani , urlGitHub:"https://github.com/Hani-Shaker" , urlLinkedin:"https://www.linkedin.com/in/hany-hany-81656034b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"},
    { name: "Mohammed Ashraf", img: imgMohammed , urlGitHub:"https://github.com/mohammd-clawd" , urlLinkedin:"https://www.linkedin.com/in/m-o-h-a-m-m-d-337232382?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"},
    { name: "Mohamed Salah", img: imgSalah , urlGitHub:"https://github.com/mohamedkhalil04-full" , urlLinkedin:"https://www.linkedin.com/in/mohamed-salah-mahmoud?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"},
  ];

  return (
    <div className="container py-5 text-center">
      <h2 className="mb-4 card-title ">Developing Team</h2>
      <div className="row justify-content-center">
        {developers.map((dev, index) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={index}>
            <div className="card shadow-sm border-success h-100">
              <img
                src={dev.img}
                className="card-img-top rounded-circle mx-auto d-block mt-4 dev-img"
                alt={dev.name}
              />
              <div className="card-body d-flex flex-column justify-content-between">
                <h5 className="card-title">{dev.name}</h5>
                <div className="social-icons mt-3">
                  <a
                    href= {dev.urlLinkedin}
                    className="text-dark me-3"
                    aria-label="LinkedIn"
                    target="_blank"
                  >
                    <i className="fab fa-linkedin fa-lg icon"></i>
                  </a>
                  <a
                    href= {dev.urlGitHub}
                    className="text-dark"
                    aria-label="GitHub"
                    target="_blank"
                  >
                    <i className="fab fa-github fa-lg icon"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dby;
