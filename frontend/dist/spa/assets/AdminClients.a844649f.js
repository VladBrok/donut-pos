import{d as N,a as A,h as b,u as S,r as u,H as E,o as p,i as x,g as f,e as h,w as a,b9 as w,bJ as C,k as i,Q,f as B,t as I}from"./index.3f3b8c57.js";import{Q as T}from"./QInput.af205288.js";import{Q as q,a as m}from"./QTable.05449860.js";import{Q as g}from"./QRadio.2d62903b.js";import{u as R,C as L,B as U}from"./BigSpinner.f02a38f1.js";import{a as D}from"./date.b6f3ce26.js";import{f as H}from"./phone.158664be.js";import{_ as W}from"./NoData.f3f3f67f.js";import"./use-dark.fca62a05.js";import"./focus-manager.05708ea9.js";import"./QList.cda24842.js";import"./QSelect.dcdd87e0.js";import"./QChip.e4eb7192.js";import"./QItemLabel.b85da9a3.js";import"./QMenu.5622cc90.js";import"./position-engine.8a5cdfb5.js";import"./QDialog.8f914458.js";import"./focusout.8d369a05.js";import"./use-checkbox.a27cc2ea.js";import"./use-fullscreen.e3aaa18e.js";import"./plugin-vue_export-helper.21dcd24c.js";import"./dayjs.min.78c0669c.js";const de=N({__name:"AdminClients",setup(G){const s=A(),k=b(()=>s.state.clients.clientsPage),_=b(()=>[L.CLIENTS]);let c=R(_,{store:s});const l=S(),r=u(""),n=u({page:1,rowsPerPage:w,rowsNumber:w}),d=u(!1),y=[{name:"index",label:"#",field:"index",align:"center"},{name:"firstName",label:l.value.firstName,align:"center",field:"firstName"},{name:"lastName",label:l.value.lastName,align:"center",field:"lastName"},{name:"registeredAt",label:l.value.registeredAt,align:"center",field:"registeredAt",format:o=>D(o)},{name:"email",label:l.value.email,align:"center",field:"email"},{name:"isEmailVerified",label:l.value.isEmailVerified,align:"center",field:"isEmailVerified"},{name:"phone",label:l.value.phone,align:"center",field:"phone",format:o=>o?H(o):"-"},{name:"isPhoneVerified",label:l.value.isPhoneVerified,align:"center",field:"isPhoneVerified"},{name:"isAnonymous",label:l.value.isAnonymous,align:"center",field:"isAnonymous"}],P=E(c,()=>{c.value||(n.value.rowsNumber=s.state.clients.totalClients,P())}),V=({pagination:{page:o}})=>{var t;d.value=!0,s.commit.sync(C({page:o,search:((t=r.value)==null?void 0:t.trim())||void 0})).then(()=>{n.value.page=o,n.value.rowsNumber=s.state.clients.totalClients}).finally(()=>{d.value=!1})};return(o,t)=>(p(),x("div",null,[f(c)?(p(),h(U,{key:0})):(p(),h(q,{key:1,class:"q-mx-auto max-w-xl",rows:k.value,columns:y,"row-key":"id","rows-per-page-label":f(l).perPage,loading:d.value,"rows-per-page-options":[],filter:r.value,pagination:n.value,"onUpdate:pagination":t[1]||(t[1]=e=>n.value=e),onRequest:V},{"top-right":a(()=>[i(T,{dense:"",modelValue:r.value,"onUpdate:modelValue":t[0]||(t[0]=e=>r.value=e),placeholder:f(l).search,debounce:"500",class:"q-mr-lg q-my-sm"},{append:a(()=>[i(Q,{name:"search"})]),_:1},8,["modelValue","placeholder"])]),"body-cell-index":a(e=>[i(m,{props:e},{default:a(()=>[B(I(e.rowIndex+1),1)]),_:2},1032,["props"])]),"body-cell-isEmailVerified":a(e=>[i(m,{props:e},{default:a(()=>[i(g,{class:"disabled-cursor-default","model-value":"true","checked-icon":"task_alt","unchecked-icon":"close",val:e.row.isEmailVerified.toString(),label:"",disable:"",color:e.row.isEmailVerified?"positive":"negative","keep-color":""},null,8,["val","color"])]),_:2},1032,["props"])]),"body-cell-isPhoneVerified":a(e=>[i(m,{props:e},{default:a(()=>[i(g,{class:"disabled-cursor-default","model-value":"true","checked-icon":"task_alt","unchecked-icon":"close",val:e.row.isPhoneVerified.toString(),label:"",disable:"",color:e.row.isPhoneVerified?"positive":"negative","keep-color":""},null,8,["val","color"])]),_:2},1032,["props"])]),"body-cell-isAnonymous":a(e=>[i(m,{props:e},{default:a(()=>{var v;return[i(g,{class:"disabled-cursor-default","model-value":"true","checked-icon":"task_alt","unchecked-icon":"close",val:(v=e.row.isAnonymous)==null?void 0:v.toString(),label:"",disable:"",color:e.row.isAnonymous?"positive":"negative","keep-color":""},null,8,["val","color"])]}),_:2},1032,["props"])]),"no-data":a(()=>[i(W)]),_:1},8,["rows","rows-per-page-label","loading","filter","pagination"]))]))}});export{de as default};
