// Mobile nav toggle + progressive-enhancement form submit (form also works without JS).
document.addEventListener('DOMContentLoaded',function(){
  var t=document.querySelector('.nav-toggle'),n=document.getElementById('site-nav');
  if(t&&n){t.addEventListener('click',function(){var o=n.classList.toggle('open');t.setAttribute('aria-expanded',o)})}
  var y=document.getElementById('year');if(y)y.textContent=new Date().getFullYear();
  var f=document.getElementById('quote-form');
  if(f&&window.fetch){f.addEventListener('submit',function(e){
    e.preventDefault();var s=document.getElementById('form-status'),b=f.querySelector('button[type=submit]');
    b.disabled=true;s.textContent='Sending…';
    fetch(f.action,{method:'POST',headers:{'Accept':'application/json'},body:new FormData(f)})
      .then(function(r){return r.json()}).then(function(d){
        if(d.success){f.reset();s.textContent='Thanks! Your request was sent. We will get back to you shortly.'}
        else{s.textContent='Sorry, something went wrong. Please call 416-908-5331 or email contact@involtaelectric.com.'}
      }).catch(function(){s.textContent='Network error. Please call 416-908-5331 or email contact@involtaelectric.com.'})
      .finally(function(){b.disabled=false});
  })}
});
