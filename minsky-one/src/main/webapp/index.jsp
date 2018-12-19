<%@page import="java.security.Principal"%>
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
      <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
          <a class="navbar-brand" href="#">Minsky One</a>
          <div class="collapse navbar-collapse justify-content-end" id="navbarsExampleDefault">
            <div class="pull-right">
            <form class="form-inline my-2 my-lg-0">
              <input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search">
              <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
            </div>
          </div>
        </nav>
        <main role="main" class="container">

            <div class="starter-template">
              <h1>Bootstrap starter template</h1>
              <p class="lead">Use this document as a way to quickly start any new project.<br> All you get is this text and a mostly barebones HTML document.</p>


      <%
      Principal prin = request.getUserPrincipal();
      if(prin != null){
        out.print("<p>" + prin.getName()  + "</p>");
      }else{
        out.print("<p><a href=\"authorised\">Login</a></p>");
      }
      %>

              <a href="authorised/status.jsp">Sensor status</a>
            </div>
      
          </main>
      

  </body>
</html>