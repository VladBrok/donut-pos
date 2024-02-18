import{d as P,a as U,h as m,u as M,r as n,i as O,g as r,e as f,w as l,k as t,ah as k,o as c,Q as q,n as v,f as y,t as C,b9 as A,ba as L,j as R,aZ as F,aB as j,aC as G}from"./index.075e99e0.js";import{Q as H}from"./QInput.d273f137.js";import{Q as W,a as S}from"./QTable.c43f39c8.js";import{Q as Z}from"./QRadio.ae2d98a4.js";import{u as J,C as K,B as X}from"./BigSpinner.d1dc21cc.js";import{_ as w,d as Y}from"./AddAddressModal.cf65e856.js";import{f as ee}from"./address.b5e3391c.js";import{c as V}from"./capitalize.b0e9fa3f.js";import{_ as ae}from"./ConfirmDialog.cc70875e.js";import{_ as te}from"./NoData.12d6b3be.js";import{c as le}from"./fuzzy-search.950e6fed.js";import"./use-dark.31d3c707.js";import"./focus-manager.05708ea9.js";import"./QList.71bc6962.js";import"./QSelect.a7a0c297.js";import"./QChip.1b1524a9.js";import"./QItemLabel.1245c495.js";import"./QMenu.bdb62582.js";import"./position-engine.a14d791b.js";import"./portal.7cc4eb97.js";import"./QDialog.391867d6.js";import"./focusout.65090ce5.js";import"./use-checkbox.bc20534c.js";import"./use-fullscreen.5f5cbe11.js";import"./plugin-vue_export-helper.21dcd24c.js";import"./QSpace.1aabe059.js";import"./QCardSection.d7b866b7.js";import"./on-form-validation-error.38a698e4.js";import"./QCard.da8ab5ea.js";import"./ClosePopup.3320a705.js";import"./CommonTooltip.5087a5f7.js";const oe={class:"text-weight-bold"},Pe=P({__name:"ClientAddressesPage",setup(se){const p=U(),h=m(()=>p.state.addresses.addresses),N=m(()=>le(h.value,["city","homeNumber","postalCode","street"])),x=m(()=>N.value.search(g.value)),B=m(()=>p.state.auth.user.userId),E=m(()=>[K.ADDRESSES_OF_CLIENT(B.value)]);let Q=J(E,{store:p});const o=M(),i=n(null),b=n(!1),g=n(""),d=n(!1),u=n(!1),_=n(),D=[{name:"index",label:"#",field:"index",align:"center"},{name:"city",label:o.value.city,align:"center",field:"city",format:s=>V(s)},{name:"street",label:o.value.street,align:"center",field:"street",format:s=>V(s)},{name:"homeNumber",label:o.value.homeNumber,align:"center",field:"homeNumber"},{name:"postalCode",label:o.value.postalCode,align:"center",field:"postalCode"},{name:"actions",label:"",align:"right"}],I=s=>{i.value=s},$=s=>{_.value=s,u.value=!0},z=()=>{F(i.value,"");const s=i.value.id||"";i.value=null,b.value=!0,p.commit.sync(Y({id:s})).then(()=>{j.create({type:"positive",position:"top",timeout:G,message:o.value.deleteSuccess,multiLine:!0,group:!1})}).finally(()=>{b.value=!1})};return(s,a)=>(c(),O("div",null,[r(Q)?(c(),f(X,{key:0})):(c(),f(W,{key:1,class:"q-mx-auto max-w-lg sticky-last-column-table",rows:x.value,columns:D,"row-key":"id","binary-state-sort":"","rows-per-page-label":r(o).perPage,loading:b.value,pagination:{rowsPerPage:r(L)}},{"top-right":l(()=>[t(H,{dense:"",modelValue:g.value,"onUpdate:modelValue":a[0]||(a[0]=e=>g.value=e),placeholder:r(o).search,class:"q-mr-lg q-my-sm"},{append:l(()=>[t(q,{name:"search"})]),_:1},8,["modelValue","placeholder"]),t(v,{color:"primary",icon:"add",label:r(o).addAddress,onClick:a[1]||(a[1]=e=>d.value=!0)},null,8,["label"])]),"body-cell-index":l(e=>[t(S,{props:e},{default:l(()=>[y(C(e.rowIndex+1),1)]),_:2},1032,["props"])]),"body-cell-active":l(e=>[t(S,{props:e},{default:l(()=>[t(Z,{class:"disabled-cursor-default","model-value":"true","checked-icon":"task_alt","unchecked-icon":"close",val:e.row.isActive.toString(),label:"",disable:"",color:e.row.isActive?"positive":"negative","keep-color":""},null,8,["val","color"])]),_:2},1032,["props"])]),"body-cell-actions":l(e=>[t(S,{props:e,"auto-width":""},{default:l(()=>[t(v,{flat:"",size:"md",icon:"mode_edit",color:"primary",dense:"",class:"q-mr-sm",onClick:A(T=>$(e.row),["stop"])},null,8,["onClick"]),t(v,{flat:"",size:"md",icon:"o_delete",color:"negative",dense:"",onClick:A(T=>I(e.row),["stop"])},null,8,["onClick"])]),_:2},1032,["props"])]),"no-data":l(()=>[t(te)]),_:1},8,["rows","rows-per-page-label","loading","pagination"])),t(ae,{"model-value":!!i.value,"onUpdate:modelValue":a[2]||(a[2]=e=>i.value=null)},{body:l(()=>[y(C(r(o).confirmAddressDelete)+" ",1),R("span",oe,'"'+C(r(ee)(i.value))+'"',1),y("? ")]),confirmButton:l(()=>[t(v,{flat:"",label:r(o).deleteButton,color:"negative",onClick:z},null,8,["label"])]),_:1},8,["model-value"]),u.value?(c(),f(w,{key:2,modelValue:u.value,"onUpdate:modelValue":a[3]||(a[3]=e=>u.value=e),"original-address":_.value,"submit-yourself":"",onSubmit:a[4]||(a[4]=e=>u.value=!1)},null,8,["modelValue","original-address"])):k("",!0),d.value?(c(),f(w,{key:3,modelValue:d.value,"onUpdate:modelValue":a[5]||(a[5]=e=>d.value=e),"submit-yourself":"",onSubmit:a[6]||(a[6]=e=>d.value=!1)},null,8,["modelValue"])):k("",!0)]))}});export{Pe as default};
