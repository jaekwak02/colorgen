(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{18:function(n,t,e){n.exports=e(39)},25:function(n,t,e){},38:function(n,t,e){},39:function(n,t,e){"use strict";e.r(t);var r=e(0),o=e.n(r),a=e(11),i=e.n(a),c=(e(24),e(25),e(2)),u=e(4),l=e(5),s=e(3),f=e(1),d=e.n(f);function m(){var n=Object(c.a)(['\n  content: "";\n  display: block;\n  position: absolute;\n  left: 50%;\n  top: -31px;\n  transform: translateX(-50%);\n  height: 30px;\n  /* width: calc(100% - 75px); */\n  width: 15px;\n  background-color: var(--color-neutral-600);\n']);return m=function(){return n},n}function p(){var n=Object(c.a)(["\n  display: grid;\n  grid-auto-flow: column;\n  justify-content: start;\n  justify-self: start;\n  border: 1px solid var(--color-neutral-500);\n"]);return p=function(){return n},n}function b(){var n=Object(c.a)(["\n  height: 75px;\n  width: 75px;\n\n  display: grid;\n  align-items: center;\n  justify-items: center;\n"]);return b=function(){return n},n}function v(){var n=Object(c.a)(["\n  position: relative;\n  display: grid;\n  grid-auto-flow: column;\n  justify-content: start;\n  justify-self: start;\n  border: 1px solid var(--color-neutral-500);\n"]);return v=function(){return n},n}function g(){var n=Object(c.a)(["\n  display: grid;\n  grid-gap: 30px;\n  grid-template-columns: auto auto auto 1fr;\n  align-items: flex-start;\n"]);return g=function(){return n},n}var h=s.b.div(g()),y=s.b.div(v()),j=s.b.div(b()),x=s.b.div(p()),O=s.b.div(m()),E=function(n){var t=n.colors,e=n.level,r=n.index,a=n.editingIndex,i=n.setEditingIndex,c=n.showConnector,u=void 0!==c&&c;return o.a.createElement(h,null,o.a.createElement(y,null,t.map(function(n,t){return o.a.createElement(j,{key:t,style:{backgroundColor:n,color:d()(n).isLight()?"black":"white"}},t===e-1&&"\u2573")}),u&&o.a.createElement(O,null)),"number"===typeof r&&o.a.createElement(x,{onClick:function(){return i(r===a?-1:r)}},o.a.createElement(j,{style:{backgroundColor:t[e-1]}})))},w=e(16),k=e(17),C=function(n){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1;return Math.round(Math.min(Math.max(n,t),e))},M=function(n,t,e){return n+(t-n)*e};Object(u.a)(Array(10)).map(function(n){return(~~(36*Math.random())).toString(36)}).join("");function S(){var n=Object(c.a)(["\n  position: relative;\n"]);return S=function(){return n},n}var P=s.b.div(S()),R=function(n){n.position;var t=n.setPosition,e=n.width,a=void 0===e?100:e,i=n.height,c=void 0===i?100:i,u=n.style,l=Object(k.a)(n,["position","setPosition","width","height","style"]),s=Object(r.useRef)(),f=Object(r.useRef)(!1);Object(r.useEffect)(function(){var n=function(){return f.current=!1},e=function(n){f.current&&t([C(n.clientX-s.current.getBoundingClientRect().left,0,a),C(n.clientY-s.current.getBoundingClientRect().top,0,c)])};return document.addEventListener("mouseup",n),document.addEventListener("mousemove",e),function(){document.removeEventListener("mouseup",n),document.removeEventListener("mousemove",e)}},[a,c,t]);return o.a.createElement(P,Object.assign({},l,{ref:s,onMouseDown:function(n){f.current=!0,function(n){f.current&&t([n.clientX-n.target.getBoundingClientRect().left,n.clientY-n.target.getBoundingClientRect().top])}(n)},style:Object(w.a)({},u,{width:a,height:c})}))};function B(){var n=Object(c.a)(["\n      background-color: var(--color-neutral-500);\n      background-color: var(--color-neutral-600);\n      color: white;\n    "]);return B=function(){return n},n}function H(){var n=Object(c.a)(["\n  height: 30px;\n  padding: 0px 15px;\n  background-color: var(--color-neutral-400);\n  border: 1px solid var(--color-neutral-500);\n\n  color: var(--color-neutral-500);\n\n  display: grid;\n  justify-items: center;\n  align-items: center;\n\n  cursor: pointer;\n\n  &:hover {\n    background-color: var(--color-neutral-500);\n    background-color: var(--color-neutral-600);\n    color: white;\n  }\n\n  ","\n"]);return H=function(){return n},n}function I(){var n=Object(c.a)(["\n  display: grid;\n  grid-gap: 10px;\n"]);return I=function(){return n},n}function L(){var n=Object(c.a)(["\n  position: absolute;\n  width: calc(100% + 10px);\n  height: 2px;\n  transform: translateX(-5px) translateY(-1px);\n  background-color: white;\n"]);return L=function(){return n},n}function T(){var n=Object(c.a)(["\n  position: absolute;\n  height: 16px;\n  width: 16px;\n  transform: translateX(-50%) translateY(-50%);\n  border: 2px solid white;\n  background-color: transparent;\n  border-radius: 10px;\n\n  pointer-events: none;\n"]);return T=function(){return n},n}function X(){var n=Object(c.a)(["\n  position: absolute;\n  top: 0%;\n  left: 0%;\n  bottom: 0%;\n  right: 0%;\n\n  pointer-events: none;\n"]);return X=function(){return n},n}function N(){var n=Object(c.a)(["\n  display: grid;\n  grid-gap: 30px;\n  grid-template-columns: auto auto auto 1fr;\n  align-items: flex-start;\n  justify-content: flex-start;\n"]);return N=function(){return n},n}var Y=s.b.div(N()),A=s.b.div(X()),F=s.b.div(T()),J=s.b.div(L()),W=s.b.div(I()),D=s.b.div(H(),function(n){return n.active&&Object(s.a)(B())}),G=function(n){var t=n.color,e=void 0===t?"#ff0000":t,a=n.setColor,i=n.scheme,c=n.setScheme,s=Object(r.useMemo)(function(){var n=d()(e).hue()/360*400,t=d()("#ff0000").rotate(n/400*360).hex();console.log({defaultHue:t,defaultHuePosition:n});var r=d()(t).rgb().array(),o=d()(e).rgb().array(),a=Math.max.apply(Math,Object(u.a)(o)),i=400-a/255*400,c=o.map(function(n){return 255*n/a});return{defaultHuePosition:n,defaultHue:t,defaultMarkerPosition:[400-400*(255!==c[0]?(c[0]-r[0])/(255-r[0]):255!==c[1]?(c[1]-r[1])/(255-r[1]):(c[2]-r[2])/(255-r[2])),i]}},[]),f=s.defaultHuePosition,m=s.defaultHue,p=s.defaultMarkerPosition,b=Object(r.useState)(m),v=Object(l.a)(b,2),g=v[0],h=v[1],y=Object(r.useState)(p),j=Object(l.a)(y,2),x=j[0],O=j[1],E=Object(r.useState)([0,f]),w=Object(l.a)(E,2),k=w[0],C=w[1],S=x[0]/400,P=x[1]/400,B=d()("#ff0000").rotate(k[1]/400*360).hex(),H=d()(g).rgb().array(),I=M(M(255,H[0],S),0,P),L=M(M(255,H[1],S),0,P),T=M(M(255,H[2],S),0,P),X=d()([I,L,T]).hex();return Object(r.useEffect)(function(){return h(B)},[B,h]),Object(r.useEffect)(function(){if(e!==X){var n=setTimeout(function(){return a(X)},100);return function(){return clearTimeout(n)}}},[e,X,a]),o.a.createElement(Y,null,o.a.createElement(R,{position:x,setPosition:O,width:400,height:400,style:{backgroundColor:d()(g)}},o.a.createElement(A,{style:{background:"linear-gradient(to left, transparent, white)"}}),o.a.createElement(A,{style:{background:"linear-gradient(to top, black, transparent)"}}),o.a.createElement(F,{style:{left:"".concat(x[0]/4,"%"),top:"".concat(x[1]/4,"%"),backgroundColor:X}})),o.a.createElement(R,{position:k,setPosition:C,width:60,height:400,style:{background:"linear-gradient(to bottom, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)"}},o.a.createElement(J,{style:{top:"".concat(k[1]/4,"%")}})),o.a.createElement(W,null,[{label:"None",value:null},{label:"Analogous",value:"analogous"},{label:"Complementary",value:"complementary"},{label:"Split Complementary",value:"split-complementary"},{label:"Triadic",value:"triadic"},{label:"Tetradic",value:"tetradic"}].map(function(n,t){return o.a.createElement(D,{key:t,active:i===n.value,onClick:function(){return c(n.value)}},n.label)})))};function $(){var n=Object(c.a)(['\n  background-color: #484848;\n  font-family: "Roboto Mono";\n  padding: 30px;\n  line-height: 25px;\n  white-space: pre;\n\n  color: white;\n']);return $=function(){return n},n}function q(){var n=Object(c.a)([""]);return q=function(){return n},n}function z(){var n=Object(c.a)(["\n  display: grid;\n  grid-gap: 30px;\n  align-items: center;\n"]);return z=function(){return n},n}function K(){var n=Object(c.a)(["\n  display: grid;\n  grid-gap: 30px;\n  align-content: start;\n"]);return K=function(){return n},n}function Q(){var n=Object(c.a)(["\n  display: grid;\n  grid-template-columns: 1fr auto;\n  min-height: 400px;\n"]);return Q=function(){return n},n}function U(){var n=Object(c.a)(["\n  padding: 30px;\n\n  display: grid;\n  grid-gap: 30px;\n"]);return U=function(){return n},n}var V=s.b.div(U()),Z=s.b.div(Q()),_=s.b.div(K()),nn=s.b.div(z()),tn=s.b.div(q()),en=s.b.div($()),rn=function(n){for(var t=d()(n),e=t.luminosity(),r=Math.pow(e,1/1.5).toString(),o=Number(r[2]),a=[1,2,3,4,5,6,7,8,9].map(function(n){return Number("0.".concat(n).concat(r.slice(3)))}),i=[t.hex()],c=d()(t),u=0;c.luminosity()>.01&&u<100;)u++,c=c.darken(.02),i.unshift(c.hex());for(var l=d()(t),s=0;l.luminosity()<.99&&s<100;)s++,l=l.lighten(.02),i.push(l.hex());return{colors:a.map(function(n){return Math.pow(n,1.5)}).map(function(n,t){return i.reduce(function(t,e){return Math.abs(d()(e).luminosity()-n)<Math.abs(d()(t).luminosity()-n)?e:t})}),level:o}},on=function(){var n=Object(r.useState)(-1),t=Object(l.a)(n,2),e=t[0],a=t[1],i=Object(r.useState)([{color:"#12db7d",scheme:null},{color:"#FF4499",scheme:"analogous"}]),c=Object(l.a)(i,2),s=c[0],f=c[1],m=s.map(function(n){return rn(n.color)}),p=s.map(function(n){return"analogous"===n.scheme?[d()(n.color).rotate(-30),d()(n.color).rotate(30)]:"complementary"===n.scheme?[d()(n.color).rotate(180)]:"split-complementary"===n.scheme?[d()(n.color).rotate(150),d()(n.color).rotate(210)]:"triadic"===n.scheme?[d()(n.color).rotate(-120),d()(n.color).rotate(120)]:"tetradic"===n.scheme?[d()(n.color).rotate(-180),d()(n.color).rotate(-90),d()(n.color).rotate(90)]:[]}).map(function(n){return n.map(function(n){return rn(n.hex())})});return o.a.createElement(V,null,o.a.createElement("h1",null,"Color Theme Generator"),o.a.createElement(Z,null,o.a.createElement(_,null,s.map(function(n,t){var r=m[t],i=r.colors,c=r.level,u=p[t];return o.a.createElement(nn,{key:t},o.a.createElement(E,{colors:i,level:c,index:t,editingIndex:e,setEditingIndex:a}),u.map(function(n,t){var e=n.colors,r=n.level;return o.a.createElement(E,{key:t,colors:e,level:r,showConnector:!0})}))})),o.a.createElement(tn,null,-1!==e&&o.a.createElement(G,{key:e,color:s[e].color,setColor:function(n){var t=Object(u.a)(s);t[e].color=n,f(t)},scheme:s[e].scheme,setScheme:function(n){s[e].scheme=n,f(Object(u.a)(s))}}))),o.a.createElement("div",null,o.a.createElement("div",{className:"medium-header"},"Export"),o.a.createElement(en,null,s.reduce(function(n,t,e){return n.push(m[e]),n.push.apply(n,Object(u.a)(p[e])),n},[]).map(function(n,t){return n.colors.map(function(n,e){return"--color-".concat(t+1,"-").concat(100*e+100,": ").concat(n,";")}).join("\n")}).join("\n\n"))))};e(38);var an=function(){return o.a.createElement(on,null)};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(o.a.createElement(an,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(n){n.unregister()})}},[[18,1,2]]]);
//# sourceMappingURL=main.deb828cc.chunk.js.map