import React, {useEffect, useState} from 'react';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import { Text, DeviceEventEmitter } from 'react-native';

export const auth = () => {

    const [wasUp, setWasUp] = useState('We Not In!');
    const [sensor, setSensor] = useState('Naathing Bro');

    useEffect(() => {
        DeviceEventEmitter.addListener('AUTHING_BRO', (msg) => {
            setWasUp(msg);
        });

        async function performAuth(){
            const { biometryType } = await checkSensor();
            setSensor(biometryType);
            console.log('====================================');
            console.log(biometryType);
            console.log('====================================');

            const { description } = await authUser();
            setWasUp(description);
            console.log('.....................................');
            console.log(description);
            console.log('.....................................');
        }
        performAuth();
    }, []);

    const authUser = async () => {
        const authConfig = {
            title: 'Login w/ Biometrics',
            subTitle: 'This issa description',
            cancelButton: 'Cancel',
            onAttempt: () => { console.log('We failed dawg!'); }
        };

        return await FingerprintScanner.authenticate(authConfig);
    }

    const checkSensor = async () => {
        return await FingerprintScanner.isSensorAvailable();
    }

    return (
        <>
            <Text style={{color: 'black', backgroundColor: 'red'}}>{sensor}</Text>
            <Text style={{color: 'black',  backgroundColor: 'blue'}}>{wasUp}</Text>
        </>
    );
}
