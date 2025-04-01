import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate
} from 'react-router-dom';
import { useEffect } from 'react';
import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import { AppHeader, Modal, OrderInfo, IngredientDetails } from '@components';
import { GuestRoute } from '../route-protectors/GuestRoute';
import { ProtectedRoute } from '../route-protectors/ProtectedRoute';
import styles from './app.module.css';
import { useDispatch } from '../../services/store';
import { fetchIngredients } from '../../services/ingredientsSlice';
import { fetchUser } from '../../services/authSlice';

const App = () => {
  const appDispatch = useDispatch();
  const navigate = useNavigate();
  const currentPath = useLocation();
  const modalParentPath = currentPath.state?.background;

  useEffect(() => {
    appDispatch(fetchUser());
    appDispatch(fetchIngredients());
  }, [appDispatch]);

  // Функция для закрытия модального окна
  const handleModalClose = () => navigate(-1);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={modalParentPath || currentPath}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/login'
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />
        <Route
          path='/register'
          element={
            <GuestRoute>
              <Register />
            </GuestRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <GuestRoute>
              <ForgotPassword />
            </GuestRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <GuestRoute>
              <ResetPassword />
            </GuestRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute>
              <OrderInfo />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<NotFound404 />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route path='/feed/:number' element={<OrderInfo />} />
      </Routes>

      {/* Модальные окна */}
      <Routes>
        {modalParentPath && (
          <>
            <Route
              path='/ingredients/:id'
              element={
                <Modal title='Детали ингредиента' onClose={handleModalClose}>
                  <IngredientDetails />
                </Modal>
              }
            />
            <Route
              path='/feed/:number'
              element={
                <Modal title='Информация о заказе' onClose={handleModalClose}>
                  <OrderInfo />
                </Modal>
              }
            />
            <Route
              path='/profile/orders/:number'
              element={
                <Modal title='Информация о заказе' onClose={handleModalClose}>
                  <OrderInfo />
                </Modal>
              }
            />
          </>
        )}
      </Routes>
    </div>
  );
};

const AppContainer = () => (
  <Router>
    <App />
  </Router>
);
export default AppContainer;
