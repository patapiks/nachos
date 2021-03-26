import React from 'react';
import { useResizeDetector } from 'react-resize-detector';
import Winners from './components/Winners';

const App = () => {
  const { width, ref } = useResizeDetector();
  const isMobile = width < 430;
  return (
    <div className="container" ref={ref}>
      <Winners isMobile={isMobile} />
    </div>
  );
};

export default App;
