import{Q as l}from"./QCardSection.44124512.js";import{Q as c}from"./NoData.374b9879.js";import{p as u,au as d,av as m,h as p,q as f,s as _,d as C,u as Q,o as h,e as v,w as s,k as a,j as g,t as B,g as n,m as i,a5 as S,n as b}from"./index.9a4cab8b.js";import{Q as q}from"./QCard.e5424a73.js";import{Q as w}from"./QDialog.144d910d.js";import{C as x}from"./ClosePopup.136dfd71.js";var A=u({name:"QCardActions",props:{...d,vertical:Boolean},setup(o,{slots:t}){const e=m(o),r=p(()=>`q-card__actions ${e.value} q-card__actions--${o.vertical===!0?"vert column":"horiz row"}`);return()=>f("div",{class:r.value},_(t.default))}});const D={class:"text-h6"},j=C({__name:"ConfirmDialog",setup(o){const t=Q();return(e,r)=>(h(),v(w,null,{default:s(()=>[a(q,{class:"q-pa-xs"},{default:s(()=>[a(l,null,{default:s(()=>[g("div",D,B(n(t).confirm),1)]),_:1}),a(c,{inset:""}),a(l,{class:"text-body1"},{default:s(()=>[i(e.$slots,"body")]),_:3}),a(A,{align:"right"},{default:s(()=>[S(a(b,{flat:"",label:n(t).cancel},null,8,["label"]),[[x]]),i(e.$slots,"confirmButton")]),_:3})]),_:3})]),_:3}))}});export{j as _};
