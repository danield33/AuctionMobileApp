import {FlatList, ListRenderItem, StyleSheet} from 'react-native';
import {View} from '../components/Themed';
import {RootTabScreenProps} from '../types';
import {useEffect, useState} from "react";
import {db} from "../database";
import {Organization} from "../database/modules/organizations/Organization";
import OrganizationDisplay from "../components/OrganizationDisplay";

export default function AuctionDisplay({navigation}: RootTabScreenProps<'AuctionDisplay'>) {

    const [orgIDs, setIDs] = useState<string[]>(db.organizations?.winners ?? []);

    useEffect(() => {
        db.socket.on("displayNewWinners", (winnerIDs: string[]) => {
            setIDs(winnerIDs);
            console.log(winnerIDs)
            db.organizations!.winners = winnerIDs;
        });
    }, []);

    const renderOrg: ListRenderItem<string> = ({item}) => {
        const org = item;
        const organization = db.organizations?.orgs.get(org);
        if (!organization) return null;

        return <OrganizationDisplay organization={organization} isSelected={false}/>
    }

    return (
        <View style={styles.container}>

            <FlatList data={orgIDs}
                      renderItem={renderOrg}
                      keyExtractor={(org: string) => org}/>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
