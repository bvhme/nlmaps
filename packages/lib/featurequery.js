import share from '../nlmaps/node_modules/callbag-share';
import { CONFIG } from './configParser.js';
function query(url) {
  const promise = new Promise((resolve, reject) => {
    fetch(url)
      .then(res => resolve(res.json()))
      .catch(err => reject(err))
  })
  return promise;

}


//transforming operator
//returns an object with original latlng and queryResult:
// {
//   queryResult: {},
//   latlng: d.latlng
// }
// user-supplied responseFormatter is used to create queryResult.
const pointToQuery = (url, requestFormatter, responseFormatter) => inputSource => {
  
  function outputSource (start, outputSink) {
    if (start !== 0 ) return;
    inputSource(0, (t, d) => {
      if (t === 1) {
        let queryUrl = requestFormatter(url, {x: d.latlng.lng, y: d.latlng.lat});
        query(queryUrl).then(res => {
          let output =  {
            queryResult: responseFormatter(res),
            latlng: d.latlng
          }
          outputSink(1, output);
        })
      } else {
        outputSink(t, d)
      }  
    })
  }
  return share(outputSource)
}

//constructor to create a 'clickpricker' in one go.
const queryFeatures = function(source, requestFormatter, responseFormatter) {
  let URL = CONFIG.FEATUREQUERYBASEURL;
  const querier =  pointToQuery(URL, requestFormatter, responseFormatter)(source);
  //const subscribers = [];
  //const multiPlex = function() {
  //  subscribers.forEach(callback) {
  //    callback(d)
  //  }
  //}
  querier.subscribe = function(callback) {
    querier(0, callback)
  }
  return querier;
}


export {queryFeatures, pointToQuery};
