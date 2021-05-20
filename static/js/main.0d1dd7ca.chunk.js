(this["webpackJsonpakomar812.github.io"]=this["webpackJsonpakomar812.github.io"]||[]).push([[0],{12:function(e,n,t){},19:function(e,n,t){},26:function(e,n,t){"use strict";t.r(n);var i=t(2),c=t.n(i),r=t(13),o=t.n(r),s=(t(19),t(4)),a=t(14),d="https://drive.google.com/uc?id=1gL7S3L4zUgKBmq7oiPxmhPQxeZ2Us2I0&export=download",u="https://www.linkedin.com/in/andrew-komar-24537036/",l="https://github.com/akomar812",h="akomar812@gmail.com",_=(t(12),t(0));var b=function(e){var n=Object(i.useState)(""),t=Object(s.a)(n,2),c=t[0],r=t[1],o=Object(i.useState)([]),b=Object(s.a)(o,2),j=b[0],p=b[1],m=Object(i.useState)(),f=Object(s.a)(m,2),w=f[0],O=f[1],v={help:"Print CLI usage",resume:'Resume view (or add "-d" for direct file download)',linkedin:"LinkedIn profile",github:"Github repos"},x=function(){var e=["    contact: ".concat(h),"\n","    cmd              description","    ---              -----------"];for(var n in v){for(var t="         ",i=0;i<8-n.length;i++)t+=" ";e.push("    ".concat(n).concat(t).concat(v[n]))}return e.push(""),e.push("    general"),e.push("    -------"),e.push("    enter an empty command to clear screen"),e.push('    add "-l" to linkedin, or github cmd to retrieve link w/o opening in new tab'),e.push(""),e.push("    known issues/pending features"),e.push("    -----------------------------"),e.push("    completed resume view"),e.push("    visual indication email copied when resume view button clicked"),e.push("\n"),e.join("\n")};return Object(i.useEffect)((function(){return p([["\n       ___            _                     _   __\n      / _ \\          | |                   | | / /\n     / /_\\ \\_ __   __| |_ __ _____      __ | |/ /  ___  _ __ ___   __ _ _ __\n     |  _  | '_ \\ / _` | '__/ _ \\ \\ /\\ / / |    \\ / _ \\| '_ ` _ \\ / _` | '__|\n     | | | | | | | (_| | | |  __/\\ V  V /  | |\\  \\ (_) | | | | | | (_| | |\n     \\_| |_/_| |_|\\__,_|_|  \\___| \\_/\\_/   \\_| \\_/\\___/|_| |_| |_|\\__,_|_|\n     ",x()].join("\n")])}),[]),Object(i.useEffect)((function(){return j.length>1?e.setHistory([].concat(Object(a.a)(e.history),[j[0]])):null}),[j]),Object(i.useEffect)((function(){var n=w>=0?e.history[w]:"";document.getElementById("cli-input").children[1].value=n,r(n)}),[w]),Object(_.jsx)("div",{className:"container",onClick:function(){return document.getElementById("cli-input").children[1].focus()},children:Object(_.jsxs)("div",{id:"cli-wrapper",children:[Object(_.jsx)("div",{id:"cli-history",children:j.map((function(e){return Object(_.jsx)("div",{className:"cli-history-item",children:e},(new Date).getTime()+1e3*Math.random())}))}),Object(_.jsxs)("div",{id:"cli-input",children:[Object(_.jsx)("span",{children:"$"}),Object(_.jsx)("input",{type:"text",onKeyDown:function(n){switch(n.keyCode){case 13:var t=j.slice();t.push(c),t.push(function(n){return""===n?n:n.indexOf("help")>=0?x():0===n.indexOf("resume")?n.indexOf("-d")>=0?(window.open(d,"_blank"),d):(window.setTimeout((function(){return e.showResume()}),500),"Opening..."):0===n.indexOf("linkedin")?(n.indexOf("-l")<0&&window.open(u,"_blank"),u):0===n.indexOf("github")?(n.indexOf("-l")<0&&window.open(l,"_blank"),l):"CMD not recognized: ".concat(n)}(c)),p(t.reverse().slice(0,2).reverse()),r(""),n.target.value="";break;case 38:e.history.length>0&&O(w&&w>0?w-1:w?void 0:e.history.length-1);break;case 40:e.history.length>0&&(w&&w<e.history.length-1?O(w+1):O(void 0))}},onChange:function(e){return r(e.target.value)}})]})]})})},j=t(5);function p(e){return Object(_.jsxs)("div",{id:"resume-header-controls",children:[Object(_.jsx)(j.a,{title:"Go to main CLI view",id:"cli-view",icon:"laptop-code",onClick:e.showCLI}),Object(_.jsx)(j.a,{title:"Download resume",id:"resume-file-download",icon:"file-download",onClick:function(){return window.open(d,"_blank")}}),Object(_.jsx)(j.a,{title:"Copy email to clipboard",id:"email",icon:"envelope",onClick:function(){return navigator.clipboard.writeText(h)}}),Object(_.jsx)(j.a,{title:"Open LinkedIn",id:"linkedin",icon:["fab","linkedin-in"],onClick:function(){return window.open(u,"_blank")}}),Object(_.jsx)(j.a,{title:"Open Github",id:"github",icon:["fab","github"],onClick:function(){return window.open(l,"_blank")}})]})}var m=function(e){return Object(_.jsx)("div",{className:"container",children:Object(_.jsxs)("div",{id:"resume-wrapper",children:[Object(_.jsxs)("div",{id:"resume-content-wrapper",children:[Object(_.jsx)("header",{id:"resume-header",children:Object(_.jsxs)("div",{id:"resume-header-info",children:[Object(_.jsx)("div",{id:"resume-header-name",children:"Andrew Komar"}),Object(_.jsx)("div",{id:"resume-header-title",children:"Full-Stack Javascript Developer"})]})}),Object(_.jsx)("div",{id:"resume-body",children:Object(_.jsx)("div",{id:"intro",children:Object(_.jsx)("p",{children:"This page is under active development, check back soon for further updates. In the mean time my resume is available for download as a file in the top right corner"})})})]}),Object(_.jsx)("div",{id:"resume-sidebar",children:Object(_.jsx)(p,{showCLI:e.showCLI})})]})})};var f=function(){var e,n=Object(i.useState)(),t=Object(s.a)(n,2),c=t[0],r=t[1],o=Object(i.useState)([]),a=Object(s.a)(o,2),d=a[0],u=a[1],l=function(){r("cli"),window.history.replaceState(null,"Main","/")},h=function(){r("resume"),window.history.replaceState(null,"Resume","#resume")};switch(Object(i.useEffect)((function(){return"#resume"===window.location.hash?h():l()}),[]),c){case"cli":e=Object(_.jsx)(b,{showResume:h,history:d,setHistory:u});break;case"resume":e=Object(_.jsx)(m,{showCLI:l})}return Object(_.jsx)("div",{className:"App",children:e})},w=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,27)).then((function(n){var t=n.getCLS,i=n.getFID,c=n.getFCP,r=n.getLCP,o=n.getTTFB;t(e),i(e),c(e),r(e),o(e)}))},O=t(3),v=t(8),x=t(11);O.b.add(v.c,v.b,x.b,x.a,v.a),o.a.render(Object(_.jsx)(c.a.StrictMode,{children:Object(_.jsx)(f,{})}),document.getElementById("root")),w()}},[[26,1,2]]]);
//# sourceMappingURL=main.0d1dd7ca.chunk.js.map