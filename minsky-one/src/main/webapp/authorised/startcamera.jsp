<%@page import="minskyone.*,java.util.List,java.security.Principal"%>
<%
    String cmd = Utils.getParameter(request, "minsky.process.camera");
    Processes.launch(cmd);

    // response.sendRedirect("../");
    out.println("Launched " + cmd);
%>
