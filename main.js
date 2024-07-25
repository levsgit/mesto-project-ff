(()=>{"use strict";var e={d:(t,o)=>{for(var n in o)e.o(o,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:o[n]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};function t(e){e.classList.add("popup_is-opened"),e.querySelector(".popup__button").textContent="Сохранить",document.addEventListener("keydown",r)}function o(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",r)}function n(e){var t=e.target.closest(".popup");(e.target.classList.contains("popup")||e.target.classList.contains("popup__close"))&&o(t)}function r(e){"Escape"===e.key&&document.querySelector(".popup_is-opened").classList.remove("popup_is-opened")}e.d({},{Gv:()=>U,oK:()=>M,xz:()=>A,N5:()=>N,jz:()=>B,Dg:()=>w,$w:()=>I,hg:()=>F,Mt:()=>G});var c=/^[a-zA-Zа-яА-ЯёЁ -]+$/,a=/^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-\.]*)*\/?(\?[;&a-z\d%_.~+=-]*)?(#[\w\-]*)?$/i,s=function(e,t,o,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.add(n.inputErrorClass),r.textContent=o,r.classList.add(n.errorClass)},u=function(e,t,o){var n=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(o.inputErrorClass),n.classList.remove(o.errorClass),n.textContent=""},i=function(e){return e.some((function(e){return e.classList.contains("popup__input_type_url")?!(a.test(e.value)&&e.validity.valid):!(c.test(e.value)&&e.validity.valid)}))},l=function(e,t,o){console.log(i(e)),i(e)?(t.classList.add(o.inactiveButtonClass),t.disabled=!0):(t.classList.remove(o.inactiveButtonClass),t.disabled=!1)};function d(e,t){var o=e.querySelectorAll(t.inputSelector),n=e.querySelector(t.submitButtonSelector);o.forEach((function(o){u(e,o,t)})),n.classList.add(t.inactiveButtonClass),n.disabled=!0}var p=document.querySelector("#card-template").content,_=document.querySelector(".profile__title"),m=document.querySelector(".profile__description"),f=function(e){var t=e.target.closest(".places__item");console.log(t),k(t,t.id)},v=function(e){var t=e.target.closest(".places__item");console.log(e.target),e.target.classList.contains("card__like-button_is-active")?E(e.target,t.id):L(e.target,t.id)};function y(e,t,o,n){console.log(e);var r=e.link,c=e.name,a=e.owner.name,s=e.owner.about,u=_.textContent,i=m.textContent,l=e._id,d=e.likes.length,f=p.querySelector(".places__item").cloneNode(!0),v=f.querySelector(".card__image"),y=f.querySelector(".card__like-button"),h=f.querySelector(".card__like-counter");return v.src=r,v.alt=c,f.id=l,f.querySelector(".card__title").textContent=c,y.addEventListener("click",o),v.addEventListener("click",n),u==a&&i==s?f.querySelector(".card__delete-button").addEventListener("click",t):f.querySelector(".card__delete-button").remove(),e.likes.some((function(e){return e.name===u&&e.about===i}))&&y.classList.add("card__like-button_is-active"),h.textContent=d,f}var h={baseUrl:"https://nomoreparties.co/v1/wff-cohort-18",headers:{authorization:"05a3400d-0d76-4a29-a3d8-b38762bb0cca","Content-Type":"application/json"}},S=document.querySelector(".places__list"),b=document.querySelector(".profile__image"),g=document.querySelector(".profile__title"),q=document.querySelector(".profile__description"),k=function(e,t){return console.log(t),fetch("".concat(h.baseUrl,"/cards/").concat(t),{method:"DELETE",headers:h.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).then((function(t){e.remove()})).catch((function(e){console.log(e)}))},L=function(e,t){return fetch("".concat(h.baseUrl,"/cards/likes/").concat(t),{method:"PUT",headers:h.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).then((function(o){document.getElementById(t).querySelector(".card__like-counter").textContent=o.likes.length,e.classList.add("card__like-button_is-active")})).catch((function(e){console.log(e)}))},E=function(e,t){return fetch("".concat(h.baseUrl,"/cards/likes/").concat(t),{method:"DELETE",headers:h.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).then((function(o){console.log("dislike"),document.getElementById(t).querySelector(".card__like-counter").textContent=o.likes.length,e.classList.remove("card__like-button_is-active")})).catch((function(e){console.log(e)}))},C={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},x=document.querySelector(".profile__add-button"),j=document.querySelector(".profile__image-edit-button"),P=document.querySelector(".profile__edit-button"),w=document.querySelector(".popup_type_new-card"),U=document.querySelector(".popup_type_edit"),A=document.querySelector(".popup_type_edit_avatar"),B=A.querySelector(C.formSelector),T=U.querySelector(C.formSelector),D=document.querySelector(".popup_type_image"),O=D.querySelector(".popup__image"),z=D.querySelector(".popup__caption"),M=U.querySelector(".popup__button"),N=A.querySelector(".popup__button"),I=w.querySelector(".popup__button");fetch("".concat(h.baseUrl,"/users/me"),{method:"GET",headers:h.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).then((function(e){b.style.backgroundImage="url('"+e.avatar+"')",g.textContent=e.name,q.textContent=e.about,fetch("".concat(h.baseUrl,"/cards"),{method:"GET",headers:h.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).then((function(e){e.forEach((function(e){console.log(e),S.append(y(e,f,v,G))}))})).catch((function(e){console.log(e)}))})).catch((function(e){console.log(e)}));var G=function(e){var o=e.target.closest(".places__item"),n=o.querySelector(".card__image"),r=o.querySelector(".card__title");O.src=n.src,O.alt=n.alt,z.textContent=r.textContent,t(D)};document.querySelectorAll(".popup").forEach((function(e){return e.addEventListener("click",n)}));var J=document.querySelector(".profile__title"),$=document.querySelector(".profile__description"),H=document.forms["edit-profile"],K=H.elements.name,Z=H.elements.description;j.addEventListener("click",(function(e){t(A),d(B,C)})),P.addEventListener("click",(function(e){t(U),d(T,C),K.value=J.textContent,Z.value=$.textContent})),H.addEventListener("submit",(function(e){var t,n;e.preventDefault(),t=H.elements.name.value,n=H.elements.description.value,M.textContent="Сохранение...",fetch("".concat(h.baseUrl,"/users/me"),{method:"PATCH",headers:h.headers,body:JSON.stringify({name:t,about:n})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).then((function(e){g.textContent=e.name,q.textContent=e.about,o(U)})).catch((function(e){console.log(e)}))}));var F=document.forms["new-place"],Q=F.elements["place-name"],R=F.elements.link;x.addEventListener("click",(function(){t(w),d(F,C)})),F.addEventListener("submit",(function(e){var t,n;e.preventDefault(),t=Q.value,n=R.value,I.textContent="Сохранение...",fetch("".concat(h.baseUrl,"/cards"),{method:"POST",headers:h.headers,body:JSON.stringify({name:t,link:n})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).then((function(e){S.prepend(y(e,f,v,G)),o(w),F.reset()})).catch((function(e){console.log(e)}))})),B.addEventListener("submit",(function(e){var t;e.preventDefault(),t=e.target.elements["avatar-link-input"].value,N.textContent="Сохранение",fetch("".concat(h.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:h.headers,body:JSON.stringify({avatar:t})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).then((function(e){b.style.backgroundImage="url('"+e.avatar+"')",o(A),B.reset()})).catch((function(e){console.log(e)}))})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){t.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){var o=Array.from(e.querySelectorAll(t.inputSelector)),n=e.querySelector(t.submitButtonSelector);o.forEach((function(r){r.classList.contains("popup__input_type_url")?r.addEventListener("input",(function(){!function(e,t,o){var n=!a.test(t.value)&&t.value?t.dataset.errorMessage:t.validationMessage;a.test(t.value)&&t.validity.valid?u(e,t,o):s(e,t,n,o)}(e,r,t),l(o,n,t)})):r.addEventListener("input",(function(){!function(e,t,o){var n=!c.test(t.value)&&t.value?t.dataset.errorMessage:t.validationMessage;c.test(t.value)&&t.validity.valid?u(e,t,o):s(e,t,n,o)}(e,r,t),l(o,n,t)}))}))}(t,e)}))}(C)})();