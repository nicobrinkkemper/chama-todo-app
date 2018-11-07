const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

/**
 * When requested this Function will delete every user accounts that has been inactive for 30 days.
 * The request needs to be authorized by passing a 'key' query parameter in the URL. This key must
 * match a key set as an environment variable using `firebase functions:config:set cron.key="YOUR_KEY"`.
 */
exports.sendNotifications = functions.https.onCall(onTick)

function onTick(data, context) {
    admin.database().ref(`users/${data.userFieldId}/notificationTokens/`).once('value').then(tokens => {
        if(!tokens.hasChildren()){
            console.warn('no tokens for user')
        }
        const payload = {
            notification: {
                title: 'Todo: ' + data.text,
                body: data.prioritytext || '',
                sound: 'default',
                click_action: "https://chama-hooks.firebaseapp.com/"
            }
        };
        return admin.messaging().sendToDevice(Object.keys(tokens.val()), payload);
    }).catch(e => {
        console.warn(e)
    })
}
