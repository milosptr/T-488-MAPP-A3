import { store } from '@/src/store';
import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';

export const StoreProvider = ({ children }: PropsWithChildren) => {
    return <Provider store={store}>{children}</Provider>;
};
