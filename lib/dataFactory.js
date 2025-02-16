import { createLog } from "./appwrite"

export const generateRandomLog = (userId, dateTime, drinks) => {
    const randomAmount = Math.round((Math.random() * 80) + 150)
    const randomDrink = drinks[Math.floor(Math.random() * drinks.length)]

    console.log("creating log: ", userId, dateTime, randomDrink.name, randomAmount)

    createLog(userId, randomDrink.$id, randomAmount, dateTime)
}

export const generateLogsForDay = (userId, date, drinks) => {
    for(let i = 0; i <= 15; i++){
        date.setHours((7 + i), 0, 0, 0)
        generateRandomLog(userId, date, drinks)
    }
}

export const generateMonthlyLogs = (userId, drinks) => {
    console.log(drinks)
    const date = new Date()
    for(let i = 0; i < 30; i++){
        date.setDate(date.getDate() - 1)
        generateLogsForDay(userId, date, drinks)
    }
}
