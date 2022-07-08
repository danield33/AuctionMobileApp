import React, {useCallback, useState} from 'react';
import {View} from "./Themed";
import {Alert, Image, LayoutAnimation, StyleSheet, Text, TextInput} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import {ImageInfo, ImagePickerOptions, MediaTypeOptions} from 'expo-image-picker';
import {FlatButton} from "./FlatButton";
import {useTheme} from "@react-navigation/native";
import {KeyboardDismissView} from "./KeyboardDismissView";

interface EditOrgModalProps {
    close: () => void;
}

const options: ImagePickerOptions = {
    allowsEditing: true,
    aspect: [4, 3],
    quality: 0.5,
    mediaTypes: MediaTypeOptions.Images,
    allowsMultipleSelection: false,
    base64: false
}

function EditOrgModal({close}: EditOrgModalProps) {

    const [name, setName] = useState<string>('');
    const [description, setDesc] = useState<string>('');
    const [statusCam, requestPermissionCam] = ImagePicker.useCameraPermissions();
    const [statusLib, requestPermissionLib] = ImagePicker.useMediaLibraryPermissions();
    const [image, setImage] = useState<ImageInfo | null>(null);

    const {colors} = useTheme();


    const takePicture = useCallback(() => {

        const launchCam = () => {
            ImagePicker.launchCameraAsync(options).then(r => {
                if (!r.cancelled) {
                    setImage(r);
                }
            })
        }

        if (statusCam?.granted) {
            launchCam();
        } else {
            requestPermissionCam().then(r => {
                if (r.granted)
                    launchCam();
            })
        }

    }, [])

    const uploadFromLib = useCallback(() => {

        const launchImage = () => {
            ImagePicker.launchImageLibraryAsync(options).then(r => {
                if (!r.cancelled) {
                    setImage(r);
                }
            });
        }

        if (statusLib?.granted) {
            launchImage();
        } else {
            requestPermissionLib().then(r => {
                if (r.granted)
                    launchImage();
            });
        }

    }, [])

    const uploadImage = useCallback(() => {

        // requestPermissionCam()
        Alert.alert("Select upload method", '', [
            {
                text: 'Camera',
                onPress: takePicture
            },
            {
                text: 'Upload Image',
                onPress: uploadFromLib
            },
            {
                text: 'Remove Image',
                style: 'destructive',
                onPress: () => setImage(null)
            },
            {
                text: 'Cancel',
                style: 'cancel'
            }
        ])


    }, []);

    const changeName = useCallback((newName: string) => {
        if(!name.length || !newName.length ){
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        }
        setName(newName);
    }, [name]);

    const saveOrg = useCallback(() => {

    }, []);


    return (
        <KeyboardDismissView style={{
            padding: 20,
            backgroundColor: colors.background
        }}>

            <Text style={styles.textName}>* Name:</Text>
            <TextInput style={styles.textInput} onChangeText={changeName}>
                {name}
            </TextInput>

            <Text style={styles.textName}>Description:</Text>
            <TextInput style={styles.textInput} multiline onChangeText={setDesc}>
                {description}
            </TextInput>

            {
                image != null ?
                    <Image source={{uri: image?.uri}} style={{
                        width: '100%',
                        height: '45%',
                        resizeMode: 'contain'
                    }}/>
                    : null
            }

            <FlatButton text={'Upload Image'} onPress={uploadImage}/>

            {
                name.length ?
                <FlatButton text={'Save'} color={colors.notification} onPress={saveOrg}/>
                    : null
            }


        </KeyboardDismissView>
    );
}

export default EditOrgModal;


const styles = StyleSheet.create({
    textInput: {
        borderWidth: 2,
        borderColor: 'white',
        padding: 5,
        color: 'white',
        fontSize: 18
    },
    textName: {
        color: 'white',
        fontWeight: 'bold',
        marginTop: 20,
        fontSize: 20
    }
})
