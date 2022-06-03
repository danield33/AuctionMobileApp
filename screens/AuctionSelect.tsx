import {FlatList, ListRenderItem, StyleSheet, Text} from 'react-native';
import {View} from '../components/Themed';
import {useState} from "react";
import {db} from "../database";
import OrganizationDisplay from "../components/OrganizationDisplay";
import {Organization} from "../database/modules/organizations/Organization";

export default function AuctionSelect() {

    const [selectedIDs, setSelected] = useState<string[]>(db.organizations?.winners ?? []);

    const [organizations, setOrgs] = useState(db.organizations?.orgs ?? new Map());

    const renderOrg: ListRenderItem<[string, Organization]> = ({item}) => {
        const [, org] = item;
        if (!org) return null;

        return <OrganizationDisplay organization={org}/>
    }


    return (
        <View style={styles.container}>

            <View style={{flex: 1}}>
                <FlatList data={[...organizations]}
                          renderItem={renderOrg}
                          keyExtractor={(org: [string, Organization]) => org[0]}/>
            </View>


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
