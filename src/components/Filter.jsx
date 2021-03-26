import React from 'react';
import cn from 'classnames';

const Button = (props) => {
  const btnClass = cn('filter__button', { active: props.isActive });
  return (
    <button type="button" className={btnClass} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

const Filter = ({ prise, handleFilter }) => {
  return (
    <div className="filter">
      <Button isActive={prise === 'hoodie'} onClick={handleFilter('hoodie')}>
        Ежедневный приз
      </Button>
      <Button isActive={prise === 'jbl_speaker'} onClick={handleFilter('jbl_speaker')}>
        Еженедельный приз
      </Button>
      <Button isActive={prise === 'journey'} onClick={handleFilter('journey')}>
        Главный приз
      </Button>
    </div>
  );
};
export default Filter;
