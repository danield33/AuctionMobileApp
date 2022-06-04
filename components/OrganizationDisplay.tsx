import React, {useCallback, useEffect, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from "react-native";
import {Organization} from "../database/modules/organizations/Organization";
import Layout from "../constants/Layout";
import {Ionicons} from "@expo/vector-icons";

interface OrganizationDisplayProps {
    organization: Organization;
    onClick?: (id: string) => void;
    isSelected: boolean
}

function OrganizationDisplay({organization, isSelected, onClick}: OrganizationDisplayProps) {

    const [image, setImage] = useState("");
    const {description, name} = organization;


    useEffect(() => {
        const getImage = () => organization.getImage().then(img => {
            setImage(img);
        });
        getImage();
    }, []);

    const click = useCallback(() => {
        onClick?.(organization.id);
    }, [])

    const {width, height} = Layout.window;
    return (
        <TouchableOpacity onPress={click}>

            {
                image ?
                    <Image
                        style={{
                            width: width,
                            height: height * 0.25,
                            marginVertical: 10,
                            //@ts-ignore
                            borderWidth: 5 * Boolean(isSelected),
                            borderColor: isSelected ? '#81e541' : undefined
                        }}
                        source={{
                            uri: image || 'data:'
                        }}
                        resizeMode={'cover'}
                    /> :
                    <Ionicons name={'help-circle'} style={{alignSelf: 'center'}} size={height * 0.25}
                              color={isSelected ? '#81e541' : 'white'}/>

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
                }}>{name}</Text>
                <Text numberOfLines={3} adjustsFontSizeToFit style={{
                    color: 'white',
                    fontWeight: '500'
                }}>{description}</Text>
            </View>

        </TouchableOpacity>
    );
}

export default OrganizationDisplay;
