import * as Notifications from 'expo-notifications'

export async function schedulePushNotification(hour, minute, amount) {
    await Notifications.scheduleNotificationAsync({
        content: {
          title: "Time to Drink Water! 💧",
          body: "To meet your daily goal you should drink " + amount + ` ${amount == 1 ? 'cup' : 'cups'} of water.`,
        },
        trigger: {
          hour, 
          minute,
          repeats: true
        },
      });
  }

export async function sendNotification(amount) {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: "Time to Drink Water! 💧",
            body: "To meet your daily goal you should drink " + amount + " cups of water.",
        },
        trigger: null
        });
}

export async function scheduleDailyNotifications(notificationTimes, amount){
    notificationTimes.forEach(element => {
        schedulePushNotification(element.hour, element.minute, amount)
    });
}