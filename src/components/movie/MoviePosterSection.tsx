import { LiquidButton } from '@/src/components/ui';
import { borderRadius, spacing } from '@/src/constants/DesignTokens';
import { useFavorites, useTheme } from '@/src/hooks';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { Image, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
    posterUri: string;
    trailerKey: string | null;
    movieId?: string;
    onBack: () => void;
    onTrailerPress: () => void;
    onSharePress?: () => void;
    onFavoritePress?: () => void;
    buttonsAnimatedStyle?: StyleProp<ViewStyle>;
};

const ICON_SIZE = 24;
const ICON_BUTTON_SIZE = 48;
const ASPECT_RATIO_TALL_POSTER = 10 / 16;
const POSTER_TOP_OFFSET = -48;
const GRADIENT_HEIGHT = 200;

export const MoviePosterSection = ({
    posterUri,
    trailerKey,
    movieId,
    onBack,
    onTrailerPress,
    onSharePress,
    onFavoritePress,
    buttonsAnimatedStyle,
}: Props) => {
    const { colors } = useTheme();
    const insets = useSafeAreaInsets();
    const { isFavorite } = useFavorites();
    const isFav = movieId ? isFavorite(movieId) : false;

    return (
        <Animated.View style={styles.container}>
            <Image source={{ uri: posterUri }} style={styles.poster} resizeMode="cover" />
            <LinearGradient
                colors={['transparent', colors.background]}
                style={styles.gradient}
                start={{ x: 0, y: 0.1 }}
                end={{ x: 0, y: 1.3 }}
            />
            <View style={[styles.backButton, { top: insets.top }]}>
                <LiquidButton
                    style={styles.iconButton}
                    glassEffectStyle="regular"
                    leadingIcon={
                        <Ionicons
                            name="chevron-back-outline"
                            size={ICON_SIZE}
                            color={colors.text}
                        />
                    }
                    onPress={onBack}
                />
            </View>
            <Animated.View style={[styles.content, buttonsAnimatedStyle]}>
                {!!trailerKey && (
                    <LiquidButton
                        leadingIcon={
                            <Ionicons
                                name="play-circle-outline"
                                size={ICON_SIZE}
                                color={colors.text}
                            />
                        }
                        text="Trailer"
                        onPress={onTrailerPress}
                    />
                )}
                <View style={styles.spacer} />
                <LiquidButton
                    style={styles.iconButton}
                    leadingIcon={
                        <Ionicons name="share-outline" size={ICON_SIZE} color={colors.text} />
                    }
                    onPress={onSharePress}
                />
                <LiquidButton
                    style={styles.iconButton}
                    leadingIcon={
                        <Ionicons
                            name={isFav ? 'heart' : 'heart-outline'}
                            size={ICON_SIZE}
                            color={isFav ? colors.secondary : colors.text}
                        />
                    }
                    onPress={onFavoritePress}
                />
            </Animated.View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: borderRadius.xl,
        overflow: 'hidden',
    },
    poster: {
        width: '100%',
        aspectRatio: ASPECT_RATIO_TALL_POSTER,
        opacity: 0.8,
        marginTop: POSTER_TOP_OFFSET,
    },
    gradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: GRADIENT_HEIGHT,
    },
    backButton: {
        position: 'absolute',
        top: 0,
        left: spacing.lg,
        zIndex: 1,
    },
    content: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: spacing.lg,
        flexDirection: 'row',
        gap: spacing.md,
    },
    spacer: {
        flex: 1,
    },
    iconButton: {
        borderRadius: borderRadius.full,
        width: ICON_BUTTON_SIZE,
        paddingHorizontal: 0,
    },
});
