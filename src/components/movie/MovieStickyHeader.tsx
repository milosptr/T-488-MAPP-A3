import { LiquidButton } from '@/src/components/ui';
import { ICON_BUTTON_SIZE } from '@/src/constants/constants';
import { borderRadius, spacing } from '@/src/constants/DesignTokens';
import { useFavorites, useTheme } from '@/src/hooks';
import { isGlassAvailable } from '@/src/utils';
import { Ionicons } from '@expo/vector-icons';
import { GlassContainer, GlassView } from 'expo-glass-effect';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
    trailerKey: string | null;
    movieId: string;
    onBack: () => void;
    onTrailerPress: () => void;
    onSharePress: () => void;
    onFavoritePress: () => void;
    style?: StyleProp<ViewStyle>;
};

const ICON_SIZE = 24;

export const MovieStickyHeader = ({
    trailerKey,
    movieId,
    onBack,
    onTrailerPress,
    onSharePress,
    onFavoritePress,
    style,
}: Props) => {
    const { colors } = useTheme();
    const insets = useSafeAreaInsets();
    const { isFavorite } = useFavorites();
    const isFav = isFavorite(movieId);

    const content = (
        <>
            <LiquidButton
                style={styles.iconButton}
                glassEffectStyle="clear"
                leadingIcon={
                    <Ionicons name="chevron-back-outline" size={ICON_SIZE} color={colors.text} />
                }
                onPress={onBack}
            />

            <View style={styles.spacer} />
            <View style={styles.actions}>
                {!!trailerKey && (
                    <LiquidButton
                        style={styles.iconButton}
                        glassEffectStyle="clear"
                        leadingIcon={
                            <Ionicons
                                name="play-circle-outline"
                                size={ICON_SIZE}
                                color={colors.text}
                            />
                        }
                        onPress={onTrailerPress}
                    />
                )}
                <LiquidButton
                    style={styles.iconButton}
                    glassEffectStyle="clear"
                    leadingIcon={
                        <Ionicons name="share-outline" size={ICON_SIZE} color={colors.text} />
                    }
                    onPress={onSharePress}
                />
                <LiquidButton
                    style={styles.iconButton}
                    glassEffectStyle="clear"
                    leadingIcon={
                        <Ionicons
                            name={isFav ? 'heart' : 'heart-outline'}
                            size={ICON_SIZE}
                            color={isFav ? colors.secondary : colors.text}
                        />
                    }
                    onPress={onFavoritePress}
                />
            </View>
        </>
    );

    if (isGlassAvailable()) {
        return (
            <Animated.View style={[styles.container, style]}>
                <GlassContainer spacing={1}>
                    <GlassView
                        style={[styles.glassBackground, { paddingTop: insets.top }]}
                        glassEffectStyle="regular"
                    >
                        {content}
                    </GlassView>
                </GlassContainer>
            </Animated.View>
        );
    }

    return (
        <Animated.View style={[styles.container, style]}>
            <View
                style={[
                    styles.glassBackground,
                    styles.fallback,
                    { paddingTop: insets.top + spacing.sm, borderColor: colors.border },
                ]}
            >
                {content}
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
    },
    glassBackground: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: spacing.lg,
        paddingBottom: spacing.sm,
        gap: spacing.md,
    },
    fallback: {
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        borderBottomWidth: 1,
    },
    spacer: {
        flex: 1,
    },
    actions: {
        flexDirection: 'row',
        gap: spacing.sm,
    },
    iconButton: {
        borderRadius: borderRadius.full,
        width: ICON_BUTTON_SIZE,
        height: ICON_BUTTON_SIZE,
        paddingHorizontal: 0,
    },
});
