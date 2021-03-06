# electron-preact-app :atom_symbol: :arrow_right: :rocket:

Create electron apps with no build configuration.

[![David](https://img.shields.io/david/btzr-io/electron-preact-app.svg?style=flat-square)](https://david-dm.org/btzr-io/electron-preact-app)
[![GitHub code size in bytes](https://img.shields.io/github/repo-size/btzr-io/electron-preact-app.svg?style=flat-square)](https://github.com/btzr-io/electron-preact-app)
[![GitHub license](https://img.shields.io/github/license/btzr-io/electron-preact-app.svg?style=flat-square)](https://github.com/btzr-io/electron-preact-app/blob/master/LICENSE)

### Installation

```Shell
yarn global add electron-preact-app
```

```Shell
npm -g electron-preact-app
```

### Usage

Creating a new project:

```Shell
$ electron-preact-app create <app-name>
```

### Commands

Full list of supported commands:

| Command  | Args         | Descrition                                      |
| -------- | ------------ | ----------------------------------------------- |
| `create` | `<app-name>` | Create a new project inside the current folder. |

### Flags

Full list of supported flags:

| Flags   | Description                                                                                                        |
| ------- | ------------------------------------------------------------------------------------------------------------------ |
| `--git` | Initialize as a git repository, include [common-files](https://github.com/kmindi/special-files-in-repository-root) |

### What's inside the bundle?

* electron, electron-webpack, electron-build.
* webpack, preact, redux, css-modules.
