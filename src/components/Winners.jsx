import React, { useEffect, useState } from 'react';
import axios from '../axios';
import cn from 'classnames';

import { useForm, Controller } from 'react-hook-form';
import InputMask from 'react-input-mask';

const Winners = () => {
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
      const response = await axios.get(`?page=${state.page}&prise=${state.prise}`);
      const { checks, page, total_pages } = response.data;
      setState((prev) => {
        return {
          ...prev,
          page,
          total_pages,
          data: [...prev.data, ...checks],
          message: 'Приз еще не разыгран',
        };
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

      <div className="filter">
        <button
          type="button"
          className={cn('filter__button', { active: state.prise === 'hoodie' })}
          onClick={() => {
            if (state.prise === 'hoodie') return;
            setState({ page: 1, total_pages: null, prise: 'hoodie', count: 6, data: [] });
          }}
        >
          Ежедневный приз
        </button>
        <button
          type="button"
          className={cn('filter__button', { active: state.prise === 'jbl_speaker' })}
          onClick={() => {
            if (state.prise === 'jbl_speaker') return;
            setState({ page: 1, total_pages: null, prise: 'jbl_speaker', count: 6, data: [] });
          }}
        >
          Еженедельный приз
        </button>
        <button
          type="button"
          className={cn('filter__button', { active: state.prise === 'journey' })}
          onClick={() => {
            if (state.prise === 'journey') return;
            setState({ page: 1, total_pages: null, prise: 'journey', count: 6, data: [] });
          }}
        >
          Главный приз
        </button>
      </div>

      <ul className="list">
        {state.data.length === 0 ? (
          <div className="list__message">{state.message}</div>
        ) : (
          state.data.slice(0, state.count).map(({ phone, draw_period, prise, number }) => (
            <li className="list__row" key={number}>
              <div className="prize">{prise}</div>
              <div className="phone-number">{phone}</div>
              <div className="date">{draw_period}</div>
            </li>
          ))
        )}
      </ul>

      {state.count >= state.data.length ? null : (
        <button
          type="button"
          className="button-more"
          onClick={() => {
            if (state.page < state.total_pages) {
              setState((prev) => {
                return { ...prev, page: prev.page + 1, count: prev.count + 4 };
              });
            } else
              setState((prev) => {
                return { ...prev, count: prev.count + 4 };
              });
          }}
        >
          Показать ещё
        </button>
      )}
    </>
  );
};

export default Winners;
