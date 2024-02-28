import{d as x,a as D,g as r,u as E,r as p,i as I,f as i,c as v,w as o,k as a,o as b,Q,n as m,e as f,t as g,b9 as _,ba as A,j as V,aZ as z,bG as P,aB as $,aC as q}from"./index.7ae99152.js";import{Q as L}from"./QInput.23cad58c.js";import{Q as U,a as y}from"./QTable.806a36c5.js";import{u as G,C as M,B as O}from"./BigSpinner.eadc8dfc.js";import{_ as R}from"./ConfirmDialog.8c596598.js";import{_ as j}from"./NoData.23fba9a4.js";import{c as F}from"./fuzzy-search.950e6fed.js";import"./use-dark.4188ae36.js";import"./focus-manager.05708ea9.js";import"./QList.7aa0273e.js";import"./QSelect.acebc22b.js";import"./QChip.f4965b7b.js";import"./QItemLabel.4ac02820.js";import"./QMenu.bb27081a.js";import"./position-engine.4a6e0398.js";import"./portal.0d408b48.js";import"./QDialog.8b440e78.js";import"./focusout.54881aad.js";import"./use-checkbox.5ea7ad8e.js";import"./use-fullscreen.b59e900c.js";import"./plugin-vue_export-helper.21dcd24c.js";import"./QCardSection.e04a19bd.js";import"./QCard.ece06ff7.js";import"./ClosePopup.7d4f9e25.js";const H={class:"text-weight-bold"},we=x({__name:"AdminDiningTables",setup(W){const u=D(),w=r(()=>u.state.diningTables.tables),S=r(()=>F(w.value,["number","employee.firstName","employee.lastName"])),h=r(()=>S.value.search(d.value)),k=r(()=>[M.DINING_TABLES]);let B=G(k,{store:u});const n=E(),s=p(null),c=p(!1),d=p(""),C=r(()=>[{name:"index",label:"#",field:"index",align:"center"},{name:"number",label:n.value.table,align:"center",field:t=>t.number},{name:"waiter",label:n.value.waiter,align:"center",field:t=>{var l,e;return((l=t.employee)==null?void 0:l.lastName)+" "+((e=t.employee)==null?void 0:e.firstName)}},{name:"actions",label:"",align:"right"}]),N=t=>{s.value=t},T=()=>{z(s.value,"");const t=s.value.id;s.value=null,c.value=!0,u.commit.sync(P({id:t})).then(()=>{$.create({type:"positive",position:"top",timeout:q,message:n.value.deleteSuccess,multiLine:!0,group:!1})}).finally(()=>{c.value=!1})};return(t,l)=>(b(),I("div",null,[i(B)?(b(),v(O,{key:0})):(b(),v(U,{key:1,class:"q-mx-auto max-w-lg sticky-last-column-table",rows:h.value,columns:C.value,"row-key":"id","rows-per-page-label":i(n).perPage,loading:c.value,"binary-state-sort":"",pagination:{rowsPerPage:i(A)}},{"top-right":o(()=>[a(L,{dense:"",modelValue:d.value,"onUpdate:modelValue":l[0]||(l[0]=e=>d.value=e),placeholder:i(n).search,class:"q-mr-lg q-my-sm"},{append:o(()=>[a(Q,{name:"search"})]),_:1},8,["modelValue","placeholder"]),a(m,{color:"primary",icon:"add",label:i(n).addTable,to:"/admin/dining-tables/create"},null,8,["label"])]),"body-cell-index":o(e=>[a(y,{props:e},{default:o(()=>[f(g(e.rowIndex+1),1)]),_:2},1032,["props"])]),"body-cell-actions":o(e=>[a(y,{props:e,"auto-width":""},{default:o(()=>[a(m,{flat:"",size:"md",icon:"mode_edit",color:"primary",dense:"",class:"q-mr-sm",onClick:l[1]||(l[1]=_(()=>{},["stop"])),to:`/admin/dining-tables/update/${e.row.id}`},null,8,["to"]),a(m,{flat:"",size:"md",icon:"o_delete",color:"negative",dense:"",onClick:_(Z=>N(e.row),["stop"])},null,8,["onClick"])]),_:2},1032,["props"])]),"no-data":o(()=>[a(j)]),_:1},8,["rows","columns","rows-per-page-label","loading","pagination"])),a(R,{"model-value":!!s.value,"onUpdate:modelValue":l[2]||(l[2]=e=>s.value=null)},{body:o(()=>{var e;return[f(g(i(n).confirmTableDelete)+" ",1),V("span",H,'"'+g(((e=s.value)==null?void 0:e.number)||"")+'"',1),f("? ")]}),confirmButton:o(()=>[a(m,{flat:"",label:i(n).deleteButton,color:"negative",onClick:T},null,8,["label"])]),_:1},8,["model-value"])]))}});export{we as default};
