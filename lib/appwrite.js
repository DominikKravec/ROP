import { Avatars, Client, Databases, Query, Storage } from 'react-native-appwrite';
import { Account, ID } from 'react-native-appwrite';


export const appwriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.kravec.healthReminder',
    projectId: '67164f9c001fc0a07062',
    databaseId: '6717cac8002bf118e60c',
    userCollectionId: '6717cb0c00176e595750',

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

        return newUser
    } catch (error) {
        console.log(error)
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