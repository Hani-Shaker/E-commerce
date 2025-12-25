import { useTranslation } from 'react-i18next';
import './HomeBlog.css';
import img from '../../assets/images/bottle.png';

const HomeBlog = () => {
  const { t } = useTranslation();

  const blogPosts = [
    {
      id: 1,
      title: 'But I must explain to you how all this mistaken idea',
      date: 'Jan 13 2025',
      author: 'Sinan Isik',
      img,
      category: 'Grocery',
    },
    {
      id: 2,
      title: 'The Problem With Typefaces on the Web',
      date: 'Jan 13 2025',
      author: 'Sinan Isik',
      img ,
      category: 'Grocery',
    },
    {
      id: 3,
      title: 'English Breakfast Tea With Tasty Donut Dessert',
      date: 'Jan 13 2025',
      author: 'Sinan Isik',
      img,
      category: 'Grocery',
    },
  ];

  return (
    <div className="home-blog container my-5">
      <div className="autoship-banner text-center py-3 h5">
        {t('saveExtra', 'SAVE AN EXTRA 5-10% ON EVERY AUTOSHIP ORDER!')}
      </div>
      <div className="row row-cols-1 row-cols-md-3 g-4 mt-4">
        {blogPosts.map((post) => (
          <div key={post.id} className="col">
            <div className="card h-100">
              <img src={post.img} className="card-img-top viewer-blur" alt={post.title} />
              <div className="card-body">
                <span className="text-muted viewer-blur">{post.category}</span>
                <h5 className="card-title mt-2 viewer-blur">{post.title}</h5>
                <p className="text-muted small viewer-blur">
                  {post.date} - {post.author}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeBlog;