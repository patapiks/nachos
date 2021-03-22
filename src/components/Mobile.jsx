import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import axios from '../axios';
import logo from '../img/JBL.png';

import { useForm, Controller } from 'react-hook-form';
import InputMask from 'react-input-mask';

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
      return { ...prev, data: checks, message: 'Ваш телефон не найден среди победителей' };
    });
    reset();
    setValue('tel', '');
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

      {state.data.length === 0 ? (
        <div className="list__message">{state.message}</div>
      ) : (
        <Carousel indicators={false}>
          {state.data.map(({ phone, draw_period, prise, number }) => (
            <Carousel.Item key={number}>
              <div className="mobileList">
                <div className="mobileList__row">
                  <img src={logo} alt="" />
                  <div className="prize">{prise}</div>
                  <div className="phone-number">{phone}</div>
                  <div className="date">{draw_period}</div>
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </>
  );
};

export default Mobile;
