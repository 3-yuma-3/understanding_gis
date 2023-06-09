# [地理情報と GIS データモデル](https://www.esrij.com/gis-guide/gis-datamodel/gis-datamodel/)

## 地理情報とは
- 地理情報
  - 地球上に存在するあらゆる地物や事象の状態をあらわす情報
- 地理空間情報
  - 地理情報とほぼ同じ意味
- 地理情報の種類
  - 空間的な情報
    - 地球上での位置や形状などで表される
    - それらに付随する情報で 。GIS の世界では「属性情報」と呼んでいる。
- たとえば
  - 地震の状態をあらわす空間的な情報は震源の位置を示す緯度と経度の座標で、属性情報は地震のマグニチュード、発生日時などの情報
  - 空間的な情報があることで GIS 上で震源の位置を点として示すことができ、属性情報（例：マグニチュード）があることで値によって点の大きさや色を変えて表現することができる。

## GISのデータモデル
- ベクターデータ
  - 点、線、面であらわされる情報
- ラスターデータ
  - 明確な形状として区切ることができない連続的に変化する状態や広がりを持つもの（例：標高、気温など）
- 3Dデータ
  - 地物や事象の高さの情報を 3 次元的に表現

## 地理情報の GIS データ化
- 地理情報をデジタル情報として GIS で扱えるデータにするには、どのような GIS データモデルを適用する場合においても地理情報を主題ごと（例：建物、道路など）の層に分類して、ファイルや DBMS に格納する
- DBMS のテーブルで管理する場合は、主題ごとにテーブルを作成し、空間的な情報は空間データ型の列に格納し、属性情報は、文字、数値、日付などの型の列に格納する。
- 空間的な情報と属性情報を別々に格納する形態もあるが、それらは共通の ID で関連付けられて管理される。

===

# [ベクター データ](https://www.esrij.com/gis-guide/gis-datamodel/vector-data/)
## ベクターデータとは
- 現実世界に存在する地物（目に見えないものも含む）を下記3つの要素で表現したもの
  - ポイント（点）
  - ライン（線）
  - ポリゴン（面）

## 地物をどの図形で表現すべきか

|     図形     |      代表例      |
| ------------ | ---------------- |
| point (点)   | 電柱, 信号, ATM  |
| line (線)    | 鉄道路線, 排水管 |
| polygon (面) | 建物, 行政界     |

- 同じ地物でも利用目的によって図形の表現を変える場合がある
  - 道路をline or polygon で表すなど

- ベクターデータは、明瞭な境界を持つ地物の表現に適している。
- 市区町村境界などの行政界など、目には見えないが明確な妖怪を持つもの
- 気温や降水量など、不明瞭な境界を持っている地物の表現にはラスターデータを用いるのが適切。

===

# [ラスター データ](https://www.esrij.com/gis-guide/gis-datamodel/raster-data/)
## ラスターデータとは
- ラスター データ
  - 行と列の格子状（グリッド状）に並んだセル（ピクセル）で構成されるデータ

## ラスター データの代表例
- ベースマップとして
  - 様々なデータの背景として利用可能
- 連続データとして
  - 気温や降水量、標高データなどの連続的に変化するデータ
  - 表示するだけではなく、サーフェス解析などの空間解析を行うこともできる
- 主題データとして
  - 他のデータを用いた解析結果を主題データとして表示できる
  - マルチスペクトル画像の解析結果として分類された土地利用の主題図として表示することにも適している
- ラスター データは画像ファイル（TIFF、BMP など）やジオデータベースに格納される。
-  ラスター データを地図上に表示するには、画像座標から実世界座標への変換が必要になる場合がある。
-
===

# [3D GIS データ](https://www.esrij.com/gis-guide/gis-datamodel/3d-gis-data/)
## 3D GIS データとは
- 3D GIS データ
  - X 軸、Y 軸に Z 軸（高さ）を加えた 3 次元（three dimensions ＝ 3D）の値を持ち、地理的な座標値を持つデータ

## 3D GIS データのデータモデル
- 建物や道路、駅のプラットフォーム、河川、地形（標高）、樹木など、これ以外にもさまざまな地物（地理情報）が想像した風景の中に出てくる
- これらを 3D GIS データとして作成する場合、表現すべき内容や形状、空間的範囲や必要なテクスチャはそれぞれ異なり、それぞれの表現に適した 3D GIS データモデルが存在する

### 3D GIS データの基本タイプ
- 2種類のデータタイプ/
  - フィーチャデータ
    - 不連続の物体（オブジェクトと呼ばれます）を表し、形状が明瞭なもの（例：建物）を示す。
    - このタイプの 3D 情報はフィーチャのジオメトリ（図形の形状の座標情報）として格納される。
  - サーフェスデータ
    - 明確な形状として区切ることができず、連続的に変化する状態や面的な広がりを持つもの（例：標高、気温など）を扱う
    - この場合、3D 情報は基本的にセル値として格納される。

### ArcGIS で使用される主な 3D GIS データ
- 3D フィーチャ（ポイント、ポリゴン、ライン）
- マルチパッチ
- DEM（数値標高モデル：Digital Elevation Model）
- TIN（不規則三角形網：Triangulated Irregular Network）
- テレイン データセット
- LIDAR（Light Detection And Ranging）データ
- BIM/CIM データ
- 各種 3D モデル データ

## 3D GIS データ作成のヒント
