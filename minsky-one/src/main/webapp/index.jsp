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
    <style type="text/css"> 
      .image_ccw {
        transform: rotate(270deg);
      }
      .image_cw {
        transform: rotate(90deg);
      }
    </style>
    <title>Minsky One</title>
  </head>
  <%
  String user = "Log In";
  Principal prin = request.getUserPrincipal();
  if(prin != null){
    user = prin.getName();
  }

  // Start the TIR camera
  String cmd1 = Utils.getParameter(request, "minsky.process.camera.tir");
  Processes.launch("minsky.process.camera.tir", cmd1);

  // Start the colour camera
  String cmd2 = Utils.getParameter(request, "minsky.process.camera.colour");
  Processes.launch("minsky.process.camera.colour", cmd2);

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
            <a href="authorised/status.jsp">Sensor status</a> |
            <a href="histo-new.html">Histogram</a> |
            <a href="cameras.jsp">Cameras</a>

            <div style="visibility:hidden;height:0px;">
              <img id="colour" width="1" height="1"/>
              <script>
                  function updateColour() {
                    colour.src="colourcam.png#" + new Date().getTime();
                  }
                  setInterval(updateColour, 200);
              </script>
              <canvas id="thermal" width="240" height="320"></canvas>
              <script type="module">
                  import {TIRCanvas} from "./js/minsky-tir.js";
                  TIRCanvas.main('#thermal','tir.json');
              </script>
            </div>
                  
            <div height="640">
              <canvas class="image_cw" id="composite" width="640" height="640">
            </div>  
        </div>
      
      </main>
      <script type="module">
        import {Composite} from "./js/minsky-composite.js";
        let adjust=()=>{return[0,0,0]};
        Composite.main({canvas:'#composite',colour:'#colour',thermal:'#thermal',adjust:adjust});
      </script>
  </body>
</html>