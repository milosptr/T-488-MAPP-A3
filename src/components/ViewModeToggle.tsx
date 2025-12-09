import { Text } from '@/src/components/ui';
import { spacing } from '@/src/constants/DesignTokens';
import { useTheme } from '@/src/hooks';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export type ViewMode = 'cinemas' | 'movies';

type Props = {
    value: ViewMode;
    onChange: (mode: ViewMode) => void;
};

export const ViewModeToggle = ({ value, onChange }: Props) => {
    const { colors } = useTheme();

    const selectedStyle = {
        textDecorationLine: 'underline',
        color: colors.primary,
    } as const;

    return (
        <View style={styles.container}>
            <Text style={styles.label}>View mode:</Text>
            <TouchableOpacity onPress={() => onChange('cinemas')}>
                <Text style={value === 'cinemas' && selectedStyle}>By cinemas</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onChange('movies')}>
                <Text style={value === 'movies' && selectedStyle}>All movies</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: spacing.md,
    },
    label: {
        flex: 1,
        fontWeight: 'bold',
    },
});
