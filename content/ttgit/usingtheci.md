---
eleventyNavigation:
  key: UsingCI
  title: Using the CI
  parent: TTGit
  order: 50
---

Our CI interface uses Woodpecker for actions on the platform. It is loaded and operated in Docker as a image, while it is interacting with the API on the website.

## Working with it
Every piece of code should be tested regularly. Ideally developers already implement unit-tests to test the functionality of code sections. Some projects even implement a suite of integration tests, testing whether the code in different parts of the software works as a whole and (still) provides the functionality the software promises to deliver. Running these tests regularly (or continuously) is the job of a Continuous Integration solution. The results of the tests are displayed to the project members and maintainers, enabling them to identify problems and react if errors occur.

## Using it
TTNRT currently provides an instance of [Woodpecker CI](https://woodpecker-ci.org/) to everyone who needs it.
You need to request access, because we want to keep resource abuse minimal. Please check out [our request procedure](https://gitea.ttnrtsite.me/TTNRT/requests)!

For the usage of our Woodpecker instance, keep the following in mind:

- CI access is **provided as-is and might break at any time** and for an undefined period of time, due to server issues, for testing and maintenance purpose or human error. Our CI service is not of the highest priority right now.
- **Resource usage must be reasonable** for the intended use-case. This is determined on a case-by-case basis, but please be aware that CI uses a lot of computing resources (cloning your repo and container, installing all your required tools, building and throwing everything away) which costs us money and does damage to our precious environment. Therefore, please consider twice how to create a good balance between ensuring code quality for your project and resource usage therefore.
- The service is in an early phase, which means it might not yet be suited for large and complex projects. Please report all issues you face to us, so you can be a part of the improvement!

If you are just curious about Woodpecker or already got access to a Woodpecker instance, the Woodpecker project has a [great documentation](https://woodpecker-ci.org/docs/intro) on how to use Woodpecker in your repositories. For now, refer to the [Gitea VCS integration section](https://woodpecker-ci.org/docs/administration/forges/gitea).

## Using TTGit actions
Forgejo, the software TTGit is built on, offers a CI/CD feature called Actions. It offers compatibility with GitHub Actions, [with some differences](https://docs.gitea.com/usage/actions/comparison). Further information such as how to run it is available in the [Using Gitea actions](/ttgit/actions) page.