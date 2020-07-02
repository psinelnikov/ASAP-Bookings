import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default class PushNotification {
  static expoPushToken = null;

  // static onReceivedListener = Notifications.addNotificationReceivedListener(notification => {
  //   console.log(notification);
  // });

  static scheduleBookingNotification = async (timestamp) => {
    const identifier = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Booking Reminder",
        body: 'You have a booking for a dine-in in 30 minutes!',
      },
      trigger: timestamp
      // trigger: {
      //   seconds: 5,
      // },
    });
    return identifier;
  }

  static cancelBookingNotification = async (id) => {
    console.log("cancelled schedule notification");
    await Notifications.cancelScheduledNotificationAsync(id);
  }

  static registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      const { data: token } = await Notifications.getExpoPushTokenAsync();
      expoPushToken = token;
      //console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  };

}