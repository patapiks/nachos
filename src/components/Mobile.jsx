import React, { useEffect, useState } from 'react';
import axios from '../axios';
import logo from '../img/JBL.png';

import { useForm, Controller } from 'react-hook-form';
import InputMask from 'react-input-mask';

import Slider from 'react-slick';

const Mobile = () => {
  const [state, setState] = useState({
    page: 1,
    total_pages: null,
    prise: 'jbl_speaker',
    count: 6,
    data: [],
    message: '',
  });

  useEffect(() => {
    async function loadMore() {
      const response = await axios.get();
      const { checks, page, total_pages } = response.data;
      setState((prev) => {
        return { ...prev, page, total_pages, data: checks };
      });
    }
    loadMore();
  }, [state.page, state.prise]);

  const { handleSubmit, control, reset, setValue } = useForm();
  const onSubmit = async ({ tel }) => {
    const response = await axios.get(`?phone=${tel}`);
    setState((prev) => {
      const { checks } = response.data;
      if (checks.length === 0) {
        return { ...prev, message: 'Ваш телефон не найден среди победителей' };
      }
      return { ...prev, data: checks, message: '' };
    });
    reset();
    setValue('tel', '');
  };

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
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <Controller
          name="tel"
          as={InputMask}
          control={control}
          defaultValue=""
          mask="+7 (999) 999-99-99"
          alwaysShowMask
          className="form__input"
        />
        <button type="submit" className="form__button" />
      </form>

      <div className="list__message">{state.message}</div>

      <Slider {...carouselSettings}>
        {state.data.map(({ phone, draw_period, prise, number }) => (
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
