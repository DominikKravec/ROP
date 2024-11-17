import * as Notifications from 'expo-notifications'

export async function schedulePushNotificatin(hour, minute, amount) {
    await Notifications.scheduleNotificationAsync({
        content: {
          title: "Time to Drink Water! 💧",
          body: "To meet your daily goal you should drink " + amount + " cups of water.",
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