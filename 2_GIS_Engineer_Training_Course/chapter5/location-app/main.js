// MapLibre GL JS の読み込み
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import OpacityControl from 'maplibre-gl-opacity';
import 'maplibre-gl-opacity/dist/maplibre-gl-opacity.css';
import distance from '@turf/distance';
import { useGsiTerrainSource } from 'maplibre-gl-gsi-terrain';

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
      },
      route: {
        // 現在位置と最寄りの避難施設を繋ぐライン
        type: 'geojson',
        data: {
          type: 'FeatureCollection', features: []
        }
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
      // ↓指定緊急避難所ここから
      {
        id: 'skhb-1-layer', source: 'skhb', 'source-layer': 'skhb', type: 'circle',
        paint: {
          'circle-color': '#6666cc',
          // ズームレベルに応じた円の大きさ
          'circle-radius': [
            'interpolate', ['linear'], ['zoom'], 5, 2, 14, 6
          ],
          'circle-stroke-width': 1, 'circle-stroke-color': '#ffffff',
        },
          filter: ['get', 'disaster1'], // 属性:disaster1がtrueの地物のみ表示する
          layout: { visibility: 'none' } // レイヤーの表示はOpacityControlで操作するためデフォルトでは非表示にしておく
      },
      {
        id: 'skhb-2-layer', source: 'skhb', 'source-layer': 'skhb', type: 'circle',
        paint: {
          'circle-color': '#6666cc',
          // ズームレベルに応じた円の大きさ
          'circle-radius': [
            'interpolate', ['linear'], ['zoom'], 5, 2, 14, 6
          ],
          'circle-stroke-width': 1, 'circle-stroke-color': '#ffffff',
        },
          filter: ['get', 'disaster2'],
          layout: { visibility: 'none' } // レイヤーの表示はOpacityControlで操作するためデフォルトでは非表示にしておく
      },
      {
        id: 'skhb-3-layer', source: 'skhb', 'source-layer': 'skhb', type: 'circle',
        paint: {
          'circle-color': '#6666cc',
          // ズームレベルに応じた円の大きさ
          'circle-radius': [
            'interpolate', ['linear'], ['zoom'], 5, 2, 14, 6
          ],
          'circle-stroke-width': 1, 'circle-stroke-color': '#ffffff',
        },
          filter: ['get', 'disaster3'],
          layout: { visibility: 'none' } // レイヤーの表示はOpacityControlで操作するためデフォルトでは非表示にしておく
      },
      {
        id: 'skhb-4-layer', source: 'skhb', 'source-layer': 'skhb', type: 'circle',
        paint: {
          'circle-color': '#6666cc',
          // ズームレベルに応じた円の大きさ
          'circle-radius': [
            'interpolate', ['linear'], ['zoom'], 5, 2, 14, 6
          ],
          'circle-stroke-width': 1, 'circle-stroke-color': '#ffffff',
        },
          filter: ['get', 'disaster4'],
          layout: { visibility: 'none' } // レイヤーの表示はOpacityControlで操作するためデフォルトでは非表示にしておく
      },
      {
        id: 'skhb-5-layer', source: 'skhb', 'source-layer': 'skhb', type: 'circle',
        paint: {
          'circle-color': '#6666cc',
          // ズームレベルに応じた円の大きさ
          'circle-radius': [
            'interpolate', ['linear'], ['zoom'], 5, 2, 14, 6
          ],
          'circle-stroke-width': 1, 'circle-stroke-color': '#ffffff',
        },
          filter: ['get', 'disaster5'],
          layout: { visibility: 'none' } // レイヤーの表示はOpacityControlで操作するためデフォルトでは非表示にしておく
      },
      {
        id: 'skhb-6-layer', source: 'skhb', 'source-layer': 'skhb', type: 'circle',
        paint: {
          'circle-color': '#6666cc',
          // ズームレベルに応じた円の大きさ
          'circle-radius': [
            'interpolate', ['linear'], ['zoom'], 5, 2, 14, 6
          ],
          'circle-stroke-width': 1, 'circle-stroke-color': '#ffffff',
        },
          filter: ['get', 'disaster6'],
          layout: { visibility: 'none' } // レイヤーの表示はOpacityControlで操作するためデフォルトでは非表示にしておく
      },
      {
        id: 'skhb-7-layer', source: 'skhb', 'source-layer': 'skhb', type: 'circle',
        paint: {
          'circle-color': '#6666cc',
          // ズームレベルに応じた円の大きさ
          'circle-radius': [
            'interpolate', ['linear'], ['zoom'], 5, 2, 14, 6
          ],
          'circle-stroke-width': 1, 'circle-stroke-color': '#ffffff',
        },
          filter: ['get', 'disaster7'],
          layout: { visibility: 'none' } // レイヤーの表示はOpacityControlで操作するためデフォルトでは非表示にしておく
      },
      {
        id: 'skhb-8-layer', source: 'skhb', 'source-layer': 'skhb', type: 'circle',
        paint: {
          'circle-color': '#6666cc',
          // ズームレベルに応じた円の大きさ
          'circle-radius': [
            'interpolate', ['linear'], ['zoom'], 5, 2, 14, 6
          ],
          'circle-stroke-width': 1, 'circle-stroke-color': '#ffffff',
        },
          filter: ['get', 'disaster8'],
          layout: { visibility: 'none' } // レイヤーの表示はOpacityControlで操作するためデフォルトでは非表示にしておく
      },
      // ↑指定緊急避難所ここまで
      {
        id: 'route-layer', source: 'route', type: 'line',
        paint: { 'line-color': '#33aaff', 'line-width': 4, }
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

  // 指定緊急避難場所レイヤーのコントロール
  const opacitySkhb = new OpacityControl({
    baseLayers: {
      'skhb-1-layer': '洪水', 'skhb-2-layer': '崖崩れ/土石流/地すべり',
      'skhb-3-layer': '高潮', 'skhb-4-layer': '地震',
      'skhb-5-layer': '津波', 'skhb-6-layer': '大規模な火事',
      'skhb-7-layer': '内水氾濫', 'skhb-8-layer': '火山現象',
    }
  })
  map.addControl(opacitySkhb, 'top-right')

  // 地図上をクリックした際のイベント
  map.on('click', (e) => {
    // クリック個所に指定緊急避難場所レイヤーが存在するかどうかをチェック
    const features = map.queryRenderedFeatures(e.point, {
      layers: [
        'skhb-1-layer', 'skhb-2-layer', 'skhb-3-layer', 'skhb-4-layer',
        'skhb-5-layer', 'skhb-6-layer', 'skhb-7-layer', 'skhb-8-layer',
      ]
    })

    if (features.length === 0) return; // 地物がなければ処理を終了

    // 地物があればポップアップを表示する
    const feature = features[0] // 複数んオ地物が見つかっている場合は最初の要素を用いる
    const popup = new maplibregl.Popup()
      .setLngLat(feature.geometry.coordinates) // [lng, lat]
      // 名称・住所・備考・対応している災害種別を表示するよう、HTMLを文字列でセット
      .setHTML(
        `\
          <div style="font-weight:900; font-size: 1rem;">${feature.properties.name}}</div>\
          <div>${feature.properties.address}</div>\
          <div>${feature.properties.remarks ?? ''}</div>\
          <div>\
            <span${feature.properties.disaster1 ? '' : ' style="color:#ccc;"'}">洪水</span>\
            <span${feature.properties.disaster2 ? '' : ' style="color:#cccc;"'}>がけ崩れ/土石流/地すべり</span>\
            <span${feature.properties.disaster3 ? '' : ' style="color:#ccc;"'}>高潮</span>\
            <span${feature.properties.disaster4 ? '' : ' style="color:#ccc;"'}>地震</span>\
            <span${feature.properties.disaster5 ? '' : ' style="color:#ccc;"'}>津波</span>\
            <span${feature.properties.disaster6 ? '' : ' style="color:#ccc;"'}>大規模な火事</span>\
            <span${feature.properties.disaster7 ? '' : ' style="color:#ccc;"'}>内水氾濫</span>\
            <span${feature.properties.disaster8 ? '' : ' style="color:#ccc;"'}>火山減少</span>\
          </div>
        `,
      )
      .addTo(map);
  })

  // 地図上でマウスが移動した際のイベント
  map.on('mousemove', (event) => {
    // マウスカーソルいかに指定緊急避難所レイヤーが存在するかどうかをチェック
    const features = map.queryRenderedFeatures(event.point, {
      layers: [
        'skhb-1-layer', 'skhb-2-layer', 'skhb-3-layer', 'skhb-4-layer',
        'skhb-5-layer', 'skhb-6-layer', 'skhb-7-layer', 'skhb-8-layer',
      ]
    })

    if (features.length > 0) {
      map.getCanvas().style.cursor = 'pointer'; // 地物が存在する場合はカーソルをpointerに変更
    } else {
      map.getCanvas().style.cursor = ''; // 存在しない場合はデフォルト
    }
  })

  let userLocation = null; // ユーザーの最新の現在地を保持する変数

  // MapLibre GL JS の現在地取得機能
  const geolocationControl = new maplibregl.GeolocateControl({ trackUserLocation: true})
  map.addControl(geolocationControl, 'bottom-right')
  geolocationControl.on('geolocate', (event) => {
    userLocation = [event.coords.longitude, event.coords.latitude]
  })

  // 現在選択されている指定緊急避難場所レイヤー(skhb)を特定しそのfilter条件を返す
  const getCurrentSkhbLayerFilter = () => {
    const style = map.getStyle(); // style定義を取得
    const skhbLayers = style.layers.filter((layer) => {
      return layer.id.startsWith('skhb') // skhb から始まるlayterを抽出
    })
    // 現在表示中のレイヤーを取得
    const visibleSkhbLayers = skhbLayers.filter(((layer) => layer.layout.visibility === 'visible'))
    return visibleSkhbLayers[0].filter; // 表示中レイヤーのfilter条件を返す
  }

  // 緯軽度を渡すと最寄りの指定緊急避難場所を返す
  const getNearestFeature = (longitude, latitude) => {
    // 現在表示中の指定緊急避難場所のタイルデータ(=地物)を取得する
    const currentSkhbLayerFilter = getCurrentSkhbLayerFilter();
    const features = map.querySourceFeatures('skhb', {
      sourceLayer: 'skhb',
      filter: currentSkhbLayerFilter, // 表示中のレイヤーのfilter条件に合致する地物のみを抽出
    })

    // 現在地に最も近い地物を見つける
    const nearestFeature = features.reduce((minDistFeature, feature) => {
      const dist = distance([longitude, latitude], feature.geometry.coordinates)

      if (minDistFeature === null || minDistFeature.properties.dist > dist)
      // 1つ目の地物、もしくは、現在の地物が最寄りの場合は、最寄り地物データを更新
      return {
        ...feature, properties: { ...feature.properties, dist}
      }

      return minDistFeature; // 最寄り地物を更新しない場合
    }, null);

    return nearestFeature;
  }

  // 地図画面が描画される毎フレーム毎に、ユーザーの現在地から最寄りの避難施設を算出する
  map.on('render', () => {
    // GeolocationControlがオフなら現在地を消去する
    if (geolocationControl._watchState === 'OFF') userLocation = null;

    // ズームが一定値以下または現在地が計算されていない場合は計算を行わない
    if (map.getZoom() < 7 || userLocation === null) return;

    // 現在地の最寄りの地物を取得
    const nearestFeature = getNearestFeature(userLocation[0], userLocation[1])
  })

  // 地図画面が描画される毎フレームごとに、ユーザー現在地と最寄りの避難施設の線分を描画する
  map.on('render', () => {
    // GeolocationControlがオフなら現在地を消去する
    if (geolocationControl._watchState === 'OFF') userLocation = null;

    // ズームが一定値以下または現在地が計算されていない場合はラインを書きょする
    if (map.getZoom() < 7 || userLocation === null) {
      map.getSource('route').setData({
        type: 'FeatureCollection', features: []
      })
      return;
    }

    // 現在地の最寄りの地物を取得
    const nearestFeature = getNearestFeature(userLocation[0], userLocation[1])

    // 現在地と最寄りの地物を繋いだラインのGeoJSON-Feature
    const routeFeature = {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: [userLocation, nearestFeature._geometry.coordinates]
      }
    }
    // style.sources.routeのGeoJSONデータを更新する
    map.getSource('route').setData({
      type: 'FeatureCollection', features: [routeFeature]
    })
  })

  // 地形データ生成 (地理院標高タイル)
  const gsiTerrainSource = useGsiTerrainSource(maplibregl.addProtocol)
  // 地形データ追加 (type=raster-dem)
  map.addSource('terrain', gsiTerrainSource)

  // 陰影図追加
  map.addLayer(
    {
      id: 'hillshade', source: 'terrain', // type=raster-dem のsourceを指定
      paint: {
        'hillshade-illumination-anchor': 'map', // 陰影の方向の基準
        'hillshade-exaggeration': 0.2 // 陰影の強さ
      }
    },
    'hazard_jisuberi-layer', // どのレイヤーの手前に追加するかIDで指定
  )

  // 3D地形
  map.addControl(
    new maplibregl.TerrainControl({
      source: 'terrain', // type="raster-dem" のsourceのID
      exaggeration: 1, //標高を強調する倍率
    })
  )
})
