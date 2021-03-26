import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import InputMask from 'react-input-mask';
import axios from '../axios';

const PhoneInput = (props) => {
  const { handleSubmit, control, reset, setValue } = useForm();
  const onSubmit = async ({ phone }) => {
    const response = await axios.get(`?phone=${phone}`);
    props.onSubmitPhone(response);
    reset();
    setValue('tel', ''); // Не правильно! Нужно найти проблему.
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <Controller
        name="phone"
        as={InputMask}
        control={control}
        defaultValue=""
        mask="+7 (999) 999-99-99"
        alwaysShowMask
        className="form__input"
      />
      <button type="submit" className="form__button" />
    </form>
  );
};

export default PhoneInput;
