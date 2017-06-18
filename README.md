# Metalsmith blog example

An example of a Metalsmith-powered blog, as described in [this blog post](https://www.bensmithett.com/redesign/).

Start local dev server:

```
yarn start
```

Generate static site into `public` and `deploy` (fingerprinted) directories:

```
yarn generate
```

Generate as above with Metalsmith debugging to the console:

```
yarn debug
```

Generate as above then deploy to `gh-pages`:

```
yarn deploy
```
