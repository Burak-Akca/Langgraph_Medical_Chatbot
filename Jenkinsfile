pipeline{
    agent any

    environment {
        VENV_DIR = '.venv'
        GCP_PROJECT = ""
        GCLOUD_PATH = "/var/jenkins_home/google-cloud-sdk/bin"
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


        
        
    }
}