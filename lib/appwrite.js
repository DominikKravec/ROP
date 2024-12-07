import { Avatars, Client, Databases, Query, Storage } from 'react-native-appwrite';
import { Account, ID } from 'react-native-appwrite';


export const appwriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.kravec.healthReminder',
    projectId: '67164f9c001fc0a07062',
    databaseId: '6717cac8002bf118e60c',
    userCollectionId: '6717cb0c00176e595750',
    userInfoCollectionId: '6717cd9700203b70a445',
    userSettingsCollectionId: '6718ca34000720c7321e',
    logCollectionId: '673078c0002df9ee91be',
    drinkCollectionId: '6730765f003aa976f9d4',
}
// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
    .setProject(appwriteConfig.projectId) // Your project ID
    .setPlatform(appwriteConfig.platform) // Your application ID or bundle ID.
;

const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client)

export const createUser = async (email, password, username) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )

        if(!newAccount) throw Error;

        await signIn(email, password)

        const newUser = await databases.createDocument(
            appwriteConfig.databaseId, 
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
            }
        )

        const newUserInfo = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userInfoCollectionId,
            ID.unique(),
            {
                user: newUser.$id,
            }
        )

        const newUserSetting = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userSettingsCollectionId,
            ID.unique(),
            {
                user: newUser.$id,
            }
        )

        return newUser
    } catch (error) {
        console.log("Failed to create user due to: " + error)
        throw new Error(error)
    }    
}


export async function getCurrentUser(){
    try {
        const currentAcount = await account.get();
        if(!currentAcount) throw Error
        
        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentAcount.$id)]
        )

        if(!currentUser) throw Error
        
        return currentUser.documents[0]
    } catch (error) {
        console.log(error)
    }
}

export async function signIn(email, password){
    try{
        const session = await account.createEmailPasswordSession(email, password)
        return session
    }catch(error){
        throw new Error(error)
    }
}

export async function signOut() {
    try {
        const session = await account.deleteSession('current')
        return session
    } catch (error) {
        throw new Error(error)
    }
}

export async function getUserInfo(userId) {
    try {
        const userInfo = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userInfoCollectionId,
            [Query.equal('user', userId)]
        )

        return userInfo.documents[0]
    } catch (error) {
        console.log('Fetching user info failed due to: ' + error)
    }
}

export async function saveUserInfo(documentId, weight, gender, dateOfBirth){
    try {
        const result = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userInfoCollectionId,
            documentId,
            {
                weight: weight,
                gender: gender,
                dateOfBirth: new Date(`${dateOfBirth.year}-${dateOfBirth.month}-${dateOfBirth.date}T00:00:00.000+00:00`),
            }
        )
        return result
    } catch (error) {
        console.log(error)
    }
}

export async function getUserSettings(userId){
    try {
        const result = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userSettingsCollectionId,
            [Query.equal('user', userId)]
        )

        return result.documents[0]
    } catch (error) {
        console.log("Couldn't fetch user settings due to: " + error)
    }
}

export async function updateUserSettings(userId, {volumeUnit, reminderAmount, customWaterGoal, cupSize}){
    try {

        const userSettings = await getUserSettings(userId)

        const result = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userSettingsCollectionId,
            userSettings.$id,
            {
                volumeUnit: volumeUnit,
                reminderAmount: reminderAmount,
                customWaterGoal: customWaterGoal,
                cupSize: cupSize    
            }
        )
    } catch (error) {
        console.log("Couldn't update settings due to: " + error)
    }
}

export async function getUserDrinks(userId){
    try {
        const userDrinks = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.drinkCollectionId,
            [
                Query.equal('user', userId)
            ]
        )

        const publicDrinks = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.drinkCollectionId,
            [
                Query.equal('user', "")
            ]
        )

        return [...publicDrinks.documents, ...userDrinks.documents]
    } catch (error) {
        console.log(error)
    }
}

export async function createLog(userId, drinkId, volume, timeOfDrink){
    try {
        const log = databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.logCollectionId,
            ID.unique(),
            {
                user: userId,
                drink: drinkId,
                timeOfDrink,
                volume
            }
        )

        return log
    } catch (error) {
        console.log("Couldn't create log due to: " + error)
    }
}

export async function getUserLogs(userId){
    try {
        const logs = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.logCollectionId,
            [Query.equal('user', userId)]
        )

        return logs.documents
    } catch (error) {
        console.log("Failed to fetch user logs due too: " + error)
    }
}

export async function getTodaysUserLogs(userId){
    try {

        const today = new Date();
        const startOfDay = new Date(today.setHours(0, 0, 0, 0)).toISOString();

        const logs = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.logCollectionId,
            [
                Query.equal('user', userId),
                Query.greaterThanEqual('timeOfDrink', startOfDay)
            ]
        )

        return logs.documents
        
    } catch (error) {
        console.log("Failed to fetch user logs due too: " + error)
    }
}

export async function getCustomDrinks(userId){
    try {
        const userDrinks = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.drinkCollectionId,
            [
                Query.equal('user', userId)
            ]
        )

        return userDrinks.documents
    } catch (error) {
        console.log(error)
    }
}

export async function getWeekLogs(userId){
    try {

        const today = new Date();
        let weekAgo = new Date(today);
        weekAgo.setDate(today.getDate() - 7)
        weekAgo.setHours(0, 0, 0, 0)

        const logs =await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.logCollectionId,
            [
                Query.equal('user', userId),
                Query.greaterThanEqual('timeOfDrink', weekAgo)
            ]
        )


        return logs.documents
    } catch (error) {
        console.log(error);
    }
}

export async function addCustomDrink(userId, name, calories, apv, sugar){
    try {
        const drink = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.drinkCollectionId,
            ID.unique(),
            {
                name: name,
                apv: apv,
                sugar: sugar,
                calories: calories,
                user: userId
            }
        )

        return drink
    } catch (error) {
        console.log("Couldn't create drink due to: " + error)
    }
}

export async function removeDrink(drinkId){
    try {
        const deletedDrink = await databases.deleteDocument(
            appwriteConfig.databaseId,
            appwriteConfig.drinkCollectionId,
            drinkId
        )
    } catch (error) {
        console.log("Couldn't delete drink due to: " + error)
    }
}

export async function updateDrink(drinkId, name, calories, apv, sugar){
    try {
        const updatedDrink = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.drinkCollectionId,
            drinkId,
            {
                name: name,
                calories: calories,
                apv: apv,
                sugar: sugar
            }
        )
    } catch (error) {
        console.log(error)
    }
}