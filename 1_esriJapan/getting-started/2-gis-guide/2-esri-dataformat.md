# [シェープファイル](https://www.esrij.com/gis-guide/esri-dataformat/shapefile/)
## シェープファイルとは
- シェープファイル
  -  GIS データ フォーマットの 1 つで、病院などの目標物や道路や建物などの位置や形状、属性情報を持つベクター データ（ポイント、ライン、ポリゴン）を格納することができます。
- Esri が策定したデータ相互交換に最適なシンプルなデータ フォーマット
- 仕様が公開されているので、ArcGIS 製品やその他多くの GIS ソフトウェアの間で幅広く利用されている
- さまざまな機関からシェープファイル形式のデータが提供、販売されている

## シェープファイルを構成する主なファイル
- シェープファイルは複数のファイルから構成されている。
- 必須のファイルは ３ つあり、このうち 1 つでも欠けると GIS アプリケーション上でシェープファイルと認識することができない
- 主な構成ファイルは以下の通り
  - ここでは、必須ファイルと ArcGIS で利用する上において推奨されるファイルを記載
- 主な構成ファイル
  - .shp: 図形の情報を格納する主なファイル。（必須）
  - .shx: 図形のインデックス情報を格納するファイル。（必須）
  - .dbf: 図形の属性情報を格納するテーブル。（必須）
  - .prj: 図形の持つ座標系の定義情報を格納するファイル。ArcGIS で使用される。（推奨）
  - .sbn および .sbx: 空間インデックスを格納するファイル。空間インデックスを持つと、ArcGIS で空間検索のパフォーマンスを向上させることができる。（推奨）

## シェープファイルをマップに追加すると
- シェープファイルを Windows エクスプローラー上で見ると、拡張子の異なるファイルから構成されていることがわかる。
- ArcGIS のアプリケーション上では、1 つのレイヤーとして扱われる

## シェープファイルのサイズ制限
- シェープファイルを構成するファイルのサイズはそれぞれ 2GB の制限がある
- フィールド名は 2 バイト文字である日本語の場合、5 文字までに制限される(英数字の場合は 10 文字まで) 。
- ファイルの最大 2 GB を超える場合や、より高度な編集機能を利用する場合は、データの管理に適した、Esri の ArcGIS の標準 データ フォーマットの 1 つであるファイル ジオデータベースの利用をおすすめする

===

# [ジオデータベースの概要](https://www.esrij.com/gis-guide/esri-dataformat/gdb-overview/)
- ジオデータベース
  - Esri が GIS データを格納するために考案した ArcGIS の標準データ フォーマット
- シェープファイルは 1 つの GIS データを複数のファイルで構成・管理する
- ジオデータベースはリレーショナル データベース（表形式）のデータ構造に基づいて、システムのファイルまたは一般的な DBMS で GIS データを一元管理する

## ジオデータベースの特徴
- シェープファイルがポイント、ライン、ポリゴンなどの基本的なベクター データのみを保持するのに対し、ジオデータベースはそれらに加え、注記（アノテーション）やラスターなど、さまざまな GIS データモデルをサポートしているので、より多くの地理空間情報を表現できる

## ジオデータベースの種類

|                                |   データフォーマット    | サイズ制限 |
| ------------------------------ | ----------------------- | ---------- |
| パーソナルジオデータベース     | Microsoft Access        | 2 GB       |
| ファイルジオデータベース       | Esri 独自のファイル形式 | 1 TB       |
| マルチユーザージオデータベース | Oracle                  | 無制限     |
|                                | Microsoft SQL Server    |            |
|                                | IBM DB2                 |            |
|                                | PostgreSQL              |            |