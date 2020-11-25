window.addEventListener('scroll', function(evt){
    document.querySelector(':root').style.setProperty('--scroll', window.pageYOffset);
});

window.addEventListener('load', function(evt){
    document.querySelector(':root').style.setProperty('--window-height', window.innerHeight);
  document.querySelectorAll('*').forEach(function(element){
    element.style.setProperty('--bottom', element.getBoundingClientRect().bottom)
  });

});