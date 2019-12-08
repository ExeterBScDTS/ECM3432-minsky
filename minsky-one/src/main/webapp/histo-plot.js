
    var rect=function(n,h,fill,max_height){
     var NS="http://www.w3.org/2000/svg";
     var SVGObj= document.createElementNS(NS,"rect");
     SVGObj.id="r_" + n;
     SVGObj.width.baseVal.value=17;
     SVGObj.height.baseVal.value=h;
     SVGObj.x.baseVal.value=1;
     SVGObj.style.fill=fill;
     SVGObj.setAttribute("transform","translate(" + (n * 18) + "," + (max_height - h) + ")");
     return SVGObj;
  }

  var setheight=function(n,h,fill,max_height){
     var SVGObj= document.getElementById("r_" + n);
     //SVGObj.width.baseVal.value=17;
     SVGObj.height.baseVal.value=h;
     //SVGObj.x.baseVal.value=1;
     SVGObj.style.fill=fill;
     SVGObj.setAttribute("transform","translate(" + (n * 18) + "," + (max_height - h) + ")");
  }

  var svg = document.getElementById('svg-hist');

  async function draw(num_bins,max_height){
    for(i=0; i<num_bins; i++){
       r1 = rect(i,1,"black",max_height); 
       svg.appendChild(r1);
    }
  }

  async function redraw(num_bins,max_height){
    const response = await fetch("histjson.jsp?bins=" + num_bins + "&height=" + max_height);
    const tir = await response.json();
    for(i=0; i<tir.length; i++){
       setheight(i,tir[i],"black",max_height); 
    }
  }

  var num_bins = 50;
  var max_height = 460;
  draw(num_bins,max_height);
  redraw(num_bins,max_height);
