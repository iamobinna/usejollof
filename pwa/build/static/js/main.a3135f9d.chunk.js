(this.webpackJsonppwa=this.webpackJsonppwa||[]).push([[0],{122:function(e,t,n){},128:function(e,t,n){},130:function(e,t,n){},150:function(e,t,n){},151:function(e,t,n){},152:function(e,t,n){},158:function(e,t,n){},159:function(e,t,n){"use strict";n.r(t);var r=n(0),c=n.n(r),a=n(41),s=n.n(a),i=n(8),o=n(96),l=n.n(o),d=n(95),u=n.n(d),j=n(92),b=n.n(j),v=n(94),O=n.n(v),h=(n(122),n(1)),x=function(e){var t=e.currentIndex,n=e.setCurrentIndex,c=(e.user,e.setUser),a=Object(r.useState)(!1),s=Object(i.a)(a,2),o=s[0],d=s[1],j=[{id:0,icon:b.a,name:"Orders",color:"rgb(0, 158, 66)"},{id:1,icon:O.a,name:"Ongoing order",color:"rgb(0, 140, 158)"}];return Object(r.useEffect)((function(){d(!1)}),[t]),Object(h.jsx)("div",{className:"delivery-nav-container",children:Object(h.jsxs)("div",{style:{position:"relative"},children:[Object(h.jsx)("div",{onClick:function(){return d(!o)},className:" ".concat(!o&&"ham-open"," hamburger icon-acitve"),children:Object(h.jsx)(u.a,{})}),Object(h.jsxs)("div",{className:"delivery-boy-nav ".concat(!o&&"delivery-boy-nav-close"," "),children:[j.map((function(e){return Object(h.jsxs)("div",{onClick:function(){return n(e.id)},className:" ".concat(e.id===t&&"delivery-nav-active"," delivery-nav-option"),children:[Object(h.jsx)(e.icon,{className:""}),Object(h.jsx)("span",{children:e.name})]})})),Object(h.jsxs)("div",{className:"delivery-logout delivery-nav-option",onClick:function(){return c(null),localStorage.removeItem("driverData"),void window.dispatchEvent(new Event("sign-out-driver"))},children:[Object(h.jsx)(l.a,{className:""}),Object(h.jsx)("span",{children:"Log out"})]})]})]})})},m=(n(128),n(50)),f=n.n(m),g=n(65),p=(n(130),n(198)),y=n(202),S=n(97),w=n.n(S),N=function(){var e=Object(g.a)(f.a.mark((function e(t){var n,r;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,w.a.post("".concat("","/deliveryboy/login"),t);case 3:return n=e.sent,r=n.data,localStorage.setItem("driverData",JSON.stringify(r)),window.dispatchEvent(new Event("update-driver-account")),e.abrupt("return",r);case 10:return e.prev=10,e.t0=e.catch(0),console.log("error"),e.abrupt("return",null);case 14:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(t){return e.apply(this,arguments)}}(),D=n(199),k=function(e){e.user;var t=e.setUser,n=Object(r.useState)(""),c=Object(i.a)(n,2),a=c[0],s=c[1],o=Object(r.useState)(""),l=Object(i.a)(o,2),d=l[0],u=l[1],j=Object(r.useState)(!1),b=Object(i.a)(j,2),v=b[0],O=b[1],x=Object(r.useState)({type:"",msg:null}),m=Object(i.a)(x,2),S=m[0],w=m[1],k=function(){var e=Object(g.a)(f.a.mark((function e(n){var r;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n.preventDefault(),v){e.next=7;break}return O(!0),e.next=5,N({email:a,password:d});case 5:(r=e.sent)?(console.log("signin",r),t(r),w({type:"success",msg:"Logged in"}),O(!1)):(console.log("error"),w({type:"error",msg:"Wrong credentials"}),O(!1));case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(h.jsxs)("div",{children:[Object(h.jsx)("h1",{children:"Sign In"}),Object(h.jsx)("form",{onSubmit:k,className:"delivery-signin",children:v?Object(h.jsx)(D.a,{severity:"info",children:"Requesting Server..."}):Object(h.jsxs)(h.Fragment,{children:[S.msg&&Object(h.jsx)(D.a,{severity:S.type,children:S.msg}),Object(h.jsx)(p.a,{required:!0,value:a,onChange:function(e){return s(e.target.value)},id:"outlined-basic",label:"Email",type:"email",variant:"outlined"}),Object(h.jsx)(p.a,{required:!0,value:d,onChange:function(e){return u(e.target.value)},id:"outlined-basic",label:"Password",type:"password",variant:"outlined"}),Object(h.jsx)(y.a,{className:"sigin-btn-m",type:"submit",variant:"contained",children:"Sign In"})]})})]})},I=(n(150),n(52)),E=n.n(I),C=n(98),P=n.n(C),F=function(){return Object(h.jsxs)("div",{className:"delivery-boy-orders",children:[Object(h.jsx)("div",{className:"map box flex",children:Object(h.jsx)("h2",{children:"MAP"})}),Object(h.jsxs)("div",{className:"delivery-order-button flex box",children:[Object(h.jsx)(E.a,{}),Object(h.jsx)("h5",{children:" Pickup Location "})]}),Object(h.jsxs)("div",{className:"delivery-order-button flex box",children:[Object(h.jsx)(E.a,{}),Object(h.jsx)("h5",{children:" Drop Location "})]}),Object(h.jsxs)("div",{className:"delivery-order-button flex box red",children:[Object(h.jsx)(P.a,{}),Object(h.jsx)("h5",{children:" Posponed order "})]})]})},L=n(17),J=(n(151),n(100)),U=n.n(J),B=n(99),q=n.n(B),K=n(101),W=n.n(K),Y=n(102),z=n.n(Y),A=n(103),M=n.n(A),T=function(){var e=Object(r.useState)([{id:0,open:!1,toDeliver:"Burger",from:"Karachi",to:"New York, Street 1",customer:"Shah Fahad"},{id:1,open:!1,toDeliver:"Parcel",from:"Karachi",to:"New York, Street 1",customer:"Shah Fahad"},{id:2,open:!1,toDeliver:"Pizza",from:"Karachi",to:"New York, Street 1",customer:"Shah Fahad"},{id:3,open:!1,toDeliver:"Parcel",from:"Karachi",to:"New York, Street 1",customer:"Shah Fahad"}]),t=Object(i.a)(e,2),n=t[0],c=t[1];return Object(h.jsxs)("div",{className:"delivery-boy-orders",children:[Object(h.jsx)("h2",{children:"Orders"}),n.map((function(e,t){return Object(h.jsxs)("div",{onClick:function(){return function(e){var t=n[e].open,r=Object(L.a)(n);if(t)return r[e].open=!1,void c(r);for(var a=0;a<r.length;a++)r[a].open=!1;r[e].open=!0,c(r)}(t)},className:"delivery-boy-order box ".concat(e.open&&"delivery-boy-order-active"," "),children:[Object(h.jsxs)("div",{className:"flex",children:["Parcel"===e.toDeliver?Object(h.jsx)(q.a,{}):Object(h.jsx)(U.a,{}),Object(h.jsxs)("span",{children:[" ",e.toDeliver," "]})]}),Object(h.jsxs)("div",{className:"flex",children:[Object(h.jsxs)("div",{className:"flex",children:[Object(h.jsx)(E.a,{}),Object(h.jsxs)("span",{children:[" ",e.from," "]})]}),Object(h.jsx)(W.a,{}),Object(h.jsxs)("div",{className:"flex",children:[Object(h.jsx)(E.a,{style:{color:"rgb(0, 128, 90)"}}),Object(h.jsxs)("span",{children:[" ",e.to," "]})]})]}),Object(h.jsxs)("div",{className:"flex",children:[Object(h.jsx)(z.a,{}),Object(h.jsxs)("span",{children:[" ",e.customer," "]})]}),Object(h.jsxs)("div",{className:"delivery-order-button flex box",children:[Object(h.jsx)(M.a,{}),Object(h.jsx)("h5",{children:" Start Order "})]})]})}))]})},_=(n(152),n(107)),R=function(e){var t=e.currentIndex,n=e.user,c=e.setUser,a=Object(r.useState)(null),s=Object(i.a)(a,2),o=s[0],l=s[1],d=Object(r.useState)(!0),u=Object(i.a)(d,2),j=u[0],b=u[1],v=Object(r.useState)(!0),O=Object(i.a)(v,2),x=O[0],m=O[1],f=Object(r.useState)(null),g=Object(i.a)(f,2),p=g[0],y=g[1],S=Object(r.useState)(!0),w=Object(i.a)(S,2),N=w[0],I=w[1],E=Object(r.useState)(null),C=Object(i.a)(E,2),P=C[0],L=C[1],J=Object(r.useState)({lat:null,lng:null}),U=Object(i.a)(J,2),B=U[0],q=U[1],K=[{id:1,component:F,name:"On going",to:"/account"},{id:0,component:T,name:"Orders",to:"/wallet"}];Object(r.useEffect)((function(){console.log("driverData",n),n&&j&&(b(!1),l(Object(_.a)("",{query:{token:n.auth_token}})),W()),n&&null!==n||(b(!0),null!==p&&navigator.geolocation.clearWatch(p))}),[n]);var W=function(){console.log("Setting navigator");var e=navigator.geolocation.watchPosition((function(e){q({lat:e.coords.latitude,lng:e.coords.longitude})}),(function(e){console.log(e),I(!1),L("Allow location from settings")}));y(e)};return Object(r.useEffect)((function(){o&&o.emit("serverUpdateDriver",B)}),[B]),Object(r.useEffect)((function(){o&&x&&N&&(m(!1),o.emit("serverSaveDriver",{userID:n.user._id,location:{lat:null,lang:null}}))}),[o,N]),n&&null!==n.user?Object(h.jsxs)("div",{className:"delivery-main",children:[P&&Object(h.jsx)(D.a,{style:{marginBottom:"10px"},severity:"info",children:P}),K.map((function(e){return e.id===t?Object(h.jsx)(h.Fragment,{children:Object(h.jsx)(e.component,{})}):null}))]}):Object(h.jsx)("div",{className:"delivery-main",children:Object(h.jsx)(k,{user:n,setUser:c})})},$=function(){var e=Object(r.useState)(0),t=Object(i.a)(e,2),n=t[0],c=t[1],a=Object(r.useState)(JSON.parse(localStorage.getItem("driverData"))?JSON.parse(localStorage.getItem("driverData")):null),s=Object(i.a)(a,2),o=s[0],l=s[1];return window.addEventListener("sign-out-driver",(function(){l("")})),window.addEventListener("update-account-driver",(function(){var e=JSON.parse(localStorage.getItem("driverData"))?JSON.parse(localStorage.getItem("driverData")):null;console.log("bla",e),l(e)})),Object(h.jsx)("div",{className:"pwa-container",children:Object(h.jsxs)("div",{className:"pwa",children:[Object(h.jsx)(x,{user:o,setUser:l,currentIndex:n,setCurrentIndex:c}),Object(h.jsx)(R,{currentIndex:n,user:o,setUser:l})]})})};n(158),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var G=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,204)).then((function(t){var n=t.getCLS,r=t.getFID,c=t.getFCP,a=t.getLCP,s=t.getTTFB;n(e),r(e),c(e),a(e),s(e)}))};s.a.render(Object(h.jsx)(c.a.StrictMode,{children:Object(h.jsx)($,{})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)})),G()}},[[159,1,2]]]);
//# sourceMappingURL=main.a3135f9d.chunk.js.map