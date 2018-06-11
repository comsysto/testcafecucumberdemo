<a href="https://github.com/DevExpress/testcafe">
    <img alt="Tested with TestCafe" src="https://img.shields.io/badge/tested%20with-TestCafe-2fa4cf.svg">
</a>

# TestCafe and Cucumber.js Demo

Demo that contains a working Jenkins Docker container with included node.js and Chrome installations.

### How to **"build"** the image

npm run buildJenkins

### How to **"start"** Jenkins

npm run startJenkins

### How to **"stop"** Jenkins

npm run stopJenkins

### What to do after you start Jenkins?

Access it on "http://localhost:8080". Jenkins will be setup up with all necessary plugins installed and with the default admin user created.
You can update the list of plugins here: "src/config/plugins.txt" 

Default username "admin" and password "admin"

After you log in, use the default user or create your self a new one.

For now, you need to configure the pipeline manually!

### How to run the tests from command line (host):

```npm run e2e```

### How to run the tests and slow down mouse and keyboard interaction:

```npm run testJsonSlow```

### How to run the tests from command line (container):

```npm run e2edocker```