import { QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { getQueryClient } from '@/src/api';

type QueryProviderProps = {
    children: ReactNode;
};

export const QueryProvider = ({ children }: QueryProviderProps) => {
    const queryClient = getQueryClient();

    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
