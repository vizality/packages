# @vizality/tsconfig

A shareable [TypeScript config](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) base. Created for [Vizality](https://vizality.com).

## Usage

To utilize this in your project, first go to your project's root working directory and run:

```bash
npm install @vizality/tsconfig --save-dev
```

Next, add this to your `tsconfig.json` file:

```bash
"extends": "@vizality/tsconfig"
```

And that's all there is to it! To overwrite rules or options specified in the config, simply add the overrides directly to your `tsconfig.json` file.

For more information, see [http://eslint.org/docs/developer-guide/shareable-configs](http://eslint.org/docs/developer-guide/shareable-configs).
