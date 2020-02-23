var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// http://api.openweathermap.org/data/2.5/weather?lat=49.4002033&lon=20.9523785&units=metric&lang=pl&appid=7470d10567aa7388d997eba8b8ec3a15

// http://api.openweathermap.org/data/2.5/forecast?lat=49.4002033&lon=20.9523785&units=metric&lang=pl&appid=7470d10567aa7388d997eba8b8ec3a15

// http://openweathermap.org/img/wn/{icon_code}@2x.png

function CityName(props) {
  var link = ['https://google.com/maps/search/', props.lat, ",", props.long].join('');
  return React.createElement(
    'div',
    { 'class': 'row city' },
    React.createElement(
      'div',
      { 'class': 'col-12' },
      React.createElement('img', { src: 'media/pin.png', alt: '' }),
      React.createElement(
        'a',
        { id: 'cityName', href: link },
        props.name
      )
    )
  );
}

function CurrentDate(props) {
  return React.createElement(
    'div',
    { 'class': 'row date' },
    React.createElement(
      'div',
      { 'class': 'col-12' },
      new Date(props.date * 1000).toDateString()
    )
  );
}

function CurrentWeather(props) {
  return React.createElement(
    'div',
    { 'class': 'row condition' },
    React.createElement(
      'div',
      { 'class': 'col-12' },
      React.createElement(
        'div',
        { id: 'weatherCondition' },
        props.condition
      )
    )
  );
}

function CurrentTemperature(props) {
  return React.createElement(
    'div',
    { 'class': 'row temperature' },
    React.createElement(
      'div',
      { 'class': 'col-12' },
      React.createElement(
        'div',
        { id: 'currentTemperature' },
        Math.round(props.temperature * 10) / 10
      )
    )
  );
}

function TileForecast(props) {
  var icon_link = "http://openweathermap.org/img/wn/" + props.code + "@2x.png";
  return React.createElement(
    'div',
    { 'class': 'col' },
    React.createElement(
      'div',
      { 'class': 'wday' },
      new Date(props.day * 1000).toGMTString().match(/^(\w+),/)[1]
    ),
    React.createElement('img', { 'class': 'icon', src: icon_link, alt: '' }),
    React.createElement(
      'div',
      { 'class': 'tempmin' },
      Math.round(props.tempMin * 10) / 10
    ),
    React.createElement(
      'div',
      { 'class': 'tempmax' },
      Math.round(props.tempMax * 10) / 10
    ),
    React.createElement(
      'div',
      { 'class': 'humidity' },
      props.humidity
    )
  );
}

function TileHour(props) {
  var icon_link = "http://openweathermap.org/img/wn/" + props.code + "@2x.png";
  return React.createElement(
    'div',
    { 'class': 'col' },
    React.createElement(
      'div',
      { 'class': 'hour' },
      new Date(props.time * 1000).toLocaleTimeString().split(':').slice(0, 2).join(':')
    ),
    React.createElement('img', { 'class': 'icon', src: icon_link, alt: '' }),
    React.createElement(
      'div',
      { 'class': 'temp' },
      Math.round(props.temp * 10) / 10
    ),
    React.createElement(
      'div',
      { 'class': 'humidity' },
      props.humidity
    )
  );
}

var Pogodynka = function (_React$Component) {
  _inherits(Pogodynka, _React$Component);

  function Pogodynka(props) {
    _classCallCheck(this, Pogodynka);

    var _this = _possibleConstructorReturn(this, (Pogodynka.__proto__ || Object.getPrototypeOf(Pogodynka)).call(this, props));

    _this.createTilesHour = function () {
      var ret = [];
      _this.props.forecast.list.slice(0, 5).map(function (item) {
        ret.push(React.createElement(TileHour, { time: item.dt, code: item.weather[0].icon, temp: item.main.temp, humidity: item.main.humidity }));
      });
      return ret;
    };

    _this.createTilesForecast = function () {
      var ret = [];
      _this.props.forecast.list.filter(function (item) {
        return (/12:00/.test(item.dt_txt)
        );
      }).slice(0, 5).map(function (item) {
        ret.push(React.createElement(TileForecast, { day: item.dt, code: item.weather[0].icon, tempMin: item.main.temp_min, tempMax: item.main.temp_max, humidity: item.main.humidity }));
      });
      return ret;
    };

    _this.state = {};

    console.log({ props: props });
    return _this;
  }

  _createClass(Pogodynka, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { 'class': '' },
        React.createElement(CityName, { name: this.props.weather.name, lat: this.props.weather.coord.lat, long: this.props.weather.coord.lon }),
        React.createElement(CurrentDate, { date: this.props.weather.dt }),
        React.createElement(CurrentWeather, { condition: this.props.weather.weather[0].main }),
        React.createElement(CurrentTemperature, { temperature: this.props.weather.main.temp }),
        React.createElement(
          'div',
          { 'class': 'slider' },
          React.createElement(
            'div',
            { 'class': 'wrapper' },
            React.createElement(
              'div',
              { id: 'hours', 'class': 'row' },
              this.createTilesHour()
            )
          ),
          React.createElement(
            'div',
            { 'class': 'wrapper' },
            React.createElement(
              'div',
              { id: 'forecast', 'class': 'row' },
              this.createTilesForecast()
            )
          )
        )
      );
    }
  }]);

  return Pogodynka;
}(React.Component);

function getCurrentPosition(_cb) {
  var ret = null;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (data) {
      // console.log( data );
      ret = {
        lat: data.coords.latitude,
        long: data.coords.longitude
      };
      if (typeof _cb === 'function') _cb(ret);
    });

    return true;
  } else {
    return false;
  }
}

function getCurrentWeather(pos, _cb) {
  jQuery.get('http://api.openweathermap.org/data/2.5/weather?lat=' + pos.lat + '&lon=' + pos.long + '&units=metric&lang=pl&appid=7470d10567aa7388d997eba8b8ec3a15', function (data, status) {
    // console.log( [ status, data ] );
    if (typeof _cb === 'function') _cb(data);
  });
  // getCurrentPosition( (pos)=>{
  // } );
}

function getForecast(pos, _cb) {
  $.get('http://api.openweathermap.org/data/2.5/forecast?lat=' + pos.lat + '&lon=' + pos.long + '&units=metric&lang=pl&appid=7470d10567aa7388d997eba8b8ec3a15', function (data, status) {
    if (status === 'success') {
      // console.log( [data] );
      if (typeof _cb == 'function') _cb(data);
    }
  });
  // getCurrentPosition( (pos)=>{
  // } );
}

getCurrentPosition(function (position) {

  getCurrentWeather(position, function (weather) {

    getForecast(position, function (forecast) {

      ReactDOM.render(React.createElement(Pogodynka, { position: position, weather: weather, forecast: forecast }), document.getElementById('pogodynka_container'));

      $('.slider').slick({
        arrows: false,
        dots: true,
        infinite: false

      });

      $('#view').removeClass('loading');
    });
  });
});