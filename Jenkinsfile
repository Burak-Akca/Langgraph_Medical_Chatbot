pipeline{
    agent any

    environment {
        VENV_DIR = '.venv'
        GCP_PROJECT = "orbital-citizen-448816-m4"
        GCLOUD_PATH = "/var/jenkins_home/google-cloud-sdk/bin"
        KUBECTL_AUTH_PLUGIN = "/usr/lib/google-cloud-sdk/bin"
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
                
                withCredentials([
                    
                    
                    file(credentialsId: 'env', variable: 'ENV_FILE_PATH'),

                    file(credentialsId: 'gcp-key' , variable : 'GOOGLE_APPLICATION_CREDENTIALS')]){
                    script{
                        echo 'Building and Pushing Docker Image to GCR.............'


                        sh '''
                        if [ ! -f .env ]; then
                        cp ${ENV_FILE_PATH} .env
                        else
                        echo ".env dosyası zaten mevcut, kopyalama işlemi yapılmadı."
                        fi
                        '''                        
                        
                        sh '''
                        export PATH=$PATH:${GCLOUD_PATH}
                        

                        
                        gcloud auth activate-service-account --key-file=${GOOGLE_APPLICATION_CREDENTIALS}

                        gcloud config set project ${GCP_PROJECT}

                        gcloud auth configure-docker --quiet


                        gcloud builds submit  --region=us-central1 --tag us-central1-docker.pkg.dev/orbital-citizen-448816-m4/wiki-langchain-rag/medical_chatbot_image:tag8
                        '''
                    }
                }
            }
        }

     stage('Deploying to Kubernetes') {
    steps {
        withCredentials([file(credentialsId: 'gcp-key', variable: 'GOOGLE_APPLICATION_CREDENTIALS')]) {
            withCredentials([string(credentialsId: 'GOOGLE_API_KEY', variable: 'GOOGLE_API_KEY'),
                             string(credentialsId: 'TAVILY_API_KEY', variable: 'TAVILY_API_KEY')]) {
                script {
                    echo 'Deploying to Kubernetes'
                    
                    sh '''
                    export PATH=$PATH:${GCLOUD_PATH}:${KUBECTL_AUTH_PLUGIN}
                    gcloud auth activate-service-account --key-file=${GOOGLE_APPLICATION_CREDENTIALS}
                    gcloud config set project ${GCP_PROJECT}
                    gcloud container clusters get-credentials medical-chatbot-cluster --region us-central1
                    '''

                    sh '''
                    kubectl create secret generic api-keys \
                    --from-literal=GOOGLE_API_KEY=${GOOGLE_API_KEY} \
                    --from-literal=TAVILY_API_KEY=${TAVILY_API_KEY}
                    '''

                    sh '''
                    kubectl apply -f config/deployment.yaml
                    '''
                }
            }
        }
    }
}

    
    
    
    }}