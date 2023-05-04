# 第5章 位置情報アプリケーション開発: 実践編

## 5-1. 入門編との違い

## 5-2. 実践編Part1: 「防災マップ」を作成する

### 5-2-1. 背景地図を表示する

### 5-2-2. 災害情報を表示する
- [ハザードマップポータルサイト (国土交通省)](https://disaportal.gsi.go.jp/)
  - [洪水浸水想定区域](https://disaportal.gsi.go.jp/hazardmap/copyright/opendata.html#l2shinsuishin)
    - `	https://disaportaldata.gsi.go.jp/raster/01_flood_l2_shinsuishin_data/{z}/{x}/{y}.png`
  - [高潮浸水想定区域](https://disaportal.gsi.go.jp/hazardmap/copyright/opendata.html#takashio)
    - `https://disaportaldata.gsi.go.jp/raster/03_hightide_l2_shinsuishin_data/{z}/{x}/{y}.png`
  - [津波浸水想定](https://disaportal.gsi.go.jp/hazardmap/copyright/opendata.html#tsunami)
    - `	https://disaportaldata.gsi.go.jp/raster/04_tsunami_newlegend_data/{z}/{x}/{y}.png`
  - [土砂災害警戒区域 (土石流) ※全国](https://disaportal.gsi.go.jp/hazardmap/copyright/opendata.html#kyukeisyatikeikaikuiki)
    - `https://disaportaldata.gsi.go.jp/raster/05_dosekiryukeikaikuiki/{z}/{x}/{y}.png`
  - [土砂災害警戒区域 (急傾斜地の崩壊) ※全国](https://disaportal.gsi.go.jp/hazardmap/copyright/opendata.html#dosekiryukeikaikuiki)
    - `https://disaportaldata.gsi.go.jp/raster/05_kyukeishakeikaikuiki/{z}/{x}/{y}.png`
  - [土砂災害警戒区域 (地すべり) ※全国](https://disaportal.gsi.go.jp/hazardmap/copyright/opendata.html#jisuberikeikaikuiki)
    - `https://disaportaldata.gsi.go.jp/raster/05_jisuberikeikaikuiki/{z}/{x}/{y}.png`
  - 執筆時点のライセンス
    ```
      以下のデータは、起債のURLからリアルタイムに読み込み、ウェブサイトやソフトウェア、アプリケーションに商用非商用問わずご利用いただけます。
      出店の記載方法は、「ハザードマップポータルサイト」として、当該ページへのリンクをつけてください
    ```

### 5-2-3. 避難所位置を表示する
- [指定緊急避難所データ (国土地理院)](https://www.gsi.go.jp/bousaichiri/hinanbasho.html)
- QGISを使って、 `mergeFromCity.csv` を `skhb.geojson` に変換

```bash
$ tippecanoe -e skhb -l skhb -Z5 -z8 -pf -pk -pC -P skhb.geojson
# -e: skhbフォルダに
# -l: skhbというレイヤー名で
# -Z5 -z8: ズームレベル5~8の範囲で
# -pf: タイル内の地物数制限なしに
# -pk: タイルサイズ制限なしに
# -pC: gzip圧縮をせずに
# -P: GeoJSONマルチスレッドで読み込む
```

- 上記コマンドで生成された `skhbフォルダ` を、`location-app` の `publicフォルダ` に配置
- 避難施設毎に対応している災害種別が異なる
  1. 洪水
  2. がけ崩れ、土石流及び地すべり
  3. 高潮
  4. 自身
  5. 津波
  6. 大規模な家事
  7. 内水氾濫
  8. 火山減少

### 5-2-4. クリックイベントを追加する

### 5-2-5. ユーザーの現在地を表示する

### 5-2-6. 発展: ユーザーの最寄りの避難場所を特定する

```js
// @turf/distanceで2点間の距離を計算する
import distance from '@turf/distance'; // 値点間の距離を計算するモジュール

const point1 = [140, 40]
const point2 = [138, 38]
const dist = distance(point1, point2)
// 281.6331971379355 [km]
```

### 5-2-6. 発展: 地形データを活用する

#### COLUMN TerrainRGB
- DEM(地形データ)を画像として表示すると白黒になる
- TerrainRGBに変換すると緑青になる
- 一般的なDEMは、メートル単位の実数値のTIFFファイル
- webで使われている画像データは、各値が0~255(8bit)のRGB画像
- DEMをwebで利用できるように変換する際は、実数値をRGB値に変換する `一定のルール` が必要
- 各値が8bitのRGB画像の1ピクセルは24bitなので、16,777,216通りの値を表現することが可能になる
- TerrainRGBはこのルールを定義したもので、変換式(=エンコーディング)は以下
  - `標高 = -10000 + ((R値 × 256 × 256 + G値 × 256 + B値) × 0.1)`
- この考え方はDEMに限らず実数値を持つラスターデータをwebで効率よく取り回したい場合に応用される
- TerrainRGB形式の地形データは、 [Mapbox社](https://www.mapbox.com/) , [MapTiler社](https://www.maptiler.com/) が全世界文をAPI提供している
- 国内の地形は国土地理院から `地理院標高タイル` が配信されている
  - 地理院標高タイルは10mの地上解像度で配信されており、詳細な地形表現が可能だが、TerrainRGB形式ではないエンコーディングを使用しているため、TerrianRGB形式に変換する必要がある
  - この変換を自動で行えるライブラリが [maplibre-gl-gsi-terrain (著者のライブラリ)](https://github.com/Kanahiro/maplibre-gl-gsi-terrain)

#### 陰影図を表示する
- `MapLibre GL JS` には `hillshade` というtypeのレイヤが存在する
- 地形データである `type="raster-dem"` の source と組み合わせることで、陰影図を表示できる

#### 3D地形を表示する
- `MapLibre GL JS` では、 `type="raster-dem"` のsourceを使って、3D地形を表示することも可能
- クライアントサイドで地形計算・表示を行っているため、相応の負かが発生することには留意が必要

## 5-3. 実践編Part2: スマートフォンで利用できるようにする
### COLUMN スマホでの位置情報アプリ開発の選択肢
- OS毎のネイティブMapView
- サードパーティのネイティブライブラリを利用
  - 例) MapboxやMapLibreのSDKなど
- webベースで改あh津市、PWAやWebViewで利用する(本書の方針)

### 5-3-1. PWAの設定
- PWAの設定のためには `manifest.json` と `ServiceWorker` ファイルを作成し、`index.html` から読み込ませる必要がある
- ServiceWorkerを使えば、cache機能やpush通知をPWAで実現することが可能
