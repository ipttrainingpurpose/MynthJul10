pipeline {
    agent any

    tools {
        nodejs "NodeJS_20"   // Configure NodeJS in Jenkins global tools
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'master', url: 'https://github.com/ipttrainingpurpose/MynthJul10.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Install Playwright Browsers') {
    steps {
        sh 'npx playwright install'
    }
}

        stage('Run Cucumber Tests') {
            steps {
                // Run cucumber-js tests
                //sh 'npx cucumber-js --format json:reports/cucumber-report.json'
                sh 'npx cucumber-js --format json:reports/cucumber-report.json --format node_modules/cucumber-junit:reports/cucumber-report.xml'
            }
        }

      stage('Publish Report') {
    steps {
        sh 'npm run cucumber:report'
        publishHTML([
            reportDir: 'reports',
            reportFiles: 'index.html',
            reportName: 'Cucumber Test Report',
            keepAll: true,
            alwaysLinkToLastBuild: true,
            allowMissing: false
        ])
    }
}
    }

    post {
        always {
            junit 'reports/*.xml'   // If you configure JUnit output
        }
    }
}
