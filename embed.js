(function(){
  var d=document.createElement('div');
  d.id='plv-bot-root';
  document.body.appendChild(d);
  var x=new XMLHttpRequest();
  x.open('GET','https://d1eg0dev.github.io/pvl-realestate/widget.html',true);
  x.onload=function(){
    if(x.status===200){
      d.innerHTML=x.responseText;
      var scripts=d.querySelectorAll('script');
      for(var i=0;i<scripts.length;i++){
        var s=document.createElement('script');
        s.textContent=scripts[i].textContent;
        scripts[i].parentNode.replaceChild(s,scripts[i]);
      }
    }
  };
  x.send();
})();
