import{d as B,a as C,h as n,u as Q,r as b,bn as D,i as T,g as s,e as _,w as t,k as l,o as v,Q as z,n as m,f as g,t as d,b9 as E,ba as I,j as P,aZ as $,bB as q,aB as L,aC as M}from"./index.e7dff7f9.js";import{Q as O}from"./QInput.5e8659ec.js";import{Q as U,a as y}from"./QTable.f1fffe23.js";import{Q as R}from"./QRadio.3aa3a6d5.js";import{u as F,C as j,B as G}from"./BigSpinner.c880dff8.js";import{_ as H}from"./ConfirmDialog.e08b6ef8.js";import{_ as W}from"./NoData.f1dffd19.js";import{a as Y}from"./date.b6f3ce26.js";import{c as Z}from"./fuzzy-search.950e6fed.js";import"./use-dark.e86b84e1.js";import"./focus-manager.05708ea9.js";import"./QList.8a91291d.js";import"./QSelect.52be5e2a.js";import"./QChip.822f6433.js";import"./QItemLabel.86a2b9d8.js";import"./QMenu.40dfec20.js";import"./position-engine.c971a6c8.js";import"./portal.e6ae3f7c.js";import"./QDialog.d42ee4cd.js";import"./focusout.670f670d.js";import"./use-checkbox.103a706e.js";import"./use-fullscreen.3886c554.js";import"./plugin-vue_export-helper.21dcd24c.js";import"./QCardSection.0cb8721b.js";import"./QCard.d6442979.js";import"./ClosePopup.003c9d37.js";import"./dayjs.min.78c0669c.js";const J={class:"text-weight-bold"},Ve=B({__name:"AdminEmployees",setup(K){const c=C(),N=n(()=>c.state.employees.employees),w=n(()=>Z(N.value,["firstName","lastName","email","registeredAt","role.codeName"])),S=n(()=>w.value.search(p.value)),k=n(()=>[j.EMPLOYEES]);let h=F(k,{store:c});const a=Q(),i=b(null),u=b(!1),p=b(""),V=[{name:"index",label:"#",field:"index",align:"center"},{name:"firstName",label:a.value.firstName,align:"center",field:"firstName",sortable:!0},{name:"lastName",label:a.value.lastName,align:"center",field:"lastName",sortable:!0},{name:"role",label:a.value.role,align:"center",sortable:!0,field:r=>{var o;return((o=r.role)==null?void 0:o.codeName)||D}},{name:"registeredAt",label:a.value.registeredAt,align:"center",field:"registeredAt",sortable:!0,format:r=>Y(r)},{name:"email",label:a.value.email,align:"center",field:"email",sortable:!0},{name:"isEmailVerified",label:a.value.isEmailVerified,align:"center",field:"isEmailVerified",sortable:!0},{name:"actions",label:"",align:"right"}],x=r=>{i.value=r},A=()=>{$(i.value,"");const r=i.value.id;i.value=null,u.value=!0,c.commit.sync(q({id:r})).then(()=>{L.create({type:"positive",position:"top",timeout:M,message:a.value.deleteSuccess,multiLine:!0,group:!1})}).finally(()=>{u.value=!1})};return(r,o)=>(v(),T("div",null,[s(h)?(v(),_(G,{key:0})):(v(),_(U,{key:1,class:"q-mx-auto max-w-xl sticky-last-column-table",rows:S.value,columns:V,"row-key":"id","binary-state-sort":"","rows-per-page-label":s(a).perPage,loading:u.value,pagination:{rowsPerPage:s(I)}},{"top-right":t(()=>[l(O,{dense:"",modelValue:p.value,"onUpdate:modelValue":o[0]||(o[0]=e=>p.value=e),placeholder:s(a).search,class:"q-mr-lg q-my-sm"},{append:t(()=>[l(z,{name:"search"})]),_:1},8,["modelValue","placeholder"]),l(m,{color:"primary",icon:"add",label:s(a).addEmployee,to:"/admin/employees/create"},null,8,["label"])]),"body-cell-index":t(e=>[l(y,{props:e},{default:t(()=>[g(d(e.rowIndex+1),1)]),_:2},1032,["props"])]),"body-cell-isEmailVerified":t(e=>[l(y,{props:e},{default:t(()=>[l(R,{class:"disabled-cursor-default","model-value":"true","checked-icon":"task_alt","unchecked-icon":"close",val:e.row.isEmailVerified.toString(),label:"",disable:"",color:e.row.isEmailVerified?"positive":"negative","keep-color":""},null,8,["val","color"])]),_:2},1032,["props"])]),"body-cell-actions":t(e=>[l(y,{props:e,"auto-width":""},{default:t(()=>[l(m,{flat:"",size:"md",icon:"mode_edit",color:"primary",dense:"",class:"q-mr-sm",onClick:o[1]||(o[1]=E(()=>{},["stop"])),to:`/admin/employees/update/${e.row.id}`},null,8,["to"]),l(m,{flat:"",size:"md",icon:"o_delete",color:"negative",dense:"",onClick:E(f=>x(e.row),["stop"])},null,8,["onClick"])]),_:2},1032,["props"])]),"no-data":t(()=>[l(W)]),_:1},8,["rows","rows-per-page-label","loading","pagination"])),l(H,{"model-value":!!i.value,"onUpdate:modelValue":o[2]||(o[2]=e=>i.value=null)},{body:t(()=>{var e,f;return[g(d(s(a).confirmEmployeeDelete)+" ",1),P("span",J,d((e=i.value)==null?void 0:e.lastName)+" "+d((f=i.value)==null?void 0:f.firstName),1),g("? ")]}),confirmButton:t(()=>[l(m,{flat:"",label:s(a).deleteButton,color:"negative",onClick:A},null,8,["label"])]),_:1},8,["model-value"])]))}});export{Ve as default};
