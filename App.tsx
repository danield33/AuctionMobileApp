import {StatusBar} from 'expo-status-bar';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import './src/database/firebase';
import useCachedResources from './src/hooks/useCachedResources';
import useColorScheme from './src/hooks/useColorScheme';
import Navigation from './src/navigation';
import {Platform, UIManager} from "react-native";
import React from 'react';
import {BuyerInfoContextProvider} from "./src/contexts/BuyerInfoContext";

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function App() {
    const isLoadingComplete = useCachedResources();
    const colorScheme = useColorScheme();

    if (!isLoadingComplete) {
        return null;
    } else {

        return (
            <SafeAreaProvider>
                <BuyerInfoContextProvider>
                    <Navigation colorScheme={colorScheme}/>
                    <StatusBar/>
                </BuyerInfoContextProvider>
            </SafeAreaProvider>
        );
    }
}
