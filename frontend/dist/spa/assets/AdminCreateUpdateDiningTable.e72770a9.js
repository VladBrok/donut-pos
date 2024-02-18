import{Q as z}from"./QInput.8c2388a3.js";import{a as S,Q as h,b as v}from"./QItemLabel.838babd2.js";import{Q as M}from"./QSelect.11b1ab53.js";import{Q as U}from"./QCardSection.6e856f1f.js";import{Q as D}from"./QCard.155d0d61.js";import{d as F,u as P,a as H,c as $,r as N,h as c,bh as j,i as G,k as a,g as s,e as E,w as t,bH as O,bI as W,aB as J,aC as X,o as _,bJ as C,f,t as n,ah as Y,b1 as K,b2 as Z,j as ee,n as T}from"./index.080b44f7.js";import{Q as ae,o as te}from"./on-form-validation-error.4a94d5a9.js";import{u as le,C as B,B as se}from"./BigSpinner.aaae2762.js";import{c as oe}from"./fuzzy-search.950e6fed.js";import{_ as ie}from"./BackButton.068979ed.js";import"./use-dark.1ba26b9f.js";import"./focus-manager.05708ea9.js";import"./QChip.e0321256.js";import"./QMenu.6a41d07e.js";import"./position-engine.9a82cfe9.js";import"./portal.0d653498.js";import"./QDialog.3fe33313.js";import"./focusout.e8b87474.js";import"./plugin-vue_export-helper.21dcd24c.js";import"./CommonTooltip.5ea32f84.js";const re={class:"max-w-sm q-mx-auto"},ue={class:"row justify-end q-gutter-sm q-mt-md"},Ie=F({__name:"AdminCreateUpdateDiningTable",setup(ne){const r=P(),m=H(),b=$(),g=N(!1),d=N(""),y=c(()=>b.currentRoute.value.params.id),u=c(()=>y.value?m.state.diningTables.tables.find(o=>o.id===y.value):void 0),I=c(()=>[B.EMPLOYEES,B.DINING_TABLES]),Q=N(""),l=N(),w=c(()=>oe(m.state.employees.employees,["firstName","lastName","email"])),L=c(()=>w.value.search(Q.value).map(o=>({...o,label:o.lastName+" "+o.firstName})));let q=le(I,{store:m});const x=j(()=>{u.value?(d.value=u.value.number,l.value={...u.value.employee,label:u.value.employee.lastName+" "+u.value.employee.firstName},x()):y.value&&m.state.diningTables.tables.length&&b.push("/404")},{flush:"post"}),A=(o,i)=>{i(()=>{Q.value=o})},R=async()=>{var o,i,e,p,V,k;g.value=!0,m.commit.sync(u.value?O({table:{id:u.value.id,number:d.value,employee:{id:(o=l.value)==null?void 0:o.id,firstName:(i=l.value)==null?void 0:i.firstName,lastName:(e=l.value)==null?void 0:e.lastName}}}):W({table:{number:d.value,employee:{id:(p=l.value)==null?void 0:p.id,firstName:(V=l.value)==null?void 0:V.firstName,lastName:(k=l.value)==null?void 0:k.lastName}}})).then(()=>{J.create({type:"positive",position:"top",timeout:X,message:u.value?r.value.updateSuccess:r.value.createSuccess,multiLine:!0,group:!1}),b.push("/admin/dining-tables")}).finally(()=>{g.value=!1})};return(o,i)=>(_(),G("div",re,[a(ie),s(q)?(_(),E(se,{key:0})):(_(),E(ae,{key:1,onSubmit:R,onValidationError:s(te)},{default:t(()=>[a(D,{class:"q-pa-md"},{default:t(()=>[a(U,{class:"q-gutter-lg"},{default:t(()=>[a(z,{modelValue:d.value,"onUpdate:modelValue":i[0]||(i[0]=e=>d.value=e),modelModifiers:{trim:!0},"stack-label":"",label:`${s(r).tableNumberLabel} *`,"lazy-rules":"",type:"text",rules:[e=>!!e&&e.length>0||s(r).fieldRequired,e=>e.length<=s(C)||s(r).maxLength({max:s(C)})]},null,8,["modelValue","label","rules"]),a(M,{modelValue:l.value,"onUpdate:modelValue":i[1]||(i[1]=e=>l.value=e),"use-input":"","fill-input":"","stack-label":"",clearable:"","hide-selected":"","input-debounce":"0",options:L.value,onFilter:A,label:`${s(r).waiter} *`,rules:[e=>!!e||s(r).fieldRequired]},{selected:t(()=>[l.value?(_(),E(S,{key:0},{default:t(()=>[a(h,null,{default:t(()=>[a(v,null,{default:t(()=>{var e,p;return[f(n((e=l.value)==null?void 0:e.lastName)+" "+n((p=l.value)==null?void 0:p.firstName),1)]}),_:1}),a(v,{caption:""},{default:t(()=>{var e;return[f(n((e=l.value)==null?void 0:e.email),1)]}),_:1})]),_:1})]),_:1})):Y("",!0)]),option:t(e=>[a(S,K(Z(e.itemProps)),{default:t(()=>[a(h,null,{default:t(()=>[a(v,null,{default:t(()=>[f(n(e.opt.lastName)+" "+n(e.opt.firstName),1)]),_:2},1024),a(v,{caption:""},{default:t(()=>[f(n(e.opt.email),1)]),_:2},1024)]),_:2},1024)]),_:2},1040)]),"no-option":t(()=>[a(S,null,{default:t(()=>[a(h,null,{default:t(()=>[f(n(s(r).noResults),1)]),_:1})]),_:1})]),_:1},8,["modelValue","options","label","rules"])]),_:1})]),_:1}),ee("div",ue,[a(T,{label:s(r).cancel,onClick:i[2]||(i[2]=()=>s(b).back()),color:"dark",flat:""},null,8,["label"]),a(T,{label:s(r).save,loading:g.value,type:"submit",color:"primary"},null,8,["label","loading"])])]),_:1},8,["onValidationError"]))]))}});export{Ie as default};