(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{5301:function(e,r,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return t(3454)}])},3454:function(e,r,t){"use strict";t.r(r),t.d(r,{default:function(){return V}});var n=t(5893),a=t(7294),o=t(9008),s=t(682),c=t(4051),i=t(1555),l=t(2814),u=t(1436),d=t(6698),h=t(3680),f=t(6241),v=t.n(f);function p(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function m(e,r){for(var t=0;t<r.length;t++){var n=r[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function x(e){return(x=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function j(e,r){return(j=Object.setPrototypeOf||function(e,r){return e.__proto__=r,e})(e,r)}var b=function(e){return e&&"undefined"!==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e},y=function(e){function r(e){var t;return function(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}(this,r),(t=function(e,r){return!r||"object"!==b(r)&&"function"!==typeof r?p(e):r}(this,x(r).call(this,e))).handleCsvSelect=function(e){t.setState({csvData:null,csvError:null},(function(){var r,n=null===e||void 0===e||null===(r=e.target)||void 0===r?void 0:r.files;if(n&&1===n.length){var a=n[0];if("text/csv"===a.type){var o=new FileReader;o.onload=function(e){var r,n=null===e||void 0===e||null===(r=e.target)||void 0===r?void 0:r.result;if(n&&"string"===typeof n){var a;try{a=v()(n.trim(),{columns:!0,skip_empty_lines:!0})}catch(d){return void t.setState({csvError:"Invalid CSV format"})}if(a)if(a.length<=0)t.setState({csvError:"CSV has no voucher data"});else{var o=!0,s=!1,c=void 0;try{for(var i,l=a[Symbol.iterator]();!(o=(i=l.next()).done);o=!0){var u=i.value;if(!("Login"in u)||!("Password"in u))return void t.setState({csvError:"Invalid voucher data"})}}catch(h){s=!0,c=h}finally{try{o||null==l.return||l.return()}finally{if(s)throw c}}t.setState({csvData:a})}else t.setState({csvError:"CSV parse error"})}else t.setState({csvError:"Could not read CSV file"})},o.readAsText(a)}else t.setState({csvError:"Only CSV files are allowed"})}else t.setState({csvError:"Please select a voucher CSV file"})}))},t.handleFormSubmit=function(e){e.preventDefault();var r=p(t),n=r.props,a=r.state;if(a.csvData){var o=e.target,s=o.header.value;localStorage.setItem("VoucherForm_Header",s),n.onSubmit&&n.onSubmit({vouchers:a.csvData.map((function(e){var r=o.voucher_type.value;if("auto"===r){var t=e.Login.substr(0,1);switch(console.log(t),t){case"h":r="hotel";break;case"r":r="restaurant";break;default:r=void 0}}return{header:s,username:e.Login,password:e.Password,type:r,expiry:e["Uptime Limit"]}}))})}},t.state={csvData:null,csvError:null},t}var t,a,o;return function(e,r){if("function"!==typeof r&&null!==r)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(r&&r.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),r&&j(e,r)}(r,e),t=r,(a=[{key:"render",value:function(){var e=null;return e=localStorage.getItem("VoucherForm_Header"),(0,n.jsx)(n.Fragment,{children:(0,n.jsxs)(d.Z,{onSubmit:this.handleFormSubmit,children:[(0,n.jsxs)(d.Z.Group,{className:"mb-3",children:[(0,n.jsx)(d.Z.Label,{children:(0,n.jsx)("b",{children:"Site Name"})}),(0,n.jsx)(d.Z.Control,{type:"text",name:"header",required:!0,placeholder:"SpeedyWiFi",defaultValue:e||void 0})]}),(0,n.jsxs)(d.Z.Group,{controlId:"formFile",className:"mb-3",children:[(0,n.jsx)(d.Z.Label,{children:(0,n.jsx)("b",{children:"Voucher CSV"})}),(0,n.jsx)(d.Z.Control,{type:"file",name:"payload",onChange:this.handleCsvSelect}),this.state.csvError?(0,n.jsx)(d.Z.Text,{className:"text-danger",children:this.state.csvError}):null,this.state.csvData?(0,n.jsxs)(d.Z.Text,{className:"text-success",children:[(0,n.jsx)("b",{children:this.state.csvData.length})," vouchers loaded successfully"]}):null]}),(0,n.jsxs)(d.Z.Group,{className:"mb-3",children:[(0,n.jsx)(d.Z.Label,{children:(0,n.jsx)("b",{children:"Voucher Type"})}),(0,n.jsxs)(d.Z.Select,{name:"voucher_type",children:[(0,n.jsx)("option",{value:"auto",children:"Auto-Detect"}),(0,n.jsx)("option",{value:"restaurant",children:"Restaurant"}),(0,n.jsx)("option",{value:"hotel",children:"Hotel"})]})]}),(0,n.jsxs)("p",{className:"text-muted mb-3",children:[(0,n.jsx)("b",{children:"Note:"})," One printed A4 page can hold up to 21 vouchers"]}),(0,n.jsx)("div",{className:"d-grid gap-2",children:(0,n.jsxs)(h.Z,{variant:"success",size:"lg",type:"submit",disabled:!this.state.csvData,children:[(0,n.jsx)(l.G,{fixedWidth:!0,icon:u.LEp})," Generate"]})})]})})}}])&&m(t.prototype,a),o&&m(t,o),r}(a.Component),g=t(4994),_=t.n(g),S=t(9864),w=t.n(S),k=function(e){var r="Internet Voucher",t=null;switch(e.data.type){case"restaurant":r="Restaurant "+r,t=u.fkH;break;case"hotel":r="Hotel "+r,t=u.by_}var a="";if(e.data.expiry){var o=e.data.expiry,s=o.substr(o.length-1);switch(s){case"m":s="minute";break;case"h":s="hour";break;case"d":s="day";break;case"w":s="week";break;case"y":s="year";break;default:s=null}if(s){var d=parseInt(o);a="Valid for ".concat(d," ").concat(s),1!==d&&(a+="s")}else a="Valid for ".concat(o)}return(0,n.jsxs)(i.Z,{className:w().item,children:[(0,n.jsxs)("div",{className:w().header,children:[(0,n.jsxs)("h2",{children:[e.icon?(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(l.G,{icon:e.icon})," "]}):null,e.data.header]}),(0,n.jsx)("p",{children:r})]}),(0,n.jsxs)(c.Z,{children:[(0,n.jsx)(i.Z,{xs:6,className:w().infoHead,children:"Username:"}),(0,n.jsx)(i.Z,{xs:6,children:(0,n.jsx)("samp",{children:e.data.username})})]}),(0,n.jsxs)(c.Z,{children:[(0,n.jsx)(i.Z,{xs:6,className:w().infoHead,children:"Password:"}),(0,n.jsx)(i.Z,{xs:6,children:(0,n.jsx)("samp",{children:e.data.password})})]}),(0,n.jsxs)("p",{className:w().footer,children:[t?(0,n.jsx)(l.G,{fixedWidth:!0,icon:t}):null," ",a]})]})};function N(e){return function(e){if(Array.isArray(e)){for(var r=0,t=new Array(e.length);r<e.length;r++)t[r]=e[r];return t}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var Z=function(e){var r=N(Array(Math.ceil(e.vouchers.length/3))).map((function(r,t){return e.vouchers.slice(3*t,3*t+3)}));return(0,n.jsxs)(s.Z,{fluid:!0,className:_().container,children:[(0,n.jsxs)("div",{className:_().helper+" text-center mt-4",children:[(0,n.jsxs)(h.Z,{variant:"secondary",onClick:function(){e.onBackClick&&e.onBackClick()},children:[(0,n.jsx)(l.G,{icon:u.A35})," Go Back"]})," ",(0,n.jsxs)(h.Z,{onClick:function(){return window.print()},children:[(0,n.jsx)(l.G,{icon:u.wf8})," Print"]})]}),r.map((function(e,r){return(0,n.jsxs)("div",{children:[(0,n.jsx)(c.Z,{children:e.map((function(e,t){return(0,n.jsx)(k,{data:e,icon:u.$Aj},"".concat(r,"_").concat(t))}))}),(r+1)%7===0?(0,n.jsx)("div",{className:_().pagebreak}):null]},r)}))]})};function E(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function O(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{},n=Object.keys(t);"function"===typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(t).filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})))),n.forEach((function(r){E(e,r,t[r])}))}return e}var V=function(){var e=(0,a.useState)({voucherPageShown:!1,formData:null}),r=e[0],t=e[1];return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(o.default,{children:(0,n.jsx)("title",{children:"WiFi Voucher Generator"})}),r.voucherPageShown&&r.formData?(0,n.jsx)(Z,{vouchers:r.formData.vouchers,onBackClick:function(){return t(O({},r,{voucherPageShown:!1}))}}):(0,n.jsx)(s.Z,{children:(0,n.jsx)(c.Z,{className:"justify-content-center",children:(0,n.jsxs)(i.Z,{className:"my-4",sm:6,children:[(0,n.jsxs)("div",{className:"text-center",children:[(0,n.jsx)("h1",{children:"WiFi Voucher Generator"}),(0,n.jsx)("p",{className:"text-muted",children:"Enter your voucher details below:"})]}),(0,n.jsx)(y,{onSubmit:function(e){return t(O({},r,{voucherPageShown:!0,formData:e}))}}),(0,n.jsx)("hr",{className:"mt-4"}),(0,n.jsx)("p",{className:"text-muted text-center",children:"\xa9 2021, fluxth"})]})})})]})}},9864:function(e){e.exports={item:"Voucher_item__24Yt4",header:"Voucher_header__nd04p",infoHead:"Voucher_infoHead__3uMEU",footer:"Voucher_footer__IXCSH"}},4994:function(e){e.exports={container:"VoucherPage_container__1yl7M",pagebreak:"VoucherPage_pagebreak__22pYb",helper:"VoucherPage_helper__3dlLL"}},2361:function(){},4616:function(){}},function(e){e.O(0,[774,523,553,888,179],(function(){return r=5301,e(e.s=r);var r}));var r=e.O();_N_E=r}]);