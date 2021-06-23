import React, {useEffect, useState} from 'react';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import { Text, DeviceEventEmitter } from 'react-native';

export const auth = () => {

    const [sensor, setSensor] = useState('Naathing Bro');

    useEffect(() => {
        DeviceEventEmitter.addListener('AUTHING_BRO', (msg) => {
            setWasUp(msg);
        });

        async function performAuth(){
            checkSensor().then((biometryType ) => {
                setSensor(biometryType );

                if(biometryType ){
                    try {
                        authUser().then().catch();
                    } catch (error) {
                        
                    }
                   
                }

            }).catch();
        }
        performAuth();
    }, []);

    const authUser = async () => {
        const authConfig = {
            title: `Login to nigel`,
            subTitle: 'some smart description',
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
            <Text style={{color: 'black', backgroundColor: 'red', fontSize: 50}}>{sensor}</Text>
        </>
    );
}
