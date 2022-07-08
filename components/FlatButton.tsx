import * as React from 'react';
import {Text, TouchableOpacity} from 'react-native';

interface FlatButtonProps {

    text: string;
    onPress: () => void;
    color?: string;

}

export function FlatButton({onPress, text, color='#ccc'}: FlatButtonProps) {
    return (
        <TouchableOpacity style={{
            backgroundColor: color,
            alignItems: 'center',
            padding: 10,
            borderRadius: 5,
            marginTop: 10
        }} onPress={onPress}>
            <Text style={{
                fontSize: 15,
                fontWeight: '700'
            }}>{text}</Text>
        </TouchableOpacity>
    );
};
