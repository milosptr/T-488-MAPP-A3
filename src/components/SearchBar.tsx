import { spacing } from '@/src/constants/DesignTokens';
import { useTheme } from '@/src/hooks';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useEffect, useRef } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import Animated, {
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';

const ICON_SIZE = 28;
const COLLAPSED_WIDTH = 48;
const ANIMATION_DURATION = 250;

type Props = {
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    expanded: boolean;
    onExpandedChange: (expanded: boolean) => void;
    containerWidth: number;
};

export const SearchBar = ({
    value,
    onChangeText,
    placeholder = 'Search...',
    expanded,
    onExpandedChange,
    containerWidth,
}: Props) => {
    const inputRef = useRef<TextInput>(null);
    const theme = useTheme();

    const animatedWidth = useSharedValue(COLLAPSED_WIDTH);

    const animatedContainerStyle = useAnimatedStyle(() => ({
        width: animatedWidth.value,
    }));

    const focusInput = () => {
        inputRef.current?.focus();
    };

    useEffect(() => {
        if (expanded && containerWidth > 0) {
            animatedWidth.value = withTiming(containerWidth, { duration: ANIMATION_DURATION }, () =>
                runOnJS(focusInput)()
            );
        } else {
            inputRef.current?.blur();
            animatedWidth.value = withTiming(COLLAPSED_WIDTH, { duration: ANIMATION_DURATION });
        }
    }, [expanded, containerWidth, animatedWidth]);

    const handleExpand = () => {
        onExpandedChange(true);
    };

    const handleCollapse = () => {
        onChangeText('');
        onExpandedChange(false);
    };

    return (
        <View style={styles.wrapper}>
            <Animated.View
                style={[
                    styles.container,
                    { backgroundColor: theme.colors.card, borderColor: theme.colors.border },
                    animatedContainerStyle,
                ]}
            >
                {expanded ? (
                    <View style={styles.inputContainer}>
                        <Ionicons name="search" size={20} color={theme.colors.text} />
                        <TextInput
                            ref={inputRef}
                            value={value}
                            onChangeText={onChangeText}
                            placeholder={placeholder}
                            placeholderTextColor={theme.colors.text + '80'}
                            style={[styles.input, { color: theme.colors.text }]}
                            autoCapitalize="none"
                            autoCorrect={false}
                            returnKeyType="search"
                        />
                        <TouchableOpacity onPress={handleCollapse} hitSlop={8}>
                            <Ionicons name="close" size={20} color={theme.colors.text} />
                        </TouchableOpacity>
                    </View>
                ) : (
                    <TouchableOpacity onPress={handleExpand} style={styles.iconButton}>
                        <Ionicons name="search" size={ICON_SIZE} color={theme.colors.text} />
                    </TouchableOpacity>
                )}
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        right: 0,
        zIndex: 1,
    },
    container: {
        height: COLLAPSED_WIDTH,
        borderRadius: COLLAPSED_WIDTH,
        borderWidth: 1,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconButton: {
        width: COLLAPSED_WIDTH,
        height: COLLAPSED_WIDTH,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: spacing.md,
        gap: spacing.sm,
    },
    input: {
        flex: 1,
        fontSize: 16,
        paddingVertical: 0,
    },
});
