<%@page import="java.security.Principal,minskyone.*"%>
<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="bootstrap/4.1.3/css/bootstrap.min.css">
    <!-- Custom styles for this template -->
    <link href="bootstrap/starter-template.css" rel="stylesheet">

    <title>Minsky One</title>
  </head>
  <%
  String user = "Log In";
  Principal prin = request.getUserPrincipal();
  if(prin != null){
    user = prin.getName();
  }

  // Start the TIR camera
  String cmd = Utils.getParameter(request, "minsky.process.camera.tir");
  Processes.launch("minsky.process.camera.tir", cmd);

  // Start the colour camera
  String cmd = Utils.getParameter(request, "minsky.process.camera.colour");
  Processes.launch("minsky.process.camera.colour", cmd);

  %>
  <body>
      <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
          <a class="navbar-brand" href="#">Minsky One</a>
          <div class="collapse navbar-collapse justify-content-end" id="navbarsExampleDefault">
            <form class="form-inline my-2 my-lg-0" method="get" action="authorised">
              <button class="btn btn-outline-success my-2 my-sm-0" type="submit"><%= user %></button>
            </form>
          </div>
        </nav>
        <main role="main" class="container">

            <div class="starter-template">
              <div>
                <a href="histogram.jsp">
                <img id="thermal" src="camera/xxx" width="512" height="384">
                </a>
              </div>
              <a href="authorised/status.jsp">Sensor status</a>
            </div>
      
          </main>
          <script>
          window.onload = function() {
            var thermal = document.getElementById("thermal");
        
            function updateImage() {
                thermal.src =  "camera" + "/0/" + new Date().getTime();
            }
        
            setInterval(updateImage, 200);
        }
        </script>       
  </body>
</html>