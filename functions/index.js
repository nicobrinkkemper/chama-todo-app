const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

/**
 * When requested this Function will delete every user accounts that has been inactive for 30 days.
 * The request needs to be authorized by passing a 'key' query parameter in the URL. This key must
 * match a key set as an environment variable using `firebase functions:config:set cron.key="YOUR_KEY"`.
 */
exports.sendNotifications = functions.https.onCall(onTick)

const payloadCreator = (data) => (deviceToken) => ({
    token: deviceToken,
    notification: {
        title: 'Todo: ' + data.text,
        body: data.prioritytext || ''
    },
    data: {
        collapse_key: "type_a",
        title: 'Todo: ' + data.text,
        body: data.prioritytext || '',
        sound: 'default',
        click_action: "https://chama-hooks.firebaseapp.com/"
    }
});
const notificationSender = (data) => (obj) => admin.messaging().send(obj).then(
    response => {
        console.log('Run successful:', response);
        return response;
    })
    .catch(
        error => {
            admin.database().ref(`users/${data.userFieldId}/notificationTokens/${obj.token}`).set(false)
            console.log('Removed token:', error);
        });

function onTick(data, context) {
    const createPayload = payloadCreator(data, context);
    const sendNotification = notificationSender(data, context);
    return admin.database().ref(`users/${data.userFieldId}/notificationTokens/`).once('value')
        .then(tokens => {
            if (!tokens.hasChildren()) {
                console.warn('no-tokens')
                return []
            }
            const tokenObj = tokens.val()
            return Object.keys(tokenObj).filter(token => tokenObj[token])
        })
        .then(
            tokens => {
                console.log(tokens)
                return Promise.all(
                    tokens
                        .map(createPayload)
                        .map(sendNotification)
                )

            }
        );
}
