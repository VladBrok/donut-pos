import{d as l,c as _,u as d,h as i,a as f,H as h,i as n,j as s,k as o,g as b,e as v,ah as g,o as m}from"./index.20f37243.js";import{u as N,C as S,B as k}from"./BigSpinner.20c85f3c.js";import{_ as x}from"./BackButton.597d5e78.js";import{_ as B,a as w}from"./CommonFooter.83f407ad.js";import{_ as C}from"./OrderNumberTitle.54f19d8b.js";import"./plugin-vue_export-helper.21dcd24c.js";import"./CommonTooltip.4f0cd41d.js";import"./position-engine.4761f5e1.js";import"./focus-manager.05708ea9.js";import"./portal.f25b5062.js";import"./QInput.d2bf4b4c.js";import"./use-dark.670a0b2a.js";import"./NoData.0652d92a.js";import"./get-order-total-cost.6d4ed535.js";import"./get-order-type-icon.3b048391.js";import"./QImg.23e7e293.js";import"./ProductCounter.4dd4f368.js";import"./capitalize.b0e9fa3f.js";import"./currency.2af12bed.js";import"./date.b6f3ce26.js";import"./dayjs.min.78c0669c.js";import"./OrderView.72371ba4.js";import"./QCard.4f0de502.js";import"./PaymentMethodsModal.5129ceaa.js";import"./QSpace.b02b7570.js";import"./QCardSection.8c2ff0bc.js";import"./QDialog.fca193fb.js";import"./focusout.45e9110f.js";import"./ClosePopup.a95ed43d.js";import"./ClickableCardItem.0f7e87ea.js";import"./QItemLabel.0d0eed14.js";import"./QList.ff3beee4.js";import"./browser.1a1bd576.js";import"./on-form-validation-error.c4beaa36.js";import"./QBtnDropdown.2e291f2d.js";import"./QMenu.514e7174.js";import"./address.b5e3391c.js";import"./LogoImage.84c4ae04.js";import"./phone.158664be.js";const y={class:"bg-gray-lightest min-height-window column justify-between"},E={class:"q-pa-md q-mb-xl"},R={class:"q-mx-auto max-w-lg"},$={key:1},q={class:"text-h4"},gr=l({__name:"ClientSingleOrder",setup(V){const a=_();d();const c=i(()=>a.currentRoute.value.params.orderNumber),r=i(()=>p.state.orders.order),p=f(),u=i(()=>{var e;return[S.ORDER_SINGLE((e=c.value)==null?void 0:e.toString())]});let t=N(u,{store:p});return h(t,()=>{!t.value&&r.value==null&&a.push("/404")}),(e,j)=>(m(),n("div",y,[s("div",E,[s("div",R,[o(x),b(t)?(m(),v(k,{key:0})):r.value?(m(),n("div",$,[s("h1",q,[o(C,{"order-number":r.value.orderNumber},null,8,["order-number"])]),o(B,{order:r.value,"full-screen":""},null,8,["order"])])):g("",!0)])]),o(w)]))}});export{gr as default};
