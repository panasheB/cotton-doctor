import { lazy } from 'react';
// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import AddTransaction from 'pages/dashboard/AddTransaction';
import ItemsPage from 'pages/dashboard/ItemsPage';
import AssetPage from 'pages/dashboard/Assets/AssetPage';
import MaintenancePage from 'pages/dashboard/Maintenance/MaintenancePage';
import ExpensePage from 'pages/dashboard/Expenses/ExpensePage';
const AuthLogin = Loadable(lazy(() => import('pages/authentication/Login')));
import Reporting from 'pages/dashboard/Reporting';
import CategoryPage from 'pages/dashboard/Assets/CategoryPage';
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
      path: 'transactions',
      element: <AddTransaction />
    },

    {
      path: 'reporting',
      element: <Reporting />
    },

    {
      path: 'login1',
      element: <AuthLogin />
    },

    {
      path: 'items',
      element: <ItemsPage />
    },

    {
      path: 'assets',
      element: <AssetPage />
    },
    {
      path: 'categories',
      element: <CategoryPage />
    },
    {
      path: 'maintenance',
      element: <MaintenancePage />
    },
    {
      path: 'expense',
      element: <ExpensePage />
    }
  ]
};

export default MainRoutes;
