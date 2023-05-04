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



## 5-3. 実践編Part2: スマートフォンで利用できるようにする
