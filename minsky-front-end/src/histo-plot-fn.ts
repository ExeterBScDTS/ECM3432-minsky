
   function rect(n:number,h:number,fill:string,max_height:number){
     var NS="http://www.w3.org/2000/svg";
     var SVGObj= <SVGRectElement><any>document.createElementNS(NS,"rect");
     SVGObj.id="r_" + n;
     SVGObj.width.baseVal.value=17;
     SVGObj.height.baseVal.value=h;
     SVGObj.x.baseVal.value=1;
     SVGObj.style.fill=fill;
     SVGObj.setAttribute("transform","translate(" + (n * 18) + "," + (max_height - h) + ")");
     return SVGObj;
  }

  function setheight(n:number,h:number,fill:string,max_height:number){
     var SVGObj= <SVGRectElement><any>document.getElementById("r_" + n);
     //SVGObj.width.baseVal.value=17;
     SVGObj.height.baseVal.value=h;
     //SVGObj.x.baseVal.value=1;
     SVGObj.style.fill=fill;
     SVGObj.setAttribute("transform","translate(" + (n * 18) + "," + (max_height - h) + ")");
  }
  

  function drawHist(svg:SVGSVGElement,num_bins:number,max_height:number){
    for(let i=0; i<num_bins; i++){
       let r1 = rect(i,1,"black",max_height); 
       svg.appendChild(r1);
    }
  }

  async function redrawHist(num_bins:number,max_height:number):Promise<void>{
    let response = await fetch("histjson.jsp?bins=" + num_bins + "&height=" + max_height);
    let tir = await response.json();
    for(let i=0; i<tir.length; i++){
       setheight(i,tir[i],"black",max_height); 
    }
  }

  var svg = <SVGSVGElement><any>document.getElementById('svg-hist');
  var num_bins = 50;
  var max_height = 460;
  drawHist(svg,num_bins,max_height);

  var updateInterval = window.setInterval("redrawHist(num_bins,max_height)", 200);

  // For OO approach see https://codeburst.io/canvas-animations-in-typescript-97ba0163cb19
  