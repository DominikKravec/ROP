import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser } from "../lib/appwrite";

const GlobalContext = createContext()
export const useGlobalContext = () => useContext(GlobalContext)

export const GlobalProvider = ({children}) => {

    const [waterDrank, setWaterDrank] = useState(0)

    const todayDate = new Date().toISOString().split('T')[0];

    const [waterGoal, setWaterGoal] = useState(2500)
    const [waterUnit, setWaterUnit] = useState('ml')
    const [lastResetDate, setLastResetDate] = useState(todayDate)
    const [cupVolume, setCupVolume] = useState(200)

    const [customDrinks, setCustomDrinks] = useState([{id: 0,name: "CapriSun", sugar: 50, alcohol: 0, calories: 70}])

    const [editedDrink, setEditedDrink] = useState(null)
    const [sugarFromDrinks, setSugarFromDrinks] = useState(0)

    const [user, setUser] = useState({})
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() =>{
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

    return (
        <GlobalContext.Provider
            value={{
                waterDrank, 
                setWaterDrank, 
                waterGoal,
                setWaterGoal,
                waterUnit, 
                setWaterUnit,
                lastResetDate,
                setLastResetDate,
                cupVolume, 
                setCupVolume,
                customDrinks,
                setCustomDrinks,
                setEditedDrink,
                editedDrink,
                sugarFromDrinks, 
                setSugarFromDrinks,
                user,
                setUser,
                isLoggedIn,
                setIsLoggedIn
                
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}