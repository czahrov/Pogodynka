// http://api.openweathermap.org/data/2.5/weather?lat=49.4002033&lon=20.9523785&units=metric&lang=pl&appid=7470d10567aa7388d997eba8b8ec3a15

// http://api.openweathermap.org/data/2.5/forecast?lat=49.4002033&lon=20.9523785&units=metric&lang=pl&appid=7470d10567aa7388d997eba8b8ec3a15

// http://openweathermap.org/img/wn/{icon_code}@2x.png

function CityName(props){
  let link = ['https://google.com/maps/search/',props.lat,",",props.long].join('');
  return(
    <div class="row city">
      <div class="col-12">
        <img src="media/pin.png" alt=""/>
        <a id="cityName" href={link}>{props.name}</a>
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
  let icon_link = "http://openweathermap.org/img/wn/"+props.code+"@2x.png";
  return(
    <div class="col">
      <div class="wday">{new Date(props.day*1000).toGMTString().match(/^(\w+),/)[1]}</div>
      <img class='icon' src={icon_link} alt=""/>
      <div class="tempmin">{Math.round(props.tempMin*10)/10}</div>
      <div class="tempmax">{Math.round(props.tempMax*10)/10}</div>
      <div class="humidity">{props.humidity}</div>
    </div>
  );
}

function TileHour( props ){
  let icon_link = "http://openweathermap.org/img/wn/"+props.code+"@2x.png";
  return(
    <div class="col">
      <div class="hour">{new Date(props.time * 1000).toLocaleTimeString().split(':').slice(0,2).join(':')}</div>
      <img class='icon' src={icon_link} alt=""/>
      <div class="temp">{Math.round( props.temp * 10 ) / 10}</div>
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

  createTilesHour = ()=>{
    let ret = [];
    this.props.forecast.list.slice(0,5).map( (item)=>{
      ret.push( <TileHour time={item.dt} code={item.weather[0].icon} temp={item.main.temp} humidity={item.main.humidity} /> );
    } );
    return ret;
  }

  createTilesForecast = ()=>{
    let ret = [];
    this.props.forecast.list.filter( (item)=>{
      return /12:00/.test(item.dt_txt);
    } ).slice(0,5).map( (item)=>{
      ret.push( <TileForecast day={item.dt} code={item.weather[0].icon} tempMin={item.main.temp_min} tempMax={item.main.temp_max} humidity={item.main.humidity}/> );
    } );
    return ret;
  }

  render(){
    return(
      <div class="">
        <CityName name={this.props.weather.name} lat={this.props.weather.coord.lat} long={this.props.weather.coord.lon}/>
        <CurrentDate date={this.props.weather.dt}/>
        <CurrentWeather condition={this.props.weather.weather[0].main}/>
        <CurrentTemperature temperature={this.props.weather.main.temp}/>

        <div class="slider">
          <div class="wrapper">
            <div id='hours' class="row">
              {this.createTilesHour()}
            </div>
          </div>
          <div class="wrapper">
            <div id='forecast' class="row">
              {this.createTilesForecast()}
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


getCurrentPosition( (position)=>{

  getCurrentWeather( position, (weather)=>{

    getForecast( position, (forecast)=>{

      ReactDOM.render(
        <Pogodynka position={position} weather={weather} forecast={forecast}/>,
        document.getElementById('pogodynka_container')
      );

      $('.slider').slick({
        arrows: false,
        dots: true,
        infinite: false,

      })

      $('#view').removeClass('loading');

    } );

  } );

} );
