import { fontSize, spacing } from '@/src/constants/DesignTokens';
import { useMovies, useTheme } from '@/src/hooks';
import { setCertificate, useAppDispatch, useAppSelector } from '@/src/store';
import React, { useMemo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from '../ui';
import { FilterChip } from '../ui/FilterChip';

export const CertificateFilter = () => {
    const theme = useTheme();
    const dispatch = useAppDispatch();
    const selectedCertificate = useAppSelector(state => state.filters.certificate);
    const { data: movies = [] } = useMovies();

    const uniqueCertificates = useMemo(() => {
        const certificatesSet = new Set<string>();
        movies.forEach(movie => {
            if (movie.certificate?.is) {
                certificatesSet.add(movie.certificate.is);
            }
        });
        return Array.from(certificatesSet).sort((a, b) => {
            const numA = parseInt(a, 10);
            const numB = parseInt(b, 10);
            if (!isNaN(numA) && !isNaN(numB)) {
                return numA - numB;
            }
            return a.localeCompare(b);
        });
    }, [movies]);

    const handlePress = (certificate: string) => {
        if (selectedCertificate === certificate) {
            dispatch(setCertificate(null));
        } else {
            dispatch(setCertificate(certificate));
        }
    };

    const handleClear = () => {
        dispatch(setCertificate(null));
    };

    return (
        <View style={styles.container}>
            <View style={[styles.header, { borderColor: theme.colors.border }]}>
                <Text style={styles.title}>Select PG Rating</Text>
                {!!selectedCertificate && (
                    <TouchableOpacity onPress={handleClear}>
                        <Text style={[styles.clear, { color: theme.colors.error }]}>Clear</Text>
                    </TouchableOpacity>
                )}
            </View>
            <View style={styles.listContainer}>
                {uniqueCertificates.map(certificate => (
                    <FilterChip
                        key={certificate}
                        title={certificate}
                        onPress={() => handlePress(certificate)}
                        selected={selectedCertificate === certificate}
                        hideTrailingIcon
                    />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: spacing.xl,
    },
    header: {
        borderBottomWidth: 1,
        paddingBottom: spacing.xs,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontSize: fontSize.lg,
    },
    listContainer: {
        gap: spacing.sm,
        marginTop: spacing.md,
    },
    clear: {
        fontSize: fontSize.base,
    },
});
