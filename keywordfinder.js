var f = document.getElementById('f'), container = document.getElementById('keywords');
container.className = '';
f.onsubmit = function(){
  if(document.getElementById('keyworddata')) {
     var old = document.getElementById('keyworddata');
     old.parentNode.removeChild(old);
  }
  container.className = 'load';
  var term = document.getElementById('s').value;
  var locale = document.getElementById('locale'), 
      locale = locale.options[locale.selectedIndex].value, 
      locale = locale.split("\|");
  var url = "http://query.yahooapis.com/v1/public/yql?q=use%20'http%3A%2F%2Fthinkphp.ro%2Fapps%2FYQL%2Fkeywordfinder%2F%2Fkeywordfinder.table.xml'%20as%20keyfinder%3Bselect%20*%20from%20keyfinder%20where%20term%3D%22"+encodeURIComponent(term)+"%22%20and%20region%3D%22"+encodeURIComponent(locale[1])+"%22%20and%20language%3D%22"+encodeURIComponent(locale[2])+"%22&diagnostics=false&format=json&callback=keywordfinder";
  var s = document.createElement('script');
      s.setAttribute('id','keyworddata'); 
      s.setAttribute('src',url);
      document.getElementsByTagName('head')[0].appendChild(s);     
  var term = document.getElementById('keywords').innerHTML = '<h3>Loading&hellip;</h3>';
 return false;
};

function keywordfinder(o){
     if(o.query.results.keywords) {
        var locale = document.getElementById('locale'), locale = locale.options[locale.selectedIndex].innerHTML;
        var term = o.query.results.keywords.search;
        var kw = o.query.results.keywords.terms;
        var language = o.query.results.keywords.language;
        var region = o.query.results.keywords.region;
        var out = '<h2>You searched for <span>'+term+'</span> in <span> '+ locale +'</span></h2>'+
            '<p>We found these related keywords:</p>'+
            '<p class="termslist">'+kw.replace(/,/g,', ')+'</p>';
            container.innerHTML = out;
     } else {
            container.innerHTML = 'There was an error, please try again.';
     }
};
