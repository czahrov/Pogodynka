// http://api.openweathermap.org/data/2.5/weather?lat=49.4002033&lon=20.9523785&units=metric&lang=pl&appid=7470d10567aa7388d997eba8b8ec3a15

// http://api.openweathermap.org/data/2.5/forecast?lat=49.4002033&lon=20.9523785&units=metric&lang=pl&appid=7470d10567aa7388d997eba8b8ec3a15

// http://openweathermap.org/img/wn/{icon_code}@2x.png

$(function(){

  function getCurrentPosition(_cb){
    var ret = null;

    if( navigator.geolocation ){
      navigator.geolocation.getCurrentPosition( (data)=>{
        console.log( data );
        ret = {
          lat: data.coords.latitude,
          long: data.coords.longitude,
        };
        if( typeof _cb === 'function' ) _cb(ret);
      } );

      return true;
    }
    else{
      return false;
    }

  }

  function getCurrentWeather(_cb){
    getCurrentPosition( (pos)=>{
      jQuery.get(
        'http://api.openweathermap.org/data/2.5/weather?lat='+pos.lat +'&lon='+pos.long+'&units=metric&lang=pl&appid=7470d10567aa7388d997eba8b8ec3a15',
        (data,status)=>{
          console.log( [ status, data ] );
          if ( typeof _cb === 'function' ) _cb(data);
        }
      );
    } );

  }

  function getForecast(_cb){
    getCurrentPosition( (pos)=>{
      $.get(
        'http://api.openweathermap.org/data/2.5/forecast?lat='+pos.lat+'&lon='+pos.long+'&units=metric&lang=pl&appid=7470d10567aa7388d997eba8b8ec3a15',
        ( data,status )=>{
          if ( status === 'success') {
            console.log( [data] );
            if ( typeof _cb == 'function' ) _cb(data);
          }
        }
      );
    } );
  }

  function fillData(){
    getCurrentWeather( (data)=>{
      $('#cityName').attr( 'href', ()=>{
        return 'https://google.com/maps/search/'+data.coord.lat+','+data.coord.lon;
      } ).text( data.name );
      $('#weatherCondition').text( ()=>{
        var ret = [];
        data.weather.forEach( (item)=>{
          ret.push( item.main );
        } );
        return ret.join( ' / ' );
      } );
      $('#currentTemperature').text( ()=>{
        return Math.round( data.main.temp * 10 ) / 10;
      } );
    } );
    getForecast( (data)=>{
      data.list.slice(0,5).forEach( (item,num)=>{
        // console.log( item );
        let current = $('#hours').children('.col').eq(num);
        current.children('.hour').text( item.dt_txt.match(/(\d{2}:\d{2})/)[1] );
        current.children('.icon').attr({
          src: 'http://openweathermap.org/img/wn/'+item.weather[0].icon+'@2x.png',
          alt: item.weather[0].description,
          title: item.weather[0].description,
        });
        current.children('.temp').text( Math.round( item.main.temp * 10 ) / 10 );
        current.children('.humidity').text( item.main.humidity );
      } );
      data.list.filter( (item)=>{
        return new Date( item.dt * 1000 ).getDate() != new Date().getDate && /12:00:00/.test( item.dt_txt );
      } ).forEach( ( item, num )=>{
        let current = $('#forecast').children('.col').eq(num);
        current.children('.wday').text( ()=>{
          return new Date( item.dt * 1000 ).toDateString().match(/^(\w+)/)[1];
        } );
        current.children('.icon').attr({
          src: 'http://openweathermap.org/img/wn/'+item.weather[0].icon+'@2x.png',
          alt: item.weather[0].description,
          title: item.weather[0].description,
        });
        current.children('.tempmin').text( item.main.temp_min );
        current.children('.tempmax').text( item.main.temp_max );
        current.children('.humidity').text( item.main.humidity );

      } );

    } );

    $('#view').removeClass('loading');
  }

  fillData();

  $('.slider').slick({
    arrows: false,
    dots: true,
    infinite: false,

  })

});
