import{Q as l}from"./QCardSection.8c2ff0bc.js";import{Q as c}from"./NoData.0652d92a.js";import{p as u,av as d,aw as m,h as p,q as f,s as _,d as C,u as Q,e as h,w as s,o as v,k as a,j as g,t as B,g as n,m as i,a5 as S,n as w}from"./index.20f37243.js";import{Q as b}from"./QCard.4f0de502.js";import{Q as q}from"./QDialog.fca193fb.js";import{C as x}from"./ClosePopup.a95ed43d.js";var A=u({name:"QCardActions",props:{...d,vertical:Boolean},setup(o,{slots:t}){const e=m(o),r=p(()=>`q-card__actions ${e.value} q-card__actions--${o.vertical===!0?"vert column":"horiz row"}`);return()=>f("div",{class:r.value},_(t.default))}});const D={class:"text-h6"},j=C({__name:"ConfirmDialog",setup(o){const t=Q();return(e,r)=>(v(),h(q,null,{default:s(()=>[a(b,{class:"q-pa-xs"},{default:s(()=>[a(l,null,{default:s(()=>[g("div",D,B(n(t).confirm),1)]),_:1}),a(c,{inset:""}),a(l,{class:"text-body1"},{default:s(()=>[i(e.$slots,"body")]),_:3}),a(A,{align:"right"},{default:s(()=>[S(a(w,{flat:"",label:n(t).cancel},null,8,["label"]),[[x]]),i(e.$slots,"confirmButton")]),_:3})]),_:3})]),_:3}))}});export{j as _};