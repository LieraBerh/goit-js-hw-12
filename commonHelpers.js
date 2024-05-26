import{a as L,i as c,S as b}from"./assets/vendor-f144e563.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function a(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=a(e);fetch(e.href,t)}})();async function p(r){const s="43995024-c8f5c7e28b3078307d7d8500b",a="https://pixabay.com",n="/api/",e=new URLSearchParams({key:s,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:d,per_page:f}),t=`${a}${n}?${e}`;try{const i=await L.get(t),{data:g}=i;return g}catch(i){c.error({title:"Error",message:i.message})}}function v({webformatURL:r,largeImageURL:s,tags:a,likes:n,views:e,comments:t,downloads:i}){return`
<li class="gallery-item">
<a class="gallery-link" href="${s}">
<img src="${r}" alt='${a}'class="gallery-image"/>
</a>
<div class="caption-wrapper">
<p><span>Likes: </span>${n}</p>
<p><span>Views: </span>${e}</p>
<p><span>Comments: </span>${t}</p>
<p><span>Downloads: </span>${i}</p>
</div>
</li>`}function m(r){return r.map(v).join("")}const o={formEl:document.querySelector("#searchForm"),inputEl:document.querySelector("#searchInput"),submitBtn:document.querySelector("#submitButton"),searchRes:document.querySelector("#searchResults"),loaderEl:document.querySelector(".loader"),backdropEl:document.querySelector(".loader-backdrop"),loadMore:document.querySelector(".js-btn-load")},h=new b("#searchResults a",{overlay:!0,captions:!0,captionSelector:"img",captionType:"attr",captionsData:"alt",captionPosition:"bottom",captionDelay:250,captionClass:"caption",close:!0,showCounter:!0,enableKeyboard:!0,docClose:!0,clasName:"gallery-item-modal"});document.addEventListener("DOMContentLoaded",l);function l(){o.loaderEl.classList.add("visually-hidden"),o.backdropEl.classList.add("visually-hidden")}function E(){o.loaderEl.classList.remove("visually-hidden"),o.backdropEl.classList.remove("visually-hidden")}function y(){o.loadMore.classList.remove("visually-hidden")}function S(){o.loadMore.classList.add("visually-hidden")}let d=1,f=100,u;o.formEl.addEventListener("submit",w);async function w(r){if(r.preventDefault(),d=1,o.searchRes.innerHTML="",E(),!o.inputEl.value){c.error({title:"Error",message:"Please enter search parameters"}),l();return}u=r.target.elements.query.value.trim().toLowerCase();try{const a=(await p(u)).hits;a.length===0&&c.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"});const n=m(a);o.searchRes.innerHTML=n,h.refresh(),l(),y()}catch(s){c.error({title:"Error",message:s}),l()}r.target.reset()}o.loadMore.addEventListener("click",q);async function q(){d++;const r=await p(u),s=r.hits,a=m(s),n=Math.ceil(r.totalHits/f),e=o.searchRes.querySelector(".gallery-item").getBoundingClientRect().height;window.scrollBy({top:e*2,behavior:"smooth"}),d===n&&(c.error({position:"topRight",message:"This is the last page"}),S()),o.searchRes.insertAdjacentHTML("beforeend",a),h.refresh(),l(),y()}
//# sourceMappingURL=commonHelpers.js.map
