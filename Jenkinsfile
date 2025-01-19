pipeline {
    agent any

    environment {
        FRONTEND_DIR = 'frontend'
        BACKEND_DIR = 'backend'
        SONAR_PROJECT_KEY = '16Inspiration'
        SONAR_SCANNER_HOME = tool 'SonarQubeScanner'
        MONGO_URI = 'mongodb://127.0.0.1:27017/elearningplatform'
        PORT = '5000'
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

        stage('SonarQube Analysis') {
    def scannerHome = tool 'SonarScanner';
    withSonarQubeEnv() {
   bat "${scannerHome}/bin/sonar-scanner"
    }
  }

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
            parallel {
                stage('Dockerize Backend') {
                    steps {
                        script {
                            dir("${BACKEND_DIR}") {
                                bat 'docker build -t my-backend .'
                            }
                        }
                    }
                }
                stage('Dockerize Frontend') {
                    steps {
                        script {
                            dir("${FRONTEND_DIR}") {
                                bat 'docker build -t my-frontend .'
                            }
                        }
                    }
                }
            }
        }

        stage('Push to Docker Registry') {
            steps {
                script {
                    bat 'docker push my-backend'
                    bat 'docker push my-frontend'
                }
            }
        }
    }

    post {
        success {
            echo 'Le pipeline a réussi !'
        }
        failure {
            echo 'Le pipeline a échoué.'
        }
    }
}
