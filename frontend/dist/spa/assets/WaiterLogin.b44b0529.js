import{d as i,u as n,a as c,c as u,r as m,e as p,w as l,l as g,o as _,f,t as d,g as h}from"./index.a56c0b25.js";import{_ as w}from"./LoginPage.f1635f82.js";import"./QCardSection.c5c63ce7.js";import"./QCard.eebcef64.js";import"./use-dark.deeb5c40.js";import"./on-form-validation-error.04ef1312.js";import"./focus-manager.05708ea9.js";import"./EmailInput.92857f18.js";import"./QInput.886048bb.js";import"./PasswordInput.6ff4e70b.js";const D=i({__name:"WaiterLogin",setup(x){const o=n(),e=c(),a=u(),t=m(!1),r=async s=>{t.value=!0,e.commit.sync(g({email:s.email,password:s.password,permissions:{waiter:!0}})).then(()=>(e.client.changeUser(e.state.auth.user.userId||"",e.state.auth.user.accessToken||""),a.push("/waiter"))).finally(()=>{t.value=!1})};return(s,y)=>(_(),p(w,{"is-logging-in":t.value,onSubmit:r,"icon-name":"o_badge"},{title:l(()=>[f(d(h(o).waiterLoginPageTitle),1)]),_:1},8,["is-logging-in"]))}});export{D as default};