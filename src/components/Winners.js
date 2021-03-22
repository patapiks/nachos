import React, { useEffect, useState } from 'react';
import axios from '../axios';
import cn from 'classnames';

const Winners = () => {
  const [state, setState] = useState({
    page: 1,
    total_pages: null,
    prise: 'jbl_speaker',
    count: 6,
    data: [],
  });

  useEffect(() => {
    async function loadMore() {
      const response = await axios.get(`?page=${state.page}&prise=${state.prise}`);
      const { checks, page, total_pages } = response.data;
      setState((prev) => {
        return { ...prev, page, total_pages, data: [...prev.data, ...checks] };
      });
    }
    loadMore();
  }, [state.page, state.prise]);

  return (
    <>
      <div className="filter">
        <button
          type="button"
          className={cn('filter__button', { active: state.prise === 'hoodie' })}
          onClick={() => {
            setState({ page: 1, total_pages: null, prise: 'hoodie', count: 6, data: [] });
          }}
        >
          Ежедневный приз
        </button>
        <button
          type="button"
          className={cn('filter__button', { active: state.prise === 'jbl_speaker' })}
          onClick={() => {
            setState({ page: 1, total_pages: null, prise: 'jbl_speaker', count: 6, data: [] });
          }}
        >
          Еженедельный приз
        </button>
        <button type="button" className="filter__button">
          Главный приз
        </button>
      </div>

      <ul className="list">
        {state.data.slice(0, state.count).map(({ phone, draw_period, prise, number }) => (
          <li className="list__row" key={number}>
            <div className="prize">{prise}</div>
            <div className="phone-number">{phone}</div>
            <div className="date">{draw_period}</div>
          </li>
        ))}
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
