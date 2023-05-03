// MapLibre GL JS の読み込み
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import OpacityControl from 'maplibre-gl-opacity';
import 'maplibre-gl-opacity/dist/maplibre-gl-opacity.css';

const map = new maplibregl.Map({
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
      skhb: {
        // 指定緊急避難所ベクトルタイル
        type: 'vector',
        tiles: [
          `${location.href.replace('/index.html', '')}/skhb/{z}/{x}/{y}.pbf`,
        ],
        minzoom: 5, maxzoom: 8
      }
    },
    layers: [
      // 背景地図レイヤー
      {
        id: 'osm-layer', source: 'osm', type: 'raster'
      },
      // ↓重ねるハザードマップここから
      {
        id: 'hazard_flood-layer', source: 'hazard_flood', type: 'raster',
        paint: { 'raster-opacity': 0.7 }, layout: { visibility: 'none' }
      },
      {
        id: 'hazard_hightide-layer', source: 'hazard_hightide', type: 'raster',
        paint: { 'raster-opacity': 0.7 }, layout: { visibility: 'none' }
      },
      {
        id: 'hazard_tsunami-layer', source: 'hazard_tsunami', type: 'raster',
        paint: { 'raster-opacity': 0.7 }, layout: { visibility: 'none' }
      },
      {
        id: 'hazard_doseki-layer', source: 'hazard_doseki', type: 'raster',
        paint: { 'raster-opacity': 0.7 }, layout: { visibility: 'none' }
      },
      {
        id: 'hazard_kyukeisha-layer', source: 'hazard_kyukeisha', type: 'raster',
        paint: { 'raster-opacity': 0.7 }, layout: { visibility: 'none' }
      },
      {
        id: 'hazard_jisuberi-layer', source: 'hazard_jisuberi', type: 'raster',
        paint: { 'raster-opacity': 0.7 }, layout: { visibility: 'none' }
      },
      // ↑重ねるハザードマップここまで
      {
        // 指定緊急避難所
        id: 'skhb-layer', source: 'skhb', 'source-layer': 'skhb', type: 'circle',
        paint: {
          'circle-color': '#6666cc',
          // z－無レベルに応じた円の大きさ
          'circle-radius': [
            'interpolate', ['linear'], ['zoom'], 5, 2, 14, 6
          ],
          'circle-stroke-width': 1, 'circle-stroke-color': '#ffffff'
        }
      }
    ]
  }
})

// マップの初期ロード完了時に発火するイベントを定義
map.on('load', () => {
  // 背景地図・重ねるタイル地図のコントロール
  const opacity = new OpacityControl({
    baseLayers: {
      // layer-id: レイヤー名
      'hazard_flood-layer': '洪水浸水想定区域', 'hazard_hightide-layer': '高潮浸水想定区域',
      'hazard_tsunami-layer': '津波浸水想定区域', 'hazard_doseki-layer': '土石流警戒区域',
      'hazard_kyukeisha-layer': '急傾斜警戒区域', 'hazard_jisuberi-layer': '地すべり警戒区域',
    }
  })
  // 第2引数で場所を指定できる: bottom-right など
  map.addControl(opacity, 'top-left')
})
