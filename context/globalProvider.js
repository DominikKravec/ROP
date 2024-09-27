import { createContext, useContext, useState, useEffect } from "react";

const GlobalContext = createContext()
export const useGlobalContext = () => useContext(GlobalContext)

export const GlobalProvider = ({children}) => {

    const [waterDrank, setWaterDrank] = useState(0)

    const todayDate = new Date().toISOString().split('T')[0];

    const [waterGoal, setWaterGoal] = useState(2500)
    const [waterUnit, setWaterUnit] = useState('ml')
    const [lastResetDate, setLastResetDate] = useState(todayDate)
    const [cupVolume, setCupVolume] = useState(200)

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
                setCupVolume
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}