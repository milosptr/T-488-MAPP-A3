import { useTheme } from '@/src/hooks';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';

const TAB_ICON_SIZE = 28;

function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
    return <Ionicons size={TAB_ICON_SIZE} {...props} />;
}

export default function TabLayout() {
    const { colors } = useTheme();

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: colors.text,
                tabBarLabelStyle: styles.tabBarLabel,
                tabBarStyle: { backgroundColor: 'transparent' },
                tabBarBackground: () => null,
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
    tabBarLabel: {
        marginTop: 3,
    },
});
