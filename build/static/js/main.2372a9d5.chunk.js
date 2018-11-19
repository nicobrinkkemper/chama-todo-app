(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{281:function(e,t,n){e.exports=n(696)},696:function(e,t,n){"use strict";n.r(t);var a=n(18),o=n(0),r=n.n(o),i=n(92),c=n.n(i),l=n(43);var s=function(e){var t=e.todos;return r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-md-12"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-md-12"},r.a.createElement("br",null),0===t.length?r.a.createElement("h1",null,"All done"):r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-md-8"},r.a.createElement("h5",null,"Todo List")),r.a.createElement("div",{className:"col-md-4 text-right"},r.a.createElement("h5",null,t.length," todos left"))))),r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-md-12"},r.a.createElement("ul",{className:"list-group"},t.map(function(e,t){return r.a.createElement("li",{key:t.toString(),className:"list-group-item"},e)}))))))};var u=function(e){var t=e.badges,n=e.text,a=e.isSpeaking,o=e.onCompleteTodo;return r.a.createElement("div",{className:"Todo ".concat(a?"speaking":"")},r.a.createElement("h4",null,r.a.createElement("i",{className:"material-icons",style:{position:"absolute",bottom:10,right:20,color:"#99979c"}},"event"),n,r.a.createElement("button",{className:"float-right btn btn-success btn-sm",style:{marginLeft:10},onClick:o},"Complete")),r.a.createElement("p",null,t.map(function(e,t){var n=e.color,a=e.children;return r.a.createElement("span",{key:t.toString(),className:"badge badge-".concat(n),style:{marginRight:6}},a)})))};var d=function(e){var t=e.notify,n=e.onCompleteTodo,a=e.id;Object(o.useEffect)(function(){"warning"===e.datetimecolor&&t()},[e.datetimetext]);var i=[{children:e.datetimetext,color:e.datetimecolor},{children:e.prioritytext,color:e.prioritycolor}];return r.a.createElement(u,{badges:i,onCompleteTodo:function(){return n(a)},text:e.text})},m=function(e){var t=e.toggleTodo,n=e.todos,a=e.uid,o=e.notify;if(!n)return null;var i=n.map(function(e){return r.a.createElement(d,Object.assign({},e,{notify:function(){o(e)},onCompleteTodo:function(){return t(e,a)}}))});return r.a.createElement(s,{todos:i})},f=n(22),p=n(10),g=n(274),b=n.n(g),E=n(60),v=["Noteworthy","Significant","Important"],h=["info","secondary","primary"],y=["danger","warning","success"],N=n(59),O=n.n(N),T=function(e,t){return t.priority-e.priority},w=function(e){return!e.hasOwnProperty("completed")||!e.completed},k=function(e){return null!==e&&e.hasOwnProperty("id")&&e.hasOwnProperty("text")&&e.hasOwnProperty("datetime")&&e.hasOwnProperty("priority")},j=function(e){return h[e.priority]},C=function(e){return v[e.priority]},S=function(e){return y[x(e)]},x=function(e){return function(e){return Object(E.isAfter)(new Date,e.datetime)}(e)?0:function(e){var t=Object(E.differenceInMinutes)(e.datetime,new Date);return t<5&&t>0}(e)?1:2},R=function(e){return Object(E.distanceInWordsToNow)(e.datetime,{includeSeconds:!0,addSuffix:!0})};var I=Object(p.d)(Object(f.firebaseConnect)(function(e){var t=e.uid;return[{path:"todos/".concat(t)}]}),Object(l.b)(function(e,t){return e.firebase.data.todos?{todos:(n=e.firebase.data.todos,o=t.uid,n.hasOwnProperty(o)&&n[o]?Object.values(n[o]).filter(k).filter(w).sort(T).map(function(e){return Object(a.a)({},e,{prioritycolor:j(e),prioritytext:C(e),datetimecolor:S(e),datetimetext:R(e)})}):[])}:e;var n,o}))(m),_=I,D=n(280),M=n(275),P=n.n(M);function A(e){var t=e.todo,n=e.onSubmit,a=e.onDatetimeChange,o=e.onPriorityChange,i=e.onTextChange,c=e.onAdd;return r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-md-12"},r.a.createElement("br",null),r.a.createElement("div",{className:"input-group"},r.a.createElement("input",{className:"form-control text",type:"text",required:!0,value:t.text,autoFocus:!0,placeholder:"Write a todo",onKeyUp:n,onChange:i}),r.a.createElement(P.a,{locale:"nl-NL",minDate:new Date,onChange:a,value:t.datetime}),r.a.createElement("select",{className:"form-control priority",value:t.priority||0,onChange:o},r.a.createElement("option",{value:0},v[0]),r.a.createElement("option",{value:1},v[1]),r.a.createElement("option",{value:2},v[2])),r.a.createElement("div",{className:"input-group-append"},r.a.createElement("button",{className:"btn btn-primary",onClick:c},"Add")))))}var L=function(e){var t=e.addTodo,n=e.profile,i=e.login,c=e.uid,l=Object(o.useState)({text:"",priority:0,datetime:new Date}),s=Object(D.a)(l,2),u=s[0],d=s[1];function m(){""!==u.text&&n.isLoaded&&(n.isEmpty?i():t(u,c)&&d(Object(a.a)({},u,{text:""})))}return r.a.createElement("div",null,r.a.createElement(A,{todo:u,onSubmit:function(e){13===e.keyCode&&m()},onAdd:m,onPriorityChange:function(e){d(Object(a.a)({},u,{priority:e.target.value}))},onDatetimeChange:function(e){d(Object(a.a)({},u,{datetime:e}))},onTextChange:function(e){d(Object(a.a)({},u,{text:e.target.value}))}}))},F=L,U=n(278),X=function(e){var t=e.logout,n=e.login,a=e.uid,o=e.notifications,i=(e.displayName,e.removeNotification),c=e.profile;return r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-md-12"},r.a.createElement("hr",null)),r.a.createElement("div",{className:"col-md-12"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-md-12"},a?r.a.createElement("button",{className:"btn btn-danger",onClick:function(){return t()}},"Logout ",c.displayName):r.a.createElement("button",{className:"btn btn-success",onClick:function(){return n()}},"Login")))),r.a.createElement(U.a,{position:"bottom-right",timeout:3e3,alerts:o||[],onDismiss:function(e){return i(e.id)}}))},W=n(19),q=n.n(W);n(653),n(655),n(697),n(659);n(662)({origin:!0});q.a.initializeApp({apiKey:"AIzaSyCcSDFLCkpRMSeujLrSdQqYb3iwQk7fS-M",authDomain:"chama-hooks.firebaseapp.com",databaseURL:"https://chama-hooks.firebaseio.com",projectId:"chama-hooks",storageBucket:"chama-hooks.appspot.com",messagingSenderId:"518384846061"});q.a.database(),new q.a.auth.GoogleAuthProvider,q.a.auth();var J=q.a.messaging();J.usePublicVapidKey("BN8krSM0CRd6YdRwSXa1xosJyF0236U39Ftk27Rr7lnkrLtsAba9XQ4cUSGyQMkzRkhEJ7iaR1p6WOjHFNRRdu0");var Q=q.a.functions().httpsCallable("sendNotifications"),V=q.a,z=(q.a,n(279)),B="ADD_NOTIFICATION",K="REMOVE_NOTIFICATION";var G=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};switch(t.type){case B:return Object(z.a)(e).concat([t.payload]);case K:return e.filter(function(e){return e.id!==t.payload});default:return e}},H=n(277),Y=n.n(H),Z=Object(p.c)({firebase:f.firebaseStateReducer,notifications:G}),$={userProfile:"users"},ee=("object"===typeof window&&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}):p.d)(Object(p.a)(O.a))(p.e),te=function(e){return Object(p.d)(Object(f.reactReduxFirebase)(V,$))(ee)(Z,{})}({});n.d(t,"App",function(){return ne});var ne=Object(p.d)(Object(f.firebaseConnect)([]),Object(l.b)(function(e){return(t=e.firebase.profile).isEmpty||!t.isLoaded?{profile:e.firebase.profile}:{profile:e.firebase.profile,uid:e.firebase.auth.uid,notifications:e.notifications};var t},function(e,t){var n=t.firebase;return{login:function(){n.login({provider:"google",type:"popup"})},logout:function(){n.logout()},removeNotification:function(t){e(function(e){return{type:K,payload:e}}(t))},notify:function(e){return Q(Object(a.a)({},e,{text:e.text+" "+e.datetimetext}))},setNotificationToken:function(e,t){n.set("notificationTokens/".concat(e,"/").concat(t),!0)},toggleTodo:function(e,t){n.set("todos/".concat(t,"/").concat(e.id,"/completed"),!e.completed)},addTodo:function(e,t){var o=function(e){return Object(a.a)({},e,{id:b()(e.text),datetime:Object(E.format)(e.datetime)})}(e);return n.set("todos/".concat(t,"/").concat(o.id),o)},startTimer:function(){e({type:N.START_TIMER,payload:{actionName:"UPDATE_TIME_FIELDS",timerName:"updateTimeFields",timerInterval:1e4}})},stopTimer:function(){e({type:N.STOP_TIMER,payload:{timerName:"updateTimeFields"}})},startCloudMessaging:function(t){console.log("start messaging"),J.onTokenRefresh(function(){J.getToken().then(function(e){t(e)}).catch(function(e){console.log("Unable to retrieve refreshed token ",e)})}),J.onMessage(function(t){var n;e({type:B,payload:{id:(n=t).from,type:"warning",message:n.data.title}})}),J.requestPermission().then(function(){return J.getToken()}).then(function(e){return t(e)}).catch(function(e){"messaging/permission-blocked"===e.code?console.log("Please Unblock Notification Request Manually"):console.log("Error Occurred",e)})},stopCloudMessaging:function(){console.log("stop messaging"),J.onMessage(function(){}),J.onTokenRefresh(function(){})}}}))(function(e){var t=e.startTimer,n=e.stopTimer,a=e.startCloudMessaging,i=e.stopCloudMessaging,c=e.setNotificationToken,l=e.uid,s=e.profile;return Object(o.useEffect)(function(){if(l)return a(function(e){return c(l,e)}),t(),function(){i(),n()}},[l]),r.a.createElement("div",null,r.a.createElement(F,e),l?r.a.createElement("div",{style:{minHeight:200}},r.a.createElement(_,e)):r.a.createElement("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",height:100}},s.isLoaded?"":r.a.createElement(Y.a,{name:"double-bounce"})),r.a.createElement(X,e))}),ae=document.getElementById("root");c.a.render(r.a.createElement(l.a,{store:te},r.a.createElement(ne,null)),ae),"serviceWorker"in navigator&&navigator.serviceWorker.register("./firebase-messaging-sw.js").then(function(e){console.log("Registration successful, scope is:",e.scope)}).catch(function(e){console.log("Service worker registration failed, error:",e)})}},[[281,2,1]]]);
//# sourceMappingURL=main.2372a9d5.chunk.js.map