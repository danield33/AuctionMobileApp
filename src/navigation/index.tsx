import {Ionicons} from '@expo/vector-icons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {DarkTheme, DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {ColorSchemeName} from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import AuctionDisplay from '../screens/AuctionDisplay';
import AuctionSelect from '../screens/AuctionSelect';
import {RootStackParamList, RootTabParamList, RootTabScreenProps} from '../../types';
import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation({colorScheme}: { colorScheme: ColorSchemeName }) {
    return (
        <NavigationContainer
            linking={LinkingConfiguration}
            theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <RootNavigator/>
        </NavigationContainer>
    );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Root" component={BottomTabNavigator} options={{headerShown: false}}/>
        </Stack.Navigator>
    );
}


const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
    const colorScheme = useColorScheme();

    return (
        <BottomTab.Navigator
            initialRouteName="AuctionDisplay"
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme].tint,
            }}>
            <BottomTab.Screen
                name="AuctionDisplay"
                component={AuctionDisplay}
                options={({navigation}: RootTabScreenProps<'AuctionDisplay'>) => ({
                    title: 'Auction Display',
                    tabBarIcon: ({color}) => <TabBarIcon name="browsers" color={color}/>,
                })}
            />
            <BottomTab.Screen
                name="AuctionSelect"
                component={AuctionSelect}
                options={{
                    title: 'Select',
                    tabBarIcon: ({color}) => <TabBarIcon name="code" color={color}/>,
                }}
            />
        </BottomTab.Navigator>
    );
}

function TabBarIcon(props: {
    name: React.ComponentProps<typeof Ionicons>['name'];
    color: string;
}) {
    return <Ionicons size={30} style={{marginBottom: -3}} {...props} />;
}
