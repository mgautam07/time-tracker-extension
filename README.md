## TODO
 - [ ] Custom colors to specific websites in pie chart
 - [ ] Week view
 - [ ] Month view
 - [x] Fallback favicon
 - [ ] Tooltip

## Packing

After the development of your extension run the command

```
$ NODE_ENV=production npm run build
```

Now, the content of `build` folder will be the extension ready to be submitted to the Chrome Web Store. Just take a look at the [official guide](https://developer.chrome.com/webstore/publish) to more infos about publishing.

---

##### Disclaimer
1. Chrome has wonky onFocusChanged function ([issue](https://issues.chromium.org/issues/41116352))
2. Extension continues to run if devtools are open and main browser window is closed 