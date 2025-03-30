import { FC, useCallback, useEffect } from 'react';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { fetchFeed, selectFeed, selectLoading } from '../../services/ordersSlice';
import { useSelector, useDispatch } from '../../services/store';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(selectFeed);
  const feedDispatch = useDispatch()
  const isFeedLoading = useSelector(selectLoading);

  useEffect(() => {
    feedDispatch(fetchFeed());
  }, [feedDispatch]);
  const handleGetFeed = useCallback(() => {
    feedDispatch(fetchFeed());
  }, [feedDispatch]);

  if (isFeedLoading) {
    return <Preloader />;
  }
  return (
    <FeedUI 
      orders={orders} 
      handleGetFeeds={handleGetFeed} 
    />
  );
};
