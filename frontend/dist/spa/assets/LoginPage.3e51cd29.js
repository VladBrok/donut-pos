import{d as b,h as V,u as w,c as Q,r as m,i as k,j as t,k as e,Q as q,m as r,w as u,g as d,o as x,n as y}from"./index.e78f07d2.js";import{Q as I}from"./QCardSection.474d709b.js";import{Q as R}from"./QCard.679619c2.js";import{Q as B,o as $}from"./on-form-validation-error.d7847268.js";import{_ as C}from"./EmailInput.6fe5aab7.js";import{_ as E}from"./PasswordInput.0174ecdb.js";const L={class:"q-pa-md bg-gray-lightest min-height-window"},N={class:"q-my-xl text-center text-dark-lighter"},S={class:"text-h3"},A=b({__name:"LoginPage",props:{isLoggingIn:{type:Boolean},iconName:{}},emits:["submit"],setup(c,{emit:p}){const g=c,f=V(()=>g.isLoggingIn),v=p,h=w(),o=Q(),n=m(o.currentRoute.value.path.includes("admin")?"admin@donut.com":o.currentRoute.value.path.includes("waiter")?"waiter@donut.com":o.currentRoute.value.path.includes("kitchen")?"kitchen@donut.com":o.currentRoute.value.path.includes("courier")?"courier@donut.com":"client@donut.com"),l=m(o.currentRoute.value.path.includes("admin")?"1234":"1234Db_3333>"),_=async()=>{v("submit",{password:l.value,email:n.value})};return(a,s)=>(x(),k("div",L,[t("div",null,[t("div",N,[t("div",null,[e(q,{name:a.iconName,style:{"font-size":"55px"}},null,8,["name"])]),t("h1",S,[r(a.$slots,"title")]),r(a.$slots,"subtitle")]),e(B,{onSubmit:_,class:"max-w-sm q-mx-auto",onValidationError:d($)},{default:u(()=>[e(R,{class:"q-pa-md"},{default:u(()=>[e(I,{class:"q-gutter-lg"},{default:u(()=>[e(C,{modelValue:n.value,"onUpdate:modelValue":s[0]||(s[0]=i=>n.value=i)},null,8,["modelValue"]),e(E,{modelValue:l.value,"onUpdate:modelValue":s[1]||(s[1]=i=>l.value=i),"should-validate-format":!1,required:""},null,8,["modelValue"]),t("div",null,[e(y,{label:d(h).logIn,loading:f.value,type:"submit",color:"primary",class:"q-mx-auto d-block"},null,8,["label","loading"])])]),_:1})]),_:1})]),_:1},8,["onValidationError"])]),r(a.$slots,"bottom")]))}});export{A as _};