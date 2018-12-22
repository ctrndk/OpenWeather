/* eslint-disable global-require */

const images = {
  "Clear Sky": require('../assets/clear.png'),
  "few clouds": require('../assets/few.jpg'),
  "Scattered Clouds":require('../assets/Scattered.jpg'),
  "Broken Clouds":require('../assets/broken.jpg'),
  "Rain": require('../assets/light-rain.png'),
  "Shower rain": require('../assets/showers.png'),
  "Mist": require('../assets/mist.jpg'),
  "Snow": require('../assets/snow.png'),
  "Thunderstorm": require('../assets/thunder.png'),
  "Clouds": require('../assets/light-cloud.png')
};

export default weather => images[weather];
