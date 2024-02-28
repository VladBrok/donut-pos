import{d as N,a as A,g as u,u as S,r as p,H as E,i as x,f,c as h,w as a,ba as w,bK as C,o as g,k as i,Q,e as B,t as I}from"./index.7ae99152.js";import{Q as T}from"./QInput.23cad58c.js";import{Q as q,a as m}from"./QTable.806a36c5.js";import{Q as v}from"./QRadio.d90b6b7b.js";import{u as R,C as L,B as U}from"./BigSpinner.eadc8dfc.js";import{a as D}from"./date.b6f3ce26.js";import{f as H}from"./phone.158664be.js";import{_ as W}from"./NoData.23fba9a4.js";import"./use-dark.4188ae36.js";import"./focus-manager.05708ea9.js";import"./QList.7aa0273e.js";import"./QSelect.acebc22b.js";import"./QChip.f4965b7b.js";import"./QItemLabel.4ac02820.js";import"./QMenu.bb27081a.js";import"./position-engine.4a6e0398.js";import"./portal.0d408b48.js";import"./QDialog.8b440e78.js";import"./focusout.54881aad.js";import"./use-checkbox.5ea7ad8e.js";import"./use-fullscreen.b59e900c.js";import"./plugin-vue_export-helper.21dcd24c.js";import"./dayjs.min.78c0669c.js";const ue=N({__name:"AdminClients",setup(G){const s=A(),k=u(()=>s.state.clients.clientsPage),_=u(()=>[L.CLIENTS]);let c=R(_,{store:s});const l=S(),r=p(""),n=p({page:1,rowsPerPage:w,rowsNumber:w}),d=p(!1),y=u(()=>[{name:"index",label:"#",field:"index",align:"center"},{name:"firstName",label:l.value.firstName,align:"center",field:"firstName"},{name:"lastName",label:l.value.lastName,align:"center",field:"lastName"},{name:"registeredAt",label:l.value.registeredAt,align:"center",field:"registeredAt",format:o=>D(o)},{name:"email",label:l.value.email,align:"center",field:"email"},{name:"isEmailVerified",label:l.value.isEmailVerified,align:"center",field:"isEmailVerified"},{name:"phone",label:l.value.phone,align:"center",field:"phone",format:o=>o?H(o):"-"},{name:"isPhoneVerified",label:l.value.isPhoneVerified,align:"center",field:"isPhoneVerified"},{name:"isAnonymous",label:l.value.isAnonymous,align:"center",field:"isAnonymous"}]),P=E(c,()=>{c.value||(n.value.rowsNumber=s.state.clients.totalClients,P())}),V=({pagination:{page:o}})=>{var t;d.value=!0,s.commit.sync(C({page:o,search:((t=r.value)==null?void 0:t.trim())||void 0})).then(()=>{n.value.page=o,n.value.rowsNumber=s.state.clients.totalClients}).finally(()=>{d.value=!1})};return(o,t)=>(g(),x("div",null,[f(c)?(g(),h(U,{key:0})):(g(),h(q,{key:1,class:"q-mx-auto max-w-xl",rows:k.value,columns:y.value,"row-key":"id","rows-per-page-label":f(l).perPage,loading:d.value,"rows-per-page-options":[],filter:r.value,pagination:n.value,"onUpdate:pagination":t[1]||(t[1]=e=>n.value=e),onRequest:V},{"top-right":a(()=>[i(T,{dense:"",modelValue:r.value,"onUpdate:modelValue":t[0]||(t[0]=e=>r.value=e),placeholder:f(l).search,debounce:"500",class:"q-mr-lg q-my-sm"},{append:a(()=>[i(Q,{name:"search"})]),_:1},8,["modelValue","placeholder"])]),"body-cell-index":a(e=>[i(m,{props:e},{default:a(()=>[B(I(e.rowIndex+1),1)]),_:2},1032,["props"])]),"body-cell-isEmailVerified":a(e=>[i(m,{props:e},{default:a(()=>[i(v,{class:"disabled-cursor-default","model-value":"true","checked-icon":"task_alt","unchecked-icon":"close",val:e.row.isEmailVerified.toString(),label:"",disable:"",color:e.row.isEmailVerified?"positive":"negative","keep-color":""},null,8,["val","color"])]),_:2},1032,["props"])]),"body-cell-isPhoneVerified":a(e=>[i(m,{props:e},{default:a(()=>[i(v,{class:"disabled-cursor-default","model-value":"true","checked-icon":"task_alt","unchecked-icon":"close",val:e.row.isPhoneVerified.toString(),label:"",disable:"",color:e.row.isPhoneVerified?"positive":"negative","keep-color":""},null,8,["val","color"])]),_:2},1032,["props"])]),"body-cell-isAnonymous":a(e=>[i(m,{props:e},{default:a(()=>{var b;return[i(v,{class:"disabled-cursor-default","model-value":"true","checked-icon":"task_alt","unchecked-icon":"close",val:(b=e.row.isAnonymous)==null?void 0:b.toString(),label:"",disable:"",color:e.row.isAnonymous?"positive":"negative","keep-color":""},null,8,["val","color"])]}),_:2},1032,["props"])]),"no-data":a(()=>[i(W)]),_:1},8,["rows","columns","rows-per-page-label","loading","filter","pagination"]))]))}});export{ue as default};
