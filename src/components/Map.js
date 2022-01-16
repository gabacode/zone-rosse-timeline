import React, { useState, useEffect } from 'react';
import 'rc-slider/assets/index.css';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, GeoJSON} from 'react-leaflet';
import Slider from 'rc-slider';
import Zones from './Zones';

const Map = () => {

    const [index, setIndex] = useState(0);
    const [onselect, setOnselect] = useState({});
    const [isPlaying, setPlay] = useState(false);
    const [speed, setSpeed] = useState(100);

    const features = Zones(index);

    useEffect(() => {
        if(isPlaying && index < features.days){
            const interval = setInterval(() => {
                setIndex(index + 1);
            }, speed);
            return () => clearInterval(interval);
        }
    }, [features.days, isPlaying, index, speed]);

    const highlightFeature = (e => {
        const layer = e.target;
        const { COMUNE, PRO_COM } = layer.feature.properties;
        setOnselect({
            comune:COMUNE,
            pro_com:PRO_COM
        });
    });

    const resetHighlight = () => {setOnselect({})}

    const onEachFeature= (feature, layer)=> {
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
        });
    }

    const mapPolygonColorToDensity=(zone => {
        return (
            zone.IS_RED ? '#a50f15' :
            zone.IS_ORANGE ? '#fb6a4a' :
            '#fff'
        )
    })
    const style = (feature => {
        return ({
            fillColor: mapPolygonColorToDensity(feature.properties),
            weight: 1,
            opacity: 1,
            color: 'white',
            dashArray: '1',
            fillOpacity: 0.8,
            transition: '2s'
        });
    });

    const mapStyle = {
        height: '70vh',
        width: '100%',
        margin: '0 auto',
    }

    const feature = features.data.map(feature => {
        return(feature);
    });

    return(
        <>
            <MapContainer center={[37.5, 14.1]} zoom={8} scrollWheelZoom={false} style={mapStyle}>
                <TileLayer attribution="Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL." url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"/>
                {feature && <GeoJSON data={feature} onEachFeature={onEachFeature} style={style} />}
            </MapContainer>
            <div className="w-100 mt-3">
                {onselect.comune && (
                    <ul className="position-absolute legenda">
                    <li><strong>{onselect.comune}</strong></li>
                    </ul>
                )}
                <h3 className="text-center">{features.day.data}</h3>
                <Slider min={0} max={features.days} defaultValue={index} value={index} onChange={(e) => setIndex(e)} />
                <div className="text-center m-3">
                    <button onClick={() => {setPlay(false); setIndex(0); setSpeed(100)}}>
                        <span>⏹</span>
                    </button>
                    <button onClick={() => setPlay(!isPlaying)}>
                        {isPlaying ? <span>⏸</span> : <span>▶️</span>}
                    </button>
                    <button onClick={() => setSpeed(speed/2)}>
                        <span>⏩</span>
                    </button>
                </div>
            </div>
        </>
    )
}
export default Map;