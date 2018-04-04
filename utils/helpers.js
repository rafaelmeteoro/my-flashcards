import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

const NOTIFICATION_KEY = 'MyFlascards:notifications'

export const getDeckDescription = deck => {
    const { length } = deck.questions
    return length === 0 ? 'No questions' : (length === 1 ? `${length} question` : `${length} questions`)
}

const createNotification = {
    title: 'You need to study!',
    body: 'You did not take a quiz today',
    ios: {
        sound: true
    },
    android: {
        sound: true,
        priority: 'high',
        stick: true,
        vibrate: true
    }
}

export const setLocationNotification = () => {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(result => JSON.parse(result))
        .then(data => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({ status }) => {
                        if (status === 'granted') {
                            Notifications.cancelAllScheduledNotificationsAsync()

                            let tomorrow = new Date()
                            tomorrow.setDate(tomorrow.getDate() + 1)
                            tomorrow.setHours(12)
                            tomorrow.setMinutes(0)

                            Notifications.scheduleLocalNotificationAsync(
                                createNotification, {
                                    time: tomorrow,
                                    repeat: 'day'
                                }
                            )

                            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                        }
                    })
            }
        })
}

export const clearLocalNotification = () => {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync)
}
