import{d as B,a as C,h as n,u as Q,r as b,bm as D,o as v,i as T,g as s,e as _,w as t,k as l,Q as z,n as m,f as g,t as d,b8 as E,b9 as I,j as P,a_ as $,bA as q,aA as L,aB as M}from"./index.3f3b8c57.js";import{Q as O}from"./QInput.af205288.js";import{Q as U,a as y}from"./QTable.05449860.js";import{Q as R}from"./QRadio.2d62903b.js";import{u as F,C as j,B as G}from"./BigSpinner.f02a38f1.js";import{_ as H}from"./ConfirmDialog.7d9f2db6.js";import{_ as W}from"./NoData.f3f3f67f.js";import{a as Y}from"./date.b6f3ce26.js";import{c as J}from"./fuzzy-search.950e6fed.js";import"./use-dark.fca62a05.js";import"./focus-manager.05708ea9.js";import"./QList.cda24842.js";import"./QSelect.dcdd87e0.js";import"./QChip.e4eb7192.js";import"./QItemLabel.b85da9a3.js";import"./QMenu.5622cc90.js";import"./position-engine.8a5cdfb5.js";import"./QDialog.8f914458.js";import"./focusout.8d369a05.js";import"./use-checkbox.a27cc2ea.js";import"./use-fullscreen.e3aaa18e.js";import"./plugin-vue_export-helper.21dcd24c.js";import"./QCardSection.1779170a.js";import"./QCard.bbe847d6.js";import"./ClosePopup.880cf5c6.js";import"./dayjs.min.78c0669c.js";const K={class:"text-weight-bold"},he=B({__name:"AdminEmployees",setup(X){const c=C(),N=n(()=>c.state.employees.employees),w=n(()=>J(N.value,["firstName","lastName","email","registeredAt","role.codeName"])),S=n(()=>w.value.search(p.value)),k=n(()=>[j.EMPLOYEES]);let h=F(k,{store:c});const a=Q(),i=b(null),u=b(!1),p=b(""),A=[{name:"index",label:"#",field:"index",align:"center"},{name:"firstName",label:a.value.firstName,align:"center",field:"firstName",sortable:!0},{name:"lastName",label:a.value.lastName,align:"center",field:"lastName",sortable:!0},{name:"role",label:a.value.role,align:"center",sortable:!0,field:r=>{var o;return((o=r.role)==null?void 0:o.codeName)||D}},{name:"registeredAt",label:a.value.registeredAt,align:"center",field:"registeredAt",sortable:!0,format:r=>Y(r)},{name:"email",label:a.value.email,align:"center",field:"email",sortable:!0},{name:"isEmailVerified",label:a.value.isEmailVerified,align:"center",field:"isEmailVerified",sortable:!0},{name:"actions",label:"",align:"right"}],V=r=>{i.value=r},x=()=>{$(i.value,"");const r=i.value.id;i.value=null,u.value=!0,c.commit.sync(q({id:r})).then(()=>{L.create({type:"positive",position:"top",timeout:M,message:a.value.deleteSuccess,multiLine:!0,group:!1})}).finally(()=>{u.value=!1})};return(r,o)=>(v(),T("div",null,[s(h)?(v(),_(G,{key:0})):(v(),_(U,{key:1,class:"q-mx-auto max-w-xl sticky-last-column-table",rows:S.value,columns:A,"row-key":"id","binary-state-sort":"","rows-per-page-label":s(a).perPage,loading:u.value,pagination:{rowsPerPage:s(I)}},{"top-right":t(()=>[l(O,{dense:"",modelValue:p.value,"onUpdate:modelValue":o[0]||(o[0]=e=>p.value=e),placeholder:s(a).search,class:"q-mr-lg q-my-sm"},{append:t(()=>[l(z,{name:"search"})]),_:1},8,["modelValue","placeholder"]),l(m,{color:"primary",icon:"add",label:s(a).addEmployee,to:"/admin/employees/create"},null,8,["label"])]),"body-cell-index":t(e=>[l(y,{props:e},{default:t(()=>[g(d(e.rowIndex+1),1)]),_:2},1032,["props"])]),"body-cell-isEmailVerified":t(e=>[l(y,{props:e},{default:t(()=>[l(R,{class:"disabled-cursor-default","model-value":"true","checked-icon":"task_alt","unchecked-icon":"close",val:e.row.isEmailVerified.toString(),label:"",disable:"",color:e.row.isEmailVerified?"positive":"negative","keep-color":""},null,8,["val","color"])]),_:2},1032,["props"])]),"body-cell-actions":t(e=>[l(y,{props:e,"auto-width":""},{default:t(()=>[l(m,{flat:"",size:"md",icon:"mode_edit",color:"primary",dense:"",class:"q-mr-sm",onClick:o[1]||(o[1]=E(()=>{},["stop"])),to:`/admin/employees/update/${e.row.id}`},null,8,["to"]),l(m,{flat:"",size:"md",icon:"o_delete",color:"negative",dense:"",onClick:E(f=>V(e.row),["stop"])},null,8,["onClick"])]),_:2},1032,["props"])]),"no-data":t(()=>[l(W)]),_:1},8,["rows","rows-per-page-label","loading","pagination"])),l(H,{"model-value":!!i.value,"onUpdate:modelValue":o[2]||(o[2]=e=>i.value=null)},{body:t(()=>{var e,f;return[g(d(s(a).confirmEmployeeDelete)+" ",1),P("span",K,d((e=i.value)==null?void 0:e.lastName)+" "+d((f=i.value)==null?void 0:f.firstName),1),g("? ")]}),confirmButton:t(()=>[l(m,{flat:"",label:s(a).deleteButton,color:"negative",onClick:x},null,8,["label"])]),_:1},8,["model-value"])]))}});export{he as default};
