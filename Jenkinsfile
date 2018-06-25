#!/usr/bin/env groovy
pipeline {
  agent {
    docker {
      image 'browsers'
    }
  }

  environment {
    GIT_SSL_NO_VERIFY = true
  }

  stages {
    stage('Build and run e2e tests ') {
      steps {

        echo "Building ${env.BUILD_ID}"

        sh 'mkdir -p reports'
        sh 'npm install'
        sh 'npm run e2edocker'

        publishHTML target: [allowMissing: false, alwaysLinkToLastBuild: false, keepAll: false, reportDir: 'reports/combined', reportFiles: 'index.html', reportName: 'HTML Report', reportTitles: '']
      }
    }
  }
  post {
    failure {
      echo 'Build failed!'
    }
  }
}
