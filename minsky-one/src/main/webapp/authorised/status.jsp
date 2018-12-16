<%@page import="minskyOne.*,java.util.List"%>
<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="/bootstrap/4.1.3/css/bootstrap.min.css">

    <title>Minsky One</title>
  </head>
  <body>
  <table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">Device</th>
      <th scope="col">Status</th>
    </tr>
  </thead>
  <tbody>

<%
  Status status = new Status();
  List<Sensor> sensors = status.getSensors();
  
  for(Sensor s: sensors){
     out.print( s.htmlTr() ); 
  }

%>
  </tbody>
  </table>
  </body>
</html>