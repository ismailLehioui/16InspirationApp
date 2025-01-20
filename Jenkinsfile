pipeline {
    agent any

    environment {
        FRONTEND_DIR = 'frontend'
        BACKEND_DIR = 'backend'
        SONAR_PROJECT_KEY = '16Inspiration'
        SONAR_SCANNER_HOME = tool 'SonarQubeScanner'
        MONGO_URI = 'mongodb://127.0.0.1:27017/elearningplatform'
        PORT = '5000'
        OWASP_REPORT_DIR = 'owasp-report'
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/ismailLehioui/16InspirationApp.git'
            }
        }

        stage('Install Dependencies') {
            parallel {
                stage('Install Frontend Dependencies') {
                    steps {
                        script {
                            dir("${FRONTEND_DIR}") {
                                bat 'npm install'
                            }
                        }
                    }
                }
                stage('Install Backend Dependencies') {
                    steps {
                        script {
                            dir("${BACKEND_DIR}") {
                                bat 'npm install'
                            }
                        }
                    }
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    dir("${BACKEND_DIR}") {
                        bat 'npm run test'
                    }
                }
            }
        }

        // stage('SonarQube Analysis') {
        //     steps {
        //         withSonarQubeEnv(installationName: 'SonarQubeScanner', credentialsId: '16Inspiration-token', envOnly: 'SONAR_TOKEN') {
        //             bat """
        //                 ${SONAR_SCANNER_HOME}/bin/sonar-scanner \
        //                 -Dsonar.projectKey=${SONAR_PROJECT_KEY} \
        //                 -Dsonar.sources=. \
        //                 -Dsonar.host.url=http://localhost:9000 \
        //                 -Dsonar.login=${SONAR_TOKEN}
        //             """
        //         }
        //     }
        // }

        stage('Build') {
            parallel {
                stage('Build Backend') {
                    steps {
                        script {
                            dir("${BACKEND_DIR}") {
                                bat 'npm run build'
                            }
                        }
                    }
                }
                stage('Build Frontend') {
                    steps {
                        script {
                            dir("${FRONTEND_DIR}") {
                                bat 'npm run build'
                            }
                        }
                    }
                }
            }
        }
        stage('Dockerize') {
            steps {
                script {
                    bat 'docker-compose images'
                }
            }
        }

        stage('OWASP Dependency Check') {
            steps {
                script {
                    dir("${BACKEND_DIR}") {
                        bat """
                        dependency-check.bat --project Backend \
                        --out ${env.WORKSPACE}/${OWASP_REPORT_DIR}/backend \
                        --scan .
                        """
                    }
                    dir("${FRONTEND_DIR}") {
                        bat """
                        dependency-check.bat --project Frontend \
                        --out ${env.WORKSPACE}/${OWASP_REPORT_DIR}/frontend \
                        --scan .
                        """
                    }
                }
            }
        }

        

        // stage('Push to Docker Registry') {
        //     steps {
        //         script {
        //             bat 'docker push '
        //         }
        //     }
        // }
    }

    post {
        success {
            echo 'Le pipeline a réussi !'
        }
        failure {
            echo 'Le pipeline a échoué.'
        }
        always {
            archiveArtifacts artifacts: "${OWASP_REPORT_DIR}/**/*", allowEmptyArchive: true
        }
    }
}
