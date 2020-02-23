function CityName(props){
  return(
    <div class="row city">
      <div class="col-12">
        <img src="media/pin.png" alt=""/>
        <a id="cityName" href="">{props.name}</a>
      </div>
    </div>
  );
}

function CurrentDate(props){
  return(
    <div class="row date">
      <div class="col-12">
        {new Date( props.date*1000 ).toDateString()}
      </div>
    </div>
  );
}

function CurrentWeather(props){
  return(
    <div class="row condition">
      <div class="col-12">
        <div id="weatherCondition">{props.condition}</div>
      </div>
    </div>
  );
}

function CurrentTemperature(props){
  return(
    <div class="row temperature">
      <div class="col-12">
        <div id="currentTemperature">{ Math.round( props.temperature*10 )/10 }</div>
      </div>
    </div>
  );
}

function TileForecast(props) {
  return(
    <div class="col">
      <div class="wday">{props.day}</div>
      <img class='icon' src="http://openweathermap.org/img/wn/{props.code}@2x.png" alt=""/>
      <div class="tempmin">{props.tempMin}</div>
      <div class="tempmax">{props.tempMax}</div>
      <div class="humidity">{props.humidity}</div>
    </div>
  );
}

function TileHour( props ){
  return(
    <div class="col">
      <div class="hour">{props.time}</div>
      <img class='icon' src="http://openweathermap.org/img/wn/{props.code}@2x.png" alt=""/>
      <div class="temp">{props.temp}</div>
      <div class="humidity">{props.humidity}</div>
    </div>
  );
}
class Pogodynka extends React.Component{
  constructor(props){
    super(props);
    this.state = {

    }

    console.log({props: props});
  }


  render(){
    // let hoursTiles = this.props.forecast.list.slice(0,5).map( (item)=>{
    //   console.log({item:item});
    //   <TileHour time={item.dt} code={item.weather[0].icon} temp={item.main.temp} humidity={item.main.humidity} />
    //   // this.TileHour( item.dt, item.weather[0].icon, item.main.temp, item.main.humidity );
    //
    // } );

    return(
      <div class="container-fluid">
        <div id="view" class="bg-blue-light fc-light text-center loading">
          <div class="wrapper preloader row align-items-center justify-content-center">
            <img class="d-flex" src="media/sun.png" alt="loader"/>
          </div>
          <div class="wrapper content">
            <CityName name={this.props.weather.name}/>
            <CurrentDate date={this.props.weather.dt}/>
            <CurrentWeather condition={this.props.weather.weather[0].main}/>
            <CurrentTemperature temperature={this.props.weather.main.temp}/>

            <div class="slider">
              <div class="wrapper">
                <div id='hours' class="row">
                  <TileHour time='' code='' temp='' humidity='' />
                  <TileHour time='' code='' temp='' humidity='' />
                  <TileHour time='' code='' temp='' humidity='' />
                  <TileHour time='' code='' temp='' humidity='' />
                  <TileHour time='' code='' temp='' humidity='' />
                </div>
              </div>
              <div class="wrapper">
                <div id='forecast' class="row">
                  <TileForecast day='' code='' tempMin='' tempMax='' humidity=''/>
                  <TileForecast day='' code='' tempMin='' tempMax='' humidity=''/>
                  <TileForecast day='' code='' tempMin='' tempMax='' humidity=''/>
                  <TileForecast day='' code='' tempMin='' tempMax='' humidity=''/>
                  <TileForecast day='' code='' tempMin='' tempMax='' humidity=''/>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    );

  }


}

function getCurrentPosition( _cb ){
  var ret = null;

  if( navigator.geolocation ){
    navigator.geolocation.getCurrentPosition( (data)=>{
      // console.log( data );
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

function getCurrentWeather( pos, _cb ){
  jQuery.get(
    'http://api.openweathermap.org/data/2.5/weather?lat='+pos.lat +'&lon='+pos.long+'&units=metric&lang=pl&appid=7470d10567aa7388d997eba8b8ec3a15',
    (data,status)=>{
      // console.log( [ status, data ] );
      if ( typeof _cb === 'function' ) _cb(data);
    }
  );
  // getCurrentPosition( (pos)=>{
  // } );

}

function getForecast( pos, _cb ){
  $.get(
    'http://api.openweathermap.org/data/2.5/forecast?lat='+pos.lat+'&lon='+pos.long+'&units=metric&lang=pl&appid=7470d10567aa7388d997eba8b8ec3a15',
    ( data,status )=>{
      if ( status === 'success') {
        // console.log( [data] );
        if ( typeof _cb == 'function' ) _cb(data);
      }
    }
  );
  // getCurrentPosition( (pos)=>{
  // } );
}

function fillData(){
  let counter = 0;
  let itrv = null;
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
    counter++;
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
    counter++;
  } );

  itrv = setInterval(function () {
    console.log('waiting...');
    if ( counter > 1 ) {
      $('#view').removeClass('loading');
      clearInterval( itrv );
      console.log('loaded!');
    }
  }, 100);
}

// fillData();

getCurrentPosition( (position)=>{

  getCurrentWeather( position, (weather)=>{

    getForecast( position, (forecast)=>{

      ReactDOM.render(
        <Pogodynka position={position} weather={weather} forecast={forecast}/>,
        document.getElementById('pogodynka_container')
      );

      $('#view').removeClass('loading');

    } );

  } );

} );
