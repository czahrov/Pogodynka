<?php
  setlocale( LC_ALL, 'pl' );
?>
<!DOCTYPE html>
<html lang="pl" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Pogodynka</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <link rel="stylesheet" href="css/slick.css">
    <link rel="stylesheet" href="css/slick-theme.css">
    <link rel="stylesheet" href="css/facepalm.css">

  </head>
  <body class="bg-blue-dark">
    <div class="container-fluid">
      <div id="view" class="bg-blue-light fc-light text-center loading">
        <div class="wrapper preloader row align-items-center justify-content-center">
          <img class="d-flex" src="media/sun.png" alt="">
        </div>
        <div class="wrapper content">
          <div class="row city">
            <div class="col-12">
              <img src="media/pin.png" alt="">
              <a id="cityName" href="">CityName</a>
            </div>
          </div>
          <div class="row date">
            <div class="col-12">
              <?php
              // echo date("l, F d, Y");
              echo strftime( '%A, %d %B, %Y' );
              ?>
            </div>
          </div>
          <div class="row condition">
            <div class="col-12">
              <div id="weatherCondition">weatherCondition</div>
            </div>
          </div>
          <div class="row temperature">
            <div class="col-12">
              <div id="currentTemperature">CurrentTemperature</div>
            </div>
          </div>
          <div class="slider">
            <div class="wrapper">
              <div id='hours' class="row">
                <?php for( $i = 0; $i < 5; $i++ ): ?>
                  <div class="col">
                    <div class="hour">00:00</div>
                    <img class='icon' src="" alt=""/>
                    <div class="temp">0</div>
                    <div class="humidity">0</div>
                  </div>
                <?php endfor; ?>
              </div>
            </div>
            <div class="wrapper">
              <div id='forecast' class="row">
                <?php for( $i = 0; $i < 5; $i++ ): ?>
                  <div class="col">
                    <div class="wday">day</div>
                    <img class='icon' src="" alt=""/>
                    <div class="tempmin">0</div>
                    <div class="tempmax">0</div>
                    <div class="humidity">0</div>
                  </div>
                <?php endfor; ?>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
    <script src="js/slick.min.js" charset="utf-8"></script>
    <script src="js/facepalm.js" charset="utf-8"></script>
  </body>
</html>
