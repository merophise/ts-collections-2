var t=function(t){function e(e){t.call(this),this.name="ArgumentNullException",this.message="object is null.",e&&(this.message=e)}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e}(Error),e=function(t){function e(e){t.call(this),this.name="ArgumentOutOfRangeException",this.message="arrayIndex is out of range.",this.message=e}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e}(Error),n=function(t){function e(e){t.call(this),this.name="ArgumentException",this.message="Invalid argument.",e&&(this.message=e)}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e}(Error),o=function(t){this.count=0,this.data=[],this.iteratorIndex=0,t&&(this.data=[].concat(t),this.count=this.data.length)},r={Count:{configurable:!0}};o.prototype.add=function(t){this.data.push(t),this.count++},o.prototype.clear=function(){this.data.length=0,this.count=0},o.prototype.contains=function(t){return this.indexOf(t)>-1},o.prototype.exists=function(e){if(!e)throw new t("predicate is null.");return this.data.some(e)},o.prototype.find=function(t){return this.data.find(t)||null},o.prototype.findAll=function(t){var e=this.data.filter(t);return new o(e)},o.prototype.findIndex=function(n,o,r){if(!n)throw new t("predicate is null.");if(r=r||this.Count-1,(o=o||0)<0||o>=this.Count)throw new e("startIndex is not a valid index.");if(r<0)throw new e("count is less than 0.");if(o+r>this.Count)throw new e("startIndex and count do not specify a valid section in the list.");for(var i=-1,s=o;s<o+r;++s)if(n(this.data[s])){i=s;break}return i},o.prototype.findLast=function(e){if(!e)throw new t("predicate is null.");for(var n=null,o=this.data.length-1;o>=0;--o){var r=this.data[o];if(e(r)){n=r;break}}return n},o.prototype.findLastIndex=function(n,o,r){if(!n)throw new t("predicate is null.");if(o<0||o>=this.Count)throw new e("startIndex is not a valid index.");if(r<0)throw new e("count is less than 0.");if(o+r>this.Count)throw new e("startIndex and count do not specify a valid section in the list.");for(var i=-1,s=(o=o||0)+(r=r||this.Count)-1;s>=o;--s)if(n(this.data[s])){i=s;break}return i},o.prototype.forEach=function(e){if(!e)throw new t("action is null.");this.data.forEach(function(t){return t?e(t):void 0})},o.prototype.get=function(n){if(null==n)throw new t("index is null.");if(n<0)throw new e("index is less than 0.");if(n>=this.Count)throw new e("index is greater than or equal to "+this.Count+".");return this.data[n]},o.prototype.indexOf=function(t){return this.data.findIndex(function(e){return e===t})},o.prototype.insert=function(t,n){if(t<0)throw new e("index is less than 0.");if(t>=this.Count)throw new e("index is greater than or equal to "+this.Count+".");this.data.splice(t,0,n),this.count++},o.prototype.lastIndexOf=function(t){return this.data.lastIndexOf(t)},o.prototype.remove=function(t){var e=this.findIndex(function(e){return e===t});return-1!==e&&(this.removeAt(e),!0)},o.prototype.removeAll=function(e){if(!e)throw new t("predicate is null.");var n=this.Count;return this.data=this.data.filter(function(t){return!e(t)}),this.count=this.data.length,n-this.count},o.prototype.removeAt=function(t){if(t<0)throw new e("index is less than 0.");if(t>=this.Count)throw new e("index is greater than or equal to "+this.Count+".");this.data.splice(t,1),this.count--},o.prototype.removeRange=function(t,o){if(t<0)throw new e("index is less than 0.");if(o<0)throw new e("count is less than 0.");if(t+o>this.Count)throw new n("index and count do not denote a valid range of elements in the list.");for(var r=0;r<o;)this.removeAt(t),r++},o.prototype.reverse=function(){this.data.reverse()},o.prototype.set=function(t,n){if(t<0)throw new e("index is less than 0.");if(t>=this.Count)throw new e("index is greater than or equal to "+this.Count+".");this.data[t]=n},o.prototype.sort=function(t){t||(t=function(t,e){return t>e?1:-1}),this.data.sort(t)},o.prototype.toArray=function(){return[].concat(this.data)},o.prototype.next=function(){return this.iteratorIndex>=this.Count?(this.iteratorIndex=0,{done:!0,value:null}):{done:!1,value:this.data[this.iteratorIndex++]}},o.prototype[Symbol.iterator]=function(){return this},r.Count.get=function(){return this.count},Object.defineProperties(o.prototype,r);var i=function(t){function e(e){t.call(this),this.name="InvalidOperationException",this.message="Invalid operation.",e&&(this.message=e)}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e}(Error),s=function(t){this.count=0,this.data=[],this.iteratorIndex=0,t&&(this.data=[].concat(t))},a={Count:{configurable:!0}};s.prototype.clear=function(){this.data.length=0,this.count=0},s.prototype.contains=function(t){return this.data.findIndex(function(e){return e===t})>-1},s.prototype.dequeue=function(){if(0===this.Count)throw new i("queue is empty.");var t=this.data[0];return this.data.splice(0,1),this.count--,t},s.prototype.enqueue=function(t){this.data.push(t),this.count++},s.prototype.peek=function(){if(0===this.Count)throw new i("queue is empty.");return this.data[0]},s.prototype.toArray=function(){return[].concat(this.data)},s.prototype.next=function(){return this.iteratorIndex>=this.Count?(this.iteratorIndex=0,{done:!0,value:null}):{done:!1,value:this.data[this.iteratorIndex++]}},s.prototype[Symbol.iterator]=function(){return this},a.Count.get=function(){return this.count},Object.defineProperties(s.prototype,a);var u=function(t){this.count=0,this.data=[],this.iteratorIndex=0,t&&(this.data=[].concat(t))},h={Count:{configurable:!0}};u.prototype.clear=function(){this.data.length=0,this.count=0},u.prototype.contains=function(t){return this.data.findIndex(function(e){return e===t})>-1},u.prototype.peek=function(){if(0===this.Count)throw new i("stack is empty.");return this.data[0]},u.prototype.pop=function(){if(0===this.count)throw new i("stack is empty.");var t=this.data[0];return this.data.splice(0,1),this.count--,t},u.prototype.push=function(t){this.data.splice(0,0,t),this.count++},u.prototype.toArray=function(){return[].concat(this.data)},u.prototype.next=function(){return this.iteratorIndex>=this.Count?(this.iteratorIndex=0,{done:!0,value:null}):{done:!1,value:this.data[this.iteratorIndex++]}},u.prototype[Symbol.iterator]=function(){return this},h.Count.get=function(){return this.count},Object.defineProperties(u.prototype,h);var c=function(t){t&&(this.data=t)};c.prototype.getLeft=function(){return this.left},c.prototype.getRight=function(){return this.right},c.prototype.setLeft=function(t){this.left=t},c.prototype.setRight=function(t){this.right=t},c.prototype.setData=function(t){this.data=t},c.prototype.getData=function(){return this.data};var p=function(){this.root=null};p.prototype.isEmpty=function(){return null==this.root},p.prototype.insert=function(t){this.root=this.insertData(this.root,t)},p.prototype.insertData=function(t,e){return null==t?t=new c(e):null==t.getRight()?t.setRight(this.insertData(t.getRight(),e)):t.setLeft(this.insertData(t.getLeft(),e)),t},p.prototype.countNodes=function(){return this.countTreeNodes(this.root)},p.prototype.countTreeNodes=function(t){return null==t?0:1+this.countTreeNodes(t.getLeft())+this.countTreeNodes(t.getRight())},p.prototype.search=function(t){return this.searchTree(this.root,t)},p.prototype.searchTree=function(t,e){return t.getData()===e||!(null==t.getLeft()||!this.searchTree(t.getLeft(),e))||!(null==t.getRight()||!this.searchTree(t.getRight(),e))},p.prototype.inorder=function(){this.inorderTraversal(this.root)},p.prototype.inorderTraversal=function(t){null!=t&&(this.inorderTraversal(t.getLeft()),console.log("Data: ",t.getData().toString()),this.inorderTraversal(t.getRight()))},p.prototype.preorder=function(){this.preorderTraversal(this.root)},p.prototype.preorderTraversal=function(t){null!=t&&(console.log("Data: ",t.getData().toString()),this.inorderTraversal(t.getLeft()),this.inorderTraversal(t.getRight()))},p.prototype.postorder=function(){this.postorderTraversal(this.root)},p.prototype.postorderTraversal=function(t){null!=t&&(this.inorderTraversal(t.getLeft()),this.inorderTraversal(t.getRight()),console.log("Data: ",t.getData().toString()))},exports.List=o,exports.Queue=s,exports.Stack=u,exports.BinaryTree=p,exports.BinaryTreeNode=c;
//# sourceMappingURL=index.js.map
