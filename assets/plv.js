(function(){
  var WA='523221401809', MAIL='marco@pacificluxuryvillas.com';
  var T={
    en:{p:'Hello Marco, I am interested in {p} (listings.pacificluxuryvillas.com). Could you share more information?',
        g:'Hello Marco, I am interested in the properties for sale in Costa Careyes. Could you share more information?',
        s:'Inquiry: {p}', sg:'Inquiry: properties for sale in Costa Careyes'},
    es:{p:'Hola Marco, me interesa {p} (listings.pacificluxuryvillas.com). ¿Me puedes compartir más información?',
        g:'Hola Marco, me interesan las propiedades en venta en Costa Careyes. ¿Me puedes compartir más información?',
        s:'Solicitud: {p}', sg:'Solicitud: propiedades en venta en Costa Careyes'}
  };
  var root=document.documentElement;
  function links(lang){
    var t=T[lang];
    document.querySelectorAll('[data-wa]').forEach(function(a){
      var p=a.getAttribute('data-wa');
      var msg=p?t.p.replace('{p}',p):t.g;
      a.href='https://wa.me/'+WA+'?text='+encodeURIComponent(msg);
    });
    document.querySelectorAll('[data-mail]').forEach(function(a){
      var p=a.getAttribute('data-mail');
      var sub=p?t.s.replace('{p}',p):t.sg, body=p?t.p.replace('{p}',p):t.g;
      a.href='mailto:'+MAIL+'?subject='+encodeURIComponent(sub)+'&body='+encodeURIComponent(body);
    });
  }
  function setLang(lang){
    root.lang=lang;
    document.querySelectorAll('[data-en]').forEach(function(el){
      var v=el.getAttribute('data-'+lang); if(v!==null) el.textContent=v;
    });
    document.querySelectorAll('[data-en-alt]').forEach(function(el){
      var v=el.getAttribute('data-'+lang+'-alt'); if(v!==null) el.setAttribute('aria-label',v);
    });
    var tt=root.getAttribute('data-title-'+lang); if(tt) document.title=tt;
    document.querySelectorAll('.lang button').forEach(function(b){b.setAttribute('aria-pressed',b.getAttribute('data-lang')===lang)});
    links(lang);
    try{localStorage.setItem('plv-lang',lang)}catch(e){}
  }
  document.querySelectorAll('.lang button').forEach(function(b){b.addEventListener('click',function(){setLang(b.getAttribute('data-lang'))})});
  var saved=null; try{saved=localStorage.getItem('plv-lang')}catch(e){}
  var initial=saved||((navigator.language||'en').slice(0,2)==='es'?'es':'en');
  setLang(initial);

  // Nav background
  var nav=document.querySelector('.nav');
  if(nav&&!nav.classList.contains('on-light')){
    var onScroll=function(){nav.classList.toggle('solid',window.scrollY>40)};
    onScroll(); window.addEventListener('scroll',onScroll,{passive:true});
  }

  // Local preview: folder links -> index.html
  if(location.protocol==='file:'){
    document.querySelectorAll('a[href]').forEach(function(a){
      var h=a.getAttribute('href');
      if(h&&!/^[a-z]+:/i.test(h)&&!h.startsWith('#')&&/\/$/.test(h.split('#')[0])) a.setAttribute('href',h.replace(/\/(#|$)/,'/index.html$1'));
    });
  }

  // Lightbox
  var dlg=document.getElementById('lb');
  if(dlg){
    var thumbs=[].slice.call(document.querySelectorAll('.gallery button'));
    var big=dlg.querySelector('img'), cnt=dlg.querySelector('.lb-c'), i=0;
    function show(n){i=(n+thumbs.length)%thumbs.length;var im=thumbs[i].querySelector('img');big.src=im.currentSrc||im.src;big.alt=im.alt;cnt.textContent=(i+1)+' / '+thumbs.length}
    thumbs.forEach(function(b,n){b.addEventListener('click',function(){show(n);dlg.showModal()})});
    dlg.querySelector('.lb-p').addEventListener('click',function(){show(i-1)});
    dlg.querySelector('.lb-n').addEventListener('click',function(){show(i+1)});
    dlg.querySelector('.lb-x').addEventListener('click',function(){dlg.close()});
    dlg.addEventListener('click',function(e){if(e.target===dlg)dlg.close()});
    dlg.addEventListener('keydown',function(e){if(e.key==='ArrowLeft')show(i-1);if(e.key==='ArrowRight')show(i+1)});
    var sx=null;
    dlg.addEventListener('touchstart',function(e){sx=e.touches[0].clientX},{passive:true});
    dlg.addEventListener('touchend',function(e){if(sx===null)return;var dx=e.changedTouches[0].clientX-sx;if(Math.abs(dx)>50)show(dx<0?i+1:i-1);sx=null});
  }
})();
