import { createBrowserRouter } from 'react-router-dom';
import LandingPage from '../pages/landing/LandingPage';
import WindmillPage from '../pages/windmill/WindmillPage';
import FlowEditPage from '../pages/flow/FlowEditPage';
import FlowFundListPage from '../pages/flow/FlowFundListPage';
import FlowFundDetailPage from '../pages/flow/FlowFundDetailPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/windmill',
    element: <WindmillPage />,
  },
  {
    path: '/flow/edit/:flowId',
    element: <FlowEditPage />,
  },
  {
    path: '/flow/funds',
    element: <FlowFundListPage />,
  },
  {
    path: '/flow/:id',
    element: <FlowFundDetailPage />,
  },
]);
