import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import axios from '../axios';
import logo from '../img/JBL.png';

const Mobile = () => {
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
  );
};

export default Mobile;
