import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser, getTodaysUserLogs, getUserInfo, getUserSettings } from "../lib/appwrite";
import * as Notifications from 'expo-notifications'
import { scheduleDailyNotifications } from "../lib/notifications";
import { weatherApiKey } from "../constants/other";
import * as Location from 'expo-location';

const GlobalContext = createContext()
export const useGlobalContext = () => useContext(GlobalContext)

export const GlobalProvider = ({children}) => {

    const [waterDrank, setWaterDrank] = useState(0)

    const todayDate = new Date().toISOString().split('T')[0];

    const [lastResetDate, setLastResetDate] = useState(todayDate)

    /*
    const [waterUnit, setWaterUnit] = useState('ml')
    const [cupVolume, setCupVolume] = useState(200)
    const [reminderAmount, setReminderAmount] = useState()
    */
   
    const [waterGoal, setWaterGoal] = useState(2500)
    const [userSettings, setUserSettings] = useState({})

    const [customDrinks, setCustomDrinks] = useState([])

    const [editedDrink, setEditedDrink] = useState(null)
    const [sugarFromDrinks, setSugarFromDrinks] = useState(0)

    const [userInfo, setUserInfo] = useState({})

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

    const scheduleNotifications = async (amountOfNotifications) => {

        Notifications.cancelAllScheduledNotificationsAsync()
        const startTime = new Date();
        startTime.setHours(7, 0, 0, 0); // change this to the users choice

        const endTime = new Date(startTime);
        endTime.setHours(22, 0, 0, 0); //change this to the users choice

        const totalDurationInSeconds = (endTime - startTime) / 1000; 
        const numberOfNotifications = amountOfNotifications; 
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

        console.log(notificationTimes)

        const amountPerNotification = Math.round(((waterGoal / userSettings.reminderAmount) / userSettings.cupSize) * 2) / 2

        console.log(amountPerNotification)

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
            const info = await getUserInfo(user.$id)
            let goal = info.weight * 35

            let age = calculateAge(new Date(info.dateOfBirth))
            age -= 30
            while(age >= 0){
                goal += 350
                age -= 10
            }

            const weatherCalculation = true //remove this when you add it to settings

            const temperature = await getCurrentTemperature()

            if(weatherCalculation){
                if(temperature > 33){
                    goal += 1000
                }else if(temperature > 25){
                    goal += 500
                }
            }

            setWaterGoal(Math.round(goal))
        }catch(error){
            console.log(error)
        }
        
      }
    
    const [user, setUser] = useState({})
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    
    useEffect(() => {
        getCurrentUser()
            .then((res) => {
                if(res){
                    setIsLoggedIn(true)
                    setUser(res)
                }else{
                    
                    setIsLoggedIn(false)
                    setUser(null)
                }
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
            })
        
    }, [])

    useEffect(() => {
        const aplyUserSettings = async () => {
            if(user && user.$id){
                try {
                    const settings = await getUserSettings(user.$id)
                    setUserSettings(settings)
                    if(settings.customWaterGoal){
                        setWaterGoal(settings.customWaterGoal)
                    }
                    //console.log('settings aplied')
    
                } catch (error) {
                    console.log(error)
                }
            }
        }

        const aplyUserInfo = async () => {
            if(user && user.$id){
                try {
                    const info = await getUserInfo(user.$id)
                    setUserInfo(info)    
                } catch (error) {
                    console.log(error)
                }
            }
        }

        const getWaterDrank = async () => {
            if(user && user.$id){
                try {
                    const todaysLogs = await getTodaysUserLogs(user.$id)

                    let waterDrankToday = 0

                    todaysLogs.forEach(log => {
                        waterDrankToday += log.volume
                    })

                    setWaterDrank(waterDrankToday)
                } catch (error) {
                    console.log("Couldn't calculate water drank due too: " + error)
                }
            }
        }

        aplyUserInfo()
        calculateWater()
        aplyUserSettings()
        getWaterDrank()
    }, [user])

    return (
        <GlobalContext.Provider
            value={{
                waterDrank, 
                setWaterDrank, 
                waterGoal,
                setWaterGoal,
                /*
                waterUnit, 
                setWaterUnit,
                */
                lastResetDate,
                setLastResetDate,
                /*
                cupVolume, 
                setCupVolume,
                */
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
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}