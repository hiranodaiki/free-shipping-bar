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
├── _css
│   └── tailwind.css
├── next-env.d.ts
├── next.config.js
├── nodemon.json
├── package-lock.json
├── package.json
├── server
│   ├── handlers
│   │   ├── client.ts
│   │   ├── index.ts
│   │   └── mutations
│   │       ├── get-one-time-url.ts
│   │       └── get-subscription-url.ts
│   ├── index.js
│   └── server.ts
├── src
│   ├── components
│   │   └── RoutePropagator.js
│   ├── lib
│   │   └── deeplink.ts
│   └── pages
│       ├── _app.js
│       └── index.tsx
├── style
│   └── style.css
├── tailwind.config.js
├── tsconfig.json
└── tsconfig.server.json
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

