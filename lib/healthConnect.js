import {
    initialize,
    requestPermission,
    readRecords,
  } from 'react-native-health-connect';
  
export const readData = async () => {
    try {

        const startOfTheDay = new Date()
        const endOfTheDay = new Date()

        startOfTheDay.setHours(1, 0 ,0, 0)
        endOfTheDay.setHours(24, 59, 59, 999)
        
        // initialize the client
        const isInitialized = await initialize();
    
        // request permissions
        const grantedPermissions = await requestPermission([
            { accessType: 'read', recordType: 'TotalCaloriesBurned' },
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