import{d as p,u,i as a,e as r,g as l,n as d,ah as o,j as y,f as v,t as b,o as n}from"./index.080b44f7.js";const k={class:"row items-center gap-sm"},B={class:"text-weight-bold"},g={key:0},C=p({__name:"ProductCounter",props:{count:{},min:{},disable:{type:Boolean},viewOnly:{type:Boolean}},emits:["increment","decrement"],setup(w,{emit:m}){const i=m,s=u();return(e,t)=>(n(),a("div",k,[e.viewOnly?o("",!0):(n(),r(d,{key:0,padding:"xs",color:"primary",outline:"",icon:"remove",disable:e.count===(e.min||0)||e.disable,onClick:t[0]||(t[0]=c=>i("decrement")),title:l(s).decrement},null,8,["disable","title"])),y("div",B,[e.viewOnly?(n(),a("span",g,"x")):o("",!0),v(" "+b(e.count),1)]),e.viewOnly?o("",!0):(n(),r(d,{key:1,padding:"xs",color:"primary",icon:"add",onClick:t[1]||(t[1]=c=>i("increment")),disable:e.disable,title:l(s).increment},null,8,["disable","title"]))]))}});export{C as _};