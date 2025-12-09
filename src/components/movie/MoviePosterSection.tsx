import { LiquidButton } from '@/src/components/ui';
import { borderRadius, spacing } from '@/src/constants/DesignTokens';
import { useFavorites, useTheme } from '@/src/hooks';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { Image, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
    posterUri: string;
    trailerKey: string | null;
    movieId?: string;
    onBack: () => void;
    onTrailerPress: () => void;
    onSharePress?: () => void;
    onFavoritePress?: () => void;
};

export const MoviePosterSection = ({
    posterUri,
    trailerKey,
    movieId,
    onBack,
    onTrailerPress,
    onSharePress,
    onFavoritePress,
}: Props) => {
    const { colors } = useTheme();
    const insets = useSafeAreaInsets();
    const { isFavorite } = useFavorites();
    const isFav = movieId ? isFavorite(movieId) : false;

    return (
        <View style={styles.container}>
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
                        <Ionicons name="chevron-back-outline" size={24} color={colors.text} />
                    }
                    onPress={onBack}
                />
            </View>
            <View style={styles.content}>
                {!!trailerKey && (
                    <LiquidButton
                        leadingIcon={
                            <Ionicons name="play-circle-outline" size={24} color={colors.text} />
                        }
                        text="Trailer"
                        onPress={onTrailerPress}
                    />
                )}
                <View style={styles.spacer} />
                <LiquidButton
                    style={styles.iconButton}
                    leadingIcon={<Ionicons name="share-outline" size={24} color={colors.text} />}
                    onPress={onSharePress}
                />
                <LiquidButton
                    style={styles.iconButton}
                    leadingIcon={
                        <Ionicons
                            name={isFav ? 'heart' : 'heart-outline'}
                            size={24}
                            color={isFav ? '#FF6B6B' : colors.text}
                        />
                    }
                    onPress={onFavoritePress}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: borderRadius.xl,
        overflow: 'hidden',
    },
    poster: {
        width: '100%',
        aspectRatio: 10 / 16,
        opacity: 0.8,
        marginTop: -48,
    },
    gradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 200,
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
        borderRadius: 48,
        width: 48,
        paddingHorizontal: 0,
    },
});
