import{d as l,c as d,u as _,h as s,a as f,H as h,o as i,i as p,j as m,k as o,g as b,e as v,ac as g}from"./index.92b1981f.js";import{u as N,C as S,B as k}from"./BigSpinner.23930169.js";import{_ as x}from"./BackButton.20001037.js";import{a as B,b as w}from"./CommonFooter.8bfeea2d.js";import{_ as C}from"./OrderNumberTitle.45575d71.js";import"./plugin-vue_export-helper.21dcd24c.js";import"./QTooltip.320304f6.js";import"./position-engine.f880795b.js";import"./focus-manager.05708ea9.js";import"./QInput.7bd0947e.js";import"./use-dark.f27ed271.js";import"./NoData.b4eb18ee.js";import"./get-order-total-cost.4c90e68f.js";import"./get-order-type-icon.e7326a30.js";import"./QImg.d5d2e26d.js";import"./ProductCounter.d6f95ba1.js";import"./capitalize.b0e9fa3f.js";import"./currency.2af12bed.js";import"./date.b6f3ce26.js";import"./dayjs.min.78c0669c.js";import"./OrderView.f2a1e3c0.js";import"./QCard.05af6174.js";import"./PaymentMethodsModal.85b6b47c.js";import"./QSpace.c26d846a.js";import"./QCardSection.6b30cd69.js";import"./QDialog.cd420016.js";import"./focusout.ff3e1aa2.js";import"./ClosePopup.0403f3f3.js";import"./browser.1a1bd576.js";import"./QItemLabel.e8e8f6f6.js";import"./QList.8f8ed760.js";import"./on-form-validation-error.f0562acd.js";import"./QBtnDropdown.270a56f3.js";import"./QMenu.27788fe4.js";import"./address.94d37a80.js";import"./phone.158664be.js";const y={class:"bg-gray-lightest min-height-window column justify-between"},E={class:"q-pa-md q-mb-xl"},R={class:"q-mx-auto max-w-lg"},$={key:1},q={class:"text-h4"},hr=l({__name:"ClientSingleOrder",setup(V){const a=d();_();const c=s(()=>a.currentRoute.value.params.orderNumber),r=s(()=>n.state.orders.order),n=f(),u=s(()=>{var e;return[S.ORDER_SINGLE((e=c.value)==null?void 0:e.toString())]});let t=N(u,{store:n});return h(t,()=>{!t.value&&r.value==null&&a.push("/404")}),(e,j)=>(i(),p("div",y,[m("div",E,[m("div",R,[o(x),b(t)?(i(),v(k,{key:0})):r.value?(i(),p("div",$,[m("h1",q,[o(C,{"order-number":r.value.orderNumber},null,8,["order-number"])]),o(B,{order:r.value,"full-screen":""},null,8,["order"])])):g("",!0)])]),o(w)]))}});export{hr as default};
