<%@page import="java.security.Principal"%>
<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="bootstrap/4.1.3/css/bootstrap.min.css">

    <title>Minsky One</title>
  </head>
  <body>
      <%
      Principal prin = request.getUserPrincipal();
      if(prin != null){
        out.print("<p>" + prin.getName()  + "</p>");
      }else{
        out.print("<p><a href=\"authorised\">Login</a></p>");
      }
      %>
    <a href="authorised/status.jsp">Sensor status</a>
  </body>
</html>