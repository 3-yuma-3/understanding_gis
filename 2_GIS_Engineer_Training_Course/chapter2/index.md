# 第2章

## 2-1. 位置を表す方法: 経緯度

## 2-2. 丸い地球を動地図にするか: 地図投影法

## 2-3. 位置情報のデータ形式

## 2-4. 位置情報のファイル形式
### 2-4-1. ベクトルデータのファイル形式
- [GeoJSON (rfc7946)](https://www.rfc-editor.org/rfc/rfc7946)
  - テキストベースのファイル形式であるため、バイナリベースの形式に比較するとファイルサイズが非常に大きくなる
  - 位置情報の出コードにコストがかかる
  - 大量の位置情報データの保存・配信には不向き
- [ESRI Shapefile](https://www.esri.com/content/dam/esrisites/sitecore-archive/Files/Pdfs/library/whitepapers/pdfs/shapefile.pdf)
  - `.shp`, `.shx`, `.dbf` などからなるファイル群
  - 同一ディレクトリに存在している必要がある
  - クライアント・サーバー型のアプリには不向き
  - バイナリベースなので保管・公開するには適している
  - ファイルサイズ上限が2GB、文字コードが任意なので文字化けしやすい
- MapboxVectorTile
  - [mapbox / vector-tile-spec (github)](https://github.com/mapbox/vector-tile-spec)
  - 大量のデータを配信することに特化したファイル形式
  - [Protocol Buffers](https://protobuf.dev/) に準拠したバイナリデータ
  - データ構造も非常によく設計されたもの
  - 地図タイルの概念がベースとなっている
- csv
  - 各行が経緯度を持つ
- その他
  - GeoPackage
    - QGISの標準ファイル形式であり、高速に動作し、多機能
  - DXF
    - CADソフトウェアで用いられる形式
  - KML
    - Google Earthの標準ファイル形式
  - GPX
    - GPSの測定データの保存に用いられる形式

### 2-4-2. ラスターデータのファイル形式
- GeoTIFF
  - TIFF画像に位置情報を埋め込んだ形式
  - 1ファイルのサイズが大きくなる傾向にあるため、クライアント・サーバー型のアプリで利用されることは少ない
- その他 (JEPG, PNG, WEBP)
  - 画像自体は位置情報を持たない
  - 地図タイルの仕組みにより、タイル画像を地図上のどこに配置すべきかが一位に定まるようになっている

## 2-5. 位置情報の配信方法
### WMS, WMTSなどのプロトコルについて
- 位置情報アプリにおけるクライアント・サーバー間のプロトコルとしてOGC標準の規格がある
  - 地図タイルなどの技術進歩により新たに採用されることはなくなりつつある
- WMS (Web Ma pService)
  - ラスターデータ配信仕様、バウンディングボックスベース
- WMTS (Web Map Tile Service)
  - ラスターデータ配信しよう、タイルインデックスベース
- WFS (Web Feature Service)
  - ベクターデータ配信しよう、バウンディングボックスベース

### 位置情報を配信するためのサーバー実装
- Django
  - 公式で位置情報拡張が実装されている
  - [django > Documentatin > GeoDjango (4.2)](https://docs.djangoproject.com/en/4.2/ref/contrib/gis/)
- GeoServer
  - 位置情報の配信、CRUD処理を提供するサーバーアプリケーション
  - [GeoServer](https://geoserver.org/)
- MapServer
  - サーバーサイドで地図をレンダリング・配信するための歴史あるサーバーアプリケーション
  - [MapServer](https://mapserver.org/)

## 2-6. サーバーレスの潮流: Cloud Optimized
- Cloud Optimized
  - 特別なサーバー実装を必要とせずに、大きな位置情報データの一部分を配信することを可能とするファイル形式の総称
  - [HTTP-Range Requests (rfc7233)](https://www.rfc-editor.org/rfc/rfc7233) によって大きな位置情報データのバイト列の一部分をリクエストすることで、一部の両利きだけのデータを取得するという仕組みになっている
  - データへのリクエストの仕方が特殊であるため、クライアント側でファイル形式に応じた実装が必要
- ラスターデータでは `Cloud Optimized GeoTIFF (COG)` がデファクト
  - [JAXA Earth API](https://data.earth.jaxa.jp/ja/) が `COG形式` で衛星画像を配信している
- ベクターデータでは普及期に至ってない

- その他のCloud Optimized形式
  - FlatGeobuf
    - [FlatBuffers](https://flatbuffers.dev/) を土台とするベクター形式
  - GeoParquet:
    - [Apache Parquet](https://parquet.apache.org/) を土台とするベクター形式
  - [protomaps > PMTiles (github)](https://github.com/protomaps/PMTiles)
    - 地図タイルを土台とする形式
