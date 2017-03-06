import * as firebase from 'firebase'

export const createFlight = async (flight) => {
  const rootRef = firebase.app().database().ref()
  const userRef = rootRef.child('users/' + this.rootRef.getAuth().getUid())
  flight = await userRef.child('flights').push(flight)
  return flight
}
