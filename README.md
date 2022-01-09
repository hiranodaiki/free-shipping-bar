## Shopify公開アプリのテンプレート
Shopify公開アプリを作成する場合は、このテンプレートをベースに行ってください。

### 環境
 `package.json`を参照してください。

## テンプレートの使い方
テンプレートは、以下の手順に沿って使用してください。

### プロジェクトをテンプレートから始める
githubから、テンプレートをcloneしてください。

```
cd your-project-directory
git clone git@github.com:UnReacts/shopify-app.git
```

pullが完了したら、以下のコマンドにより必要なパッケージをインストールしてください。

```
cd your-project-directory/shopify-app
npm install
```

### 変更を加える
テンプレートに変更を加えて、あなたのアプリを実装してください。

### pushする
テンプレートを変更したら、以下のコマンドにより変更差分をgithubにプッシュしてください。

```
git push -u origin main
```

## ディレクトリ構造

```
.
├── LICENSE.md
├── README.md
├── SECURITY.md
├── _css // tailwindのビルド元のファイル
│   └── tailwind.css
├── components // 自作コンポーネントの管理ディレクトリ
│   └── RoutePropagator.js // アプリ管理画面のルーティングをnext/routerに変更するためのコンポーネント
├── next.config.js // nextの設定ファイル
├── package-lock.json
├── package.json
├── pages // clientサイドの管理
│   ├── _app.js
│   └── index.js
├── server // serverサイドの管理
│   ├── handlers
│   │   ├── client.js
│   │   ├── index.js
│   │   └── mutations
│   │       ├── get-one-time-url.js
│   │       └── get-subscription-url.js
│   ├── index.js
│   └── server.js
├── style
│   └── style.css // _app.jsで読み込まれるグローバルcss
└── tailwind.config.js
```

## `theme-app-extension`を追加

`theme-app-extension`を追加する場合は、テンプレートのディレクトリにて以下のコマンドを実行してください。

```
shopify extension create
```

あなたの公開アプリとテーマエクステンションを紐付ける。

```
cd theme-app-extension
shopify extension register
```

上記のコマンドを実行すると、以下のメッセージが表示されるので、`y`をクリックして`enter`を押してください。

```
You can only create one Theme App Extension per app, which can’t be undone.
┃   ? Would you like to register this extension? (y/n) (You chose: yes)
```

詳細については、以下の記事を参考にしてください。

https://qiita.com/kohiki-junki/private/98f0d3e444f3d03c39ee

## その他

- [LICENSE.md](LICENSE.md)
- [SECURITY.md](SECURITY.md)

## 今後の展望

- TS化する

