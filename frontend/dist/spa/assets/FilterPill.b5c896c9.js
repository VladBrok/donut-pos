import{d as r,h as n,o,e as c,w as i,aj as d,n as m,j as t,i as u,ag as p,t as g}from"./index.3f3b8c57.js";const v={class:"row justify-between gap-xs items-center"},C=["src"],h=r({__name:"FilterPill",props:{id:{},imageUrl:{},name:{},selectedId:{},customColor:{}},setup(l){const a=l,s=n(()=>a.id===a.selectedId);return(e,_)=>(o(),c(m,{color:s.value&&!e.customColor?"primary":e.customColor||"dark-gray",unelevated:s.value,outline:!s.value,class:d({"bg-white":!s.value}),rounded:"",padding:"sm md"},{default:i(()=>[t("span",v,[e.imageUrl?(o(),u("img",{key:0,src:e.imageUrl,alt:"",class:"image-xs fit-cover rounded-borders"},null,8,C)):p("",!0),t("span",null,g(e.name),1)])]),_:1},8,["color","unelevated","outline","class"]))}});export{h as _};
