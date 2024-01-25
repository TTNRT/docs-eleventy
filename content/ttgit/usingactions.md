---
eleventyNavigation:
  key: UsingActions
  title: Using the built-in Actions
  parent: TTGit
  order: 60
---

This section will tell you on how to use the built-in TTGit actions feature, which is free to use, and comes with no cost.

Actions is a continuous integration and continuous delivery (CI/CD) feature that allows you to automate your build, test and deployment pipelines in Forgejo, the software TTGit uses. It is compatible with GitHub Actions.

Due to outstanding security issues and bus factor (we need more maintainers for our CI service to get it running), we are currently not yet providing hosted Actions. If you need TTGit to host your CI, please use Woodpecker CI instead.

But you can already connect your own Runner to TTGit. CI jobs will run on your machine, and the result will be displayed in TTGit.

This guide will walk you through setting up your own Forgejo Actions Runner to use for CI jobs.

## Obtaining a token
{% admonition "info" "Make sure to enable actions" %}

Repository Actions are disabled by default and will require you to enable them in the "Advanced Settings" section of the settings page.

{% endadmonition %}


Before deploying the Runner, you need to obtain a registration token from TTGit. Registration tokens are used by the Runner and TTGit to share secrets and configurations.

You can add Runners to your account, organization, or repository. Choosing where you obtain the registration token will determine where your Runner will accept workflows from.

1. Go to the account/organization/repository settings page.

2. Click on Actions.

3. Click on Runners.

4. Click on Create new Runner.

5. Copy the registration token.

![creating_the_runner](/assets/images/creating-the-runner.png)

## Installing Forgejo Runner 
Forgejo Runner is released in both binary and container image (OCI) forms:

- Download the binary to run on your machine:

    ```bash
    wget -O forgejo-runner https://code.forgejo.org/forgejo/runner/releases/download/v3.3.0/forgejo-runner-3.3.0-linux-amd64
    chmod +x forgejo-runner
    ```
	
    Make sure to replace `amd64` with `arm64` if your host machine is on ARM.

- Or download the container image and run it using Docker:

    ```bash
    docker run --rm code.forgejo.org/forgejo/runner:3.3.0 forgejo-runner --version
    ```

## Registrating
The Forgejo runner needs to connect to a Forgejo instance and must be registered before doing so. It will give it permission to read the repositories and send back information to Forgejo such as the logs or its status. There is a few ways to register your runner for TTGit.

### Using the binary
A special kind of token is needed and can be obtained from the Create new runner button:

- in /admin/actions/runners to accept workflows from all repositories.

- in /org/{org}/settings/actions/runners to accept workflows from all repositories within the organization.

- in /user/settings/actions/runners to accept workflows from all repositories of the logged in user

- in /{owner}/{repository}/settings/actions/runners to accept workflows from a single repository.

For instance, using a token obtained for a test repository from TTGit

```
forgejo-runner register --no-interactive --token {TOKEN} --name runner --instance https://gitea.ttnrtsite.me
```

## Running
Once the Forgejo runner is successfully registered, it can be run from the directory in which the .runner file is found with:

```
forgejo-runner daemon
```

To verify it is actually available for the targeted repository, go to /{owner}/{repository}/settings/actions/runners. It will show the runners:

* dedicated to the repository with the repo type
* available to all repositories within an organization or a user
* available to all repositories, with the Global type

![list_of_runners](/assets//images/list-of-runners.png)

## Testing workflows

To test your CI runner setup, you can use the following demo workflow:

```yaml
on: [push]
jobs:
  test:
    runs-on: docker
    steps:
      - run: echo All Good
```

The runner seeks action recipes from `.forgejo/workflows`, so make sure your file is in the required path.

![demo-workflow](/assets/images/demo-workflow.png)


## Sources
- [Forgejo runner](https://forgejo.org/docs/next/admin/actions/)
- [Gitea runner](https://docs.gitea.com/usage/actions/overview)