import React from 'react';
import { useResizeDetector } from 'react-resize-detector';
import Header from './components/Header';
import Mobile from './components/Mobile';
import Winners from './components/Winners';

const App = () => {
  const { width, ref } = useResizeDetector();
  if (width < 430) {
    return (
      <div className="container" ref={ref}>
        <Mobile />;
      </div>
    );
  }
  return (
    <div className="container" ref={ref}>
      <Header />
      <Winners />
    </div>
  );
};

export default App;
