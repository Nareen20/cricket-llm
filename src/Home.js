import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './style.css'; // Your custom styles

const Home = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000
  };

  return (
    <div className="home-container">
      <h2>Cricket Winning Moments</h2>
      <Slider {...settings}>
        <div>
          <img src="/images/cric.jpg" alt="Cricket Win 1" />
        </div>
        <div>
          <img src="/images/crics.jpg" alt="Cricket Win 2" />
        </div>
        <div>
          <img src="/images/modi.jpg" alt="Cricket Win 3" />
        </div>
        <div>
          <img src="/images/hr.jpeg.jpg" alt="Cricket Win 4" />
        </div>
        <div>
          <img src="/images/kohli.jpg" alt="Cricket Win 5" />
        </div>
        <div>
          <img src="/images/pd.jpg" alt="Cricket Win 6" />
        </div>
        <div>
          <img src="/images/vr.jpg" alt="Cricket Win 7" />
        </div>
        {/* Add more images as needed */}
      </Slider>
    </div>
  );
};

export default Home;
