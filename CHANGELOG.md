# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## 1.0.0 (2021-07-18)


### ⚠ BREAKING CHANGES

* all undefineds in AST are null now
* rename Component.content to value
* rename Component.value to content
* rename Component.attrs to attributes
* remove html from ast.ts and is.ts
* remove AST.Comment
* Footnote.children signature `Array<PhrasingContent | BlockCcontent>`
is changed to `PhrasingContent[] | BlockContent[]`

### Features

* add builder ([ffda764](http://git.blackglory.me:2222/BlackGlory/rmdast/commit/ffda764a0e0cf494df088506028ffc19179c4577))
* add comment and component transformers ([ad1ad9a](http://git.blackglory.me:2222/BlackGlory/rmdast/commit/ad1ad9acc37b2b42ede357eeee0cdc9ee8ca63d9))
* add is helpers ([3454e6c](http://git.blackglory.me:2222/BlackGlory/rmdast/commit/3454e6ceb99ab9373e2448f383411c3956eeb99a))
* add plugins parameter ([61c8f12](http://git.blackglory.me:2222/BlackGlory/rmdast/commit/61c8f12e607c8eb45e8a822ff288de7d90b0ff65))
* add reamrk-web-components(draft) ([885b4be](http://git.blackglory.me:2222/BlackGlory/rmdast/commit/885b4beef9d36b6e73734eac018307ad88934716))
* add remark-footnotes ([1f6f905](http://git.blackglory.me:2222/BlackGlory/rmdast/commit/1f6f9050a72c22eb8e362fb0b7d2513bc4e21422))
* add rmdast-util-find ([ffbe45a](http://git.blackglory.me:2222/BlackGlory/rmdast/commit/ffbe45a3a1d3b0659ddf342e8ee0985dc5383264))
* add rmdast-util-map, rmdast-util-flatmap ([eb45e54](http://git.blackglory.me:2222/BlackGlory/rmdast/commit/eb45e54f7e4e1c4381224b285e2a9282ef693b34))
* add rmdast-util-split-title-body ([c179407](http://git.blackglory.me:2222/BlackGlory/rmdast/commit/c17940756543698a6b1ed4a941615f6285a7b4f1))
* all undefineds in AST are null now ([1e6145f](http://git.blackglory.me:2222/BlackGlory/rmdast/commit/1e6145fe41f3ea8ada7b737fc419d3801ad114ad))
* complete remark-web-components tokenizers ([20ef951](http://git.blackglory.me:2222/BlackGlory/rmdast/commit/20ef951541dc0ce1e9de8bbba7bd44fb820d049f))
* create the new AST ([110ec81](http://git.blackglory.me:2222/BlackGlory/rmdast/commit/110ec81891cd3eeaa2d45d29194da791de2638d2))
* footnote node signature changed ([c3a6b2b](http://git.blackglory.me:2222/BlackGlory/rmdast/commit/c3a6b2bb6523f54598a359c6a0710c1657c8d2e0))
* micromark-extension-component(buggy) ([95274ad](http://git.blackglory.me:2222/BlackGlory/rmdast/commit/95274ad58566b8c8cb99425fb18f563f83c48e97))
* passing the original node to fn ([73c5c11](http://git.blackglory.me:2222/BlackGlory/rmdast/commit/73c5c110a7986c334265daf81e55293795ebca5f))
* remove comment from ast ([eeee604](http://git.blackglory.me:2222/BlackGlory/rmdast/commit/eeee604fe2815d41abe139f569fb5070f606d443))
* support generice types ([f71a89a](http://git.blackglory.me:2222/BlackGlory/rmdast/commit/f71a89a7a897d654cff3a4de8b43da427a1bfca6))
* support html comments ([fee3469](http://git.blackglory.me:2222/BlackGlory/rmdast/commit/fee34697f2348b05f4909882485026b9fd06cc7b))
* unknown -> string ([d7a9215](http://git.blackglory.me:2222/BlackGlory/rmdast/commit/d7a9215d8ba61a4f03db85da815ebbcb2424b9ef))


### Bug Fixes

* add core-js for building ([3c9fd40](http://git.blackglory.me:2222/BlackGlory/rmdast/commit/3c9fd40b5c46168264ae8befd9507ccaab21680d))
* bundle ([c33e724](http://git.blackglory.me:2222/BlackGlory/rmdast/commit/c33e72412d5dd465307655706fc151788d096735))
* isParent type guard ([e463f07](http://git.blackglory.me:2222/BlackGlory/rmdast/commit/e463f074f087a9d20de8804d1115695d8935a754))
* types ([8e07cbd](http://git.blackglory.me:2222/BlackGlory/rmdast/commit/8e07cbd82a7722c4a66fd69a3a47e15af3b9a55b))


* rename attrs to attributes ([de6c85c](http://git.blackglory.me:2222/BlackGlory/rmdast/commit/de6c85cf349444974cd364572ac6ffb14a5907e7))
* rename content to value ([ca37956](http://git.blackglory.me:2222/BlackGlory/rmdast/commit/ca379567b5cca537c71b63ee7fb100c20fdf3b08))
* rename value to content ([6e97ec3](http://git.blackglory.me:2222/BlackGlory/rmdast/commit/6e97ec35e21abe092e5bca0ee35138f26534cc98))
* replace html with component ([cc46861](http://git.blackglory.me:2222/BlackGlory/rmdast/commit/cc46861f97724be79b35535e07c62b2d4f773169))
