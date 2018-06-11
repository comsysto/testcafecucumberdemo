<a href="https://comsystoreply.de">
    <img src="https://img.shields.io/badge/comsysto-reply-blue.svg">
</a>

<a href="http://34.250.247.32:8080/job/testcafe-demo">
    <img src="http://34.250.247.32:8080/buildStatus/icon?job=testcafe-demo">
</a>

<a href="https://github.com/DevExpress/testcafe">
    <img alt="Tested with TestCafe" src="https://img.shields.io/badge/tested%20with-TestCafe-2fa4cf.svg">
</a>



# TestCafe and Cucumber.js Demo

Demo that contains a working Jenkins Docker container with included node.js and Chrome installations.

# Jenkins Stuff

## How to **"build"** the image

```npm run buildJenkins```

## How to **"start"** Jenkins

```npm run startJenkins```

## How to **"stop"** Jenkins

```npm run stopJenkins```

## What to do after you start Jenkins?

Access it on **http://localhost:8080**

Jenkins will be setup up with all necessary plugins installed.
You can update the list of plugins here: **src/config/plugins.txt**

Jenkins will have a default admin user as well. Default username **admin** and password **admin**

You can choose to disable this by editing **src/bin/security.groovy**

Jenkins has a default job configured that runs this project and produces reports. You can add more jobs here: **src/config/jobs**

Click on the **testcafe-demo** pipeline and start the build by clicking **Build Now**

# Testing Stuff

## How to run the tests from command line (host):

### Install dependencies

```npm install```

### Run tests

```npm run e2e```

### How to run the tests and slow down mouse and keyboard interaction:

```npm run testJsonSlow```

### How to run the tests from command line (container):

### Install dependencies

```npm install```

### Run tests

```npm run e2edocker```