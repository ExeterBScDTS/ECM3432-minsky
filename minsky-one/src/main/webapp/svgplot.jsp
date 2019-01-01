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
    out.print("\"></rect>");  
 }

%>

<rect class="bar" x="1" transform="translate(900,460)" width="-1" height="0"></rect>
<!--
<g transform="translate(0,460)" fill="none" font-size="10" font-family="sans-serif" text-anchor="middle">
<path class="domain" stroke="#000" d="M0.5,6V0.5H890.5V6"></path>
<g class="tick" opacity="1" transform="translate(146.5,0)">
<line stroke="#000" y2="6"></line><text fill="#000" y="9" dy="0.71em">October</text>
</g>
<g class="tick" opacity="1" transform="translate(296.5,0)"><line stroke="#000" y2="6"></line><text fill="#000" y="9" dy="0.71em">2011</text></g><g class="tick" opacity="1" transform="translate(443.5,0)"><line stroke="#000" y2="6"></line><text fill="#000" y="9" dy="0.71em">April</text></g><g class="tick" opacity="1" transform="translate(591.5,0)"><line stroke="#000" y2="6"></line><text fill="#000" y="9" dy="0.71em">July</text></g><g class="tick" opacity="1" transform="translate(740.5,0)"><line stroke="#000" y2="6"></line><text fill="#000" y="9" dy="0.71em">October</text></g><g class="tick" opacity="1" transform="translate(890.5,0)"><line stroke="#000" y2="6"></line><text fill="#000" y="9" dy="0.71em">2012</text></g></g><g fill="none" font-size="10" font-family="sans-serif" text-anchor="end"><path class="domain" stroke="#000" d="M-6,460.5H0.5V0.5H-6"></path><g class="tick" opacity="1" transform="translate(0,460.5)"><line stroke="#000" x2="-6"></line><text fill="#000" x="-9" dy="0.32em">0</text></g><g class="tick" opacity="1" transform="translate(0,410.82397408207345)"><line stroke="#000" x2="-6"></line><text fill="#000" x="-9" dy="0.32em">200</text></g><g class="tick" opacity="1" transform="translate(0,361.1479481641469)"><line stroke="#000" x2="-6"></line><text fill="#000" x="-9" dy="0.32em">400</text></g><g class="tick" opacity="1" transform="translate(0,311.4719222462203)"><line stroke="#000" x2="-6"></line><text fill="#000" x="-9" dy="0.32em">600</text></g><g class="tick" opacity="1" transform="translate(0,261.79589632829374)"><line stroke="#000" x2="-6"></line><text fill="#000" x="-9" dy="0.32em">800</text></g><g class="tick" opacity="1" transform="translate(0,212.11987041036718)"><line stroke="#000" x2="-6"></line><text fill="#000" x="-9" dy="0.32em">1,000</text></g><g class="tick" opacity="1" transform="translate(0,162.44384449244058)"><line stroke="#000" x2="-6"></line><text fill="#000" x="-9" dy="0.32em">1,200</text></g><g class="tick" opacity="1" transform="translate(0,112.76781857451402)"><line stroke="#000" x2="-6"></line><text fill="#000" x="-9" dy="0.32em">1,400</text></g><g class="tick" opacity="1" transform="translate(0,63.09179265658747)"><line stroke="#000" x2="-6"></line><text fill="#000" x="-9" dy="0.32em">1,600</text></g><g class="tick" opacity="1" transform="translate(0,13.41576673866092)"><line stroke="#000" x2="-6"></line><text fill="#000" x="-9" dy="0.32em">1,800</text></g></g></g>
-->
</svg>