<%@page import="minskyone.*,javax.json.*,java.util.Arrays" language="java" contentType="application/json" %>
<%
  String fltpath = Utils.getPath(request, "minsky.camera.tir.fltpath"); 
  int num_bins = 50;
  int bar_height = 460;
  int[] hist = HistogramData.getData(fltpath, num_bins, bar_height);
  out.print(Arrays.toString(hist));
%>