import{d as S,h as m,u as $,a as x,r as N,o as t,e as s,w as a,g as c,bV as V,cm as B,f as k,t as y,n as b,i as w,k as d,j as f,ag as C,cb as I,ai as Q,ah as q}from"./index.3f3b8c57.js";import{u as E,C as R,B as U}from"./BigSpinner.f02a38f1.js";import{Q as D}from"./QTooltip.64d8fdeb.js";import{Q as O}from"./QInput.af205288.js";import{g as A}from"./get-order-total-cost.0ab55512.js";import{_ as M}from"./OrderNumberTitle.bf4db84c.js";import{_ as T}from"./OrderView.fe1bc0bf.js";import{_ as F}from"./PaymentMethodsModal.49b92ce9.js";import{f as j,m as G}from"./address.94d37a80.js";import{_ as L}from"./NoData.f3f3f67f.js";import"./plugin-vue_export-helper.21dcd24c.js";import"./position-engine.8a5cdfb5.js";import"./focus-manager.05708ea9.js";import"./use-dark.fca62a05.js";import"./focusout.8d369a05.js";import"./QCard.bbe847d6.js";import"./currency.2af12bed.js";import"./QSpace.b6962a17.js";import"./QCardSection.1779170a.js";import"./QDialog.8f914458.js";import"./ClosePopup.880cf5c6.js";import"./browser.1a1bd576.js";import"./QImg.bc00f4b6.js";import"./QItemLabel.b85da9a3.js";import"./QList.cda24842.js";import"./on-form-validation-error.a634981b.js";import"./capitalize.b0e9fa3f.js";const P=S({__name:"CourierOrderStatusButton",props:{order:{}},emits:["statusUpdated"],setup(g,{emit:i}){const u=g,r=m(()=>u.order),e=i,p=$(),n=x(),o=N(!1),l=m(()=>r.value.deliveringDate?"positive":"primary"),v=m(()=>r.value.deliveringDate?p.value.finishDelivering:p.value.startDelivering);function _(){let h=null;o.value=!0,r.value.deliveringDate?h=n.commit.sync(V({orderId:r.value.id,isEmployee:!0})):h=n.commit.sync(B({orderId:r.value.id})),h.finally(()=>{o.value=!1,e("statusUpdated")})}return(h,Y)=>(t(),s(c(b),{color:l.value,loading:o.value,onClick:_},{default:a(()=>[k(y(v.value),1)]),_:1},8,["color","loading"]))}}),H={class:"full-height column"},z={class:"flex-grow column justify-between"},J={class:"text-dark text-h6 text-weight-bold"},K={class:"row gap-sm q-py-xs"},W=S({__name:"CourierOrderView",props:{order:{}},setup(g){const i=g,u=$();x();const r=N(!1),e=m(()=>i.order);function p(){var o;(o=window==null?void 0:window.open(`http://www.google.com/maps/place?q=${G(e.value.address)}`,"_blank"))==null||o.focus()}function n(){var o;window==null||window.open(`tel:${(o=e.value.client)==null?void 0:o.phone}`)}return(o,l)=>(t(),w("div",null,[(t(),s(T,{key:e.value.id,"has-content":"","card-padding":"","apply-shadow":"","full-content-height":"","order-type":e.value.type},{content:a(()=>{var v;return[f("div",H,[d(M,{"order-number":e.value.orderNumber,class:"text-h6 q-mb-sm","is-link":""},null,8,["order-number"]),f("div",z,[f("div",null,[d(O,{"model-value":c(j)(e.value.address),readonly:"","stack-label":"",type:"text",class:"q-mb-md w-fit"},{after:a(()=>[d(b,{round:"",dense:"",icon:"location_on",color:"primary",onClick:p},{default:a(()=>[d(D,null,{default:a(()=>[k(y(c(u).showOnMap),1)]),_:1})]),_:1})]),_:1},8,["model-value"]),e.value.employee?(t(),s(O,{key:0,"model-value":(v=e.value.client)==null?void 0:v.phone,readonly:"","stack-label":"",type:"text",class:"q-mb-md w-fit","label-slot":""},{label:a(()=>{var _;return[f("p",null,[f("span",J,y((_=e.value.client)==null?void 0:_.firstName),1)])]}),after:a(()=>[d(b,{round:"",dense:"",icon:"call",color:"secondary",onClick:n},{default:a(()=>[d(D,null,{default:a(()=>[k(y(c(u).callClient),1)]),_:1})]),_:1})]),_:1},8,["model-value"])):C("",!0)]),f("div",K,[e.value.paidDate||!e.value.deliveringDate?(t(),s(P,{key:0,order:e.value},null,8,["order"])):C("",!0),!e.value.paidDate&&e.value.employee?(t(),s(b,{key:1,color:"primary",onClick:l[0]||(l[0]=_=>r.value=!0)},{default:a(()=>[k(y(c(u).pay),1)]),_:1})):C("",!0)])])])]}),_:1},8,["order-type"])),d(F,{modelValue:r.value,"onUpdate:modelValue":l[1]||(l[1]=v=>r.value=v),"order-number":e.value.orderNumber,"order-id":e.value.id,"order-type":e.value.type,"total-cost":c(A)(e.value)},null,8,["modelValue","order-number","order-id","order-type","total-cost"])]))}}),X={key:1},De=S({__name:"CourierOrdersPage",setup(g){const i=x(),u=m(()=>i.state.auth.user.userId),r=m(()=>i.state.orders.ordersForCourier.filter(n=>!n.employee||n.employee.id===u.value)),e=m(()=>[R.ORDERS_FOR_COURIERS]),p=E(e,{store:i});return(n,o)=>(t(),w("div",null,[c(p)?(t(),s(U,{key:0})):(t(),w("div",X,[r.value.length?(t(),s(I,{key:0,tag:"div",name:"fade",class:"card-grid-lg"},{default:a(()=>[(t(!0),w(Q,null,q(r.value,l=>(t(),s(W,{key:l.id,order:l},null,8,["order"]))),128))]),_:1})):(t(),s(L,{key:1}))]))]))}});export{De as default};