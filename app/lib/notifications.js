var PushNotification = require('react-native-push-notification')
export const createScheduledNotification = (message, date = null) => {
  PushNotification.localNotificationSchedule({
    message: message,
    date: date || new Date(Date.now() + (500))
  })
}

export const getNextNotificationIndex = (lastNotificationIndex) => {
  if (lastNotificationIndex == null) return 0
  if (lastNotificationIndex >= (notifications.length - 1)) return 0
  return lastNotificationIndex + 1
}

export const getNextNotification = (lastNotificationIndex) => {
  const nextNotification = notifications[getNextNotificationIndex(lastNotificationIndex)]
  return nextNotification || notifications[0]
}

export const notifications = [
  {
    'value': 2,
    'unit': 'days',
    'message': 'Flight in two days, better be ready'
  },
  {
    'value': 1,
    'unit': 'days',
    'message': 'Flight is tomorrow, I hope you are in the correct city'
  },
  {
    'value': 16,
    'unit': 'hours',
    'message': 'Its getting close bro! better pack!'
  },
  {
    'value': 12,
    'unit': 'hours',
    'message': 'Friendly reminder that you need to be there 1 hour before... Have you got a ride?'
  },
  {
    'value': 6,
    'unit': 'hours',
    'message': 'Yo get your phone off silent, get your things in place!'
  },
  {
    'value': 4,
    'unit': 'hours',
    'message': 'Im not kidding now. Seriously get yourself ready. Maybe go to the airport now?'
  },
  {
    'value': 2,
    'unit': 'hours',
    'message': 'No. Whatever you are doing now is not important. Got to the airport!'
  },
  {
    'value': 1,
    'unit': 'hours',
    'message': 'If you are not already heading to the airport you are an idiot!'
  },
  {
    'value': 30,
    'unit': 'minutes',
    'message': 'Its pretty much too late now...'
  },
  {
    'value': 15,
    'unit': 'minutes',
    'message': 'Hope you are boarding... Otherwise good one, you did it again.'
  }
]
