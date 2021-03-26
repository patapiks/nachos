import React, { useEffect, useState } from 'react';
import axios from '../axios';
import Filter from './Filter';
import Header from './Header';
import Mobile from './Mobile';
import PhoneInput from './PhoneInput';

const Winners = ({ isMobile }) => {
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

  const handleFilter = (prise) => () => {
    if (state.prise === prise) return;
    setState({ page: 1, total_pages: null, prise, count: 6, data: [] });
  };

  const handleShowMore = () => {
    if (state.page < state.total_pages) {
      setState((prev) => {
        return { ...prev, page: prev.page + 1, count: prev.count + 4 };
      });
    } else
      setState((prev) => {
        return { ...prev, count: prev.count + 4 };
      });
  };

  const onSubmitPhone = (response) => {
    setState((prev) => {
      const { checks } = response.data;
      return { ...prev, data: checks, message: 'Ваш телефон не найден среди победителей' };
    });
  };

  if (isMobile) {
    return <Mobile message={state.message} data={state.data} onSubmitPhone={onSubmitPhone} />;
  }
  return (
    <>
      <Header />
      <PhoneInput onSubmitPhone={onSubmitPhone} />
      <Filter prise={state.prise} handleFilter={handleFilter} />

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

      {state.count < state.data.length && (
        <button type="button" className="button-more" onClick={handleShowMore}>
          Показать ещё
        </button>
      )}
    </>
  );
};

export default Winners;
