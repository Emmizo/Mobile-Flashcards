import { Notifications } from 'expo'
import * as Permissions from "expo-permissions";
import { AsyncStorage } from "react-native";

const NOTIFICATION_KEYS = "Mobile-flashcards:notifications";
export function generateKey  () {
    return  Date.now()
}


export function clearLocalNotification () {
    return AsyncStorage.removeItem(NOTIFICATION_KEYS)
      .then(Notifications.cancelAllScheduledNotificationsAsync)
  }
  
  function createNotification () {
    return {
      title: "It's quiz time",
      body: "👋🏿 don't forget to take your quiz",
      ios: {
        sound: true,
      },
      android: {
        sound: true,
        priority: 'high',
        sticky: false,
        vibrate: true,
      }
    }
  }
  
  export function setLocalNotification () {
    
    AsyncStorage.getItem(NOTIFICATION_KEYS)
      .then(JSON.parse)
      .then((data) => { 
        if (data === null || data === true) {
          Permissions.askAsync(Permissions.NOTIFICATIONS)
            .then(({ status }) => {  
              if (status === 'granted') {
                Notifications.cancelAllScheduledNotificationsAsync()
  
                let tomorrow = new Date()
                tomorrow.setDate(tomorrow.getDate() + 1)
                tomorrow.setHours(22)
                tomorrow.setMinutes(0)
  
                Notifications.scheduleLocalNotificationAsync(
                  createNotification(),
                  {
                    time: tomorrow,
                    repeat: 'day',
                  }
                )
  
                AsyncStorage.setItem(NOTIFICATION_KEYS, JSON.stringify(true))
              }
            })
        }
      })
  }