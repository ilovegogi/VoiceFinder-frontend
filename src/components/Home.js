import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import image1 from '../images/image1.png';
import image2 from '../images/image2.png';
import image3 from '../images/image3.png';

const Container = styled.div`
  text-align: center;
`;

const Header = styled.header`
  padding: 20px;
  background-color: #f8f9fa;
  color: #333;
`;

const Footer = styled.footer`
  padding: 20px;
  background-color: #333;
  color: white;
`;

const Main = styled.main`
  padding: 20px;
  margin: 20px 0;
`;

const Intro = styled.p`
  font-size: 1.2rem;
  color: #666;
`;

const StyledSlider = styled(Slider)`
  .slick-slide img {
    margin: auto;
  }
  .slick-dots {
    bottom: -30px;
  }
  .slick-prev,
  .slick-next {
    z-index: 1;
  }
`;

const HomePage = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Container>
      <Header>
        <h1>Welcome to Our Campaign Recruitment Site</h1>
      </Header>
      <Main>
        <Intro>Explore our latest campaigns and join the movement!</Intro>
        <StyledSlider {...settings}>
          <div>
            <img src={image1} alt="Campaign 1" style={{ width: '100%', height: 'auto' }} />
          </div>
          <div>
            <img src={image2} alt="Campaign 2" style={{ width: '100%', height: 'auto' }} />
          </div>
          <div>
            <img src={image3} alt="Campaign 3" style={{ width: '100%', height: 'auto' }} />
          </div>
        </StyledSlider>
      </Main>
      <Footer>
        <p>© 2024 Campaign Stars. All rights reserved.</p>
      </Footer>
    </Container>
  );
};

export default HomePage;
