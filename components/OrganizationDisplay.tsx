import React, {useEffect, useState} from 'react';
import {Image, View} from "react-native";
import {Organization} from "../database/modules/organizations/Organization";

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

            <Image
                source={{
                    uri: image
                }}
                width={'20%'}
                height={'20%'}
            />

        </View>
    );
}

export default OrganizationDisplay;
