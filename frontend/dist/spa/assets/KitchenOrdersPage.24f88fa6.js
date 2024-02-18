import{p as E,h as v,q as I,T as U,v as L,O as V,d as S,u as w,a as O,r as D,e as f,w as p,g as d,ci as A,cj as P,o as a,f as R,t as j,n as K,k as s,j as F,Q as H,az as C,ah as N,i as g,ai as $,aj as T,cc as q,ck as G}from"./index.a56c0b25.js";import{B as Q,u as Y,C as J}from"./BigSpinner.09969e17.js";import{Q as k}from"./QInput.886048bb.js";import{Q as M,_ as W}from"./NoData.9c6b1f73.js";import{u as X,a as Z}from"./use-dark.deeb5c40.js";import{k as x,n as ee}from"./position-engine.a0b2c5d1.js";import{_ as re}from"./DishDetailsModal.35740c66.js";import{g as oe,_ as ae}from"./get-order-type-icon.83576e31.js";import{_ as te}from"./OrderNumberTitle.fcac5f88.js";import{_ as se}from"./OrderView.5e8c0f51.js";import"./plugin-vue_export-helper.21dcd24c.js";import"./focus-manager.05708ea9.js";import"./portal.658bf94a.js";import"./QSpace.2b4ffd3c.js";import"./QCardSection.c5c63ce7.js";import"./QCard.eebcef64.js";import"./QDialog.379e75b8.js";import"./focusout.b8fe2152.js";import"./ClosePopup.2e36ed16.js";import"./CommonTooltip.c95e823b.js";import"./sanitize-html.328c4bb3.js";import"./QImg.8865fb5f.js";import"./currency.2af12bed.js";import"./ProductCounter.bb5c58f8.js";import"./capitalize.b0e9fa3f.js";var ne=E({name:"QInnerLoading",props:{...X,...x,showing:Boolean,color:String,size:{type:[String,Number],default:42},label:String,labelClass:String,labelStyle:[String,Array,Object]},setup(o,{slots:n}){const e=L(),u=Z(o,e.proxy.$q),{transitionProps:l,transitionStyle:y}=ee(o),r=v(()=>"q-inner-loading absolute-full column flex-center"+(u.value===!0?" q-inner-loading--dark":"")),m=v(()=>"q-inner-loading__label"+(o.labelClass!==void 0?` ${o.labelClass}`:""));function c(){const i=[I(V,{size:o.size,color:o.color})];return o.label!==void 0&&i.push(I("div",{class:m.value,style:o.labelStyle},[o.label])),i}function b(){return o.showing===!0?I("div",{class:r.value,style:y.value},n.default!==void 0?n.default():c()):null}return()=>I(U,l.value,b)}});const le=S({__name:"DishInOrderStatusButton",props:{order:{},dishInOrder:{}},emits:["statusUpdated"],setup(o,{emit:n}){const e=o,u=n,l=w(),y=O(),r=D(!1),m=v(()=>e.dishInOrder.status?e.dishInOrder.status==="cooking"?"positive":"grey":"primary"),c=v(()=>e.dishInOrder.status?e.dishInOrder.status==="cooking"?l.value.finishCooking:l.value.done:l.value.startCooking);function b(){var h,t;let i=null;r.value=!0,e.dishInOrder.status?i=y.commit.sync(P({orderId:e.order.id||"",orderNumber:e.order.orderNumber||"",dishIdInOrder:e.dishInOrder.dishIdInOrder||""})):i=y.commit.sync(A({employeeId:((h=e.order.employee)==null?void 0:h.id)||"",clientId:((t=e.order.client)==null?void 0:t.id)||"",orderId:e.order.id||"",orderNumber:e.order.orderNumber||"",dishIdInOrder:e.dishInOrder.dishIdInOrder||""})),i.finally(()=>{r.value=!1,u("statusUpdated")})}return(i,h)=>(a(),f(d(K),{color:m.value,disable:m.value==="grey",loading:r.value,onClick:b},{default:p(()=>[R(j(c.value),1)]),_:1},8,["color","disable","loading"]))}}),ie=S({__name:"KitchenOrderView",props:{order:{}},setup(o){const n=o,e=w(),u=D(!1),l=O();function y(){n.order.dishes.every(c=>c.cookedDate)&&(u.value=!0,l.commit.sync(G({orderId:n.order.id})).finally(()=>{u.value=!1}))}return(r,m)=>(a(),f(se,{key:r.order.id,"has-content":"","card-padding":"","apply-shadow":"","order-type":r.order.type},{content:p(()=>{var c,b,i,h;return[s(te,{"order-number":r.order.orderNumber,class:"text-h6 q-mb-sm","copy-button-size":"sm"},null,8,["order-number"]),F("div",null,[s(k,{"stack-label":"",readonly:"","model-value":(c=d(e)[`orderType_${r.order.type}`])==null?void 0:c.toString(),type:"text",label:d(e).orderTypeLabel,class:"q-mb-md"},{before:p(()=>[s(H,{name:d(oe)(r.order.type)},null,8,["name"])]),_:1},8,["model-value","label"]),r.order.type===d(C).DINE_IN?(a(),f(k,{key:0,"model-value":((b=r.order.table)==null?void 0:b.number)||"-",readonly:"","stack-label":"",label:`${d(e).tableNumberLabel}`,"lazy-rules":"",type:"text",class:"q-mb-md"},null,8,["model-value","label"])):N("",!0),r.order.type===d(C).DINE_IN?(a(),f(k,{key:1,"model-value":((i=r.order.employee)==null?void 0:i.lastName)+" "+((h=r.order.employee)==null?void 0:h.firstName),readonly:"","stack-label":"",label:`${d(e).waiterName}`,"lazy-rules":"",type:"text",class:"q-mb-md"},null,8,["model-value","label"])):N("",!0),s(k,{"model-value":r.order.comment||"-","stack-label":"",label:`${d(e).commentLabel}`,"lazy-rules":"",type:"textarea",readonly:"",rows:"1",autogrow:"",class:"q-mb-md"},null,8,["model-value","label"])]),s(q,{tag:"div",name:"fade"},{default:p(()=>[(a(!0),g(T,null,$(r.order.dishes,t=>(a(),g("div",{key:t.dishIdInOrder},[s(ae,{dish:t,count:t.count,"dish-in-order":t,modifications:t.modifications.map(_=>({count:_.count,modification:_})),"view-only":"","for-kitchen":"","hide-price":""},{modal:p(({modalOpen:_,updateModelOpen:B})=>[s(re,{dish:t,"model-value":_,"onUpdate:modelValue":z=>B(z),count:t.count,"view-only":""},null,8,["dish","model-value","onUpdate:modelValue","count"])]),actions:p(()=>[s(le,{order:r.order,"dish-in-order":t,onStatusUpdated:y},null,8,["order","dish-in-order"])]),_:2},1032,["dish","count","dish-in-order","modifications"]),s(M)]))),128))]),_:1}),s(ne,{showing:u.value},{default:p(()=>[s(Q)]),_:1},8,["showing"])]}),_:1},8,["order-type"]))}}),de={key:1},Ee=S({__name:"KitchenOrdersPage",setup(o){const n=O(),e=v(()=>[J.ORDERS_FOR_KITCHEN]),u=Y(e,{store:n}),l=v(()=>n.state.orders.ordersForKitchen);return(y,r)=>(a(),g("div",null,[d(u)?(a(),f(Q,{key:0})):(a(),g("div",de,[l.value.length?(a(),f(q,{key:0,tag:"div",name:"fade",class:"card-grid-lg"},{default:p(()=>[(a(!0),g(T,null,$(l.value,m=>(a(),f(ie,{key:m.id,order:m},null,8,["order"]))),128))]),_:1})):(a(),f(W,{key:1}))]))]))}});export{Ee as default};