import React from 'react';
import { useResizeDetector } from 'react-resize-detector';
import Header from './components/Header';
import Mobile from './components/Mobile';
import Winners from './components/Winners';

const App = () => {
  const { width, ref } = useResizeDetector();
  return (
    <div className="container" ref={ref}>
      {width > 430 ? (
        <React.Fragment>
          <Header />
          <Winners />
        </React.Fragment>
      ) : (
        <Mobile />
      )}
    </div>
  );
};

export default App;
