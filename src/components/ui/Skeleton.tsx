import { useTheme } from '@/src/hooks';
import { Skeleton as MotiSkeleton } from 'moti/skeleton';
import { JSXElementConstructor, ReactElement } from 'react';

type Props = {
    children?: ReactElement<unknown, string | JSXElementConstructor<unknown>> | null;
    show?: boolean;
} & Parameters<typeof MotiSkeleton>[number];

export const Skeleton = ({ children, show = false, ...props }: Props) => {
    const { colors } = useTheme();
    const skeletonColors = [colors.surfaceVariant, colors.surface, colors.surfaceVariant];

    return (
        <MotiSkeleton show={show} colors={skeletonColors} {...props}>
            {children}
        </MotiSkeleton>
    );
};
