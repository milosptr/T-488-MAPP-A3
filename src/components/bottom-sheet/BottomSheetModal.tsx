import { spacing } from '@/src/constants/DesignTokens';
import { useTheme } from '@/src/hooks/useTheme';
import {
    BottomSheetModalProps,
    BottomSheetView,
    BottomSheetModal as RNBottomSheetModal,
} from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Backdrop } from './Backdrop';

type Props = {
    children: React.ReactNode;
    ref: React.RefObject<RNBottomSheetModal | null>;
    scrollable?: boolean;
} & Omit<BottomSheetModalProps, 'handleIndicatorStyle'>;

export type BottomSheetModal = RNBottomSheetModal;

export const useBottomSheetInsets = () => {
    const { bottom } = useSafeAreaInsets();
    return {
        paddingBottom: bottom,
        paddingHorizontal: spacing.lg,
    };
};

// eslint-disable-next-line no-redeclare
export const BottomSheetModal = ({
    children,
    ref,
    backgroundStyle,
    scrollable = false,
    ...props
}: Props) => {
    const theme = useTheme();
    const insets = useBottomSheetInsets();

    const _backgroundStyle = [
        backgroundStyle,
        {
            backgroundColor: theme.colors.background,
        },
    ];

    const handleIndicatorStyle = {
        backgroundColor: theme.colors.border,
    };

    return (
        <RNBottomSheetModal
            ref={ref}
            backdropComponent={Backdrop}
            enablePanDownToClose
            backgroundStyle={_backgroundStyle}
            handleIndicatorStyle={handleIndicatorStyle}
            {...props}
        >
            {scrollable ? children : <BottomSheetView style={insets}>{children}</BottomSheetView>}
        </RNBottomSheetModal>
    );
};
