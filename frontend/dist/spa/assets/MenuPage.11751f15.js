import{d as O,a as V,h as n,r as u,u as $,i as l,j as h,g,e as c,k as m,w as k,aj as _,ai as C,o as a,ah as N,ce as Q,bO as U,Q as z}from"./index.e7dff7f9.js";import{Q as A}from"./QInput.5e8659ec.js";import{Q as R}from"./QPageSticky.032d91aa.js";import{u as q,C as y,B as F}from"./BigSpinner.c880dff8.js";import{_ as M,a as H,b as L}from"./DishDetailsModal.9a36d217.js";import{_ as j}from"./FilterPill.03df4616.js";import{_ as G}from"./NoData.f1dffd19.js";import{c as P}from"./fuzzy-search.950e6fed.js";const T={key:1},J={class:"bg-gray-lightest q-py-md q-px-md w-100"},K={class:"q-mb-lg mt-lg-xl gap-sm row"},W={key:0,class:"q-mx-auto card-grid"},X={key:1},ie=O({__name:"MenuPage",setup(Y){const o=V(),I=n(()=>o.state.dishes.dishes),S=n(()=>[{id:"all",imageUrl:Q,name:f.value.allMenu},...o.state.dishCategories.categories]),i=u("all"),D=n(()=>P(I.value,["name","category.name","price","weight"])),v=n(()=>D.value.search(r.value||"").filter(t=>{var s;return i.value==="all"||((s=t.category)==null?void 0:s.id)===i.value})),b=n(()=>[y.DISHES,y.DISH_CATEGORIES]);let x=q(b,{store:o});const f=$(),r=u(null),d=u(null),w=u(),B=t=>{i.value=t},E=(t,s)=>{const e={cookedDate:"",cookingDate:"",deliveredDate:"",status:"",count:1,dishIdInOrder:U(),...s,modifications:[]};L(o,e,t)};return(t,s)=>(a(),l(_,null,[h("div",null,[g(x)?(a(),c(F,{key:0})):(a(),l("div",T,[m(R,{position:"top",expand:"",style:{"z-index":"10"}},{default:k(()=>[h("div",J,[m(A,{class:"bg-white max-w-sm rounded-borders",outlined:"",modelValue:r.value,"onUpdate:modelValue":s[0]||(s[0]=e=>r.value=e),placeholder:g(f).searchDishes,clearable:""},{append:k(()=>{var e;return[(e=r.value)!=null&&e.length?N("",!0):(a(),c(z,{key:0,name:"search"}))]}),_:1},8,["modelValue","placeholder"])])]),_:1}),h("div",K,[(a(!0),l(_,null,C(S.value,e=>(a(),c(j,{key:e.id,"image-url":e.imageUrl,id:e.id,name:e.name,"selected-id":i.value,onClick:p=>B(e.id)},null,8,["image-url","id","name","selected-id","onClick"]))),128))]),v.value.length?(a(),l("div",W,[(a(!0),l(_,null,C(v.value,e=>(a(),c(H,{dish:e,key:e.id,ref_for:!0,ref_key:"dishRefs",ref:w,onOpenDetailsClick:p=>d.value=e,onAddClick:p=>E(p,e)},null,8,["dish","onOpenDetailsClick","onAddClick"]))),128))])):(a(),l("div",X,[m(G)]))]))]),m(M,{"model-value":Boolean(d.value),"onUpdate:modelValue":s[1]||(s[1]=e=>d.value=null),dish:d.value},null,8,["model-value","dish"])],64))}});export{ie as _};
