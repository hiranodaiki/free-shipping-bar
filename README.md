## Shopify公開アプリのテンプレート
Shopify公開アプリを作成する場合は、このテンプレートをベースに行ってください。

### 環境
 `package.json`を参照してください。

## テンプレートの使い方
テンプレートは、以下の手順に沿って使用してください。

### プロジェクトをテンプレートから始める
以下の手順で、ローカルにテンプレートを作成してください。

1. `shopify app create node`でアプリプロジェクトを作成します。
2. `cd your-project-directory`であなたのアプリプロジェクトのディレクトリに移動します。
3. `ls -a | grep -v -E '.env' | xargs rm -rf & rm -rf .env.example`を実行して必要ないファイルを削除します。
4. `git init`を実行します。
5. `git pull git@github.com:UnReacts/shopify-app.git`を実行して、このリポジトリのファイルをプルします。
6. `npm install`を実行して、必要なパッケージをインストールします。
7. `shopify app serve`を実行します。
8. アプリの管理画面が開くことを確認してください。

```
shopify app create node
cd your-project-direcory
ls -a | grep -v -E '.env' | xargs rm -rf & rm -rf .env.example
git init
git pull git@github.com:UnReacts/shopify-app.git
npm install
shopify app serve
```

### あなたのリポジトリを作成する
githubにて、あなたのアプリを管理するためのリポジトリを作成してください。

### pushする
テンプレートを変更したら、以下のコマンドにより変更差分をgithubにプッシュしてください。

```
git add .
git commit -m "first commit"
git branch -M main
git remote add origin <リポジトリのURL>
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

## 参考記事
1. [【仕様書】審査に通るShopify公開アプリを作成してみよう！](https://qiita.com/kohiki-junki/private/c2b3247a2f709bf77a18)
2. [【Shopify App】Shopifyアプリ開発手順をまとめてみた](https://qiita.com/kohiki-junki/private/98f0d3e444f3d03c39ee)

## その他

- [LICENSE.md](LICENSE.md)
- [SECURITY.md](SECURITY.md)
