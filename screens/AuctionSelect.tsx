import {Alert, FlatList, LayoutAnimation, ListRenderItem, StyleSheet, TextInput} from 'react-native';
import {View} from '../components/Themed';
import {useCallback, useEffect, useMemo, useState} from "react";
import {db} from "../database";
import OrganizationDisplay from "../components/OrganizationDisplay";
import {Organization} from "../database/modules/organizations/Organization";
import {FloatingAction, IActionProps} from "react-native-floating-action";
import useColorScheme from "../hooks/useColorScheme";
import Colors from '../constants/Colors';
import {KeyboardDismissView} from "../components/KeyboardDismissView";
import Modal from "react-native-modal";
import EditOrgModal from "../components/EditOrgModal";

export default function AuctionSelect() {

    const [selectedIDs, setSelected] = useState<Set<string>>(new Set());
    const [organizations, setOrgs] = useState(db.organizations?.orgs ?? new Map());
    const [searchText, setSearched] = useState('');

    const theme = useColorScheme();
    const [editModalOpen, setEditModalOpen] = useState(false),
        handleEditOpen = () => setEditModalOpen(true),
        handleEditClose = () => setEditModalOpen(false);

    useEffect(() => {
        db.socket.on("dataUpdate", (data: any) => {
            db.init(data);
            const map = db.organizations?.orgs ?? new Map();
            setOrgs(map);
        });
    }, [])

    const renderOrg: ListRenderItem<[string, Organization]> = useCallback(({item}) => {
        const [id, org] = item;
        if (!org) return null;
        if (!org.name.toLowerCase().includes(searchText.toLowerCase())) return null;

        return <OrganizationDisplay organization={org} onClick={selectImage} isSelected={selectedIDs.has(id)}/>
    }, [selectedIDs, searchText])

    const selectImage = useCallback((id: string) => {
        if (selectedIDs.has(id))
            selectedIDs.delete(id)
        else selectedIDs.add(id)
        setSelected(new Set(selectedIDs))
    }, [selectedIDs]);

    const sendImages = useCallback(() => {

        Alert.alert('Are you sure', 'Are you sure you want to send these item?', [
            {
                text: 'Yes',
                onPress: () => {
                    db.socket.emit("displayNewWinner", [...selectedIDs]);
                    setSelected(new Set());
                },
            },
            {
                text: 'Cancel',
                style: 'cancel'
            }
        ])
    }, [selectedIDs]);

    const actions: IActionProps[] = useMemo(() => [
        {
            text: 'Send',
            name: 'send',
            color: Colors[theme].tabIconDefault
        },
        {
            text: 'Deselect All',
            name: 'deselect',
            color: Colors[theme].tabIconDefault
        },
        {
            text: 'Add Organization',
            name: 'new_entry',
            color: Colors[theme].tabIconDefault
        }
    ], []);

    const actionFuncs = {
        new_entry: handleEditOpen,
        send: sendImages,
        deselect: () => setSelected(new Set())
    } as { [index: string]: () => void };

    return (
        <KeyboardDismissView style={styles.container}>

            <TextInput style={{
                backgroundColor: Colors[theme].tint,
                width: '90%',
                fontSize: 20,
                fontWeight: '500',
                margin: 10,
                borderRadius: 5
            }} placeholder={'Search'} placeholderTextColor={'black'} onChange={e => {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                setSearched(e.nativeEvent.text);
            }}/>

            <View style={{flex: 1}}>
                <FlatList data={[...organizations]}
                          renderItem={renderOrg}
                          keyExtractor={(org: [string, Organization]) => org[0]}/>
            </View>

            <FloatingAction
                actions={actions}
                onPressItem={(name?: string) => name ? actionFuncs[name]() : void 0}
                //@ts-ignore
                iconColor={'gold'}
            />

            <Modal isVisible={editModalOpen} onBackdropPress={handleEditClose}>
                <EditOrgModal close={handleEditClose}/>
            </Modal>


        </KeyboardDismissView>
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
