<a href="https://comsystoreply.de">
    <img src="https://img.shields.io/badge/comsysto-reply-blue.svg">
</a>

<a href="http://testcafedemo.comsysto.com:8080/job/testcafe-demo">
    <img src="http://testcafedemo.comsysto.com:8080/buildStatus/icon?job=testcafe-demo/master">
</a>

<a href="https://github.com/DevExpress/testcafe">
    <img alt="Tested with TestCafe" src="https://img.shields.io/badge/tested%20with-TestCafe-2fa4cf.svg">
</a>

<a href="https://cucumber.io">
    <img src="https://img.shields.io/badge/tested%20with-Cucumber-green.svg">
</a>


# Test Automation with TestCafe and Cucumber.js

This project builds and runs e2e tests with TestCafe and Cucumber.js inside Jenkins pipeline

# What does this project contain?

The project contains Docker files (for Jenkins master and slave), Jenkins configurations (plugins, jobs, setup), test code (js), feature files (gherkin), custom HTML report generator, many NPM scripts that make life easier (package.json)...

# Intro
## What is e2e Testing?

End-to-end testing is where you test your whole application from start to finish. It involves assuring that all the integrated pieces of an application function and work together as expected.

In this project we run e2e test upon Web Applications with **"TestCafe"** and **"Cucumber.js"**.

## What is TestCafe?

TestCafe is a **Node.js** tool for automated e2e web testing. It is free and open source, easy to set up and it is working on all popular environments.

With TestCafe we can run tests on multiple browsers on multiple platforms, write stable tests in latest JS and TS versions and integrate our tests with **CI pipelines** (Jenkins).

### TestCafe main features:

- no web driver
- uses **web proxy** to run tests – URL rewrite
- automatic waiting for page loads
- run test on **remote browsers** including mobile native
- isolated testing – each time a browser is opened by TestCafe it behaves like a incognito window
- write test in the language you write you application – JS, TS

## What is Cucumber.js?

Cucumber.js is a JavaScript implementation of Cucumber and it is used for running automated tests written in plain language. We combine it with TestCafe, so we use Cucumber.js to automate the execution of tests written with TestCafe.

# Getting started with the Demo

This project is pre-built here:

[![](doc/url1.gif?raw=true)](http://testcafedemo.comsysto.com:8080/job/testcafe-demo)

so you can take a look at the Pipeline without downloading or installing anything.

## How does it all work?

![Alt text](doc/TestcafeCucumberDiagram.png?raw=true "What's connected with what?")

We run everything inside Docker so to be able to run the demo yourself you need to have Docker daemon running. If you don't have Docker installed you can get it 
[here](https://www.docker.com/get-startedher)

Jenkins is built using the Jenkins LTS Docker Image. On top of that, we install Node and NPM so we can run JS helper scripts for parsing/updating data and generating HTML reports. More configuration is done using Groovy; we copy various configurations, install plugins, we set the default user for accessing Jenkins GUI and we also get rid of stuff like the CSP rules that block us from viewing our HTML reports.

In this project, Jenkins is not triggered by a Git Hook, but instead Jenkins checks for new commits on GitHub. Not necessary the best practice because we use resources on our master node every couple of minutes to scan for changes on GitHub but this way the project is made to run on each and every machine without the need to do any initial configuration.

> Avoid running resource intensive stuff on your Jenkins master node, use slaves.

Jenkins has a default job configured that build this project, executed the e2e tests and produces HTML reports. You can add more job configurations here: **src/config/jobs**

After we start our preconfigured job manually or it gets triggered by a change in the code (Git) Jenkins will execute the Pipeline that's defined in the Jenkinsfile.


Jenkins will be setup up with all necessary plugins installed.
You can update the list of plugins here: **src/config/plugins.txt**
> You can also use this file to update your plugins. Just bump the version in the file and re-build the Docker Image.

### How to build the Project?

To get to this point where Jenkins is set up and running the way we want it to run, we will simply install necessary npm modules

```bash
npm install
```
> We are doing this locally on our workstation 

and after that we will build the Docker images: 
```bash
npm run buildContainers
```
With the previous command we actually run 2 npm scripts:
```bash
npm run buildBrowsers && npm run buildJenkins
```
This command will build 2 containers. One being Jenkins and the other one being the container on which the test are actually executed (the Slave). 

> As you can see, many useful commands have been converted to npm scripts. Check them out in the [package.json](./package.json) file

The "browsers" container also contains Node and NPM as well as 2 browsers, Chrome and Firefox. When the Jenkins Pipeline is triggered, the tests run in parallel in both browsers.

Details about the containers can be found in the Dockerfile:

[docker/jenkins/Dockerfile](./docker/jenkins/Dockerfile)

[docker/browsers/Dockerfile](./docker/jenkins/Dockerfile)

> Most of the code is well commented so you can use it as documentation.

### How to start Jenkins Container?

```bash
npm run startJenkins
```

This npm script will run the following command:

```bash
_pwd=\"$(pwd)\" && docker run -d -p 8080:8080 -p 50000:50000 --env JAVA_OPTS=\"-Dorg.jenkinsci.plugins.durabletask.BourneShellScript.HEARTBEAT_CHECK_INTERVAL=30\" -v $_pwd/jenkins_home:/var/jenkins_home -v /var/run/docker.sock:/var/run/docker.sock jenkinstescafe:latest
```

First we store the current working folder so we can use that value for setting the correct path for the jenkins_home parameter. The tests take a long time to execute and Jenkins by default will think that the Cucumber process is hanging and will break the build. In our case we set the heart beat check option to a custom value to bypass the problem.

We also pass our local Docker socket to the container so the container it self can spawn new containers on the host machine. Since the Jenkins slave is also a Docker container the setup comes in quite handy. 

### How to stop Jenkins Container?

If you want to stop the Jenkins container execute the following npm script:
```bash
npm run stopJenkins
```
will call up the following command:
```bash
docker stop $(docker ps -qa --filter ancestor=jenkinstescafe)
```
and stop all running instances of the Jenkins container.

### What to do after you start Jenkins?

Access it on **http://localhost:8080**

with default username **admin** and password **admin**.

> You can change the default admin password later through the Jenkins admin console or in the [docker/jenkins/bin/security.groovy](./docker/jenkins/bin/security.groovy) config file. Don't forget to build the Docker Image after you make a change.

Click on the **testcafe-demo** pipeline and start the build by clicking **Build Now**

## Testing Stuff

### How to run the tests from command line (host)?

#### Install dependencies

```bash
npm install
```

#### Run tests

```bash
npm run e2e
```

#### How to run the tests and slow down mouse and keyboard interaction so you can see what happens when the tests are executed?

```bash
npm run testSlow
```