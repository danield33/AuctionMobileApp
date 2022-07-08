import React, {useState} from 'react';
import {View} from "./Themed";
import {TextInput, Text} from "react-native";

interface EditOrgModalProps {
    close: () => void;
}

function EditOrgModal({close}: EditOrgModalProps) {

    const [name, setName] = useState<string>('');

    return (
        <View style={{
            padding: 20,
        }}>

            <Text style={{
                color: 'white'
            }}>Name:</Text>
            <TextInput>
                {name}
            </TextInput>

        </View>
    );
}

export default EditOrgModal;
