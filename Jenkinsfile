pipeline{
    agent any

    environment {
        VENV_DIR = '.venv'
        GCP_PROJECT = "orbital-citizen-448816-m4"
        GCLOUD_PATH = "/var/jenkins_home/google-cloud-sdk/bin"
        KUBECTL_AUTH_PATH = "/usr/lib/google-cloud-sdk/bin"
    }

    stages{
        stage('Cloning Github repo to Jenkins'){
            steps{
                script{
                    echo 'Cloning Github repo to Jenkins............'
                    checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[credentialsId: 'github-token1', url: 'https://github.com/Burak-Akca/Langgraph_Medical_Chatbot.git']])
                }
            }
        }

        stage('Setting up our Virtual Environment and Installing dependencies') {
    steps {
        script {
            echo 'Setting up our Virtual Environment and Installing dependencies............'
            sh '''
            if [ ! -d "${VENV_DIR}" ]; then
                # Sanal ortam yoksa oluşturulur
                python -m venv ${VENV_DIR}
                . ${VENV_DIR}/bin/activate
                pip install --upgrade pip
                pip install -e .
            else
                # Sanal ortam varsa, aktive edilir ve güncellenir
                echo "Virtual environment already exists, updating dependencies..."
                . ${VENV_DIR}/bin/activate
                pip install --upgrade pip
                pip install -e .
            fi
            '''
        }
    }
}


    stage('DVC Pull') {
    steps {

        withCredentials([file(credentialsId: 'gcp-key', variable: 'GOOGLE_APPLICATION_CREDENTIALS')]) {
           script {
               echo 'Pulling data from DVC............'
               sh '''
                . ${VENV_DIR}/bin/activate
               dvc pull
               '''
           }
        }
        

        
        
    }
    }
    stage('Building and Pushing Docker Image to GCR'){
            steps{
                withCredentials([file(credentialsId: 'gcp-key' , variable : 'GOOGLE_APPLICATION_CREDENTIALS')]){
                    script{
                        echo 'Building and Pushing Docker Image to GCR.............'
                        sh '''
                        export PATH=$PATH:${GCLOUD_PATH}


                        gcloud auth activate-service-account --key-file=${GOOGLE_APPLICATION_CREDENTIALS}

                        gcloud config set project ${GCP_PROJECT}

                        gcloud auth configure-docker --quiet

                        docker build -t gcr.io/${GCP_PROJECT}/medical-chatbot .

                        docker push gcr.io/${GCP_PROJECT}/medical-chatbot 

                        '''
                    }
                }
            }
        }

    stage('Deploy to Google Cloud Run'){
            steps{
                withCredentials([file(credentialsId: 'gcp-key' , variable : 'GOOGLE_APPLICATION_CREDENTIALS')]){
                    script{
                        echo 'Deploy to Google Cloud Run.............'
                        sh '''
                        export PATH=$PATH:${GCLOUD_PATH}


                        gcloud auth activate-service-account --key-file=${GOOGLE_APPLICATION_CREDENTIALS}

                        gcloud config set project ${GCP_PROJECT}

                        gcloud run deploy ml-project \
                            --image=gcr.io/${GCP_PROJECT}/ml-project:latest \
                            --platform=managed \
                            --region=us-central1 \
                            --allow-unauthenticated
                            
                        '''
                    }
                }
            }
        }
    
    
    
    
    
    
    
    }}