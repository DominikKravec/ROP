import { createContext, useContext, useState, useEffect } from "react";
import { createLog, getCurrentUser, getTodaysUserLogs, getUserInfo, getUserSettings } from "../lib/appwrite";
import * as Notifications from 'expo-notifications'
import { scheduleDailyNotifications } from "../lib/notifications";
import { waterId, weatherApiKey } from "../constants/other";
import * as Location from 'expo-location';
import { emptyLogStorage, getAlternateButtonsState, getStoredLogs, getStoredUser, getStoredUserInfo, getStoredUserSttings, storeUser, storeUserInfo, storeUserSettings } from "../lib/asyncStorage";
import * as Network from 'expo-network';
import { Alert } from "react-native";
import { readData } from "../lib/healthConnect";


const GlobalContext = createContext()
export const useGlobalContext = () => useContext(GlobalContext)

export const GlobalProvider = ({children}) => {

    const [isOffline, setIsOffline] = useState(false) 

    const [user, setUser] = useState('')
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    
    const [waterDrank, setWaterDrank] = useState(0)

    const [waterGoal, setWaterGoal] = useState(2500)
    const [userSettings, setUserSettings] = useState({})

    const [customDrinks, setCustomDrinks] = useState([])

    const [editedDrink, setEditedDrink] = useState(null)
    const [sugarFromDrinks, setSugarFromDrinks] = useState(0)
    const [caloriesFromDrinks, setCaloriesFromDrinks] = useState(0)
    const [alcoholFromDrinks, setAlcoholFromDrinks] = useState(0)
    const [alcoholLevel, setAlcoholLevel] = useState(0)
    const [timeTillAlcZero, setTimeTillAlcZero] = useState(0)
    const [alternateButtons, setAlternateButtons] = useState(false)
    
    const [userInfo, setUserInfo] = useState({weight: 60, dateOfBirth: Date.now(), gender: 'female'})

    //check users connection when app loads
    useEffect(() => {

        const checkConnection = async () => {
            try {
                const networkInfo = await Network.getNetworkStateAsync()

                console.log("The user is connected: " + (networkInfo.isConnected && networkInfo.isInternetReachable))
                
                //Alert.alert(networkInfo.isConnected && networkInfo.isInternetReachable ? "You are connected" : "You are not connected")

                await setIsOffline(!(networkInfo.isConnected && networkInfo.isInternetReachable))    
                console.log("The user is offline: " + isOffline)
            } catch (error) {
                console.log("Error checking connection: " + error)
            }
        }

        checkConnection()
    }, [])

    //function that loads display preffrences from storage
    useEffect(() => {
        const getDisplaySettings = async () => {
            try {
                const alternateButtonsState = await getAlternateButtonsState()
                setAlternateButtons(alternateButtonsState)
            } catch (error) {
                console.log("Error aplying display settings: " + error)
            }
        }

        getDisplaySettings()
    }, [])
    
    //function to be calles when app starts that gets the logged in user if one exists
    useEffect(() => {  
        if(!isOffline){
            console.log("Getting user from db")
            getCurrentUser()
                .then((res) => {
                    if(res){
                        console.log("User is logged in")
                        console.log('User has been set')
                        setIsLoggedIn(true)
                        setUser(res)
                        storeUser(res)
                    }else{
                        setIsLoggedIn(false)
                        setUser(null)
                    }
                })
                .catch((error) => {
                    console.log(error)
                    setIsOffline(true)
                })
                .finally(() => {
                })
        }else{
            console.log("Getting user from local storage")
            getStoredUser()
                .then((res) => {
                    if(res){
                        setUser(res)
                        setIsLoggedIn(true)
                    }else{
                        setUser(null)
                        setIsLoggedIn(false)
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        }
        
    }, [isOffline])

    //function that gets called at start of app that gets the user settings and user info
    useEffect(() => {
        const aplyUserSettings = async () => {
            console.log("Logged in user")
            console.log(user)
            if(user && user.$id){
                try {
                    if(isOffline){
                        console.log("Aplying user settings from local storage")
                        const settings = await getStoredUserSttings()
                        setUserSettings(settings)
                        if(settings.customWaterGoal){
                            setWaterGoal(settings.customWaterGoal)
                        }else{
                            calculateWater()
                        }
                    }else{
                        console.log("Aplying user settings")
                        const settings = await getUserSettings(user.$id)
                        setUserSettings(settings)
                        storeUserSettings(settings)
                        handleRegainedConnection(user.$id)
                        if(settings.customWaterGoal){
                            setWaterGoal(settings.customWaterGoal)
                        }else{
                            calculateWater()
                        }
                    }
    
                } catch (error) {
                    console.log(error)
                }
            }
        }

        const aplyUserInfo = async () => {
            if(user && user.$id){
                try {
                    if(isOffline){
                        console.log("Aplying user info from storage")
                        const info = await getStoredUserInfo()
                        setUserInfo(info)
                    }else{
                        console.log("Aplying user info")
                        const info = await getUserInfo(user.$id)
                        setUserInfo(info)    
                        storeUserInfo(info)
                    }
                    
                } catch (error) {
                    console.log(error)
                }
            }
        }

        aplyUserInfo()
        aplyUserSettings()
        getInfoFromDrinks()

    
    }, [user, isOffline])

    const handleRegainedConnection = async (userId) => {
        console.log("Handling regained connection")
        try {
            
            const logs = await getStoredLogs()
            if(logs.length > 0){
                console.log("Adding stored logs to database")
                for(let log of logs){
                    await createLog(userId, log.drink, log.volume, log.timeOfDrink)
                }
                getInfoFromDrinks()
            }
    
            await emptyLogStorage()
            
        } catch (error) {
            console.log("Error handling regained connection", error)
        }
    }

    const getCurrentLocation = async () => {
        
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log("Location permision not granted")
                return;
            }
      
            let location = await Location.getCurrentPositionAsync({});
            return location
        } catch (error) {
            console.log("Failed to get location due to: " + error)
        }

    }

    const getCurrentTemperature = async () => {
        try {

            const loca = await getCurrentLocation()

            let lat = loca.coords.latitude
            let lon = loca.coords.longitude
    
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${weatherApiKey}`)
            const weather = await response.json()
            console.log(weather)
            console.log("It is " + weather.main.temp)
            return weather.main.temp
        } catch (error) {
            console.log("Couldn't get temperature due to: " + error)
        }
    }

    const scheduleNotifications = async (waterGoal) => {
        const {reminderAmount, cupSize} = await getUserSettings(user.$id);

        Notifications.cancelAllScheduledNotificationsAsync()
        const startTime = new Date();
        startTime.setHours(7, 0, 0, 0); // change this to the users choice

        const endTime = new Date(startTime);
        endTime.setHours(22, 0, 0, 0); //change this to the users choice

        const totalDurationInSeconds = (endTime - startTime) / 1000; 
        const numberOfNotifications = reminderAmount; 
        const intervalInSeconds = totalDurationInSeconds / (numberOfNotifications - 1);

        let notificationTimes = [];

        for (let i = 0; i < numberOfNotifications; i++) {
            const notificationTimeInMillis = startTime.getTime() + i * intervalInSeconds * 1000;
            const notificationDate = new Date(notificationTimeInMillis);

            notificationTimes.push({
            hour: notificationDate.getHours(),
            minute: notificationDate.getMinutes(),
            });
        }

        const amountPerNotification = Math.ceil(((waterGoal / reminderAmount) / cupSize) * 2) / 2;

        //console.log(`At cup size ${cupSize} and reminder amount ${reminderAmount} with a water goal ${waterGoal} you should drink ${amountPerNotification} cups of water per notification`)

        scheduleDailyNotifications(notificationTimes, amountPerNotification)

    }

    const calculateAge = (dob) => {
        const today = new Date()
        let age = today.getFullYear() - dob.getFullYear()
        const monthDiff = today.getMonth() - dob.getMonth()
        const dayDiff = today.getDate() - dob.getDate()
    
        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            age--;
        }
    
        return age;
    }

    const calculateWater = async () => {
        try{
            let info 
            if(isOffline){
                info = await getStoredUserInfo()
            }else{
                info = await getUserInfo(user.$id)
            }

            let goal = info.weight * 35
            console.log("The water goal will be: " + goal)

            if(isOffline){
                setWaterGoal(goal)
                return
            }

            //increase water intake based on age
            let age = calculateAge(new Date(info.dateOfBirth))
            age -= 30
            while(age >= 0){
                goal += 350
                age -= 10
            }

            const weatherCalculation = true //remove this when you add it to settings
            
            //increase water intake based on temperature
            if(weatherCalculation){
                let temperature = await getCurrentTemperature()
                if(temperature > 33){
                    goal += 1000
                }else if(temperature > 25){
                    goal += 500
                }
            }

            //increasing water intake based on physical activity tracked through health connect
            const physicalActivityData = await readData()

            const burnedCalories = physicalActivityData[0].energy.inKilocalories
            console.log("Burned calories: " + burnedCalories)

            //a person should drink about 0.3 litres more for every 300-500 calories burned
            goal += (burnedCalories / 400) * 300 

            setWaterGoal(Math.round(goal))
            scheduleNotifications(Math.round(goal))
        }catch(error){
            console.log(error)
        }
        
      }
    
    const getInfoFromDrinks = async () => {
        console.log("Getting info from drinks") 
        if(user && user.$id){
            try {
                let todaysLogs = []
                
                if(isOffline){
                    console.log("Getting logs from local storage")
                    todaysLogs = await getStoredLogs()
                }else{
                    todaysLogs = await getTodaysUserLogs(user.$id)
                }

                let waterDrankToday = 0
                let sugarFromDrinksToday = 0
                let caloriesFromDrinksToday = 0
                let alcoholFromDrinksToday = 0

                let hours = 0
                let alcoholDrank = false
                
                todaysLogs.forEach(log => {
                    if(!log.drink){
                        log.drink = {
                            $id: waterId,
                            sugar: 0,
                            calories: 0,
                            alcohol: 0
                        }
                    }

                    waterDrankToday += log.volume

                    if(isOffline) return

                    sugarFromDrinksToday += (parseFloat(log.drink.sugar) / 100) * log.volume
                    caloriesFromDrinksToday += (parseFloat(log.drink.calories) / 100) * log.volume

                    if(!alcoholDrank && log.drink.apv > 0){
                        alcoholDrank = true
                        const timeOfDrink = new Date(log.timeOfDrink)
                        const dateNow = new Date()
                        console.log("Time of drink: ", timeOfDrink.toISOString(), "Time now: ", dateNow.toISOString())

                        let diff = dateNow.getTime() - timeOfDrink.getTime()
                        hours = diff / (1000 * 60 * 60)
                        console.log("Hours since fisrt drink: " + hours)
                    }

                    alcoholFromDrinksToday += parseFloat(log.volume) * parseFloat(log.drink.apv) / 100 * 0.789
                })
                
                setWaterDrank(waterDrankToday)

                if(isOffline) return

                setSugarFromDrinks(sugarFromDrinksToday)
                setCaloriesFromDrinks(caloriesFromDrinksToday)
                setAlcoholFromDrinks(alcoholFromDrinksToday)

                const {gender, weight} =  await getUserInfo(user.$id);

                let alcoholLevelBeforeTime = (alcoholFromDrinksToday / (weight * (gender == 'male' ? 0.68 : 0.55))) / 10
                let alcoholLevelNow = (alcoholLevelBeforeTime - 0.015 * hours) 
                let timeTillZero = alcoholLevelNow / 0.15
                console.log("time until zero: " + timeTillZero)
                setAlcoholLevel(alcoholLevelNow)
                setTimeTillAlcZero(timeTillZero)
            } catch (error) {
                console.log("Couldn't calculate water drank due too: " + error)
                //Alert.alert("Error getting info from drinks")
            }
        }
    }

    return (
        <GlobalContext.Provider
            value={{
                waterDrank, 
                setWaterDrank, 
                waterGoal,
                setWaterGoal,
                customDrinks,
                setCustomDrinks,
                setEditedDrink,
                editedDrink,
                sugarFromDrinks, 
                setSugarFromDrinks,
                user,
                setUser,
                isLoggedIn,
                setIsLoggedIn,
                userSettings,
                setUserSettings,
                calculateWater,
                userInfo,
                setUserInfo,
                scheduleNotifications,
                getCurrentTemperature,
                caloriesFromDrinks, 
                alcoholFromDrinks,
                getInfoFromDrinks,
                alcoholLevel,
                setAlcoholLevel,
                timeTillAlcZero,
                isOffline,
                setIsOffline,
                alternateButtons,
                setAlternateButtons
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}