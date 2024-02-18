import{Q}from"./QInput.ee3e8437.js";import{Q as U}from"./QCardSection.189278d2.js";import{Q as x}from"./QCard.d8a05122.js";import{d as A,u as N,a as R,c as T,r as d,h as v,bh as V,i as I,k as l,g as a,e as _,w as g,aB as C,aE as M,aC as q,o as b,bi as y,j as w,n as S}from"./index.3586e908.js";import{Q as L,o as D}from"./on-form-validation-error.c08fb927.js";import{u as O,C as H,B as F}from"./BigSpinner.7feebcdf.js";import{u as G,c as $}from"./dish-categories.f1b44177.js";import{_ as j}from"./BackButton.f9732785.js";import{b as z,_ as X}from"./blob-to-base64.799ee74a.js";import"./use-dark.6459b50b.js";import"./focus-manager.05708ea9.js";import"./plugin-vue_export-helper.21dcd24c.js";import"./CommonTooltip.66bf7648.js";import"./position-engine.8c9a155e.js";import"./portal.ab0cd572.js";import"./QImg.34cb1bf2.js";import"./QChip.4061286d.js";const Y={class:"max-w-sm q-mx-auto"},J={class:"row justify-end q-gutter-sm q-mt-md"},fe=A({__name:"AdminCreateUpdateDishCategory",setup(K){const t=N(),u=R(),n=T(),f=d(!1),i=d(""),m=d(""),c=d(),p=v(()=>n.currentRoute.value.params.id),s=v(()=>p.value?u.state.dishCategories.categories.find(r=>r.id===p.value):void 0),E=v(()=>p.value&&!s.value?[H.DISH_CATEGORIES]:[]);let h=O(E,{store:u});const k=V(()=>{s.value?(i.value=s.value.name,m.value=s.value.imageUrl,k()):p.value&&u.state.dishCategories.categories.length&&n.push("/404")},{flush:"post"}),B=async()=>{let r="";try{m.value&&c.value&&(r=await z(c.value))}catch{C.create({type:"negative",position:"top",timeout:M,message:t.value.imageCorrupted,multiLine:!0,group:!1});return}f.value=!0,u.commit.sync(s.value?G({id:s.value.id,name:i.value,imageBase64:r}):$({name:i.value,imageBase64:r})).then(()=>{C.create({type:"positive",position:"top",timeout:q,message:s.value?t.value.updateSuccess:t.value.createSuccess,multiLine:!0,group:!1}),n.push("/admin/dish-categories")}).finally(()=>{f.value=!1})};return(r,o)=>(b(),I("div",Y,[l(j),a(h)?(b(),_(F,{key:0})):(b(),_(L,{key:1,onSubmit:B,onValidationError:a(D)},{default:g(()=>[l(x,{class:"q-pa-md"},{default:g(()=>[l(U,{class:"q-gutter-lg"},{default:g(()=>[l(X,{url:m.value,"onUpdate:url":o[0]||(o[0]=e=>m.value=e),file:c.value,"onUpdate:file":o[1]||(o[1]=e=>c.value=e)},null,8,["url","file"]),l(Q,{modelValue:i.value,"onUpdate:modelValue":o[2]||(o[2]=e=>i.value=e),modelModifiers:{trim:!0},"stack-label":"",label:`${a(t).categoryNameLabel} *`,"lazy-rules":"",type:"text",rules:[e=>!!e&&e.length>0||a(t).fieldRequired,e=>e.length<=a(y)||a(t).maxLength({max:a(y)})]},null,8,["modelValue","label","rules"])]),_:1})]),_:1}),w("div",J,[l(S,{label:a(t).cancel,onClick:o[3]||(o[3]=()=>a(n).back()),color:"dark",flat:""},null,8,["label"]),l(S,{label:a(t).save,loading:f.value,type:"submit",color:"primary"},null,8,["label","loading"])])]),_:1},8,["onValidationError"]))]))}});export{fe as default};