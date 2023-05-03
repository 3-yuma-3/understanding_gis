# 第3章 位置情報データの取得・囲う

## 3-1. QGISとは

## 3-2. QGISのダウンロードとインストール

## 3-3. 位置情報データの取得
### 3-3-2. 自由に使えるデータ
- OpenStreetMap
  - `https://tile.openstreetmap.org/{z}/{x}/{y}.png`
- 地理院タイル (標準地図)
  - `https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png`
- 地理院タイル (単色地図)
  - `https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png`
- 地理院タイル (空中写真)
  - `https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg`
- 地理院タイル (色別標高図)
  - `https://cyberjapandata.gsi.go.jp/xyz/relief/{z}/{x}/{y}.png`
- [国土数値情報](https://nlftp.mlit.go.jp/ksj/index.html)
- [基盤地図情報](https://www.gsi.go.jp/kiban/)
  - [基盤地図情報ダウンロードサービス](https://fgd.gsi.go.jp/download/menu.php)
- [GEOFABRIK](https://www.geofabrik.de/)
  - OpenStreetMapを地域単位にパッケージングして利用しやすい形で配信しているサービス
  - [OSMの生データ](https://planet.openstreetmap.org/) は全世界分がひとまとめになった数十GBのProtocolBuffer形式のファイルであり、使い勝手が悪い
- [Natural Earth](https://www.naturalearthdata.com/)
  - 地球上の大陸や河川などの自然地形や国境線や行政界などの文化地形のデータをパブリックドメインで公開

## 3-4. 位置情報データの表示

## 3-5. 位置情報データの加工: ベクトルデータ編
### 3-5-6. ベクトルタイル化
- QGIS以外のツールが必要
- [felt > tippecanoe (ティピカノー) (github)](https://github.com/felt/tippecanoe)
  - [mapbox / tippecanoe (github)](https://github.com/mapbox/tippecanoe)
    - こちらは2020年8月からメンテされてないので注意

```bash
$ git clone git@github.com:felt/tippecanoe.git

$ cd tippecanoe

# dockerfile の base image を ubuntu:16.04 → ubuntu:22.04 に修正

# see https://github.com/felt/tippecanoe#docker-image
$ docker build -t tippecanoe:latest .

# docker での実行例
$ docker run -it --rm \
  -v /tiledata:/data \
  tippecanoe:latest \
  tippecanoe --output=/data/output.mbtiles /data/example.geojson

# sample.geojsonをtileディレクトリへ tiles/{z}/{x}/{y}.pbf となるようにタイル化
#  -pC は gzip圧縮を '行わない' オプション
# ディレクトリ形式でタイル化する場合に必須のオプション
$ tippecanoe -e tiles sample.geojson -pC

# 複数のファイルを入力することができる
$ tippecanoe -e tiles sample1.geojson sample2.geojson -pC

# -Z で最小ズームレベル、-z で最大ズームレベルを指定できる
# 下記の場合は ズームレベル 4-10 の範囲でタイルを生成
$ tippecanoe -e tiles sample.geojson -Z4 -z10 -pC

# -l でベクトルタイル内で用いるレイヤー名を明示的に指定できる
# 下記の場合は "good_layer_name" というレイヤー名になる
$ tippecanoe -e tiles sample.geojson -l good_layer_name -z12 -pC

# -L で入力ファイルごとに別のレイヤー名を設定できる
# 下記の場合は sample1.geojson は layer1, sample2.geojson は layer2 というレイヤー名になる
tippecanoe -e tiles -pC -L layer1:sample1.geojson -L layer2:sample2.geojson
```

### 3-5-7. その他の処理
- バッファ (Buffer)
  - 地物から一定距離外側に膨らませた形状が得られる
- ディゾルブ (Dissolve)
  - 多数の地物を融合した形状が得られる
- 重心 (Centroid)
  - 地物の重心点が得られる
- 簡素化 (Simplify)


## 3-6. 位置情報データの加工: ラスターデータ編
- `JPEG` は位置情報を持っていないので、位置情報は `.jgw` に含まれている
  - このようなファイルを `ワールドファイル` と呼ぶ
  - QGISは画像と同じファイル名・同じディレクトリにあれば自動的に `ワールドファイル` を読み込んでくれる
  - `PNG` ファイルなら `.pgw`, `TIFF` ファイルなら `.tfw`


### 3-6-5
- DEM
  - ピクセル値に標高値の実数値が格納されたラスターデータ
