import {LinkingOptions} from '@react-navigation/native';
import * as Linking from 'expo-linking';

import {RootStackParamList} from '../../types';

const linking: LinkingOptions<RootStackParamList> = {
    prefixes: [Linking.makeUrl('/')],
    config: {
        screens: {
            Root: {
                screens: {
                    AuctionDisplay: {
                        screens: {
                            AuctionDisplay: 'one',
                        },
                    },
                    AuctionSelect: {
                        screens: {
                            AuctionSelect: 'two',
                        },
                    },
                },
            }
        },
    },
};

export default linking;
