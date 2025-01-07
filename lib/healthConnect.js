import {
    initialize,
    requestPermission,
    readRecords,
  } from 'react-native-health-connect';
  
export const readData = async () => {
    try {

        const startOfTheDay = new Date()
        const endOfTheDay = new Date()

        startOfTheDay.setHours(0, 0 ,0, 0)
        endOfTheDay.setHours(23, 59, 59, 999)
        
        console.log(startOfTheDay)
        console.log(endOfTheDay)
        // initialize the client
        const isInitialized = await initialize();
    
        // request permissions
        const grantedPermissions = await requestPermission([
            { accessType: 'read', recordType: 'TotalCaloriesBurned' },
            { accessType: 'read', recordType: 'ActiveCaloriesBurned' },
            { accessType: 'read', recordType: 'Steps' },
        ]);
    
        // check if granted
    
        const { records } = await readRecords('TotalCaloriesBurned', {
            timeRangeFilter: {
            operator: 'between',
            startTime: startOfTheDay.toISOString(),
            endTime: endOfTheDay.toISOString(),
            },
        });

        return records
    } catch (error) {
        console.log("Error reading physical activity data: " + error)
    }

    
};