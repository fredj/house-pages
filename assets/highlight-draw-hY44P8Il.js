var e=`http://www.w3.org/2000/svg`,t=0,n=`
@layer highlight {
  @scope {
    :scope { position: absolute; inset: 0; pointer-events: none; }
    svg {
      position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible;
      --glow: var(--highlight-glow, #5b63e6);
      --core: var(--highlight-core, #f2f3ff);
      --edge: var(--highlight-edge, #23287a);
      .halo feFlood { flood-color: var(--glow); }
      .edge feFlood { flood-color: var(--edge); }
      .core feFlood { flood-color: var(--core); }
      .halo use { opacity: .2; }
      .edge use { opacity: .7; }
      &.selected .halo use { opacity: .3; }
      &.focus .halo use { opacity: .4; }
    }
    .wash { fill: var(--highlight-wash, var(--ground, #fbf1e4)); opacity: .6; }
    .highlight-label {
      position: absolute; padding: 2px 7px; border-radius: 8px; white-space: nowrap; transform: translate(0, -100%);
      font: 600 12px var(--font-family, system-ui, sans-serif); font-variant-numeric: tabular-nums; color: var(--control, #fff);
      background: color-mix(in srgb, var(--highlight-edge, #23287a) 93%, transparent); box-shadow: 0 1px 3px rgb(0 0 0 / .3);
      &.end { transform: translate(-100%, -100%); }
    }
  }
}
`,r={selected:{halo:2,edge:2,core:1},focus:{halo:3,edge:2,core:1}},i=6,a=24;function o([e,t,n],r,o,s=0){let c=Math.min(o,Math.max(a,t-i));return n+i+s<r?{x:n+i,y:c,align:`start`}:{x:r-i,y:c,align:`end`}}var s=2,c=14;function l(e,t){let n=``,r;for(let i=0;i<t.length;i+=3){let a=[0,1,2].map(n=>[e[2*t[i+n]],e[2*t[i+n]+1]]);if(a.some(([e,t])=>!Number.isFinite(e)||!Number.isFinite(t)))continue;let[[o,s],[c,l],[u,d]]=a,[f,p,m]=(c-o)*(d-s)-(l-s)*(u-o)<0?[a[0],a[2],a[1]]:a;n+=`M${f[0].toFixed(1)} ${f[1].toFixed(1)}L${p[0].toFixed(1)} ${p[1].toFixed(1)}L${m[0].toFixed(1)} ${m[1].toFixed(1)}Z`,r=a.reduce(([e,t,n,r],[i,a])=>[Math.min(e,i),Math.min(t,a),Math.max(n,i),Math.max(r,a)],r??[1/0,1/0,-1/0,-1/0])}return n?{d:n,box:r}:void 0}function u(i,{state:a=`selected`,label:l=``}={}){let u=`highlight-${++t}`,d=i.createElement(`div`);d.className=`highlight`;let f=i.createElement(`style`);f.textContent=n;let p=i.createElementNS(e,`svg`),m=(t,n,r={})=>{let a=i.createElementNS(e,n);return Object.entries(r).forEach(([e,t])=>a.setAttribute(e,t)),t.append(a),a},h=m(p,`defs`),g=m(h,`path`,{id:`${u}-shape`}),_=Object.fromEntries([`halo`,`edge`,`core`].map(e=>{let t=m(h,`filter`,{id:`${u}-${e}`,class:e,filterUnits:`userSpaceOnUse`}),n=m(t,`feMorphology`,{in:`SourceAlpha`,operator:`dilate`,radius:1,result:`grown`});m(t,`feGaussianBlur`,{in:`grown`,stdDeviation:e===`halo`?s:0,result:`soft`}),m(t,`feComposite`,{in:`soft`,in2:`SourceAlpha`,operator:`out`,result:`ring`}),m(t,`feFlood`,{result:`color`}),m(t,`feComposite`,{in:`color`,in2:`ring`,operator:`in`});let r=m(p,`g`,{class:e});return m(r,`use`,{href:`#${u}-shape`,filter:`url(#${u}-${e})`}),[e,{filter:t,grown:n}]})),v=i.createElement(`div`);v.className=`highlight-label`,v.textContent=l,d.append(f,p,v);let y=(e,t,n)=>{g.setAttribute(`d`,e?.d??``),v.hidden=!e||!v.textContent;let r=!v.hidden&&o(e.box,t,n,v.offsetWidth);if(r&&(v.className=`highlight-label ${r.align} ${a}`,v.style.left=`${r.x}px`,v.style.top=`${r.y}px`),e){let[t,n,r,i]=e.box;for(let{filter:e}of Object.values(_))for(let[a,o]of Object.entries({x:t-c,y:n-c,width:r-t+28,height:i-n+28}))e.setAttribute(a,o)}},b=+!!i.defaultView?.matchMedia?.(`(pointer: coarse)`).matches;p.setAttribute(`class`,a);for(let[e,{grown:t}]of Object.entries(_)){let n=r[a][e];t.setAttribute(`radius`,n?n+b:0)}return{element:d,draw:y,get label(){return v.textContent},set label(e){v.textContent=e??``}}}function d(r){let i=`wash-${++t}`,a=r.createElement(`div`);a.className=`highlight`;let o=r.createElement(`style`);o.textContent=n;let s=r.createElementNS(e,`svg`);s.innerHTML=`<defs><mask id="${i}" maskUnits="userSpaceOnUse"><rect width="100%" height="100%" fill="#fff"/><path fill="#000"/></mask></defs><rect class="wash" width="100%" height="100%" mask="url(#${i})"/>`;let c=s.querySelector(`path`);return a.append(o,s),{element:a,draw:e=>c.setAttribute(`d`,e)}}export{l as n,d as r,u as t};