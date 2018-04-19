# generate-template

A simple CLI Tool to **generate-template**.

1.  [Motivation](#motivation)
2.  [Getting started](#getting-started)
3.  [Common usage](#common-usage)
4.  [Command line options](#command-line-options)
5.  [Custom configuration](#custom-configuration)
    1.  [Fix Linter issues](#fix-linter-issues)
    2.  [Override defaults](#override-config-defaults)

## Motivation

Code snippets exist for long in code editors, but what if you want to publish and share easy-to-use templates within a team for a project ?

When installed inside a project, **generate-template** enables you to create files based on .template files you created in your project.

## Getting started

1.  run `yarn add --dev generate-template` (or equivalent `npm` command)
2.  [OPTIONAL] run `generate-template --init`  
    _Note_: this will create a `.templates` folder at your project root, with a `example.template.js` file.
3.  Create an empty `[template-name].template.[extension]` file anywhere in your project (we recommand to keep them in `.templates/` folder created at step `2`)
4.  Write inside your template code. You can use `{{ variable }}` syntax anywhere inside to create variables you will be asked for values at generation time (step `6`). You can check example file `.templates/example.template.js` generated at step `2`.
5.  Navigate in command line **in the folder where you want to create a new file** using your template.
6.  run `generate-template new`.
7.  Select in appearing list the template you want to use.  
    _Note_: every `**.template.*` file you created in your project will be listed.
8.  If you added `{{ variables }}` in your template, you will be asked for their values.
9.  Enter a `filename` for you new file when asked.
10. **That's it!** A [filename].[extension] has been created in directory you ran `generate-template new` command in.

## Common usage

After you created your common files templates:

1.  Navigate to directory where you want to generate a file.
2.  run `generate-template new`.
3.  Answers appearing questions.

## Command line options

| command | alias | options | Description                                                |
| :------ | :---- | :------ | :--------------------------------------------------------- |
| init    | i     | none    | Create `.templates` folder, along with an example template |
| new     | n     | none    | Launch generator to create a new file                      |

## Custom configuration

### Fix linter issues

If you have a linter installed, chances are you will get errors with {{ name }} values in your `.template.js` files. To fix it, please ignore template files in your linter.

| linter | fix                                                                                                    |
| :----: | :----------------------------------------------------------------------------------------------------- |
| eslint | add (or edit) a `.eslintignore` file at your project root, and add this ignored glob `**/*.template.*` |

### Override config defaults

You can create a `config.json` file in `.templates` folder to override defaults.
Find below all configuration overrides available:

| key       |   default   |              Description |
| --------- | :---------: | -----------------------: |
| extension | ".template" | templates file extension |

Example of custom configuration:

```javascript
{
  "extension": ".tpl" // [name].tpl.[extension] files will now be used
}
```

## To do

* Add more configuration
* Add typescript
* Add tests
