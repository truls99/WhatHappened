import React, {useState, useEffect} from 'react'
import { ActivityIndicator, Pressable, StyleSheet, Text, View, Button, FlatList, SafeAreaView, Linking } from 'react-native';
import NetInfo, {useNetInfo} from "@react-native-community/netinfo";
import Modal from 'react-native-modal';
import {Picker} from '@react-native-picker/picker';
import { getDaysInMonth, getMonthArray, getMonthName } from '../Utils';

const Home = () => {

    const [date, setDate] = useState({
        day: new Date().getDate().toString(),
        month: (new Date().getMonth() + 1).toString()
    });

    const netInfo = useNetInfo();

    const [displayModal, setDisplayModal] = useState(false);

    const [isLoading, setLoading] = useState(true);
    const [isFetching, setFetching] = useState(true);
    const [connected, setConnected] = useState(false)

    const [events, setEvents] = useState([]);
    const [deaths, setDeaths] = useState([]);
    const [error, setError] = useState('');

    const [chosenEvent, setChosenEvent] = useState({})

    useEffect(() => {
        fetch(`http://history.muffinlabs.com/date/${date.month}/${date.day}`)
            .then((response) => response.json())
            .then((json) => ( setEvents([]), setEvents(json.data.Events), setDeaths(json.data.Deaths))) //Set date kan kanskje endres til et objekt hook så den oppdateres litt raskere
            .catch((error) => ( setError(error) ))
            .finally(() => ( setLoading(false), setFetching(false)));
    }, [date.month, date.day]);

    useEffect(() => {
        netInfo.isConnected ? setConnected(true) : setConnected(false)
    }, [date, netInfo])

    const infoModal = (props) => {
        return (
            <Modal isVisible={displayModal} onBackdropPress={() => setDisplayModal(false)} onSwipeComplete={() => setDisplayModal(false)} swipeDirection="down" hideModalContentWhileAnimating={true}>
                <View style={{alignItems: 'center', justifyContent: 'top', alignSelf: 'center', paddingHorizontal: 10, paddingVertical: 10, borderRadius: 10, height: 200, backgroundColor: 'linen', width: '100%'}}>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{flex: 1, justifyContent: 'center'}}>
                            {props?.year?.slice(0, 1) == 0 ? <Text>Year: {props.year.substring(1)}</Text> : <Text>Year: {props.year}</Text>}
                        </View>
                        <View>
                            <Pressable
                            onPress={() => setDisplayModal(false)}>
                                <View>
                                    <Text>X</Text>
                                </View>
                            </Pressable>
                        </View>
                    </View>

                    <View style={{flex: 1, width: '100%', justifyContent: 'center'}}>
                        <Text>{props.text}</Text>
                    </View>

                    <View>
                        <Button
                        title={`https://wikipedia.org/wiki/${getMonthName(date.month)}_${date.day}`}
                        onPress={() => Linking.openURL(`https://wikipedia.org/wiki/${getMonthName(date.month)}_${date.day}`)}
                        >
                        </Button>
                    </View>
                </View>  
            
            </Modal>
        )
    }

    const checkForNetwork = () => {
        if (connected) {
            return (
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-start', marginTop: 20}}>
                    {isLoading ? 
                    <View style={{flex: 1, justifyContent: 'center'}}>
                        <ActivityIndicator size="large" />
                    </View> 
                    : (
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-start', marginTop: 20}}>
                            <View>
                                <Text>What happened?</Text>
                            </View>
                            {infoModal(chosenEvent)}
                            <View>
                                <Text>Date: {getMonthName(date.month)}, {date.day}</Text>
                            </View>

                            <View style={{flexDirection: 'row', marginTop: 20}}>
                                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                                <Text>Day</Text>
                                    <Picker
                                        style={{width: 150}}
                                        itemStyle={{height: 110}}
                                        selectedValue={date?.day}
                                        onValueChange={(itemValue, itemIndex) =>
                                            {
                                                setDate((prevState) => ({
                                                    ...prevState, 
                                                    'day': itemValue
                                                }))
                                                setFetching(true)
                                            }
                                        }>
                                        {getDaysInMonth(date?.month)?.map((item) => {
                                            return <Picker.Item label={item} value={item}></Picker.Item>
                                        })}
                                        
                                    </Picker>
                                </View>
        
                                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                                    <Text>Month</Text>
                                    <Picker
                                        style={{width: 150}}
                                        itemStyle={{height: 110}}
                                        selectedValue={date?.month}
                                        onValueChange={(itemValue) =>
                                            {
                                                setDate((prevState) => ({
                                                    ...prevState, 
                                                    'month': itemValue
                                                }))
                                                setFetching(true)
                                            }
                                        }>
                                        <Picker.Item label="January" value="1" />
                                        <Picker.Item label="February" value="2" />
                                        <Picker.Item label="March" value="3" />
                                        <Picker.Item label="April" value="4" />
                                        <Picker.Item label="May" value="5" />
                                        <Picker.Item label="June" value="6" />
                                        <Picker.Item label="July" value="7" />
                                        <Picker.Item label="August" value="8" />
                                        <Picker.Item label="September" value="9" />
                                        <Picker.Item label="October" value="10" />
                                        <Picker.Item label="November" value="11" />
                                        <Picker.Item label="December" value="12" />
                                    </Picker>
                                </View>
                            </View>
        
                            <View style={{height: 500, width: 350, borderRadius: 10, marginTop: 20, paddingVertical: 5}}>
                                {events === undefined ? 
                                <View style={{flex: 1, justifyContent: 'center', alignSelf: 'center' }}>
                                    <Text>No events on this day</Text>
                                </View>
                                : <View></View>}
        
                                {isFetching ?
                                    <View style={{flex: 1, justifyContent: 'center' }}>
                                        <ActivityIndicator size="large" />
                                    </View>
                                : (
                                    <FlatList
                                    style={{borderRadius: 10}}
                                    data={events}
                                    renderItem={({ item }) => {
                                        return (
                                            <Pressable
                                                /* style={[styles.button, styles.buttonOpen]} */
                                                onPress={() => (setDisplayModal(true), setChosenEvent(item) )}>
                                                <View style={{flexDirection: 'row',
                                                    marginTop: 5, 
                                                    marginHorizontal: 5, 
                                                    backgroundColor: 'lightgrey', 
                                                    borderRadius: 5, height: 50, 
                                                    justifyContent: 'left', 
                                                    alignItems: 'center', 
                                                    paddingHorizontal: 5}}>
                                                        <View style={{flex: 1}}>
                                                            {item.year.slice(0, 1) == 0 ? <Text>{item.year.substring(1)}</Text> : <Text>{item.year}</Text>}
                                                        </View>
                                                        <View style={{flex: 2}}>
                                                            <Text>{item.text?.split(' ').slice(0, 3).join(' ')}...</Text>
                                                        </View>
                                                </View>
                                            </Pressable>
                                        )
                                    }}></FlatList>
                                )}
                            </View>
                            
        
                        </View>
                    )}
                    
                </View>
            )
        }
        else {
            return (
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
                    <Text>Connect to network</Text>
                </View>
            )
        }
    }
    return checkForNetwork();
}

export default Home