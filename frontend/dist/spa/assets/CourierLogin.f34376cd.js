import{d as n,u as a,a as c,r as u,c as l,w as m,l as p,o as g,e as _,t as f,f as h}from"./index.7ae99152.js";import{_ as w}from"./LoginPage.f84463f5.js";import"./QCardSection.e04a19bd.js";import"./QCard.ece06ff7.js";import"./use-dark.4188ae36.js";import"./on-form-validation-error.f744f424.js";import"./focus-manager.05708ea9.js";import"./EmailInput.ced02575.js";import"./QInput.23cad58c.js";import"./PasswordInput.e3376571.js";const U=n({__name:"CourierLogin",setup(d){const s=a(),o=c(),e=u(!1),r=async t=>{e.value=!0,o.commit.sync(p({email:t.email,password:t.password,permissions:{courier:!0}})).then(()=>{o.client.changeUser(o.state.auth.user.userId||"",o.state.auth.user.accessToken||"");const i=new URL("/courier",window.location.origin);window.location.href=i.toString()}).catch(()=>{e.value=!1})};return(t,i)=>(g(),l(w,{"is-logging-in":e.value,onSubmit:r,"icon-name":"o_local_shipping"},{title:m(()=>[_(f(h(s).courierLoginPageTitle),1)]),_:1},8,["is-logging-in"]))}});export{U as default};
