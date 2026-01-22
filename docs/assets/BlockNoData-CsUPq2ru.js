import{r as n,j as o}from"./index-BiMocF0J.js";import{B as i}from"./button-BqYt4prX.js";import{b as m}from"./App-DgAS--C1.js";import"./utils-C8Glf1-z.js";import"./auth-CGzzABdO.js";import"./firebase-B7YxRMPJ.js";function c({variant:r,startWeight:t,targetWeight:a}){const s=m(),e={weight:`
        ${t?"начальный вес":""} 
        ${t&&a?"и":""} 
        ${a?"цель":""}
    `,callories:"допустимое количество калорий в день"};return o.jsxs(o.Fragment,{children:[o.jsx("p",{className:"text-center",children:`Для отображения данного блока необходимо указать ${e[r]}`}),o.jsx(i,{variant:"rose",className:"block ml-auto mr-0 mt-4 leading-4",onClick:()=>s("/settings"),children:"Указать"})]})}const j=n.memo(c);export{j as default};
