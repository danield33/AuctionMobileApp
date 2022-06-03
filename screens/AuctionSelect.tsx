import {FlatList, ListRenderItem, StyleSheet} from 'react-native';
import {View} from '../components/Themed';
import {useState} from "react";
import {db} from "../database";
import OrganizationDisplay from "../components/OrganizationDisplay";

export default function AuctionSelect() {

    const [orgIDs, setIDs] = useState<string[]>(db.organizations?.winners ?? []);

    const renderOrg: ListRenderItem<string> = ({item}) => {
        const org = db.organizations?.orgs.get(item);
        if(!org) return null;
        return <OrganizationDisplay organization={org}/>
    }

    return (
        <View style={styles.container}>

            <FlatList data={orgIDs} renderItem={renderOrg} keyExtractor={id => id}/>

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
