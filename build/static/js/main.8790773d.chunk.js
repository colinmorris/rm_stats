(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{22:function(e,t,n){e.exports=n.p+"static/media/octocat.2203be16.svg"},27:function(e,t,n){e.exports=n(42)},33:function(e,t,n){},34:function(e,t,n){},35:function(e,t,n){},36:function(e,t,n){},41:function(e,t,n){},42:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(21),s=n.n(o),i=(n(32),n(33),n(2)),c=n(3),l=n(4),u=n(1),h=n(5),m=n(9),p=n(8),d=(n(34),n(35),n(22)),f=n.n(d),b=(n(36),"/rmstats"),v="*UNK",y={RM:"RM",date:"Date",outcome:"Outcome",mentions:"Mentions",vote:"!Vote",size:"Participants",comments:"Comments"},k=50;var g={moved:"yes",notmoved:"no",nc:"nc",unknown:"unk"},E={moved:["moved","page moved","consensus to move","move","move all","moved as proposed","pages moved","done","moved as requested","moved all","moved per request"],notmoved:["not moved","consensus against","consensus not to move","consensus against move","withdrawn","withdrawn by nominator","withdrawn by nom","page not moved","no move"],nc:["no consensus","no consensus to move","no consensus at this time","no consensus for move"]},O=function(){function e(t){Object(i.a)(this,e),this.str=t,null===this.str&&(this.str="")}return Object(c.a)(e,[{key:"normalized",get:function(){return this.cleaned.toLowerCase()}},{key:"cleaned",get:function(){var e=this.str;return e=(e=(e=(e=e.replace(/\[\[([^|\]]+?)\]\]/g,"$1")).replace(/\[\[[^\]|]*\|([^\]]*)\]\]/g,"$1")).replace(/^[']+/,"").replace(/['.;:]+$/,"")).trim()}}]),e}(),j=function(e){function t(){return Object(i.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(c.a)(t,[{key:"outcome",get:function(){for(var e=this.normalized,t=0,n=Object.keys(E);t<n.length;t++){var a=n[t],r=!0,o=!1,s=void 0;try{for(var i,c=E[a][Symbol.iterator]();!(r=(i=c.next()).done);r=!0){if(e===i.value)return g[a]}}catch(l){o=!0,s=l}finally{try{r||null==c.return||c.return()}finally{if(o)throw s}}}return g.unknown}}]),t}(O),w={support:"supp",oppose:"opp",weakSupport:"weak-supp",weakOppose:"weak-opp",strongSupport:"strong-supp",strongOppose:"strong-opp",comment:"comment",neutral:"neut",unknown:"unk"},S={support:["support","support as proposed","support all"],oppose:["oppose","oppose all"],weakSupport:["weak support"],weakOppose:["weak oppose"],strongSupport:["strong support"],strongOppose:["strong oppose"],comment:["comment"],neutral:["neutral"]},_=function(e){function t(){return Object(i.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(c.a)(t,[{key:"vote",get:function(){for(var e=this.normalized,t=0,n=Object.keys(S);t<n.length;t++){var a=n[t],r=!0,o=!1,s=void 0;try{for(var i,c=S[a][Symbol.iterator]();!(r=(i=c.next()).done);r=!0){if(e===i.value)return w[a]}}catch(l){o=!0,s=l}finally{try{r||null==c.return||c.return()}finally{if(o)throw s}}}return w.unknown}}]),t}(O),x=function(e){function t(){return Object(i.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(c.a)(t,[{key:"renderCol",value:function(e){var t,n={},a=[e.replace("!","")],o=this.props.dat;switch(e){case y.RM:t=r.a.createElement("span",null,r.a.createElement("a",{href:this.rm_link},o.from_title," ","\u2192"," ",o.to_title||"?"),o.n_articles>1&&r.a.createElement("small",{className:"multimove-indicator",title:"This RM involved ".concat(o.n_articles," total renames")},"+",o.n_articles-1));break;case y.date:t=o.close_date.split(" ")[0];break;case y.outcome:var s=new j(o.outcome);t=s.cleaned,a.push("outcome-"+s.outcome);break;case y.size:t=o.n_participants-1;break;case y.mentions:t=o.n_mentions;break;case y.vote:if(a.push("role-"+o.role),"nom"===o.role)t="Nominator";else if("close"===o.role)t="Closer";else{var i=new _(o.vote);t=i.cleaned,a.push("vote-"+i.vote)}break;case y.comments:t=o.n_comments;break;default:console.error("Unrecognized RM table heading: "+e)}return"number"===typeof t&&(t=t.toLocaleString()),r.a.createElement("td",Object.assign({key:e,className:a.join(" ")},n),t)}},{key:"render",value:function(){var e=this.props.headings.map(this.renderCol.bind(this));return r.a.createElement("tr",null,e)}},{key:"rm_link",get:function(){return"https://en.wikipedia.org/wiki/"+this.props.dat.rm_link}}]),t}(r.a.Component),R=n(23),C=n(12),M=function(e){function t(){return Object(i.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement("button",{type:"button",className:"btn btn-primary btn-lg expander",onClick:this.props.onExpand},"Show More")}}]),t}(r.a.Component),N=function(e){function t(){return Object(i.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this.props.headings.map(function(e,t){return r.a.createElement("th",{className:e.replace("!",""),key:e},e)});return r.a.createElement("div",{className:"table-container"},r.a.createElement("table",{className:"wikitable"},r.a.createElement("thead",null,r.a.createElement("tr",null,e)),r.a.createElement("tbody",null,this.props.children)),this.props.expandable&&r.a.createElement(M,{onExpand:this.props.onExpand}))}}]),t}(r.a.Component),T=function(e){function t(e){var n;Object(i.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).sortKeys=[],n.apiSensitiveStateVars=["n","sortKey"],n.state={rows:[],n:k,sortKey:n.defaultSortKey};var a=!0,r=!1,o=void 0;try{for(var s,c=n.checkboxes[Symbol.iterator]();!(a=(s=c.next()).done);a=!0){var h=s.value;n.state[h.statevar]=h.initialValue,h.apiInsensitive||n.apiSensitiveStateVars.push(h.statevar)}}catch(m){r=!0,o=m}finally{try{a||null==c.return||c.return()}finally{if(r)throw o}}return n.onExpand=n.onExpand.bind(Object(C.a)(n)),n.handleSortChange=n.handleSortChange.bind(Object(C.a)(n)),n}return Object(h.a)(t,e),Object(c.a)(t,[{key:"onExpand",value:function(){this.setState(function(e){return{n:e.n+50}})}},{key:"handleSortChange",value:function(e){this.setState({sortKey:e.target.value})}},{key:"componentDidMount",value:function(){this.updateRowFetch()}},{key:"shouldRefetchRows",value:function(e,t){var n=this;return this.apiSensitiveStateVars.some(function(e){return function(e){return n.state[e]!==t[e]}(e)})}},{key:"componentDidUpdate",value:function(e,t){this.shouldRefetchRows(e,t)&&this.updateRowFetch()}},{key:"updateRowFetch",value:function(){var e=this;this.rows_api_call().then(function(t){e.setState({rows:t})})}},{key:"renderRow",value:function(){console.error("Abstract method not implemented.")}},{key:"renderControls",value:function(){return r.a.createElement("form",null,this.renderSortControls(),this.renderCheckboxes())}},{key:"renderCheckboxes",value:function(){var e=this;if(0!==this.checkboxes.length){var t=this.checkboxes.map(function(t){var n=t.statevar,a=t.label;return r.a.createElement("div",{key:n,className:"form-check form-check-inline"},r.a.createElement("input",{className:"form-check-input",type:"checkbox",value:n,id:"cb-"+n,checked:e.state[n],onChange:function(t){e.setState(Object(R.a)({},n,t.target.checked))}}),r.a.createElement("label",{className:"form-check-label",htmlFor:"cb-"+n},a))});return r.a.createElement(r.a.Fragment,null,t)}}},{key:"renderSortControls",value:function(){var e=this;if(0!==this.sortKeys.length){var t=this.sortKeys.map(function(t){var n=t.key,a=t.label,o=t.title;return r.a.createElement("div",{key:n,className:"form-check form-check-inline"},r.a.createElement("input",{className:"form-check-input",type:"radio",value:n,id:"sortradio-"+n,checked:e.state.sortKey===n,onChange:e.handleSortChange}),r.a.createElement("label",{className:"form-check-label",htmlFor:"sortradio-"+n,title:o},a))});return r.a.createElement(r.a.Fragment,null,t)}}},{key:"renderTable",value:function(){var e=this,t=this.state.rows.map(function(t){return e.renderRow(t)});return r.a.createElement(r.a.Fragment,null,this.renderControls(),r.a.createElement(N,{headings:this.headings,onExpand:this.onExpand,expandable:this.state.rows.length===this.state.n},t))}},{key:"render",value:function(){return this.renderTable()}},{key:"checkboxes",get:function(){return[]}},{key:"defaultSortKey",get:function(){}}]),t}(r.a.Component),K=function(e){function t(){var e,n;Object(i.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).base_headings=[y.RM,y.date,y.outcome,y.size],n.extra_headings=[],n}return Object(h.a)(t,e),Object(c.a)(t,[{key:"renderRow",value:function(e){if((t=e).from_title!==v&&null!==t.outcome){var t,n=e.rm_id+(e.role?e.role:"");return r.a.createElement(x,{key:n,headings:this.headings,dat:e})}}},{key:"headings",get:function(){return this.base_headings.concat(this.extra_headings)}}]),t}(T);function F(e,t){var n=Object.fromEntries(Object.entries(t).map(function(e){var t=e[0],n=e[1];return[t,"boolean"===typeof n?n?"1":"0":n]})),a=new URLSearchParams(n).toString();return e+(a&&"?")+a}function L(e,t){e.startsWith("/")||(e="/"+e);var n=F(window.location.origin+b+"/api"+e,t);return window.fetch(n,{headers:{Accept:"application/json"}}).then(function(e){return e.json()})}function q(e){return e.replace(/ /g,"_")}function P(e){return"/users/"+q(e)}function A(e){return r.a.createElement(m.b,{to:"/policies/"+e},e)}var I=function(e){function t(){var e,n;Object(i.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).extra_headings=[y.mentions],n}return Object(h.a)(t,e),Object(c.a)(t,[{key:"rows_api_call",value:function(){return e=this.polname,t=this.state.n,L("policy/"+e,{n:t});var e,t}},{key:"render",value:function(){return r.a.createElement("section",null,r.a.createElement("h1",null,"RM discussions invoking ",function(e){var t="https://en.wikipedia.org/wiki/"+e;return r.a.createElement("a",{href:t},e)}(this.polname)),this.renderTable())}},{key:"polname",get:function(){return this.props.match.params.pol}}]),t}(K),U=function(e){function t(){return Object(i.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(c.a)(t,[{key:"render_expansion",value:function(){if(null===this.props.dat.expanded)return r.a.createElement("a",{href:this.pol_link,className:"redlink"},this.props.dat.pol);var e=this.props.dat.expanded.replace(/^Wikipedia:/,"");return r.a.createElement("a",{href:this.pol_link},e)}},{key:"render",value:function(){return r.a.createElement("tr",null,r.a.createElement("td",{className:"Shortcut"},A(this.pol)),r.a.createElement("td",null,this.props.dat.n.toLocaleString()),r.a.createElement("td",{className:"Policy"},this.render_expansion()))}},{key:"pol",get:function(){var e=this.props.dat;return e.pol||e.canon}},{key:"pol_link",get:function(){return"https://en.wikipedia.org/wiki/"+this.pol}}]),t}(r.a.Component),W=function(e){function t(){var e,n;Object(i.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).headings=["Shortcut","Mentions","Policy"],n}return Object(h.a)(t,e),Object(c.a)(t,[{key:"rows_api_call",value:function(){return e=this.state.n,t=this.state.collapse,L("policies",{n:e,collapse:t});var e,t}},{key:"renderRow",value:function(e){return r.a.createElement(U,{key:e.pol||e.canon,dat:e})}},{key:"render",value:function(){return r.a.createElement("section",null,r.a.createElement("h1",null,"Most cited policy shortcuts"),this.renderTable())}},{key:"checkboxes",get:function(){return[{statevar:"collapse",label:"Combine aliases",initialValue:!0}]}}]),t}(T),z=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).doSearch=n.doSearch.bind(Object(C.a)(n)),n}return Object(h.a)(t,e),Object(c.a)(t,[{key:"doSearch",value:function(e){e.preventDefault();var t={q:document.getElementById("searchField").value};!0===document.getElementById("caseSensitiveBox").checked&&(t.case="1");var n=F("/rms/search",t);this.props.history.push(n)}},{key:"render",value:function(){return r.a.createElement("form",{className:"searchform"},r.a.createElement("input",{id:"searchField",type:"search",defaultValue:this.props.query}),r.a.createElement("button",{className:"btn-search",onClick:this.doSearch},"Search"),r.a.createElement("label",null,r.a.createElement("input",{id:"caseSensitiveBox",type:"checkbox",checked:!0===this.props.case_sensitive,onChange:this.doSearch}),"Case-sensitive"))}}]),t}(r.a.Component),B=Object(p.f)(z),D=function(e){function t(){var e,n;Object(i.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).sortKeys=[{key:"big",label:"Popular",title:"RMs with most comments"},{key:"recent",label:"Recent"},{key:"random",label:"Random"}],n}return Object(h.a)(t,e),Object(c.a)(t,[{key:"rows_api_call",value:function(){return e=this.state.sortKey,L("rms",{n:this.state.n,sort:e});var e}},{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement("h1",null,"RMs"),r.a.createElement(B,null),this.renderTable())}},{key:"defaultSortKey",get:function(){return"recent"}},{key:"headings",get:function(){var e=this.base_headings;return"big"===this.state.sortKey&&(e=e.concat([y.comments])),e}}]),t}(K),V=n(26),H=function(e){function t(){return Object(i.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(c.a)(t,[{key:"updateRowFetch",value:function(){var e,t,n,a=this;this.query?(e=this.query,t=this.state.n,n=this.case_sensitive,L("rms/search",{n:t,query:e,case:n})).then(function(e){a.setState({rows:e})}):this.setState({rows:[]})}},{key:"shouldRefetchRows",value:function(e,n){return e.location.search!==this.props.location.search||Object(V.a)(Object(u.a)(t.prototype),"shouldRefetchRows",this).call(this,e,n)}},{key:"render",value:function(){return r.a.createElement("section",null,r.a.createElement("h1",null,"RM Search"),r.a.createElement(B,{query:this.query,case_sensitive:this.case_sensitive}),this.renderTable())}},{key:"qStringParams",get:function(){return new URLSearchParams(this.props.location.search)}},{key:"query",get:function(){return this.qStringParams.get("q")}},{key:"case_sensitive",get:function(){return"1"===this.qStringParams.get("case")}}]),t}(K),J=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).state={redirect:!1},n}return Object(h.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this;if(this.state.redirect){var t=document.getElementById("userlookup").value;return r.a.createElement(p.a,{to:P(t)})}return r.a.createElement("form",{className:"searchform"},r.a.createElement("input",{id:"userlookup",type:"search"}),r.a.createElement("button",{className:"btn-search",onClick:function(t){t.preventDefault(),e.setState({redirect:!0})}},"User lookup"))}}]),t}(r.a.Component),$=function(e){function t(){var e,n;Object(i.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).headings=["User","!Votes","Nominations","Closes","Total"],n.sortKeys=[{key:"votes",label:"!Votes"},{key:"noms",label:"Nominations"},{key:"closes",label:"Closes"},{key:"all",label:"All"}],n}return Object(h.a)(t,e),Object(c.a)(t,[{key:"rows_api_call",value:function(){return e=this.state.sortKey,t=this.state.n,L("users/top",{sort:e,n:t});var e,t}},{key:"renderRow",value:function(e){return r.a.createElement("tr",{key:e.user},r.a.createElement("td",null,(t=e.user,r.a.createElement(m.b,{to:P(t)},t))),r.a.createElement("td",null,e.votes.toLocaleString()),r.a.createElement("td",null,e.noms.toLocaleString()),r.a.createElement("td",null,e.closes.toLocaleString()),r.a.createElement("td",null,e.all.toLocaleString()));var t}},{key:"render",value:function(){return r.a.createElement("section",null,r.a.createElement("h1",null,"Users"),r.a.createElement(J,null),r.a.createElement("h2",null,"Most active users"),this.renderTable())}},{key:"defaultSortKey",get:function(){return"all"}}]),t}(T),G=(n(41),function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).state={expanded:!1},n.limit=15,n.collapse=n.collapse.bind(Object(C.a)(n)),n.expand=n.expand.bind(Object(C.a)(n)),n}return Object(h.a)(t,e),Object(c.a)(t,[{key:"collapse",value:function(){this.setState({expanded:!1})}},{key:"expand",value:function(){this.setState({expanded:!0})}},{key:"render",value:function(){var e=Object.entries(this.props.counts).sort(function(e,t){return t[1]-e[1]}).map(function(e){var t=e[0],n=e[1];return r.a.createElement("li",{key:t},A(t),"\xd7",n)}),t="",n="btn btn-primary btn-sm polcount-resizer";return this.state.expanded?t=r.a.createElement("button",{className:n,onClick:this.collapse,title:"Less"},"-"):this.limit<Object.keys(this.props.counts).length&&(e=e.slice(0,this.limit),t=r.a.createElement("button",{className:n,onClick:this.expand,title:"More"},"+")),r.a.createElement("div",null,r.a.createElement("ul",{className:"horiz"},e,t))}}]),t}(r.a.Component)),Y=function(e){function t(){var e,n;Object(i.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).sortKeys=[{key:"close",label:"Closed"},{key:"nom",label:"Nominated"},{key:"vote",label:"Participated"},{key:"all",label:"All"}],n}return Object(h.a)(t,e),Object(c.a)(t,[{key:"rows_api_call",value:function(){return e=this.props.username,t=this.state.n,n=this.state.sortKey,L("user/rms",{user:e,n:t,role:n});var e,t,n}},{key:"headings",get:function(){var e=[];return"vote"===this.state.sortKey|"all"===this.state.sortKey&&(e=[y.vote]),this.base_headings.concat(e)}},{key:"defaultSortKey",get:function(){return"all"}}]),t}(K),X=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).state={activity:{},polcounts:{},loaded:!1},n}return Object(h.a)(t,e),Object(c.a)(t,[{key:"fetchStats",value:function(){var e,t=this;(e=this.username,L("user/stats",{user:e})).then(function(e){t.setState({activity:e.activity,polcounts:e.polcounts,loaded:!0})})}},{key:"componentDidMount",value:function(){this.fetchStats()}},{key:"render",value:function(){return this.state.loaded?this.state.loaded&&0===this.state.activity.all?this.render_nouser():this.render_extant():r.a.createElement("h1",null,"RM stats for user ",this.username)}},{key:"render_nouser",value:function(){return r.a.createElement("section",null,r.a.createElement("h1",null,"User ",this.username," not found"),r.a.createElement(J,null))}},{key:"render_extant",value:function(){var e=this.state.activity;return r.a.createElement("section",null,r.a.createElement("h1",null,"RM stats for user ",this.username),r.a.createElement("p",null,this.username," has participated in ",e.all," RMs:"),r.a.createElement("ul",null,r.a.createElement("li",null,e.noms.toLocaleString()," nominations"),r.a.createElement("li",null,e.closes.toLocaleString()," closes"),r.a.createElement("li",null,e.votes.toLocaleString()," comments/!votes")),r.a.createElement("p",null,"Their most cited policies are:"),r.a.createElement(G,{counts:this.state.polcounts}),r.a.createElement("h2",null,"Recent RMs"),r.a.createElement(Y,{username:this.username}))}},{key:"username",get:function(){return this.props.match.params.username.replace(/_/g," ")}}]),t}(r.a.Component),Q=[{heading:"What?",content:r.a.createElement("p",null,"A little web app for visualizing statistics related to ",r.a.createElement("a",{href:"https://en.wikipedia.org/wiki/Wikipedia:Requested_moves"},"requested moves")," (RMs) on Wikipedia - i.e. formal discussions about renaming articles.")},{heading:"Why?",content:r.a.createElement(r.a.Fragment,null,r.a.createElement("p",null,"For fun! Though I also hope it might be a useful research tool to help inform ongoing move discussions. For example:"),r.a.createElement("ul",null,r.a.createElement("li",null,'Suppose there\'s a move discussion between a title of the form "X Y" and "X Y controversy". It could be helpful to browse ',r.a.createElement(m.b,{to:"/rms/search?q=controversy"},'past RMs involving titles with the word "controversy"')," to see the arguments that were made there."),r.a.createElement("li",null,'In an RM that argues that "List of Presidents of Fooland" should be changed to "List of presidents of Fooland" per ',r.a.createElement("a",{href:"https://en.wikipedia.org/wiki/MOS:JOBTITLES"},"MOS:JOBTITLES"),", it could be useful to see how ",r.a.createElement(m.b,{to:"/policies/MOS:JOBTITLES"},"that policy has been interpreted in previous RMs"),".")),r.a.createElement("p",null,"This tool drew some inspiration from ",r.a.createElement("a",{href:"https://tools.wmflabs.org/afdstats/"},"AfD Stats"),", though it doesn't have the same focus on measuring the 'accuracy' of individual users, in terms of matching consensus. (This would be harder to do for move discussions, because, compared to deletion discussions, there's a greater diversity of possible outcomes, and possible !votes.)"))},{heading:"Who?",content:r.a.createElement("p",null,"This tool was written by Colin Morris, aka ",r.a.createElement("a",{href:"https://en.wikipedia.org/wiki/User:Colin_M"},"User:Colin M")," on Wikipedia. If you have feedback, feel free to leave me a note on ",r.a.createElement("a",{href:"https://en.wikipedia.org/wiki/User_talk:Colin_M"},"my talk page"),".")},{heading:"How?",content:r.a.createElement(r.a.Fragment,null,r.a.createElement("p",null,"The RM data was scraped via the MediaWiki API, and parsed using some kludgy heuristics implemented in Python. The scraping/parsing code is ",r.a.createElement("a",{href:"https://github.com/PLACEHOLDER"},"on GitHub here"),". You may find that some RMs are missing, or have incorrect values for some fields. This is hard to avoid, given the huge variety of formatting and template usage in RMs through the ages. Even finding where one user's comment ends and a new one begins is extremely non-trivial!"),r.a.createElement("p",null,"So far only one scrape has been performed (around 2019-07-21), and the site will not be updated automatically with new RMs. If there's enough interest, I might try setting up some automation to rescrape periodically."),r.a.createElement("p",null,"This site is coded with React, with an API written in Flask. The code is ",r.a.createElement("a",{href:"https://github.com/colinmorris/rm_stats"},"on GitHub here"),". Pull requests to either repository are extremely welcome!"))},{heading:"Whence?",content:r.a.createElement("p",null,"Did you really just say ",r.a.createElement("i",null,"whence"),"?")}],Z=function(e){function t(){return Object(i.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(c.a)(t,[{key:"renderSection",value:function(e){return r.a.createElement("section",{key:e.heading},r.a.createElement("h2",null,e.heading),e.content)}},{key:"render",value:function(){var e=Q.map(this.renderSection);return r.a.createElement(r.a.Fragment,null,e)}}]),t}(r.a.Component),ee=function(e){function t(){return Object(i.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement("nav",{className:"navbar"},r.a.createElement("ul",{className:"nav"},r.a.createElement("li",{className:"nav-item"},r.a.createElement(m.b,{to:"/rms",className:"nav-link"},"RMs")),r.a.createElement("li",{className:"nav-item"},r.a.createElement(m.b,{to:"/users",className:"nav-link"},"Users")),r.a.createElement("li",{className:"nav-item"},r.a.createElement(m.b,{to:"/policies",className:"nav-link"},"Policies")),r.a.createElement("li",{className:"nav-item"},r.a.createElement(m.b,{to:"/about",className:"nav-link"},"About"))),r.a.createElement("a",{title:"rm_stats project on GitHub",className:"octo",href:"https://github.com/colinmorris/rm_stats",target:"_blank",rel:"noopener noreferrer"},r.a.createElement("img",{alt:"octocat",src:f.a}),r.a.createElement("span",null,"/rm_stats")))}}]),t}(r.a.Component);var te=function(){return r.a.createElement(m.a,{basename:b},r.a.createElement(ee,null),r.a.createElement("div",{className:"main-content"},r.a.createElement(p.b,{exact:!0,path:"/",component:D}),r.a.createElement(p.b,{path:"/policies/:pol",component:I}),r.a.createElement(p.b,{exact:!0,path:"/policies",component:W}),r.a.createElement(p.b,{exact:!0,path:"/rms",component:D}),r.a.createElement(p.b,{path:"/rms/search",component:H}),r.a.createElement(p.b,{exact:!0,path:"/users",component:$}),r.a.createElement(p.b,{path:"/users/:username",component:X}),r.a.createElement(p.b,{path:"/about",component:Z})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(r.a.createElement(te,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[27,1,2]]]);
//# sourceMappingURL=main.8790773d.chunk.js.map