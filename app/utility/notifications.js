var PushNotification = require('react-native-push-notification');
export const createScheduledNotification = () => {
    PushNotification.localNotificationSchedule({
        message: "My Notification Message",
        date: new Date(Date.now() + (60 * 100)) 
    });
}