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


# TestCafe and Cucumber.js Demo

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

<a href="http://testcafedemo.comsysto.com:8080/job/testcafe-demo"><img src="https://media.giphy.com/media/biKBDMA6xOKajB5cfh/giphy.gif" width="60%"></p>

## How does it work?

![Alt text](doc/TestcafeCucumberDiagram.png?raw=true "What's connected with what?")

We run everything inside Docker.

Jenkins is built using the Jenkins LTS Docker Image. On top of that, we install Node and NPM so we can run JS helper scripts for parsing/updating data and generating HTML reports. More configuration is done using Groovy; we copy various configurations, install plugin, we set the default user for accessing Jenkins GUI and we also get rid of stuff like the CSP rules that block us from viewing our HTML reports.

In this project, Jenkins is not triggered by a Git Hook, but instead Jenkins checks for new commits on GitHub. Not necessary a best practice because we use resources on our master node every couple of minutes to scan for changes on GitHub but this way the project is made to run on each and every machine without the need to do any initial configuration.

After we start our preconfigured job manually or it gets triggered by a change in the code (Git) Jenkins will execute the Pipeline that's defined in the Jenkinsfile.





To get to this point where Jenkins is set up and running the way we want it to run, we will simply install necessary npm modules ("npm install") and after that we will build the Docker image ("npm run buildJenkins").

Now we can move on to the Docker container that will be used by Jenkins to run the test code.



Never run resource intensive stuff on your Jenkins master node, always use slaves.



## Docker Stuff

The software is running inside Docker so you need to have Docker daemon running to start with the Demo.

### How to **"build"** the images needed to run Jenkins?

```npm run buildContainers```

This command will build 2 containers. One being Jenkins with preinstalled plugins and the other one being the container on which the test are actually executed. The tests run in Chrome and Firefox Browser.

#### Details about the containers

Can be found in the Dockerfile:

[docker/jenkins/Dockerfile](./docker/jenkins/Dockerfile)

[docker/browsers/Dockerfile](./docker/jenkins/Dockerfile)

### How to **"start"** Jenkins Container?

```npm run startJenkins```

### How to **"stop"** Jenkins Container?

```npm run stopJenkins```

### What to do after you start Jenkins?

Access it on **http://localhost:8080**

Jenkins will be setup up with all necessary plugins installed.
You can update the list of plugins here: **src/config/plugins.txt**

Jenkins will have a default admin user as well. Default username **admin** and password **admin**

You can choose to disable this by editing **src/bin/security.groovy**

Jenkins has a default job configured that build this project, executed the e2e tests and produces HTML reports. You can add more job configurations here: **src/config/jobs**

Click on the **testcafe-demo** pipeline and start the build by clicking **Build Now**

## Testing Stuff

### How to run the tests from command line (host)?

#### Install dependencies

```npm install```

#### Run tests

```npm run e2e```

#### How to run the tests and slow down mouse and keyboard interaction so you can see what happens when the tests are executed?

```npm run testJsonSlow```