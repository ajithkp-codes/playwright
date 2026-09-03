# Jenkins Installation Guide for macOS

Complete guide to install and configure Jenkins on Mac for CI/CD automation.

---

## Prerequisites

- **macOS 10.13 or later**
- **Java 11 or 17** (Jenkins requirement)
- **Administrator access**
- **5 GB free disk space**

---

## Method 1: Install with Homebrew (Easiest)

### Step 1: Install Homebrew (if not installed)

```bash
# Open Terminal and run:
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Verify installation
brew --version
```

### Step 2: Install Java (Required for Jenkins)

```bash
# Install Java 17 (recommended)
brew install openjdk@17

# Verify installation
java -version

# Set JAVA_HOME (add to ~/.zshrc or ~/.bash_profile)
echo 'export PATH="/usr/local/opt/openjdk@17/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

### Step 3: Install Jenkins

```bash
# Add Jenkins tap to Homebrew
brew tap homebrew/cask-versions

# Install Jenkins
brew install jenkins-lts

# Verify installation
jenkins --version
```

### Step 4: Start Jenkins

```bash
# Start Jenkins using Homebrew services
brew services start jenkins-lts

# Check status
brew services list | grep jenkins
```

### Step 5: Access Jenkins

1. Open browser: **http://localhost:8080**
2. Get initial admin password:
   ```bash
   cat ~/.jenkins/secrets/initialAdminPassword
   ```
3. Paste password into Jenkins web interface
4. Follow setup wizard to complete installation

---

## Method 2: Install with Docker (Alternative)

### Step 1: Install Docker Desktop

Download from: https://www.docker.com/products/docker-desktop

### Step 2: Run Jenkins in Docker

```bash
# Pull Jenkins image
docker pull jenkins/jenkins:lts

# Create Jenkins data directory
mkdir -p ~/jenkins_home

# Run Jenkins container
docker run -d \
  --name jenkins \
  --restart unless-stopped \
  -p 8080:8080 \
  -p 50000:50000 \
  -v ~/jenkins_home:/var/jenkins_home \
  -v /var/run/docker.sock:/var/run/docker.sock \
  jenkins/jenkins:lts

# Get initial admin password
docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword
```

### Step 3: Access Jenkins

1. Open: **http://localhost:8080**
2. Use password from above
3. Complete setup wizard

---

## Method 3: Manual Installation

### Step 1: Download Jenkins

```bash
# Create Jenkins directory
mkdir -p ~/jenkins

# Download latest Jenkins LTS
cd ~/jenkins
curl -O https://mirrors.jenkins.io/war-stable/latest/jenkins.war
```

### Step 2: Install Java

```bash
# Install Java 17
brew install openjdk@17

# Verify
java -version
```

### Step 3: Start Jenkins

```bash
# Run Jenkins
java -jar jenkins.war

# Jenkins will start on http://localhost:8080
```

---

## ⚙️ Post-Installation Setup

### 1. Initial Configuration

1. Get admin password:
   ```bash
   cat ~/.jenkins/secrets/initialAdminPassword
   ```

2. Visit **http://localhost:8080**

3. Enter password and click **Continue**

4. Choose **Install suggested plugins** (recommended)

5. Create first admin user:
   - Username: your-username
   - Password: strong-password
   - Full name: Your Name
   - Email: your@email.com

### 2. Install Recommended Plugins

After initial setup, go to **Manage Jenkins** → **Manage Plugins** and install:

- Pipeline
- Git
- GitHub Integration
- Blue Ocean (nice UI)
- Slack Notification
- Email Extension
- Performance Plugin

```bash
# Or install via script
# This is a more advanced method for automation
```

### 3. Configure GitHub Integration (Optional)

1. Go to **Manage Jenkins** → **System**
2. Add GitHub server:
   - Name: `github.com`
   - API URL: `https://api.github.com`
   - Credentials: Add GitHub personal access token

### 4. Set Up Build Triggers

For automatic builds on GitHub push:

1. Create new job
2. Go to **Build Triggers**
3. Check **GitHub hook trigger for GITScm polling**
4. Add webhook to GitHub repo

---

## 🚀 Running Jenkins

### Start Jenkins

```bash
# With Homebrew
brew services start jenkins-lts

# With Docker
docker start jenkins

# Manual
cd ~/jenkins && java -jar jenkins.war
```

### Stop Jenkins

```bash
# With Homebrew
brew services stop jenkins-lts

# With Docker
docker stop jenkins

# Manual
Press Ctrl+C in terminal
```

### Check Status

```bash
# With Homebrew
brew services list

# With Docker
docker ps | grep jenkins

# Logs
tail -f ~/.jenkins/jenkins.log
```

---

## 🧪 Creating Your First Pipeline

### Step 1: Create New Job

1. Click **New Item**
2. Name: `test-playwright`
3. Type: **Pipeline**
4. Click **OK**

### Step 2: Configure Pipeline

Go to **Pipeline** section and add:

```groovy
pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', 
                    url: 'https://github.com/your-username/playwright.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('Upload Results') {
            steps {
                sh '''
                    export CURRENTS_PROJECT_ID=LBuyQE
                    export CURRENTS_RECORD_KEY=$CURRENTS_RECORD_KEY
                    npm test
                '''
            }
        }
    }

    post {
        always {
            // Archive test results
            junit 'test-results/**/*.xml'
            
            // Archive reports
            publishHTML([
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright Report'
            ])
        }
    }
}
```

### Step 3: Add Credentials

1. Go to **Manage Jenkins** → **Manage Credentials**
2. Add **Secret text** for:
   - `CURRENTS_RECORD_KEY`
   - `GITHUB_TOKEN` (if needed)

### Step 4: Configure Webhooks

In GitHub repo settings:
1. **Settings** → **Webhooks**
2. **Add webhook**
3. Payload URL: `http://your-ip:8080/github-webhook/`
4. Content type: `application/json`
5. Trigger on `push` events

---

## 📊 Integrate with Currents

### Add to Jenkinsfile

```groovy
pipeline {
    agent any

    environment {
        CURRENTS_PROJECT_ID = 'LBuyQE'
        CURRENTS_RECORD_KEY = credentials('currents-record-key')
    }

    stages {
        stage('Run Tests with Currents') {
            steps {
                sh '''
                    npm install
                    npm test
                '''
            }
        }
    }

    post {
        always {
            // Upload to Currents (happens automatically)
            echo "Test results uploaded to Currents"
            
            // Also generate local report
            publishHTML([
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright Report'
            ])
        }
    }
}
```

---

## 🔐 Security Configuration

### 1. Enable Security

1. **Manage Jenkins** → **Security**
2. Enable **Enable security**
3. Choose **Jenkins' own user database**
4. Check **Allow users to sign up** (or uncheck for restricted)

### 2. Manage Credentials

```bash
# Store secrets in Jenkins Credentials Manager
# NEVER hardcode sensitive data

# Go to: Manage Jenkins → Manage Credentials
# Add:
# - GitHub tokens
# - Currents record key
# - Slack tokens
# - Any API keys
```

### 3. Backup Jenkins

```bash
# Backup Jenkins home directory
mkdir -p ~/jenkins_backups
tar -czf ~/jenkins_backups/jenkins_$(date +%Y%m%d).tar.gz ~/.jenkins/

# Or use Jenkins Backup Plugin
# Manage Jenkins → Manage Plugins → Search "Backup"
```

---

## 📱 Useful Jenkins URLs

- **Main UI:** http://localhost:8080
- **Manage Jenkins:** http://localhost:8080/manage
- **Manage Plugins:** http://localhost:8080/pluginManager/
- **System Configuration:** http://localhost:8080/configure
- **Manage Users:** http://localhost:8080/securityRealm/
- **Build Queue:** http://localhost:8080/queue/
- **Build History:** http://localhost:8080/job/YOUR-JOB-NAME/

---

## 🆘 Troubleshooting

### Jenkins won't start

```bash
# Check if port 8080 is in use
lsof -i :8080

# Kill process using port 8080
kill -9 <PID>

# Check Java installation
java -version

# Check logs
tail -f ~/.jenkins/jenkins.log
```

### Out of memory error

```bash
# Edit Jenkins launch config
# Add to ~/.zshrc or ~/.bash_profile:
export JENKINS_NODE_COOKIE=durable-$RANDOM
export JENKINS_HOME=~/.jenkins
export JAVA_OPTS="-Xmx2048m -XX:MaxPermSize=512m"

# Restart Jenkins
brew services restart jenkins-lts
```

### Can't connect to GitHub

1. Check GitHub token validity
2. Verify network connection
3. Check Jenkins logs:
   ```bash
   tail -100 ~/.jenkins/jenkins.log
   ```

### Tests not uploading to Currents

1. Verify `CURRENTS_RECORD_KEY` is set
2. Check Jenkins credentials configuration
3. Run test manually to verify:
   ```bash
   CURRENTS_PROJECT_ID=LBuyQE npm test
   ```

---

## 🔄 Continuous Integration Workflow

### GitHub → Jenkins → Currents

```
1. Push code to GitHub
   ↓
2. GitHub sends webhook to Jenkins
   ↓
3. Jenkins pulls code
   ↓
4. Jenkins installs dependencies (npm install)
   ↓
5. Jenkins runs tests (npm test)
   ↓
6. Tests upload to Currents automatically
   ↓
7. Jenkins generates HTML report
   ↓
8. Jenkins notifies (Slack, Email, etc.)
   ↓
9. View results on Currents dashboard
```

---

## 📚 Configuration Files

### Create Jenkinsfile in your repo

Create file `Jenkinsfile` at project root:

```groovy
pipeline {
    agent any

    environment {
        CURRENTS_PROJECT_ID = 'LBuyQE'
        CURRENTS_RECORD_KEY = credentials('currents-record-key')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install') {
            steps {
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
    }

    post {
        always {
            publishHTML([
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright Report'
            ])
            
            junit 'test-results/**/*.xml'
        }

        success {
            echo 'All tests passed!'
        }

        failure {
            echo 'Tests failed!'
        }
    }
}
```

---

## ✅ Verification Checklist

After installation, verify:

- ✅ Jenkins starts successfully: `brew services start jenkins-lts`
- ✅ Access web UI: http://localhost:8080
- ✅ Create test job
- ✅ Install plugins
- ✅ Configure GitHub integration
- ✅ Add credentials
- ✅ Create pipeline
- ✅ Trigger build
- ✅ View results
- ✅ Check Currents dashboard

---

## 📞 Resources

- **Jenkins:** https://jenkins.io
- **Jenkins Docs:** https://www.jenkins.io/doc/
- **Pipeline Guide:** https://www.jenkins.io/doc/book/pipeline/
- **Plugins:** https://plugins.jenkins.io
- **GitHub Integration:** https://plugins.jenkins.io/github/
- **Blue Ocean:** https://plugins.jenkins.io/blueocean/

---

## 🎯 Next Steps

1. Choose installation method (Homebrew recommended)
2. Install Java and Jenkins
3. Start Jenkins service
4. Complete initial setup wizard
5. Install recommended plugins
6. Create first pipeline job
7. Connect to GitHub repo
8. Set up Currents integration
9. Test webhook trigger
10. Monitor builds on Currents dashboard

---

## 💡 Tips

- Use **Blue Ocean** plugin for better UI
- Set up **email notifications** for build results
- Use **Jenkins agents** for distributed builds
- Enable **pipeline as code** (Jenkinsfile in repo)
- Regular **backups** of Jenkins home directory
- Keep Jenkins **updated** regularly
- Monitor **disk space** for test artifacts

---

Generated: September 3, 2026
For use with Playwright + Currents Integration
