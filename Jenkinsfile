pipeline {
    agent any

    environment {
        // Variables d'environnement globales
        FRONTEND_DIR = 'frontend' // Dossier pour le frontend
        BACKEND_DIR = 'backend'   // Dossier pour le backend
        BUILD_DIR = 'build'       // Dossier de build
        MONGO_URI = 'mongodb://127.0.0.1:27017/elearningplatform'
        PORT = '5000'
        SONAR_PROJECT_KEY = '16Inspiration'
        SONAR_SCANNER_HOME = tool 'SonarQube' // Outil SonarQube configuré dans Jenkins
    }

    stages {
        stage('Checkout Code') {
            steps {
                // Récupérer le code source du repository
                git 'https://github.com/ismailLehioui/16InspirationApp.git'
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                script {
                    // Installation des dépendances pour le backend (Node.js)
                    dir("${BACKEND_DIR}") {
                        sh 'npm install'
                    }
                }
            }
        }

        stage('Install Frontend Dependencies') {
            steps {
                script {
                    // Installation des dépendances pour le frontend (React)
                    dir("${FRONTEND_DIR}") {
                        sh 'npm install'
                    }
                }
            }
        }

        stage('Run Backend Tests') {
            steps {
                script {
                    // Exécuter les tests backend si nécessaires
                    dir("${BACKEND_DIR}") {
                        sh 'npm run test' // Remplacez cette ligne par vos tests si vous en avez
                    }
                }
            }
        }

        stage('Run Frontend Tests') {
            steps {
                script {
                    // Exécuter les tests frontend si nécessaires
                    dir("${FRONTEND_DIR}") {
                        sh 'npm run test' // Remplacez cette ligne par vos tests si vous en avez
                    }
                }
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv(installationName: 'SonarQube', credentialsId: '16Inspiration-token', envOnly: 'SONAR_TOKEN') {
                    sh """
                        ${SONAR_SCANNER_HOME}/bin/sonar-scanner \
                        -Dsonar.projectKey=${SONAR_PROJECT_KEY} \
                        -Dsonar.sources=. \
                        -Dsonar.host.url=http://localhost:9000 \
                        -Dsonar.login=${SONAR_TOKEN}
                    """
                }
            }
        }

        stage('Build Backend') {
            steps {
                script {
                    // Construire le backend (si nécessaire pour l'environnement de production)
                    dir("${BACKEND_DIR}") {
                        sh 'npm run build' // Si votre backend a une commande build
                    }
                }
            }
        }

        stage('Build Frontend') {
            steps {
                script {
                    // Construire le frontend (création des fichiers de production React)
                    dir("${FRONTEND_DIR}") {
                        sh 'npm run build'
                    }
                }
            }
        }

        stage('Dockerize Backend') {
            steps {
                script {
                    // Construire l'image Docker pour le backend
                    dir("${BACKEND_DIR}") {
                        sh 'docker build -t my-backend .'
                    }
                }
            }
        }

        stage('Dockerize Frontend') {
            steps {
                script {
                    // Construire l'image Docker pour le frontend
                    dir("${FRONTEND_DIR}") {
                        sh 'docker build -t my-frontend .'
                    }
                }
            }
        }

        stage('Push to Docker Registry') {
            steps {
                script {
                    // Push des images Docker vers un registry (par exemple Docker Hub ou un registre privé)
                    sh 'docker push my-backend'
                    sh 'docker push my-frontend'
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
