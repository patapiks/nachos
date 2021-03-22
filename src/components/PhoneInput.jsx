import React from 'react';
import axios from '../axios';
import { useForm, Controller } from 'react-hook-form';
import InputMask from 'react-input-mask';

const PhoneInput = () => {
  const { handleSubmit, control, reset } = useForm();
  const onSubmit = async ({ tel }) => {
    const response = await axios.get(`?phone=${tel}`);
    console.log(response);
    console.log(tel);
    reset();
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
    </>
  );
};

export default PhoneInput;

/*
<input
  data-name="phone-number"
  ref={register({ required: true })}
  placeholder="+7 (___) ___-__-__"
  type="number"
  name="tel"
/>
*/
