import React from 'react';
import logo from '../img/JBL.png';
import Slider from 'react-slick';
import PhoneInput from './PhoneInput';

const Mobile = (props) => {
  const { message, data, onSubmitPhone } = props;

  const carouselSettings = {
    centerPadding: '60px',
    className: 'carousel',
    centerMode: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <PhoneInput onSubmitPhone={onSubmitPhone} />

      <div className="list__message">{message}</div>

      <Slider {...carouselSettings}>
        {data.map(({ phone, draw_period, prise, number }) => (
          <div className="mobileList" key={number}>
            <div className="mobileList__row">
              <img src={logo} alt="" />
              <div className="prize">{prise}</div>
              <div className="phone-number">{phone}</div>
              <div className="date">{draw_period}</div>
            </div>
          </div>
        ))}
      </Slider>
    </>
  );
};

export default Mobile;
