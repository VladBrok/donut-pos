import{az as r}from"./index.3f3b8c57.js";function n(t){return(t.price+t.modifications.reduce((o,e)=>o+e.price*e.count,0))*t.count}function i(t){return t.dishes.reduce((o,e)=>o+n(e),0)||0}function a(t){return i(t)+(t.type==="delivery"?r:0)}export{i as a,n as b,a as g};