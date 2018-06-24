#!/usr/bin/env groovy
pipeline {
  agent {
    node {
      label 'master'
    }
  }
  environment {
    GIT_SSL_NO_VERIFY=true
  }

  stages {
    stage('Build') {
      steps {
        echo "Building ${env.BUILD_ID}"
        sh 'mkdir -p reports'
        sh 'npm install'
      }
    }
    stage('Run  e2e Tests') {
      steps {
        echo "Running e2e Tests with TestCafe and CucumberJS"
        sh 'npm run e2edocker'
      }
    }
  }

  post {
    always{
      echo 'Publishing HTML reports'
      publishHTML target:[allowMissing: false, alwaysLinkToLastBuild: false, keepAll: false, reportDir: 'reports/combined', reportFiles: 'index.html', reportName: 'HTML Report', reportTitles: '']

      // Close open browsers
      sh 'pkill -f chrome || true'
      sh 'pkill -f firefox || true'

    }
    failure {
      echo 'Build failed!'

    }
  }
}
