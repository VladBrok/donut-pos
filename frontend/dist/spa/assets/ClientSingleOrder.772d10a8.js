import{d as l,c as _,u as d,h as i,a as f,H as h,i as n,j as s,k as o,g as b,e as v,ah as g,o as m}from"./index.a56c0b25.js";import{u as N,C as S,B as k}from"./BigSpinner.09969e17.js";import{_ as x}from"./BackButton.e8fa83a7.js";import{_ as B,a as w}from"./CommonFooter.7c7756e3.js";import{_ as C}from"./OrderNumberTitle.fcac5f88.js";import"./plugin-vue_export-helper.21dcd24c.js";import"./CommonTooltip.c95e823b.js";import"./position-engine.a0b2c5d1.js";import"./focus-manager.05708ea9.js";import"./portal.658bf94a.js";import"./QInput.886048bb.js";import"./use-dark.deeb5c40.js";import"./NoData.9c6b1f73.js";import"./get-order-total-cost.1b7d98d1.js";import"./get-order-type-icon.83576e31.js";import"./QImg.8865fb5f.js";import"./ProductCounter.bb5c58f8.js";import"./capitalize.b0e9fa3f.js";import"./currency.2af12bed.js";import"./date.b6f3ce26.js";import"./dayjs.min.78c0669c.js";import"./OrderView.5e8c0f51.js";import"./QCard.eebcef64.js";import"./PaymentMethodsModal.64554c3b.js";import"./QSpace.2b4ffd3c.js";import"./QCardSection.c5c63ce7.js";import"./QDialog.379e75b8.js";import"./focusout.b8fe2152.js";import"./ClosePopup.2e36ed16.js";import"./ClickableCardItem.b364387f.js";import"./QItemLabel.f4f73baf.js";import"./QList.f52615f8.js";import"./browser.1a1bd576.js";import"./on-form-validation-error.04ef1312.js";import"./QBtnDropdown.49469e3e.js";import"./QMenu.1c86b734.js";import"./address.b5e3391c.js";import"./LogoImage.3d1f27f8.js";import"./phone.158664be.js";const y={class:"bg-gray-lightest min-height-window column justify-between"},E={class:"q-pa-md q-mb-xl"},R={class:"q-mx-auto max-w-lg"},$={key:1},q={class:"text-h4"},gr=l({__name:"ClientSingleOrder",setup(V){const a=_();d();const c=i(()=>a.currentRoute.value.params.orderNumber),r=i(()=>p.state.orders.order),p=f(),u=i(()=>{var e;return[S.ORDER_SINGLE((e=c.value)==null?void 0:e.toString())]});let t=N(u,{store:p});return h(t,()=>{!t.value&&r.value==null&&a.push("/404")}),(e,j)=>(m(),n("div",y,[s("div",E,[s("div",R,[o(x),b(t)?(m(),v(k,{key:0})):r.value?(m(),n("div",$,[s("h1",q,[o(C,{"order-number":r.value.orderNumber},null,8,["order-number"])]),o(B,{order:r.value,"full-screen":""},null,8,["order"])])):g("",!0)])]),o(w)]))}});export{gr as default};
