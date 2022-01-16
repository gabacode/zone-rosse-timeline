import data from '../data/sicilia.json';
import timeSeries from '../data/zones.json';

export default function Zones(date){
    let features = data.features;
    
    features.forEach(x => {x.properties.IS_RED = undefined; x.properties.IS_ORANGE = undefined})
    const timeframe = timeSeries[date];

    if(timeframe.rossa.length > 0){
        features.filter(x => timeframe.rossa.includes(x.properties.PRO_COM)).map(x => x.properties.IS_RED = true)
    }
    if(timeframe.arancione.length > 0){
        features.filter(x => timeframe.arancione.includes(x.properties.PRO_COM)).map(x => x.properties.IS_ORANGE = true);
    }
    
    return {data: features, day: timeSeries[date], days: timeSeries.length - 1};
}