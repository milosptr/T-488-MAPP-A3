import { Text } from '@/src/components/ui';
import { spacing } from '@/src/constants/DesignTokens';
import { Fragment } from 'react';
import { StyleSheet, View } from 'react-native';

type Item = {
    key: string;
    value: string;
};

type Props = {
    label: string;
    items: Item[];
};

export const MovieDetailsList = ({ label, items }: Props) => {
    if (items.length === 0) return null;

    const pluralLabel = items.length > 1 && !label.endsWith('s') ? `${label}s` : label;

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{pluralLabel}:</Text>
            {items.map((item, index) => (
                <Fragment key={item.key}>
                    <Text variant="secondary">{item.value}</Text>
                    {index < items.length - 1 && <Text>•</Text>}
                </Fragment>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
        flexWrap: 'wrap',
    },
    label: {
        fontWeight: 'bold',
    },
});
