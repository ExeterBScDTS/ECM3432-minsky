<%@page import="minskyone.*"%>
<%
  String filename = Utils.getPath(request, "minsky.camera.tir.fltpath"); 
  int num_bins = 50;
  int bar_height = 460;
  int[] hist = HistogramData.getData(filename, num_bins, bar_height);
%>

<svg width="960" height="500">
<g transform="translate(40,10)">

<%

 int bar_width = (900 / num_bins) - 1;
 for(int i = 0; i < hist.length; i++){
    int v = hist[i]; 
    int tr_x = (bar_width+1)*i; 
    out.print("<rect class=\"bar\" x=\"1\" transform=\"translate(");
    out.print(tr_x);
    out.print(",");
    out.print(bar_height - (v+1));
    out.print(")\" width=\"");
    out.print(bar_width);
    out.print("\" height=\"");
    out.print(1+v);
    out.print("\"></rect>\n");  
 }

%>

  <rect class="bar" x="1" transform="translate(900,460)" width="-1" height="0"></rect>
</g>
<g transform="translate(40,480)" fill="none">
  <path class="domain" stroke="#000" d="M0.5,6V0.5H900.5V6"></path>
</g>

</svg>