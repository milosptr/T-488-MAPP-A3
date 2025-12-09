import { store } from '@/src/store';
import { loadFavorites, loadReviews } from '@/src/store/slices';
import { PropsWithChildren, useEffect } from 'react';
import { Provider } from 'react-redux';

export const StoreProvider = ({ children }: PropsWithChildren) => {
    useEffect(() => {
        // Load favorites and reviews from AsyncStorage on app start
        void store.dispatch(loadFavorites());
        void store.dispatch(loadReviews());
    }, []);

    return <Provider store={store}>{children}</Provider>;
};
