import React, {useEffect, useState} from 'react';
import {Image, View, Text} from "react-native";
import {Organization} from "../database/modules/organizations/Organization";
import Layout from "../constants/Layout";

interface OrganizationDisplayProps {
    organization: Organization;
}

function OrganizationDisplay({organization}: OrganizationDisplayProps) {

    const [image, setImage] = useState("");
    const {description, name} = organization;


    useEffect(() => {
        const getImage = () => organization.getImage().then(img => {
            setImage(img);
        });
        getImage();
    }, []);

    return (
        <View>

            {
                image ?
                <Image
                    style={{
                        width: Layout.window.width,
                        height: Layout.window.height * 0.25,
                        marginVertical: 10
                    }}
                    source={{
                        uri: image || 'data:'
                    }}
                    resizeMode={'cover'}
                />   : null

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

        </View>
    );
}

export default OrganizationDisplay;
