import{d as l,c as _,u as d,h as i,a as f,H as h,i as n,j as s,k as o,g as b,e as v,ah as g,o as m}from"./index.e7dff7f9.js";import{u as N,C as S,B as k}from"./BigSpinner.c880dff8.js";import{_ as x}from"./BackButton.f079da3a.js";import{_ as B,a as w}from"./CommonFooter.196d16b8.js";import{_ as C}from"./OrderNumberTitle.502cc1c9.js";import"./plugin-vue_export-helper.21dcd24c.js";import"./QTooltip.e9d5c583.js";import"./position-engine.c971a6c8.js";import"./focus-manager.05708ea9.js";import"./portal.e6ae3f7c.js";import"./QInput.5e8659ec.js";import"./use-dark.e86b84e1.js";import"./NoData.f1dffd19.js";import"./get-order-total-cost.3dedab63.js";import"./get-order-type-icon.a6a0a7c4.js";import"./QImg.dbf7d16b.js";import"./ProductCounter.23d05a5f.js";import"./capitalize.b0e9fa3f.js";import"./currency.2af12bed.js";import"./date.b6f3ce26.js";import"./dayjs.min.78c0669c.js";import"./OrderView.a4e61539.js";import"./QCard.d6442979.js";import"./PaymentMethodsModal.be9899b3.js";import"./QSpace.fa297582.js";import"./QCardSection.0cb8721b.js";import"./QDialog.d42ee4cd.js";import"./focusout.670f670d.js";import"./ClosePopup.003c9d37.js";import"./ClickableCardItem.3c024788.js";import"./QItemLabel.86a2b9d8.js";import"./QList.8a91291d.js";import"./browser.1a1bd576.js";import"./on-form-validation-error.58d560de.js";import"./QBtnDropdown.6e876aa8.js";import"./QMenu.40dfec20.js";import"./address.94d37a80.js";import"./LogoImage.0dea3366.js";import"./phone.158664be.js";const y={class:"bg-gray-lightest min-height-window column justify-between"},E={class:"q-pa-md q-mb-xl"},R={class:"q-mx-auto max-w-lg"},$={key:1},q={class:"text-h4"},gr=l({__name:"ClientSingleOrder",setup(V){const a=_();d();const c=i(()=>a.currentRoute.value.params.orderNumber),r=i(()=>p.state.orders.order),p=f(),u=i(()=>{var e;return[S.ORDER_SINGLE((e=c.value)==null?void 0:e.toString())]});let t=N(u,{store:p});return h(t,()=>{!t.value&&r.value==null&&a.push("/404")}),(e,j)=>(m(),n("div",y,[s("div",E,[s("div",R,[o(x),b(t)?(m(),v(k,{key:0})):r.value?(m(),n("div",$,[s("h1",q,[o(C,{"order-number":r.value.orderNumber},null,8,["order-number"])]),o(B,{order:r.value,"full-screen":""},null,8,["order"])])):g("",!0)])]),o(w)]))}});export{gr as default};
