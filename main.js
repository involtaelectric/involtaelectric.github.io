// Mobile nav toggle + progressive-enhancement form submit (forms also work without JS via Web3Forms redirect).
document.addEventListener('DOMContentLoaded',function(){
  var t=document.querySelector('.nav-toggle'),n=document.getElementById('site-nav');
  if(t&&n){t.addEventListener('click',function(){var o=n.classList.toggle('open');t.setAttribute('aria-expanded',o)})}
  var y=document.getElementById('year');if(y)y.textContent=new Date().getFullYear();
  // Preselect a problem type from ?problem=<key> (e.g. fire-alarm-trouble)
  try{var k=new URLSearchParams(location.search).get('problem');
    if(k){document.querySelectorAll('select[data-preselect]').forEach(function(s){
      for(var i=0;i<s.options.length;i++){if(s.options[i].getAttribute('data-key')===k){s.selectedIndex=i}}})}}catch(e){}
  if(!window.fetch)return;
  document.querySelectorAll('form.w3f').forEach(function(f){
    f.addEventListener('submit',function(e){
      e.preventDefault();
      var s=f.querySelector('.form-status'),b=f.querySelector('button[type=submit]');
      // Add details to the subject line, e.g. "Quote request – Condo – Vaughan"
      var subj=f.querySelector('input[name=subject]'),base=f.getAttribute('data-subject');
      if(subj&&base){var parts=[base];(f.getAttribute('data-subject-fields')||'').split(',').forEach(function(nm){
        var el=nm&&f.elements[nm];if(el&&el.value&&el.value.trim())parts.push(el.value.trim())});subj.value=parts.join(' \u2013 ')}
      b.disabled=true;s.textContent='Sending…';
      fetch(f.action,{method:'POST',headers:{'Accept':'application/json'},body:new FormData(f)})
        .then(function(r){return r.json()}).then(function(d){
          if(d.success){f.reset();s.textContent='Thanks! Your request was sent. We will get back to you shortly.'}
          else{s.textContent='Sorry, something went wrong. Please call 416-908-5331 or email contact@involtaelectric.com.'}
        }).catch(function(){s.textContent='Network error. Please call 416-908-5331 or email contact@involtaelectric.com.'})
        .finally(function(){b.disabled=false});
    })
  });
});
