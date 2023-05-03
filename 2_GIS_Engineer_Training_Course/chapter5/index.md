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


## 5-3. 実践編Part2: スマートフォンで利用できるようにする
