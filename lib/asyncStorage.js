import AsyncStorage from "@react-native-async-storage/async-storage";

export async function storeLog(drinkId, volume, timeOfDrink) {
    const key = 'logs';

    try {

        const newLog = {volume, drink: drinkId, timeOfDrink};

        const previousLogs = await getStoredLogs()
        const logs = [...previousLogs, newLog]

        console.log(logs)

        await AsyncStorage.setItem(key, JSON.stringify(logs))

    } catch (error) {
        console.log("Error storing log to storage: ", error);
    }
    
}

export async function getStoredLogs(){
    const key = 'logs';

    try {
        const logs = await AsyncStorage.getItem(key);
        if (logs) {
            return JSON.parse(logs);
        }else{
            return []
        }    
    } catch (error) {
        console.log("Error reading logs from storage: ", error);
    }
}

export async function storeUser(user){
    const key = 'user';

    try {
        await AsyncStorage.setItem(key, JSON.stringify(user))
    } catch (error) {
        console.log("Error storing user: ", error);
    }
}

export async function getStoredUser(){
    const key = 'user';
    try {
        const userJSON = await AsyncStorage.getItem(key);
        return JSON.parse(userJSON)
    } catch (error) {
        console.log("Error getting stored user: ", error);
    }
}

export async function storeUserInfo(userInfo){
    const key = 'user_info';

    try {
        console.log("Storing info to storage")
        //console.log(userInfo)
        await AsyncStorage.setItem(key, JSON.stringify(userInfo))
    } catch (error) {
        console.log("Error storing user info: ", error);
    }
}

export async function getStoredUserInfo(){
    const key = 'user_info';
    try {
        const userJSON = await AsyncStorage.getItem(key);
        return JSON.parse(userJSON)
    } catch (error) {
        console.log("Error getting stored user info: ", error);
    }
}

export async function storeUserSettings(userSettings){
    const key = 'user_settings';

    try {
        console.log("Storing settings to storage")
        //console.log(userSettings)
        await AsyncStorage.setItem(key, JSON.stringify(userSettings))
    } catch (error) {
        console.log("Error storing user settings: ", error);
    }
}

export async function getStoredUserSttings(){
    const key = 'user_settings';
    try {
        const userJSON = await AsyncStorage.getItem(key);
        return JSON.parse(userJSON)
    } catch (error) {
        console.log("Error getting stored user settings: ", error);
    }
}

export async function emptyLogStorage(){
    const key = 'logs';
    try {
        await AsyncStorage.setItem(key, JSON.stringify([]))
    }catch{
        console.log("Error clearing log storage: ", error);
    }
}

export async function storeUserDrinks(drinks){
    const key = 'drinks';
    try {
        await AsyncStorage.setItem(key, JSON.stringify(drinks))
    } catch (error) {
        console.log("Error storing users drinks: ", error)
    }
}

export async function getStoredUserDrinks(){
    const key = 'drinks';
    try {
        const drinksJSON = await AsyncStorage.getItem(key);
        
        return JSON.parse(drinksJSON)
    } catch (error) {
        console.log("Error getting stored drinks: ", error);
    }
}

export async function storeAlternateButtonsState(state){
    const key = 'alternate_buttons';
    try {
        console.log(state)
        await AsyncStorage.setItem(key, JSON.stringify(state))
    } catch (error) {
        console.log('Error storing alternate buttons: ' + error)
    }
}

export async function getAlternateButtonsState(){
    const key = 'alternate_buttons';
    try {
        const state = await AsyncStorage.getItem(key);
        
        return JSON.parse(state)
    } catch (error) {
        console.log("Error getting stored alternate buttons state: ", error);
    }
}
