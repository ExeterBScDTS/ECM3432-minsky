<%@page import="minskyone.*,javax.json.*" language="java" contentType="application/json" %>
<%
  String fltpath = Utils.getPath(request, "minsky.camera.tir.fltpath"); 
  String[] tir = TemperatureData.getData(fltpath);
  out.print("[" + String.join(",",tir) + "]");
%>
