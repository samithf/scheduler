import React, { Suspense } from 'react';
// import TestAsync from './TestAsync';
// import RMScheduler from './scheduler/RMScheduler';

const LazyRMScheduler = React.lazy(() => import('./scheduler/RMScheduler'));

const App = () => {
  return (
    <div>
      <h1>Hello Pronto</h1>
      <img src="images/cat.png" />
      <Suspense fallback={<div>Loading...</div>}>
        <LazyRMScheduler />
      </Suspense>
    </div>
  );
};

export default App;
