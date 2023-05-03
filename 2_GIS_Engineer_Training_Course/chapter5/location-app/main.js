// MapLibre GL JS の読み込み
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const cmap = new maplibregl.Map({
  container: 'map', // div要素のid
  zoom: 5, // 初期表示のズーム
  center: [138, 37], // 初期表示の中心
  minZoom: 5, // 最小ズーム
  maxZoom: 18, // 最大ズーム
  maxBounds: [122, 20, 154, 50], // 表示可能な範囲
  style: {
    version: 8,
    sources: {
      // 背景地図ソース
      osm: {
        type: 'raster',
        tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
        maxzoom: 19,
        tileSize: 256,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      },
      // ↓重ねるハザードマップここから
      hazard_flood: {
        type: 'raster',
        tiles: [
          'https://disaportaldata.gsi.go.jp/raster/01_flood_l2_shinsuishin_data/{z}/{x}/{y}.png'
        ],
        minzoom: 2, maxzoom: 17, tileSize: 256,
      },
      hazard_hightide: {
        type: 'raster',
        tiles: [
          'https://disaportaldata.gsi.go.jp/raster/03_hightide_l2_shinsuishin_data/{z}/{x}/{y}.png'
        ],
        minzoom: 2, maxzoom: 17, tileSize: 256
      },
      hazard_tsunami: {
        type: 'raster',
        tiles: [
          'https://disaportaldata.gsi.go.jp/raster/04_tsunami_newlegend_data/{z}/{x}/{y}.png'
        ],
        minzoom: 2, maxzoom: 17, tileSize: 256
      },
      hazard_doseki: {
        type: 'raster',
        tiles: [
          'https://disaportaldata.gsi.go.jp/raster/05_dosekiryukeikaikuiki/{z}/{x}/{y}.png'
        ],
        minzoom: 2, maxzoom: 17, tileSize: 256
      },
      hazard_kyukeisha: {
        type: 'raster',
        tiles: [
          'https://disaportaldata.gsi.go.jp/raster/05_kyukeishakeikaikuiki/{z}/{x}/{y}.png'
        ],
        minzoom: 2, maxzoom: 17, tileSize: 256
      },
      hazard_jisuberi: {
        type: 'raster',
        tiles: [
          'https://disaportaldata.gsi.go.jp/raster/05_jisuberikeikaikuiki/{z}/{x}/{y}.png'
        ],
        minzoom: 2, maxzoom: 17, tileSize: 256
      },
      // ↑重ねるハザードマップここまで
    },
    layers: [
      // 背景地図レイヤー
      {
        id: 'osm-layer', source: 'osm', type: 'raster'
      },
      // ↓重ねるハザードマップここから
      {
        id: 'hazard_flood-layer', source: 'hazard_flood', type: 'raster', paint: { 'raster-opacity': 0.7 }
      },
      {
        id: 'hazard_hightide-layer', source: 'hazard_hightide', type: 'raster', paint: { 'raster-opacity': 0.7 }
      },
      {
        id: 'hazard_tsunami-layer', source: 'hazard_tsunami', type: 'raster', paint: { 'raster-opacity': 0.7 }
      },
      {
        id: 'hazard_doseki-layer', source: 'hazard_doseki', type: 'raster', paint: { 'raster-opacity': 0.7 }
      },
      {
        id: 'hazard_kyukeisha-layer', source: 'hazard_kyukeisha', type: 'raster', paint: { 'raster-opacity': 0.7 }
      },
      {
        id: 'hazard_jisuberi-layer', source: 'hazard_jisuberi', type: 'raster', paint: { 'raster-opacity': 0.7 }
      },
      // ↑重ねるハザードマップここまで
    ]
  }
})
