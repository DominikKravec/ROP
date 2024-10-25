import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser, getUserInfo, getUserSettings } from "../lib/appwrite";

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

    const [customDrinks, setCustomDrinks] = useState([{id: 0,name: "CapriSun", sugar: 50, alcohol: 0, calories: 70}])

    const [editedDrink, setEditedDrink] = useState(null)
    const [sugarFromDrinks, setSugarFromDrinks] = useState(0)

    
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
        aplyUserSettings()
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
                setUserSettings
                
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}