const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();


exports.sendNotifications = functions.https.onCall(doSend)

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
const notificationSender = (data, context) => (obj) => admin.messaging()
    .send(obj)
    .then(
        response => {
            console.log('Run successful:', response);
            return response;
        })
    .catch(
        error => {
            admin.database().ref(`notificationTokens/${context.auth.uid}/${obj.token}`).set(false)
            console.log('Removed token:', error);
        });


function doSend(data, context) {
    const createPayload = payloadCreator(data, context);
    const sendNotification = notificationSender(data, context);
    return admin.database()
        .ref(`notificationTokens/${context.auth.uid}`)
        .once('value')
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