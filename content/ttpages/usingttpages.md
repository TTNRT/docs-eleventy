---
eleventyNavigation:
  key: UsingTTPages
  title: Using TTPages
  parent: TTPages
  order: 60
---

On this page, we will cover on how our TTPages service works for TTGit, including a way to use it with your repo you may have. You should keep note on the following as well:

- This service is somewhat different from other providers
- This service does not render markdown files
- This service only uses static files

With that out of the way, let's begin on using TTPages.

## Repo configuration
We should have a repo created for TTPages. For this, we need to create the repo with this name:

```
[USERNAME].ttnrtsite.io
```

Be sure to replace `[USERNAME]` with your account name. Once that is done, you can create the repo and send it to the database. It is also importent to add the `gitea-pages` topic to the repo due to the program requiring it. You should also create a branch named `gitea-pages`, where the static files will go into, as the server will not use any other branch. This makes it easy for when you use a static site generator as a example. Once you have that, you can start adding your static files.

## Adding static files
{% admonition "info" "Make sure you use the gitea-pages branch" %}

The server will only interact with this branch. Do not make a pull request, as that might mess something up.

{% endadmonition %}

You can start off with a simple HTML document. You should name the file as `index.html`. For the best editing experience, we recommend using Visual Studio Code, along with a Live Server that can read your HTML document. It is up to you on what editor you like using. Once you have your content saved to the file, you can either:

1. Upload the file
2. Copy contents to the built-in editor online

After that, you need a commit message. Think of a good one. Once you have that, you should review your changes before pushing them. If you messed something up, you can always change it. Otherwise, you can safey push your changes.

## Visting your site
Once you have your file commited, it will be rendered to the system. To see your website, go to your address bar and type in this:

```
[USERNAME].ttnrtsite.io
```

Remember to change `[USERNAME]` with your account name. You should see your site in a few seconds. If you like to use a static site generator, please see our examples on our Organization.