import { spacing } from '@/src/constants/DesignTokens';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import { useCallback, useState } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import { BottomSheetModal } from '../bottom-sheet';
import { Text } from '../ui';

type Props = {
    ref: React.RefObject<BottomSheetModal | null>;
    videoKey: string | null;
};

export const TrailerModal = ({ ref, videoKey }: Props) => {
    const { width } = useWindowDimensions();
    const [playing, setPlaying] = useState(false);

    const videoHeight = (width - spacing.lg * 2) * (9 / 16);

    const handleStateChange = useCallback((state: string) => {
        if (state === 'ended') {
            setPlaying(false);
        }
    }, []);

    const handleClose = useCallback(() => {
        setPlaying(false);
    }, []);

    if (!videoKey) {
        return null;
    }

    return (
        <BottomSheetModal
            ref={ref}
            index={0}
            snapPoints={['50%']}
            enablePanDownToClose
            onDismiss={handleClose}
        >
            <BottomSheetView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Trailer</Text>
                </View>
                <View style={styles.playerContainer}>
                    <YoutubePlayer
                        height={videoHeight}
                        play={playing}
                        videoId={videoKey}
                        onChangeState={handleStateChange}
                    />
                </View>
            </BottomSheetView>
        </BottomSheetModal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: spacing.lg,
        paddingBottom: spacing.xxl,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
    },
    playerContainer: {
        borderRadius: 12,
        overflow: 'hidden',
    },
});
