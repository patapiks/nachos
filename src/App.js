import React from 'react';
import { useResizeDetector } from 'react-resize-detector';
import Header from './components/Header';
import Mobile from './components/Mobile';
import PhoneInput from './components/PhoneInput';
import Winners from './components/Winners';

const App = () => {
  const { width, ref } = useResizeDetector();
  if (width < 430) {
    return (
      <div className="container" ref={ref}>
        <PhoneInput />
        <Mobile />;
      </div>
    );
  }
  return (
    <div className="container" ref={ref}>
      <Header />
      <PhoneInput />
      <Winners />
    </div>
  );
};

export default App;
