import React, {useCallback, useEffect, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from "react-native";
import {Buyer, BuyerObj} from "../database/modules/organizations/Buyer";
import Layout from "../constants/Layout";
import {Ionicons} from "@expo/vector-icons";
import EditOrgModal from "./EditOrgModal";
import Modal from "react-native-modal";
import {useBuyerHook} from "../hooks/useBuyers";

interface OrganizationDisplayProps {
    buyer: BuyerObj;
    onClick?: (id: string) => void;
    isSelected: boolean
}

function OrganizationDisplay({buyer, isSelected, onClick}: OrganizationDisplayProps) {

    const [image, setImage] = useState('');
    const {description, name, id} = buyer;
    const [editOpen, setEdit] = useState(false),
        handleOpen = () => setEdit(true),
        handleClose = () => setEdit(false);


    useEffect(() => {
        const getImage = () => buyer.getImage().then(img => {
            setImage(img ?? '');
        });
        getImage();
    }, [buyer]);

    const click = () => {
        onClick?.(buyer.id);
    }

    const {width, height} = Layout.window;
    return (
        <>
            <TouchableOpacity onPress={click} onLongPress={handleOpen}>

                {
                    image ?
                        <Image
                            style={{
                                width: width,
                                height: height * 0.25,
                                marginVertical: 10,
                                //@ts-ignore
                                borderWidth: isSelected ? 5 : 0,
                                borderColor: isSelected ? '#81e541' : undefined
                            }}
                            source={{
                                uri: image || 'data:'
                            }}
                            resizeMode={'cover'}
                        /> :
                        <Ionicons name={'help-circle'} style={{alignSelf: 'center'}} size={height * 0.25}
                                  color={isSelected ? '#81e541' : '#ccc'}/>

                }

                <View style={{
                    position: 'absolute',
                    bottom: 5,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    width: '100%',
                    flex: 1,
                    padding: 5
                }}>
                    <Text style={{
                        color: 'white',
                        fontWeight: '600',
                        fontSize: 15
                    }}>{name} (ID: {id})</Text>
                    <Text numberOfLines={3} adjustsFontSizeToFit style={{
                        color: 'white',
                        fontWeight: '500'
                    }}>{description}</Text>
                </View>

            </TouchableOpacity>
            <Modal isVisible={editOpen} onBackdropPress={handleClose} avoidKeyboard={true}>
                <EditOrgModal close={handleClose} buyer={buyer}/>
            </Modal>
        </>
    );
}

export default OrganizationDisplay;
