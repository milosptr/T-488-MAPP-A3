import { useTheme } from '@/src/hooks';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const TAB_ICON_SIZE = 28;

function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
    return <Ionicons size={TAB_ICON_SIZE} {...props} />;
}

export default function TabLayout() {
    const { colors } = useTheme();

    const TabBarBackground = () => (
        <View
            style={[
                styles.tabBarBackground,
                { backgroundColor: colors.card, borderTopColor: colors.border },
            ]}
        />
    );

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: colors.text,
                tabBarBackground: TabBarBackground,
                tabBarLabelStyle: styles.tabBarLabel,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
                }}
            />
            <Tabs.Screen
                name="cinemas"
                options={{
                    title: 'Cinemas',
                    tabBarIcon: ({ color }) => <TabBarIcon name="film" color={color} />,
                }}
            />
            <Tabs.Screen
                name="upcoming"
                options={{
                    title: 'Upcoming',
                    tabBarIcon: ({ color }) => <TabBarIcon name="calendar" color={color} />,
                }}
            />
            <Tabs.Screen
                name="favourites"
                options={{
                    title: 'Favourites',
                    tabBarIcon: ({ color }) => <TabBarIcon name="heart" color={color} />,
                }}
            />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    tabBarBackground: {
        flex: 1,
        borderTopWidth: 1,
    },
    tabBarLabel: {
        marginTop: 3,
    },
});
