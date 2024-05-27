import{a as L,i as c,S as b}from"./assets/vendor-f144e563.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function a(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=a(e);fetch(e.href,t)}})();async function h(o,r){const a="43995024-c8f5c7e28b3078307d7d8500b",n="https://pixabay.com",e="/api/",t=new URLSearchParams({key:a,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:15}),i=`${n}${e}?${t}`;try{const d=await L.get(i),{data:g}=d;return g}catch(d){c.error({title:"Error",message:d.message})}}function v({webformatURL:o,largeImageURL:r,tags:a,likes:n,views:e,comments:t,downloads:i}){return`
<li class="gallery-item">
<a class="gallery-link" href="${r}">
<img src="${o}" alt='${a}'class="gallery-image"/>
</a>
<div class="caption-wrapper">
<p><span>Likes: </span>${n}</p>
<p><span>Views: </span>${e}</p>
<p><span>Comments: </span>${t}</p>
<p><span>Downloads: </span>${i}</p>
</div>
</li>`}function y(o){return o.map(v).join("")}const s={formEl:document.querySelector("#searchForm"),inputEl:document.querySelector("#searchInput"),submitBtn:document.querySelector("#submitButton"),searchRes:document.querySelector("#searchResults"),loaderEl:document.querySelector(".loader"),backdropEl:document.querySelector(".loader-backdrop"),loadMore:document.querySelector(".js-btn-load")},f=new b("#searchResults a",{overlay:!0,captions:!0,captionSelector:"img",captionType:"attr",captionsData:"alt",captionPosition:"bottom",captionDelay:250,captionClass:"caption",close:!0,showCounter:!0,enableKeyboard:!0,docClose:!0,clasName:"gallery-item-modal"});document.addEventListener("DOMContentLoaded",u);function u(){s.loaderEl.classList.add("visually-hidden"),s.backdropEl.classList.add("visually-hidden")}function E(){s.loaderEl.classList.remove("visually-hidden"),s.backdropEl.classList.remove("visually-hidden")}function S(){s.loadMore.classList.remove("visually-hidden")}function p(){s.loadMore.classList.add("visually-hidden")}let l=1,m;s.formEl.addEventListener("submit",w);async function w(o){if(o.preventDefault(),l=1,s.searchRes.innerHTML="",E(),!s.inputEl.value){c.error({title:"Error",message:"Please enter search parameters"}),u(),p();return}m=o.target.elements.query.value.trim().toLowerCase();try{const r=await h(m,l),a=r.hits;a.length===0&&(c.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"}),p());const n=y(a);s.searchRes.innerHTML=n,f.refresh(),r.totalHits>15&&S()}catch(r){c.error({title:"Error",message:r})}finally{u()}o.target.reset()}s.loadMore.addEventListener("click",q);async function q(){l++;const o=await h(m,l),r=o.hits,a=y(r),n=Math.ceil(o.totalHits/15);l===n&&(c.error({position:"topRight",message:"This is the last page"}),p()),s.searchRes.insertAdjacentHTML("beforeend",a);const e=s.searchRes.querySelector(".gallery-item").getBoundingClientRect().height;window.scrollBy({top:e*2,behavior:"smooth"}),f.refresh(),u()}
//# sourceMappingURL=commonHelpers.js.map
