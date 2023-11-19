import { lazy } from 'react';
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import ExpertPage from 'pages/dashboard/ExpertPage';
import DetectDiseasePage from 'pages/dashboard/DiseaseDetector/DetectDiseasePage';
import App from 'pages/dashboard/Chatbot/App';

const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));
const Typography = Loadable(lazy(() => import('pages/components-overview/Typography')));

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },

    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },

    {
      path: 'typography',
      element: <Typography />
    },
    {
      path: 'experts',
      element: <ExpertPage />
    },
    {
      path: 'detect',
      element: <DetectDiseasePage />
    },

    {
      path: 'chatbot',
      element: <App />
    },

    

    

 
  ]
};

export default MainRoutes;
