
import React, {useEffect, useState} from 'react';
import {ScrollView, SafeAreaView, TouchableOpacity, Text, StyleSheet, Image,View} from 'react-native';
import { Entypo} from '@expo/vector-icons';
import { Button} from 'react-native-paper';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";


const HomeScreen = ({ navigation }) => {
    const [username,setUsername]=useState("");
    const [token,setToken]=useState(null);

    async function getUsername() {
        try {
                   setToken(await AsyncStorage.getItem('token'));
                   console.log("toke is: " + token)
                   if (token !== null) {
                       console.log("inside the get-username method ")
                   let response = await axios.get('http://[write your ip adress]:8989/get-username-by-token?token=' + token);
                   if (response.data != null) {
                       setUsername(response.data);
                   } else {
                       console.log("response is null")
                   }
               } else {
                   console.log("in the else")



               }

           }catch (error){
                   console.log("error in the Home screen " ,error.message)
               }


}
    useEffect(  () => {
      getUsername();
    })

    return (
      <ScrollView style={styles.container}>
        <SafeAreaView style={styles.SafeAreaView} >
            <View style={{flexDirection:'row',alignItems: 'center'}}>
            <Text  style={styles.header}>Hello {username!==""? username:"guest"} </Text>
              <Button style={styles.loginButton}
                        labelStyle={{color: 'white', fontWeight: 'bold',fontSize:15}}
                        onPress={() => navigation.navigate('login')}
                >
                    To Login/SignUp
                </Button>



            </View>
            <TouchableOpacity onPress={()=>{ navigation.navigate('Popular')}}>
                <Image source={require('../images/popular.gif')} style={styles.image}  resizeMode="cover"
                />
                <Text style={styles.caption}>Popular Music</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{ navigation.navigate('played')}}>
                <Image source={require('../images/playrecently.gif')} style={styles.image}/>
                <Text style={styles.caption}>Played Recently</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{ navigation.navigate('artist')}}>
                <Image source={require('../images/music.png')} style={styles.image}/>
                <Text style={styles.caption}> Music by Artist</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{ navigation.navigate('friends')}}>
                <Image source={require('../images/friends.gif')} style={styles.image}/>
                <Text style={styles.caption}>Played Music by Friends</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{ navigation.navigate('playlist')}}>
                <Image source={require('../images/playlist2.gif')} style={styles.image}/>
                <Text style={styles.caption}>my playlist</Text>
            </TouchableOpacity>
        </SafeAreaView>

      </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'black'
    },
    SafeAreaView:{
        justifyContent: 'center',
        alignItems: 'center',
    }
    ,
    TouchableOpacity: {
        backgroundColor: '#2196F3',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginHorizontal: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    image: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 300,
        height: 300,
    },
    caption: {
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color: '#fff',
        padding: 5,
        fontSize: 20,
    },
    header:{
        position: 'absolute',

        right:150,
        fontSize: 16,
        fontWeight: 'bold',
        color:'white',
        shadowColor:'green'
    },
    loginButton:{
        left:100,
        backgroundColor:'green',

    }
});

export default HomeScreen;
