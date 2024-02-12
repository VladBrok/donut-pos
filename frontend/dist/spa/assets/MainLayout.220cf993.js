import{p as j,h as v,q as C,s as fe,r as q,M as lt,A as ce,I as oe,V as Ae,D as ze,v as J,W as Qe,G as de,X as M,Y as he,H as x,Z as _t,_ as qt,S as ie,$ as Ct,a0 as pe,a1 as ke,N as Fe,U as Le,a2 as He,a3 as Pe,C as $t,J as Tt,y as xt,z as kt,a4 as ot,a5 as we,a6 as Ne,a7 as rt,x as nt,a8 as ye,a9 as Lt,d as it,o as F,e as ee,w as k,j as N,m as Se,k as T,n as ue,u as Pt,a as Ot,aa as Bt,ab as Mt,f as ae,t as Z,g as Q,ac as le,i as Oe,ad as Dt,Q as Et,ae as Qt,af as Ht,ag as je,ah as At,ai as Vt}from"./index.92b1981f.js";import{Q as We}from"./QTooltip.320304f6.js";import{Q as Rt,a as Ie}from"./QItemLabel.e8e8f6f6.js";import{Q as Ft}from"./QList.8f8ed760.js";import{u as ut,a as st}from"./use-dark.f27ed271.js";import{g as Nt,a as jt,b as Wt,c as It,s as Be,d as Ue,u as Ut,e as Xt,f as Yt,h as Kt,i as Me}from"./position-engine.f880795b.js";import{b as G}from"./format.2a3572e1.js";import{u as Gt,a as Jt}from"./QDialog.cd420016.js";import{u as Zt,C as ea,B as ta}from"./BigSpinner.23930169.js";import{_ as aa}from"./ConfirmDialog.b785605a.js";import{_ as Xe,a as la,b as oa}from"./CommonFooter.8bfeea2d.js";import{_ as ra}from"./OrderNumberTitle.45575d71.js";import{u as na}from"./useIsLoggedIn.aa2c04da.js";var ia=j({name:"QToolbarTitle",props:{shrink:Boolean},setup(e,{slots:n}){const o=v(()=>"q-toolbar__title ellipsis"+(e.shrink===!0?" col-shrink":""));return()=>C("div",{class:o.value},fe(n.default))}}),ua=j({name:"QToolbar",props:{inset:Boolean},setup(e,{slots:n}){const o=v(()=>"q-toolbar row no-wrap items-center"+(e.inset===!0?" q-toolbar--inset":""));return()=>C("div",{class:o.value,role:"toolbar"},fe(n.default))}});function sa(){const e=q(!lt.value);return e.value===!1&&ce(()=>{e.value=!0}),e}const ct=typeof ResizeObserver!="undefined",Ye=ct===!0?{}:{style:"display:block;position:absolute;top:0;left:0;right:0;bottom:0;height:100%;width:100%;overflow:hidden;pointer-events:none;z-index:-1;",url:"about:blank"};var ve=j({name:"QResizeObserver",props:{debounce:{type:[String,Number],default:100}},emits:["resize"],setup(e,{emit:n}){let o=null,r,t={width:-1,height:-1};function l(f){f===!0||e.debounce===0||e.debounce==="0"?i():o===null&&(o=setTimeout(i,e.debounce))}function i(){if(o!==null&&(clearTimeout(o),o=null),r){const{offsetWidth:f,offsetHeight:c}=r;(f!==t.width||c!==t.height)&&(t={width:f,height:c},n("resize",t))}}const{proxy:a}=J();if(ct===!0){let f;const c=s=>{r=a.$el.parentNode,r?(f=new ResizeObserver(l),f.observe(r),i()):s!==!0&&ze(()=>{c(!0)})};return ce(()=>{c()}),oe(()=>{o!==null&&clearTimeout(o),f!==void 0&&(f.disconnect!==void 0?f.disconnect():r&&f.unobserve(r))}),Ae}else{let s=function(){o!==null&&(clearTimeout(o),o=null),c!==void 0&&(c.removeEventListener!==void 0&&c.removeEventListener("resize",l,Qe.passive),c=void 0)},$=function(){s(),r&&r.contentDocument&&(c=r.contentDocument.defaultView,c.addEventListener("resize",l,Qe.passive),i())};const f=sa();let c;return ce(()=>{ze(()=>{r=a.$el,r&&$()})}),oe(s),a.trigger=l,()=>{if(f.value===!0)return C("object",{style:Ye.style,tabindex:-1,type:"text/html",data:Ye.url,"aria-hidden":"true",onLoad:$})}}}}),ca=j({name:"QHeader",props:{modelValue:{type:Boolean,default:!0},reveal:Boolean,revealOffset:{type:Number,default:250},bordered:Boolean,elevated:Boolean,heightHint:{type:[String,Number],default:50}},emits:["reveal","focusin"],setup(e,{slots:n,emit:o}){const{proxy:{$q:r}}=J(),t=de(he,M);if(t===M)return console.error("QHeader needs to be child of QLayout"),M;const l=q(parseInt(e.heightHint,10)),i=q(!0),a=v(()=>e.reveal===!0||t.view.value.indexOf("H")>-1||r.platform.is.ios&&t.isContainer.value===!0),f=v(()=>{if(e.modelValue!==!0)return 0;if(a.value===!0)return i.value===!0?l.value:0;const b=l.value-t.scroll.value.position;return b>0?b:0}),c=v(()=>e.modelValue!==!0||a.value===!0&&i.value!==!0),s=v(()=>e.modelValue===!0&&c.value===!0&&e.reveal===!0),$=v(()=>"q-header q-layout__section--marginal "+(a.value===!0?"fixed":"absolute")+"-top"+(e.bordered===!0?" q-header--bordered":"")+(c.value===!0?" q-header--hidden":"")+(e.modelValue!==!0?" q-layout--prevent-focus":"")),p=v(()=>{const b=t.rows.value.top,P={};return b[0]==="l"&&t.left.space===!0&&(P[r.lang.rtl===!0?"right":"left"]=`${t.left.size}px`),b[2]==="r"&&t.right.space===!0&&(P[r.lang.rtl===!0?"left":"right"]=`${t.right.size}px`),P});function h(b,P){t.update("header",b,P)}function m(b,P){b.value!==P&&(b.value=P)}function O({height:b}){m(l,b),h("size",b)}function _(b){s.value===!0&&m(i,!0),o("focusin",b)}x(()=>e.modelValue,b=>{h("space",b),m(i,!0),t.animate()}),x(f,b=>{h("offset",b)}),x(()=>e.reveal,b=>{b===!1&&m(i,e.modelValue)}),x(i,b=>{t.animate(),o("reveal",b)}),x(t.scroll,b=>{e.reveal===!0&&m(i,b.direction==="up"||b.position<=e.revealOffset||b.position-b.inflectionPoint<100)});const w={};return t.instances.header=w,e.modelValue===!0&&h("size",l.value),h("space",e.modelValue),h("offset",f.value),oe(()=>{t.instances.header===w&&(t.instances.header=void 0,h("size",0),h("offset",0),h("space",!1))}),()=>{const b=_t(n.default,[]);return e.elevated===!0&&b.push(C("div",{class:"q-layout__shadow absolute-full overflow-hidden no-pointer-events"})),b.push(C(ve,{debounce:0,onResize:O})),C("header",{class:$.value,style:p.value,onFocusin:_},b)}}});const{passive:Ke}=Qe,da=["both","horizontal","vertical"];var dt=j({name:"QScrollObserver",props:{axis:{type:String,validator:e=>da.includes(e),default:"vertical"},debounce:[String,Number],scrollTarget:{default:void 0}},emits:["scroll"],setup(e,{emit:n}){const o={position:{top:0,left:0},direction:"down",directionChanged:!1,delta:{top:0,left:0},inflectionPoint:{top:0,left:0}};let r=null,t,l;x(()=>e.scrollTarget,()=>{f(),a()});function i(){r!==null&&r();const $=Math.max(0,jt(t)),p=Wt(t),h={top:$-o.position.top,left:p-o.position.left};if(e.axis==="vertical"&&h.top===0||e.axis==="horizontal"&&h.left===0)return;const m=Math.abs(h.top)>=Math.abs(h.left)?h.top<0?"up":"down":h.left<0?"left":"right";o.position={top:$,left:p},o.directionChanged=o.direction!==m,o.delta=h,o.directionChanged===!0&&(o.direction=m,o.inflectionPoint=o.position),n("scroll",{...o})}function a(){t=Nt(l,e.scrollTarget),t.addEventListener("scroll",c,Ke),c(!0)}function f(){t!==void 0&&(t.removeEventListener("scroll",c,Ke),t=void 0)}function c($){if($===!0||e.debounce===0||e.debounce==="0")i();else if(r===null){const[p,h]=e.debounce?[setTimeout(i,e.debounce),clearTimeout]:[requestAnimationFrame(i),cancelAnimationFrame];r=()=>{h(p),r=null}}}const{proxy:s}=J();return x(()=>s.$q.lang.rtl,i),ce(()=>{l=s.$el.parentNode,a()}),oe(()=>{r!==null&&r(),f()}),Object.assign(s,{trigger:c,getPosition:()=>o}),Ae}});const Ve={left:!0,right:!0,up:!0,down:!0,horizontal:!0,vertical:!0},va=Object.keys(Ve);Ve.all=!0;function Ge(e){const n={};for(const o of va)e[o]===!0&&(n[o]=!0);return Object.keys(n).length===0?Ve:(n.horizontal===!0?n.left=n.right=!0:n.left===!0&&n.right===!0&&(n.horizontal=!0),n.vertical===!0?n.up=n.down=!0:n.up===!0&&n.down===!0&&(n.vertical=!0),n.horizontal===!0&&n.vertical===!0&&(n.all=!0),n)}const fa=["INPUT","TEXTAREA"];function Je(e,n){return n.event===void 0&&e.target!==void 0&&e.target.draggable!==!0&&typeof n.handler=="function"&&fa.includes(e.target.nodeName.toUpperCase())===!1&&(e.qClonedBy===void 0||e.qClonedBy.indexOf(n.uid)===-1)}function De(e,n,o){const r=He(e);let t,l=r.left-n.event.x,i=r.top-n.event.y,a=Math.abs(l),f=Math.abs(i);const c=n.direction;c.horizontal===!0&&c.vertical!==!0?t=l<0?"left":"right":c.horizontal!==!0&&c.vertical===!0?t=i<0?"up":"down":c.up===!0&&i<0?(t="up",a>f&&(c.left===!0&&l<0?t="left":c.right===!0&&l>0&&(t="right"))):c.down===!0&&i>0?(t="down",a>f&&(c.left===!0&&l<0?t="left":c.right===!0&&l>0&&(t="right"))):c.left===!0&&l<0?(t="left",a<f&&(c.up===!0&&i<0?t="up":c.down===!0&&i>0&&(t="down"))):c.right===!0&&l>0&&(t="right",a<f&&(c.up===!0&&i<0?t="up":c.down===!0&&i>0&&(t="down")));let s=!1;if(t===void 0&&o===!1){if(n.event.isFirst===!0||n.event.lastDir===void 0)return{};t=n.event.lastDir,s=!0,t==="left"||t==="right"?(r.left-=l,a=0,l=0):(r.top-=i,f=0,i=0)}return{synthetic:s,payload:{evt:e,touch:n.event.mouse!==!0,mouse:n.event.mouse===!0,position:r,direction:t,isFirst:n.event.isFirst,isFinal:o===!0,duration:Date.now()-n.event.time,distance:{x:a,y:f},offset:{x:l,y:i},delta:{x:r.left-n.event.lastX,y:r.top-n.event.lastY}}}}let ha=0;var se=qt({name:"touch-pan",beforeMount(e,{value:n,modifiers:o}){if(o.mouse!==!0&&ie.has.touch!==!0)return;function r(l,i){o.mouse===!0&&i===!0?$t(l):(o.stop===!0&&Le(l),o.prevent===!0&&Fe(l))}const t={uid:"qvtp_"+ha++,handler:n,modifiers:o,direction:Ge(o),noop:Ae,mouseStart(l){Je(l,t)&&Ct(l)&&(pe(t,"temp",[[document,"mousemove","move","notPassiveCapture"],[document,"mouseup","end","passiveCapture"]]),t.start(l,!0))},touchStart(l){if(Je(l,t)){const i=l.target;pe(t,"temp",[[i,"touchmove","move","notPassiveCapture"],[i,"touchcancel","end","passiveCapture"],[i,"touchend","end","passiveCapture"]]),t.start(l)}},start(l,i){if(ie.is.firefox===!0&&ke(e,!0),t.lastEvt=l,i===!0||o.stop===!0){if(t.direction.all!==!0&&(i!==!0||t.modifiers.mouseAllDir!==!0&&t.modifiers.mousealldir!==!0)){const c=l.type.indexOf("mouse")>-1?new MouseEvent(l.type,l):new TouchEvent(l.type,l);l.defaultPrevented===!0&&Fe(c),l.cancelBubble===!0&&Le(c),Object.assign(c,{qKeyEvent:l.qKeyEvent,qClickOutside:l.qClickOutside,qAnchorHandled:l.qAnchorHandled,qClonedBy:l.qClonedBy===void 0?[t.uid]:l.qClonedBy.concat(t.uid)}),t.initialEvent={target:l.target,event:c}}Le(l)}const{left:a,top:f}=He(l);t.event={x:a,y:f,time:Date.now(),mouse:i===!0,detected:!1,isFirst:!0,isFinal:!1,lastX:a,lastY:f}},move(l){if(t.event===void 0)return;const i=He(l),a=i.left-t.event.x,f=i.top-t.event.y;if(a===0&&f===0)return;t.lastEvt=l;const c=t.event.mouse===!0,s=()=>{r(l,c);let h;o.preserveCursor!==!0&&o.preservecursor!==!0&&(h=document.documentElement.style.cursor||"",document.documentElement.style.cursor="grabbing"),c===!0&&document.body.classList.add("no-pointer-events--children"),document.body.classList.add("non-selectable"),It(),t.styleCleanup=m=>{if(t.styleCleanup=void 0,h!==void 0&&(document.documentElement.style.cursor=h),document.body.classList.remove("non-selectable"),c===!0){const O=()=>{document.body.classList.remove("no-pointer-events--children")};m!==void 0?setTimeout(()=>{O(),m()},50):O()}else m!==void 0&&m()}};if(t.event.detected===!0){t.event.isFirst!==!0&&r(l,t.event.mouse);const{payload:h,synthetic:m}=De(l,t,!1);h!==void 0&&(t.handler(h)===!1?t.end(l):(t.styleCleanup===void 0&&t.event.isFirst===!0&&s(),t.event.lastX=h.position.left,t.event.lastY=h.position.top,t.event.lastDir=m===!0?void 0:h.direction,t.event.isFirst=!1));return}if(t.direction.all===!0||c===!0&&(t.modifiers.mouseAllDir===!0||t.modifiers.mousealldir===!0)){s(),t.event.detected=!0,t.move(l);return}const $=Math.abs(a),p=Math.abs(f);$!==p&&(t.direction.horizontal===!0&&$>p||t.direction.vertical===!0&&$<p||t.direction.up===!0&&$<p&&f<0||t.direction.down===!0&&$<p&&f>0||t.direction.left===!0&&$>p&&a<0||t.direction.right===!0&&$>p&&a>0?(t.event.detected=!0,t.move(l)):t.end(l,!0))},end(l,i){if(t.event!==void 0){if(Pe(t,"temp"),ie.is.firefox===!0&&ke(e,!1),i===!0)t.styleCleanup!==void 0&&t.styleCleanup(),t.event.detected!==!0&&t.initialEvent!==void 0&&t.initialEvent.target.dispatchEvent(t.initialEvent.event);else if(t.event.detected===!0){t.event.isFirst===!0&&t.handler(De(l===void 0?t.lastEvt:l,t).payload);const{payload:a}=De(l===void 0?t.lastEvt:l,t,!0),f=()=>{t.handler(a)};t.styleCleanup!==void 0?t.styleCleanup(f):f()}t.event=void 0,t.initialEvent=void 0,t.lastEvt=void 0}}};if(e.__qtouchpan=t,o.mouse===!0){const l=o.mouseCapture===!0||o.mousecapture===!0?"Capture":"";pe(t,"main",[[e,"mousedown","mouseStart",`passive${l}`]])}ie.has.touch===!0&&pe(t,"main",[[e,"touchstart","touchStart",`passive${o.capture===!0?"Capture":""}`],[e,"touchmove","noop","notPassiveCapture"]])},updated(e,n){const o=e.__qtouchpan;o!==void 0&&(n.oldValue!==n.value&&(typeof value!="function"&&o.end(),o.handler=n.value),o.direction=Ge(n.modifiers))},beforeUnmount(e){const n=e.__qtouchpan;n!==void 0&&(n.event!==void 0&&n.end(),Pe(n,"main"),Pe(n,"temp"),ie.is.firefox===!0&&ke(e,!1),n.styleCleanup!==void 0&&n.styleCleanup(),delete e.__qtouchpan)}});const Ze=["vertical","horizontal"],Ee={vertical:{offset:"offsetY",scroll:"scrollTop",dir:"down",dist:"y"},horizontal:{offset:"offsetX",scroll:"scrollLeft",dir:"right",dist:"x"}},et={prevent:!0,mouse:!0,mouseAllDir:!0},tt=e=>e>=250?50:Math.ceil(e/5);var ma=j({name:"QScrollArea",props:{...ut,thumbStyle:Object,verticalThumbStyle:Object,horizontalThumbStyle:Object,barStyle:[Array,String,Object],verticalBarStyle:[Array,String,Object],horizontalBarStyle:[Array,String,Object],contentStyle:[Array,String,Object],contentActiveStyle:[Array,String,Object],delay:{type:[String,Number],default:1e3},visible:{type:Boolean,default:null},tabindex:[String,Number],onScroll:Function},setup(e,{slots:n,emit:o}){const r=q(!1),t=q(!1),l=q(!1),i={vertical:q(0),horizontal:q(0)},a={vertical:{ref:q(null),position:q(0),size:q(0)},horizontal:{ref:q(null),position:q(0),size:q(0)}},{proxy:f}=J(),c=st(e,f.$q);let s=null,$;const p=q(null),h=v(()=>"q-scrollarea"+(c.value===!0?" q-scrollarea--dark":""));a.vertical.percentage=v(()=>{const d=a.vertical.size.value-i.vertical.value;if(d<=0)return 0;const g=G(a.vertical.position.value/d,0,1);return Math.round(g*1e4)/1e4}),a.vertical.thumbHidden=v(()=>(e.visible===null?l.value:e.visible)!==!0&&r.value===!1&&t.value===!1||a.vertical.size.value<=i.vertical.value+1),a.vertical.thumbStart=v(()=>a.vertical.percentage.value*(i.vertical.value-a.vertical.thumbSize.value)),a.vertical.thumbSize=v(()=>Math.round(G(i.vertical.value*i.vertical.value/a.vertical.size.value,tt(i.vertical.value),i.vertical.value))),a.vertical.style=v(()=>({...e.thumbStyle,...e.verticalThumbStyle,top:`${a.vertical.thumbStart.value}px`,height:`${a.vertical.thumbSize.value}px`})),a.vertical.thumbClass=v(()=>"q-scrollarea__thumb q-scrollarea__thumb--v absolute-right"+(a.vertical.thumbHidden.value===!0?" q-scrollarea__thumb--invisible":"")),a.vertical.barClass=v(()=>"q-scrollarea__bar q-scrollarea__bar--v absolute-right"+(a.vertical.thumbHidden.value===!0?" q-scrollarea__bar--invisible":"")),a.horizontal.percentage=v(()=>{const d=a.horizontal.size.value-i.horizontal.value;if(d<=0)return 0;const g=G(Math.abs(a.horizontal.position.value)/d,0,1);return Math.round(g*1e4)/1e4}),a.horizontal.thumbHidden=v(()=>(e.visible===null?l.value:e.visible)!==!0&&r.value===!1&&t.value===!1||a.horizontal.size.value<=i.horizontal.value+1),a.horizontal.thumbStart=v(()=>a.horizontal.percentage.value*(i.horizontal.value-a.horizontal.thumbSize.value)),a.horizontal.thumbSize=v(()=>Math.round(G(i.horizontal.value*i.horizontal.value/a.horizontal.size.value,tt(i.horizontal.value),i.horizontal.value))),a.horizontal.style=v(()=>({...e.thumbStyle,...e.horizontalThumbStyle,[f.$q.lang.rtl===!0?"right":"left"]:`${a.horizontal.thumbStart.value}px`,width:`${a.horizontal.thumbSize.value}px`})),a.horizontal.thumbClass=v(()=>"q-scrollarea__thumb q-scrollarea__thumb--h absolute-bottom"+(a.horizontal.thumbHidden.value===!0?" q-scrollarea__thumb--invisible":"")),a.horizontal.barClass=v(()=>"q-scrollarea__bar q-scrollarea__bar--h absolute-bottom"+(a.horizontal.thumbHidden.value===!0?" q-scrollarea__bar--invisible":""));const m=v(()=>a.vertical.thumbHidden.value===!0&&a.horizontal.thumbHidden.value===!0?e.contentStyle:e.contentActiveStyle),O=[[se,d=>{R(d,"vertical")},void 0,{vertical:!0,...et}]],_=[[se,d=>{R(d,"horizontal")},void 0,{horizontal:!0,...et}]];function w(){const d={};return Ze.forEach(g=>{const S=a[g];d[g+"Position"]=S.position.value,d[g+"Percentage"]=S.percentage.value,d[g+"Size"]=S.size.value,d[g+"ContainerSize"]=i[g].value}),d}const b=Tt(()=>{const d=w();d.ref=f,o("scroll",d)},0);function P(d,g,S){if(Ze.includes(d)===!1){console.error("[QScrollArea]: wrong first param of setScrollPosition (vertical/horizontal)");return}(d==="vertical"?Ue:Be)(p.value,g,S)}function y({height:d,width:g}){let S=!1;i.vertical.value!==d&&(i.vertical.value=d,S=!0),i.horizontal.value!==g&&(i.horizontal.value=g,S=!0),S===!0&&V()}function L({position:d}){let g=!1;a.vertical.position.value!==d.top&&(a.vertical.position.value=d.top,g=!0),a.horizontal.position.value!==d.left&&(a.horizontal.position.value=d.left,g=!0),g===!0&&V()}function B({height:d,width:g}){a.horizontal.size.value!==g&&(a.horizontal.size.value=g,V()),a.vertical.size.value!==d&&(a.vertical.size.value=d,V())}function R(d,g){const S=a[g];if(d.isFirst===!0){if(S.thumbHidden.value===!0)return;$=S.position.value,t.value=!0}else if(t.value!==!0)return;d.isFinal===!0&&(t.value=!1);const U=Ee[g],te=i[g].value,_e=(S.size.value-te)/(te-S.thumbSize.value),be=d.distance[U.dist],qe=$+(d.direction===U.dir?1:-1)*be*_e;re(qe,g)}function X(d,g){const S=a[g];if(S.thumbHidden.value!==!0){const U=d[Ee[g].offset];if(U<S.thumbStart.value||U>S.thumbStart.value+S.thumbSize.value){const te=U-S.thumbSize.value/2;re(te/i[g].value*S.size.value,g)}S.ref.value!==null&&S.ref.value.dispatchEvent(new MouseEvent(d.type,d))}}function W(d){X(d,"vertical")}function A(d){X(d,"horizontal")}function V(){r.value=!0,s!==null&&clearTimeout(s),s=setTimeout(()=>{s=null,r.value=!1},e.delay),e.onScroll!==void 0&&b()}function re(d,g){p.value[Ee[g].scroll]=d}let D=null;function ne(){D!==null&&clearTimeout(D),D=setTimeout(()=>{D=null,l.value=!0},f.$q.platform.is.ios?50:0)}function me(){D!==null&&(clearTimeout(D),D=null),l.value=!1}let I=null;return x(()=>f.$q.lang.rtl,d=>{p.value!==null&&Be(p.value,Math.abs(a.horizontal.position.value)*(d===!0?-1:1))}),xt(()=>{I={top:a.vertical.position.value,left:a.horizontal.position.value}}),kt(()=>{if(I===null)return;const d=p.value;d!==null&&(Be(d,I.left),Ue(d,I.top))}),oe(b.cancel),Object.assign(f,{getScrollTarget:()=>p.value,getScroll:w,getScrollPosition:()=>({top:a.vertical.position.value,left:a.horizontal.position.value}),getScrollPercentage:()=>({top:a.vertical.percentage.value,left:a.horizontal.percentage.value}),setScrollPosition:P,setScrollPercentage(d,g,S){P(d,g*(a[d].size.value-i[d].value)*(d==="horizontal"&&f.$q.lang.rtl===!0?-1:1),S)}}),()=>C("div",{class:h.value,onMouseenter:ne,onMouseleave:me},[C("div",{ref:p,class:"q-scrollarea__container scroll relative-position fit hide-scrollbar",tabindex:e.tabindex!==void 0?e.tabindex:void 0},[C("div",{class:"q-scrollarea__content absolute",style:m.value},ot(n.default,[C(ve,{debounce:0,onResize:B})])),C(dt,{axis:"both",onScroll:L})]),C(ve,{debounce:0,onResize:y}),C("div",{class:a.vertical.barClass.value,style:[e.barStyle,e.verticalBarStyle],"aria-hidden":"true",onMousedown:W}),C("div",{class:a.horizontal.barClass.value,style:[e.barStyle,e.horizontalBarStyle],"aria-hidden":"true",onMousedown:A}),we(C("div",{ref:a.vertical.ref,class:a.vertical.thumbClass.value,style:a.vertical.style.value,"aria-hidden":"true"}),O),we(C("div",{ref:a.horizontal.ref,class:a.horizontal.thumbClass.value,style:a.horizontal.style.value,"aria-hidden":"true"}),_)])}});const at=150;var vt=j({name:"QDrawer",inheritAttrs:!1,props:{...Ut,...ut,side:{type:String,default:"left",validator:e=>["left","right"].includes(e)},width:{type:Number,default:300},mini:Boolean,miniToOverlay:Boolean,miniWidth:{type:Number,default:57},noMiniAnimation:Boolean,breakpoint:{type:Number,default:1023},showIfAbove:Boolean,behavior:{type:String,validator:e=>["default","desktop","mobile"].includes(e),default:"default"},bordered:Boolean,elevated:Boolean,overlay:Boolean,persistent:Boolean,noSwipeOpen:Boolean,noSwipeClose:Boolean,noSwipeBackdrop:Boolean},emits:[...Xt,"onLayout","miniState"],setup(e,{slots:n,emit:o,attrs:r}){const t=J(),{proxy:{$q:l}}=t,i=st(e,l),{preventBodyScroll:a}=Jt(),{registerTimeout:f,removeTimeout:c}=Yt(),s=de(he,M);if(s===M)return console.error("QDrawer needs to be child of QLayout"),M;let $,p=null,h;const m=q(e.behavior==="mobile"||e.behavior!=="desktop"&&s.totalWidth.value<=e.breakpoint),O=v(()=>e.mini===!0&&m.value!==!0),_=v(()=>O.value===!0?e.miniWidth:e.width),w=q(e.showIfAbove===!0&&m.value===!1?!0:e.modelValue===!0),b=v(()=>e.persistent!==!0&&(m.value===!0||U.value===!0));function P(u,z){if(R(),u!==!1&&s.animate(),H(0),m.value===!0){const E=s.instances[I.value];E!==void 0&&E.belowBreakpoint===!0&&E.hide(!1),Y(1),s.isContainer.value!==!0&&a(!0)}else Y(0),u!==!1&&$e(!1);f(()=>{u!==!1&&$e(!0),z!==!0&&o("show",u)},at)}function y(u,z){X(),u!==!1&&s.animate(),Y(0),H(V.value*_.value),Te(),z!==!0?f(()=>{o("hide",u)},at):c()}const{show:L,hide:B}=Kt({showing:w,hideOnRouteChange:b,handleShow:P,handleHide:y}),{addToHistory:R,removeFromHistory:X}=Gt(w,B,b),W={belowBreakpoint:m,hide:B},A=v(()=>e.side==="right"),V=v(()=>(l.lang.rtl===!0?-1:1)*(A.value===!0?1:-1)),re=q(0),D=q(!1),ne=q(!1),me=q(_.value*V.value),I=v(()=>A.value===!0?"left":"right"),d=v(()=>w.value===!0&&m.value===!1&&e.overlay===!1?e.miniToOverlay===!0?e.miniWidth:_.value:0),g=v(()=>e.overlay===!0||e.miniToOverlay===!0||s.view.value.indexOf(A.value?"R":"L")>-1||l.platform.is.ios===!0&&s.isContainer.value===!0),S=v(()=>e.overlay===!1&&w.value===!0&&m.value===!1),U=v(()=>e.overlay===!0&&w.value===!0&&m.value===!1),te=v(()=>"fullscreen q-drawer__backdrop"+(w.value===!1&&D.value===!1?" hidden":"")),_e=v(()=>({backgroundColor:`rgba(0,0,0,${re.value*.4})`})),be=v(()=>A.value===!0?s.rows.value.top[2]==="r":s.rows.value.top[0]==="l"),qe=v(()=>A.value===!0?s.rows.value.bottom[2]==="r":s.rows.value.bottom[0]==="l"),ft=v(()=>{const u={};return s.header.space===!0&&be.value===!1&&(g.value===!0?u.top=`${s.header.offset}px`:s.header.space===!0&&(u.top=`${s.header.size}px`)),s.footer.space===!0&&qe.value===!1&&(g.value===!0?u.bottom=`${s.footer.offset}px`:s.footer.space===!0&&(u.bottom=`${s.footer.size}px`)),u}),ht=v(()=>{const u={width:`${_.value}px`,transform:`translateX(${me.value}px)`};return m.value===!0?u:Object.assign(u,ft.value)}),mt=v(()=>"q-drawer__content fit "+(s.isContainer.value!==!0?"scroll":"overflow-auto")),bt=v(()=>`q-drawer q-drawer--${e.side}`+(ne.value===!0?" q-drawer--mini-animate":"")+(e.bordered===!0?" q-drawer--bordered":"")+(i.value===!0?" q-drawer--dark q-dark":"")+(D.value===!0?" no-transition":w.value===!0?"":" q-layout--prevent-focus")+(m.value===!0?" fixed q-drawer--on-top q-drawer--mobile q-drawer--top-padding":` q-drawer--${O.value===!0?"mini":"standard"}`+(g.value===!0||S.value!==!0?" fixed":"")+(e.overlay===!0||e.miniToOverlay===!0?" q-drawer--on-top":"")+(be.value===!0?" q-drawer--top-padding":""))),gt=v(()=>{const u=l.lang.rtl===!0?e.side:I.value;return[[se,wt,void 0,{[u]:!0,mouse:!0}]]}),pt=v(()=>{const u=l.lang.rtl===!0?I.value:e.side;return[[se,Re,void 0,{[u]:!0,mouse:!0}]]}),yt=v(()=>{const u=l.lang.rtl===!0?I.value:e.side;return[[se,Re,void 0,{[u]:!0,mouse:!0,mouseAllDir:!0}]]});function Ce(){St(m,e.behavior==="mobile"||e.behavior!=="desktop"&&s.totalWidth.value<=e.breakpoint)}x(m,u=>{u===!0?($=w.value,w.value===!0&&B(!1)):e.overlay===!1&&e.behavior!=="mobile"&&$!==!1&&(w.value===!0?(H(0),Y(0),Te()):L(!1))}),x(()=>e.side,(u,z)=>{s.instances[z]===W&&(s.instances[z]=void 0,s[z].space=!1,s[z].offset=0),s.instances[u]=W,s[u].size=_.value,s[u].space=S.value,s[u].offset=d.value}),x(s.totalWidth,()=>{(s.isContainer.value===!0||document.qScrollPrevented!==!0)&&Ce()}),x(()=>e.behavior+e.breakpoint,Ce),x(s.isContainer,u=>{w.value===!0&&a(u!==!0),u===!0&&Ce()}),x(s.scrollbarWidth,()=>{H(w.value===!0?0:void 0)}),x(d,u=>{K("offset",u)}),x(S,u=>{o("onLayout",u),K("space",u)}),x(A,()=>{H()}),x(_,u=>{H(),xe(e.miniToOverlay,u)}),x(()=>e.miniToOverlay,u=>{xe(u,_.value)}),x(()=>l.lang.rtl,()=>{H()}),x(()=>e.mini,()=>{e.noMiniAnimation||e.modelValue===!0&&(zt(),s.animate())}),x(O,u=>{o("miniState",u)});function H(u){u===void 0?ze(()=>{u=w.value===!0?0:_.value,H(V.value*u)}):(s.isContainer.value===!0&&A.value===!0&&(m.value===!0||Math.abs(u)===_.value)&&(u+=V.value*s.scrollbarWidth.value),me.value=u)}function Y(u){re.value=u}function $e(u){const z=u===!0?"remove":s.isContainer.value!==!0?"add":"";z!==""&&document.body.classList[z]("q-body--drawer-toggle")}function zt(){p!==null&&clearTimeout(p),t.proxy&&t.proxy.$el&&t.proxy.$el.classList.add("q-drawer--mini-animate"),ne.value=!0,p=setTimeout(()=>{p=null,ne.value=!1,t&&t.proxy&&t.proxy.$el&&t.proxy.$el.classList.remove("q-drawer--mini-animate")},150)}function wt(u){if(w.value!==!1)return;const z=_.value,E=G(u.distance.x,0,z);if(u.isFinal===!0){E>=Math.min(75,z)===!0?L():(s.animate(),Y(0),H(V.value*z)),D.value=!1;return}H((l.lang.rtl===!0?A.value!==!0:A.value)?Math.max(z-E,0):Math.min(0,E-z)),Y(G(E/z,0,1)),u.isFirst===!0&&(D.value=!0)}function Re(u){if(w.value!==!0)return;const z=_.value,E=u.direction===e.side,ge=(l.lang.rtl===!0?E!==!0:E)?G(u.distance.x,0,z):0;if(u.isFinal===!0){Math.abs(ge)<Math.min(75,z)===!0?(s.animate(),Y(1),H(0)):B(),D.value=!1;return}H(V.value*ge),Y(G(1-ge/z,0,1)),u.isFirst===!0&&(D.value=!0)}function Te(){a(!1),$e(!0)}function K(u,z){s.update(e.side,u,z)}function St(u,z){u.value!==z&&(u.value=z)}function xe(u,z){K("size",u===!0?e.miniWidth:z)}return s.instances[e.side]=W,xe(e.miniToOverlay,_.value),K("space",S.value),K("offset",d.value),e.showIfAbove===!0&&e.modelValue!==!0&&w.value===!0&&e["onUpdate:modelValue"]!==void 0&&o("update:modelValue",!0),ce(()=>{o("onLayout",S.value),o("miniState",O.value),$=e.showIfAbove===!0;const u=()=>{(w.value===!0?P:y)(!1,!0)};if(s.totalWidth.value!==0){ze(u);return}h=x(s.totalWidth,()=>{h(),h=void 0,w.value===!1&&e.showIfAbove===!0&&m.value===!1?L(!1):u()})}),oe(()=>{h!==void 0&&h(),p!==null&&(clearTimeout(p),p=null),w.value===!0&&Te(),s.instances[e.side]===W&&(s.instances[e.side]=void 0,K("size",0),K("offset",0),K("space",!1))}),()=>{const u=[];m.value===!0&&(e.noSwipeOpen===!1&&u.push(we(C("div",{key:"open",class:`q-drawer__opener fixed-${e.side}`,"aria-hidden":"true"}),gt.value)),u.push(Ne("div",{ref:"backdrop",class:te.value,style:_e.value,"aria-hidden":"true",onClick:B},void 0,"backdrop",e.noSwipeBackdrop!==!0&&w.value===!0,()=>yt.value)));const z=O.value===!0&&n.mini!==void 0,E=[C("div",{...r,key:""+z,class:[mt.value,r.class]},z===!0?n.mini():fe(n.default))];return e.elevated===!0&&w.value===!0&&E.push(C("div",{class:"q-layout__shadow absolute-full overflow-hidden no-pointer-events"})),u.push(Ne("aside",{ref:"content",class:bt.value,style:ht.value},E,"contentclose",e.noSwipeClose!==!0&&m.value===!0,()=>pt.value)),C("div",{class:"q-drawer-container"},u)}}}),ba=j({name:"QPage",props:{padding:Boolean,styleFn:Function},setup(e,{slots:n}){const{proxy:{$q:o}}=J(),r=de(he,M);if(r===M)return console.error("QPage needs to be a deep child of QLayout"),M;if(de(rt,M)===M)return console.error("QPage needs to be child of QPageContainer"),M;const l=v(()=>{const a=(r.header.space===!0?r.header.size:0)+(r.footer.space===!0?r.footer.size:0);if(typeof e.styleFn=="function"){const f=r.isContainer.value===!0?r.containerHeight.value:o.screen.height;return e.styleFn(a,f)}return{minHeight:r.isContainer.value===!0?r.containerHeight.value-a+"px":o.screen.height===0?a!==0?`calc(100vh - ${a}px)`:"100vh":o.screen.height-a+"px"}}),i=v(()=>`q-page${e.padding===!0?" q-layout-padding":""}`);return()=>C("main",{class:i.value,style:l.value},fe(n.default))}}),ga=j({name:"QPageContainer",setup(e,{slots:n}){const{proxy:{$q:o}}=J(),r=de(he,M);if(r===M)return console.error("QPageContainer needs to be child of QLayout"),M;nt(rt,!0);const t=v(()=>{const l={};return r.header.space===!0&&(l.paddingTop=`${r.header.size}px`),r.right.space===!0&&(l[`padding${o.lang.rtl===!0?"Left":"Right"}`]=`${r.right.size}px`),r.footer.space===!0&&(l.paddingBottom=`${r.footer.size}px`),r.left.space===!0&&(l[`padding${o.lang.rtl===!0?"Right":"Left"}`]=`${r.left.size}px`),l});return()=>C("div",{class:"q-page-container",style:t.value},fe(n.default))}}),pa=j({name:"QLayout",props:{container:Boolean,view:{type:String,default:"hhh lpr fff",validator:e=>/^(h|l)h(h|r) lpr (f|l)f(f|r)$/.test(e.toLowerCase())},onScroll:Function,onScrollHeight:Function,onResize:Function},setup(e,{slots:n,emit:o}){const{proxy:{$q:r}}=J(),t=q(null),l=q(r.screen.height),i=q(e.container===!0?0:r.screen.width),a=q({position:0,direction:"down",inflectionPoint:0}),f=q(0),c=q(lt.value===!0?0:Me()),s=v(()=>"q-layout q-layout--"+(e.container===!0?"containerized":"standard")),$=v(()=>e.container===!1?{minHeight:r.screen.height+"px"}:null),p=v(()=>c.value!==0?{[r.lang.rtl===!0?"left":"right"]:`${c.value}px`}:null),h=v(()=>c.value!==0?{[r.lang.rtl===!0?"right":"left"]:0,[r.lang.rtl===!0?"left":"right"]:`-${c.value}px`,width:`calc(100% + ${c.value}px)`}:null);function m(y){if(e.container===!0||document.qScrollPrevented!==!0){const L={position:y.position.top,direction:y.direction,directionChanged:y.directionChanged,inflectionPoint:y.inflectionPoint.top,delta:y.delta.top};a.value=L,e.onScroll!==void 0&&o("scroll",L)}}function O(y){const{height:L,width:B}=y;let R=!1;l.value!==L&&(R=!0,l.value=L,e.onScrollHeight!==void 0&&o("scrollHeight",L),w()),i.value!==B&&(R=!0,i.value=B),R===!0&&e.onResize!==void 0&&o("resize",y)}function _({height:y}){f.value!==y&&(f.value=y,w())}function w(){if(e.container===!0){const y=l.value>f.value?Me():0;c.value!==y&&(c.value=y)}}let b=null;const P={instances:{},view:v(()=>e.view),isContainer:v(()=>e.container),rootRef:t,height:l,containerHeight:f,scrollbarWidth:c,totalWidth:v(()=>i.value+c.value),rows:v(()=>{const y=e.view.toLowerCase().split(" ");return{top:y[0].split(""),middle:y[1].split(""),bottom:y[2].split("")}}),header:ye({size:0,offset:0,space:!1}),right:ye({size:300,offset:0,space:!1}),footer:ye({size:0,offset:0,space:!1}),left:ye({size:300,offset:0,space:!1}),scroll:a,animate(){b!==null?clearTimeout(b):document.body.classList.add("q-body--layout-animate"),b=setTimeout(()=>{b=null,document.body.classList.remove("q-body--layout-animate")},155)},update(y,L,B){P[y][L]=B}};if(nt(he,P),Me()>0){let B=function(){y=null,L.classList.remove("hide-scrollbar")},R=function(){if(y===null){if(L.scrollHeight>r.screen.height)return;L.classList.add("hide-scrollbar")}else clearTimeout(y);y=setTimeout(B,300)},X=function(W){y!==null&&W==="remove"&&(clearTimeout(y),B()),window[`${W}EventListener`]("resize",R)},y=null;const L=document.body;x(()=>e.container!==!0?"add":"remove",X),e.container!==!0&&X("add"),Lt(()=>{X("remove")})}return()=>{const y=ot(n.default,[C(dt,{onScroll:m}),C(ve,{onResize:O})]),L=C("div",{class:s.value,style:$.value,ref:e.container===!0?void 0:t,tabindex:-1},y);return e.container===!0?C("div",{class:"q-layout-container overflow-hidden",ref:t},[C(ve,{onResize:_}),C("div",{class:"absolute-full",style:p.value},[C("div",{class:"scroll",style:h.value},[L])])]):L}}});const ya={class:"q-pa-sm"},za={class:"row justify-between q-mb-md q-mt-sm"},wa={class:"flex-grow row justify-end items-start"},Sa={class:"q-px-sm"},_a=it({__name:"OrderDrawer",emits:["close"],setup(e,{emit:n}){const o=n;return(r,t)=>(F(),ee(vt,{side:"right",bordered:"",width:r.$q.screen.xs?320:400},{default:k(()=>[N("div",ya,[N("div",za,[N("div",null,[Se(r.$slots,"title")]),N("div",wa,[T(ue,{dense:"",flat:"",round:"",icon:"close",onClick:t[0]||(t[0]=l=>o("close"))})])]),N("div",Sa,[Se(r.$slots,"content")])])]),_:3},8,["width"]))}}),qa={class:"q-px-lg q-pt-lg q-pb-sm"},Ca={class:"q-pa-sm"},$a={key:0,class:"text-h5"},Ta={key:1,class:"text-h6 text-weight-regular"},xa={class:"scroll full-width page-wrapper-height overflow-x-hidden"},ka={class:"q-pb-xl q-pt-xl"},ja=it({__name:"MainLayout",props:{menuList:{}},setup(e){const n=q(!1),o=q(!1),r=Pt(),t=Ot(),l=v(()=>t.state.auth.user.userId),i=v(()=>{var h;return(h=t.state.auth.user.permissions)==null?void 0:h.client}),a=v(()=>{var h;return!t.state.orderDrawer.order||l.value===((h=t.state.orderDrawer.order.employee)==null?void 0:h.id)||i.value?[]:[ea.ORDER_SINGLE(t.state.orderDrawer.order.orderNumber||"")]}),f=Zt(a,{store:t}),c=v(()=>{var h,m;return f.value?null:l.value===((m=(h=t.state.orderDrawer.order)==null?void 0:h.employee)==null?void 0:m.id)||!t.state.orderDrawer.order||i.value?t.state.orderDrawer.order:t.state.orders.order}),s=na();function $(){o.value=!o.value}function p(){t.commit.crossTab(At({accessToken:t.state.auth.user.accessToken||""}))}return(h,m)=>{const O=Bt("router-view");return F(),ee(pa,{view:"hHh LpR lfr",class:"bg-gray-lightest"},{default:k(()=>[T(ca,{class:"bg-white text-black shadow-up-1",bordered:""},{default:k(()=>[T(ua,{class:"q-py-sm"},{default:k(()=>[T(ue,{dense:"",flat:"",round:"",icon:"menu",onClick:$}),T(Mt,{class:"q-pl-xs q-mr-xs"},{default:k(()=>[T(Xe,{"no-text":""})]),_:1}),T(ia,null,{default:k(()=>[ae(Z(h.$route.meta.title||""),1)]),_:1}),Se(h.$slots,"actions"),Q(s)?(F(),ee(ue,{key:0,flat:"",round:"",icon:"logout",color:"negative",onClick:m[0]||(m[0]=_=>n.value=!0)},{default:k(()=>[T(We,null,{default:k(()=>[ae(Z(Q(r).logout),1)]),_:1})]),_:1})):le("",!0),Q(s)?le("",!0):(F(),ee(ue,{key:1,color:"positive",flat:"",round:"",icon:"login",to:"/login"},{default:k(()=>[T(We,null,{default:k(()=>[ae(Z(Q(r).logIn),1)]),_:1})]),_:1}))]),_:3})]),_:3}),T(vt,{"show-if-above":"",modelValue:o.value,"onUpdate:modelValue":m[1]||(m[1]=_=>o.value=_),side:"left",width:240,bordered:""},{default:k(()=>[T(ma,{class:"fit"},{default:k(()=>[N("div",qa,[T(Xe)]),N("div",Ca,[T(Ft,null,{default:k(()=>[(F(!0),Oe(Qt,null,Dt(h.menuList,(_,w)=>we((F(),ee(Rt,{key:w,clickable:"",active:h.$route.meta.title===_.meta,to:_.to},{default:k(()=>[T(Ie,{avatar:""},{default:k(()=>[T(Et,{name:_.icon,size:"sm"},null,8,["name"])]),_:2},1024),T(Ie,null,{default:k(()=>[ae(Z(_.label),1)]),_:2},1024)]),_:2},1032,["active","to"])),[[Vt]])),128))]),_:1})])]),_:1})]),_:1},8,["modelValue"]),Se(h.$slots,"drawers"),T(_a,{"model-value":Boolean(c.value)||Q(f),"onUpdate:modelValue":m[2]||(m[2]=_=>Q(t).commit.local(Q(je)())),onClose:m[3]||(m[3]=_=>Q(t).commit.local(Q(je)()))},{title:k(()=>[c.value?(F(),Oe("p",$a,[T(ra,{"order-number":c.value.orderNumber,"is-link":""},null,8,["order-number"])])):le("",!0),c.value?(F(),Oe("p",Ta,[ae(Z(Q(r).orderStatus.toLowerCase())+": ",1),N("span",{class:Ht(`text-${c.value.status}`)},Z(c.value.status),3)])):le("",!0)]),content:k(()=>[c.value?(F(),ee(la,{key:0,order:c.value},null,8,["order"])):le("",!0),Q(f)?(F(),ee(ta,{key:1})):le("",!0)]),_:1},8,["model-value"]),T(ga,null,{default:k(()=>[N("div",xa,[T(ba,{padding:""},{default:k(()=>[N("div",ka,[T(O)])]),_:1}),T(oa)])]),_:1}),T(aa,{modelValue:n.value,"onUpdate:modelValue":m[4]||(m[4]=_=>n.value=_)},{body:k(()=>[ae(Z(Q(r).confirmLogout)+"? ",1)]),confirmButton:k(()=>[T(ue,{flat:"",label:Q(r).logout,color:"negative",onClick:p},null,8,["label"])]),_:1},8,["modelValue"])]),_:3})}}});export{ja as _,_a as a};
