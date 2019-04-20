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
  String cmd1 = Utils.getParameter(request, "minsky.process.camera");
  Processes.launch("minsky.process.camera", cmd1);

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
              <div>
                <img id="colour" src="camera/xxx" width="512" height="384">
                <img id="thermal" src="camera/xxx" width="512" height="384">
              </div>
              <div>
                <canvas id="composite" width="512" height="384">
              </div>
              <a href="authorised/status.jsp">Sensor status</a>
            </div>
      
          </main>
          <script>
          function updateComposite(){
            var ctx = document.getElementById('composite').getContext('2d');
            var img = new Image();
            var colour = document.getElementById("colour");

            ctx.save();
            ctx.clearRect(0, 0, 512, 384);
            ctx.scale(15, 15);
            ctx.drawImage(thermal, 0, 0);
            ctx.globalCompositeOperation = "saturation";
            ctx.fillStyle = "hsl(0,100%,50%)";  // saturation at 100%
            ctx.fillRect(0,0,512,384);  // apply the comp filter
            ctx.globalCompositeOperation = "source-over";  // restore default comp;
            ctx.globalAlpha = 1.0;
            ctx.restore();
            ctx.save();
            
            // scale
            //ctx.scale(0.5, 0.5);
            //ctx.rotate((Math.PI / 180) * 5);
            ctx.globalAlpha = 0.3;
            ctx.drawImage(colour, 0, 0);
            //ctx.globalCompositeOperation = "saturation";
            //ctx.fillStyle = "hsl(0,10%,50%)";  // saturation at 100%
            //ctx.fillRect(0,0,512,384);  // apply the comp filter
            //ctx.globalCompositeOperation = "source-over";  // restore default comp;
            ctx.restore();
          }

          window.onload = function() {
            var thermal = document.getElementById("thermal");
            var colour = document.getElementById("colour");
            function updateImages() {
                colour.src =  "camera" + "/1/" + new Date().getTime();
                thermal.src =  "camera" + "/0/" + new Date().getTime();
                updateComposite();
            }
        
            setInterval(updateImages, 200);
        }
        </script>       
  </body>
</html>