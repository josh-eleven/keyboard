import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createHashRouter,
  Link,
  Outlet,
  RouterProvider,
} from 'react-router-dom';
import Home from './Home';

import style from './index.module.css';
console.log(111111, 111111, 11111111, 111111);

const Navbar = () => {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/foo">Foo</Link>
      <Link to="/bar">Bar</Link>
    </div>
  );
};
// const style = { container: '', outlet: '' };

const HeaderLayout = () => {
  return (
    <>
      <div className={style.container}>
        <header>
          <Navbar />
        </header>
        <div className={style.outlet}>
          <Outlet />
        </div>
      </div>
    </>
  );
};

const router = createHashRouter([
  {
    element: <HeaderLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/foo',
        element: <div>foo</div>,
      },
      {
        path: '/bar',
        element: <div>bar</div>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
);
