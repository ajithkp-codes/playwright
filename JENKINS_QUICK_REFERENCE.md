# Jenkins Quick Reference Guide

Fast commands and tips for Jenkins on macOS.

---

## ⚡ Quick Start (1 min)

### Automated Installation
```bash
# Run automatic installer (easiest!)
bash install-jenkins.sh

# This will:
# ✅ Install Homebrew (if needed)
# ✅ Install Java 17
# ✅ Install Jenkins LTS
# ✅ Start Jenkins service
# ✅ Show initial admin password
```

### Manual Installation
```bash
# Install Homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Java
brew install openjdk@17

# Install Jenkins
brew tap homebrew/cask-versions
brew install jenkins-lts

# Start Jenkins
brew services start jenkins-lts
```

### Access Jenkins
```bash
# Open in browser
open http://localhost:8080

# Get initial password
cat ~/.jenkins/secrets/initialAdminPassword
```

---

## 🎯 Common Commands

### Start/Stop/Status

```bash
# Start Jenkins
brew services start jenkins-lts

# Stop Jenkins
brew services stop jenkins-lts

# Restart Jenkins
brew services restart jenkins-lts

# Check status
brew services list | grep jenkins

# View logs
tail -f ~/.jenkins/jenkins.log

# View last 100 log lines
tail -100 ~/.jenkins/jenkins.log
```

### Jenkins Home Directory

```bash
# Jenkins data location
~/.jenkins/

# Backup Jenkins
tar -czf jenkins_backup.tar.gz ~/.jenkins/

# View Jenkins version
jenkins --version

# View Java version
java -version
```

---

## 🔑 Common URLs

| URL | Purpose |
|-----|---------|
| http://localhost:8080 | Main Jenkins UI |
| http://localhost:8080/manage | Manage Jenkins |
| http://localhost:8080/pluginManager/ | Plugin Manager |
| http://localhost:8080/configure | System Configuration |
| http://localhost:8080/securityRealm/ | User Management |
| http://localhost:8080/queue/ | Build Queue |

---

## 📦 Essential Plugins to Install

After initial setup, install these:

1. **Pipeline** - For Jenkinsfile support
2. **Git** - Git repository integration
3. **GitHub Integration** - GitHub webhook support
4. **Blue Ocean** - Better UI (optional but recommended)
5. **Email Extension** - Email notifications
6. **Performance Plugin** - Test result analysis
7. **Slack Notification** - Slack alerts (optional)

**Installation:**
1. Go to **Manage Jenkins** → **Manage Plugins**
2. Search for plugin name
3. Click **Install without restart**
4. Click **Download and install after restart**

---

## 🚀 Create First Pipeline

### Option A: Via Web UI

1. Click **New Item**
2. Enter name: `test-playwright`
3. Select **Pipeline**
4. Click **OK**
5. Scroll to **Pipeline** section
6. Paste this in **Script**:

```groovy
pipeline {
    agent any
    
    stages {
        stage('Test') {
            steps {
                sh '''
                    npm install
                    npm test
                '''
            }
        }
    }
}
```

7. Click **Save** and **Build Now**

### Option B: Via Jenkinsfile (Recommended)

1. Add `Jenkinsfile` to your repo root:

```groovy
pipeline {
    agent any

    environment {
        CURRENTS_PROJECT_ID = 'LBuyQE'
        CURRENTS_RECORD_KEY = credentials('currents-record-key')
    }

    stages {
        stage('Setup') {
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
                reportName: 'Test Report'
            ])
        }
    }
}
```

2. In Jenkins:
   - **New Item** → **Pipeline**
   - Choose **Pipeline script from SCM**
   - Add GitHub repo URL
   - Script path: `Jenkinsfile`

---

## 🔐 Add Credentials

### Store Secrets in Jenkins

1. Go to **Manage Jenkins** → **Manage Credentials**
2. Click **System** → **Global credentials**
3. Click **Add Credentials**
4. Choose type:
   - **Secret text** for API keys
   - **Username with password** for GitHub
   - **SSH Key** for Git

### Add Currents Key

```bash
# Type: Secret text
# Secret: Your CURRENTS_RECORD_KEY
# ID: currents-record-key
```

### Use in Pipeline

```groovy
environment {
    CURRENTS_RECORD_KEY = credentials('currents-record-key')
}
```

---

## 🔗 GitHub Integration

### Setup Webhook

1. Go to GitHub repo **Settings** → **Webhooks**
2. Click **Add webhook**
3. Fill in:
   - **Payload URL:** `http://your-computer-ip:8080/github-webhook/`
   - **Content type:** `application/json`
   - **Events:** Select "Push events"
4. Click **Add webhook**

### Get Your Computer IP

```bash
# Find your local IP
ipconfig getifaddr en0

# Or use ngrok for remote access
brew install ngrok
ngrok http 8080
# Use ngrok URL as webhook URL
```

### Configure in Jenkins

1. New **Pipeline** job
2. Check **GitHub hook trigger for GITScm polling**
3. Set **Definition:** Pipeline script from SCM
4. Choose **Git**
5. Enter repo URL
6. Save and test with a git push

---

## 📊 View Build Results

### Access Build Logs

```bash
# View latest build
open http://localhost:8080/job/your-job-name/lastBuild/

# View specific build
open http://localhost:8080/job/your-job-name/42/

# View console output
open http://localhost:8080/job/your-job-name/lastBuild/console
```

### View Test Reports

After running tests:
- Click on build number
- Scroll to **Test Report**
- Or click **Test Result** link
- View on Currents: https://app.currents.dev/projects/LBuyQE

---

## 🆘 Troubleshooting

### Jenkins won't start

```bash
# Check if port 8080 is in use
lsof -i :8080

# Kill the process
kill -9 <PID>

# Try starting again
brew services start jenkins-lts
```

### Out of memory

```bash
# Increase heap size
export JAVA_OPTS="-Xmx2048m"
brew services restart jenkins-lts
```

### Can't find initialAdminPassword

```bash
# File location
cat ~/.jenkins/secrets/initialAdminPassword

# If doesn't exist, Jenkins is already configured
# Use your admin credentials
```

### Webhook not triggering

1. Verify IP is correct: `ipconfig getifaddr en0`
2. Check Jenkins log: `tail -f ~/.jenkins/jenkins.log`
3. Test webhook in GitHub settings
4. Verify job has trigger enabled

### Git authentication issues

```bash
# Add GitHub token as credential
# Use: "Secret text" type with token
# Or add SSH key in Jenkins credentials

# Test git connection
git clone https://github.com/your-repo.git
```

---

## 📝 Popular Pipeline Examples

### Simple Test Run

```groovy
pipeline {
    agent any
    stages {
        stage('Test') {
            steps {
                sh 'npm install && npm test'
            }
        }
    }
}
```

### With Slack Notifications

```groovy
pipeline {
    agent any
    stages {
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
    }
    post {
        always {
            slackSend(
                channel: '#builds',
                message: "Build #${BUILD_NUMBER}: ${currentBuild.result}",
                webhookUrl: 'YOUR_SLACK_WEBHOOK'
            )
        }
    }
}
```

### With Email Notifications

```groovy
pipeline {
    agent any
    stages {
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
    }
    post {
        failure {
            mail to: 'your@email.com',
                 subject: "Build Failed: ${env.JOB_NAME}",
                 body: "Build #${env.BUILD_NUMBER} failed."
        }
    }
}
```

### With Parallel Stages

```groovy
pipeline {
    agent any
    stages {
        stage('Parallel Tests') {
            parallel {
                stage('Chrome') {
                    steps {
                        sh 'npm test -- --project=chromium'
                    }
                }
                stage('Firefox') {
                    steps {
                        sh 'npm test -- --project=firefox'
                    }
                }
                stage('WebKit') {
                    steps {
                        sh 'npm test -- --project=webkit'
                    }
                }
            }
        }
    }
}
```

---

## 💡 Tips & Tricks

### Clean Jenkins Cache

```bash
# Stop Jenkins
brew services stop jenkins-lts

# Clean workspace
rm -rf ~/.jenkins/workspace/*

# Start Jenkins
brew services start jenkins-lts
```

### Increase Build History

**Manage Jenkins** → **Configure System** → **Keep builds**
- Choose "Days to keep builds" or "Number of builds to keep"

### Set Email Notifications

**Manage Jenkins** → **Configure System** → **Extended E-mail Notification**
- SMTP Server
- Default Recipients
- Default Subject

### Enable GitHub OAuth

**Manage Jenkins** → **Configure Global Security**
- Security Realm: GitHub Authentication Plugin
- Add GitHub App credentials

---

## 🔄 Workflow Example

```
1. Push code to GitHub
   ↓
2. Webhook notifies Jenkins
   ↓
3. Jenkins pulls repo
   ↓
4. Jenkins runs: npm install && npm test
   ↓
5. Tests upload to Currents (automatic)
   ↓
6. Jenkins publishes HTML report
   ↓
7. Slack notification sent
   ↓
8. View results on Currents dashboard
```

---

## 📚 More Information

- **Full Guide:** JENKINS_INSTALL_MAC.md
- **Jenkins Docs:** https://jenkins.io/doc/
- **Pipeline Syntax:** https://www.jenkins.io/doc/book/pipeline/
- **Plugin Directory:** https://plugins.jenkins.io

---

## 🎯 Next Steps

1. ✅ Run `bash install-jenkins.sh`
2. ✅ Access http://localhost:8080
3. ✅ Complete setup wizard
4. ✅ Install plugins
5. ✅ Add GitHub credentials
6. ✅ Create first job
7. ✅ Configure webhook
8. ✅ Add Currents integration
9. ✅ Test first build
10. ✅ Monitor on Currents dashboard

---

**Happy building!** 🚀

Generated: September 3, 2026
