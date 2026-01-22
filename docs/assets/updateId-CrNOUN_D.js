const l=function(n,t){if(n>=t.length)return t;let o=0;const e=[];for(;o<n;){const i=Math.floor(Math.random()*t.length);e.includes(t[i])||(e.push(t[i]),o++)}return e};export{l as updateId};
