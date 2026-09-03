#!/bin/bash

# Jenkins Installation Script for macOS
# This script automates Jenkins installation using Homebrew

set -e

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║         Jenkins Installation Script for macOS                  ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

# Check if running on macOS
if [[ "$OSTYPE" != "darwin"* ]]; then
    echo "❌ This script is designed for macOS only."
    exit 1
fi

# Check if already installed
if command -v jenkins &> /dev/null; then
    echo "✅ Jenkins is already installed!"
    jenkins --version
    exit 0
fi

echo "📦 Jenkins Installation Steps:"
echo ""

# Step 1: Install Homebrew if not present
echo "Step 1/5: Checking Homebrew..."
if ! command -v brew &> /dev/null; then
    echo "  Installing Homebrew..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    echo "✅ Homebrew installed successfully"
else
    echo "✅ Homebrew already installed"
    brew --version
fi

echo ""

# Step 2: Check Java installation
echo "Step 2/5: Checking Java..."
if ! command -v java &> /dev/null; then
    echo "  Installing Java 17..."
    brew install openjdk@17
    echo ""
    echo "  Setting JAVA_HOME..."

    # Detect shell
    if [[ -f ~/.zshrc ]]; then
        if ! grep -q "openjdk@17" ~/.zshrc; then
            echo 'export PATH="/usr/local/opt/openjdk@17/bin:$PATH"' >> ~/.zshrc
            echo "  Added to ~/.zshrc"
        fi
    fi

    if [[ -f ~/.bash_profile ]]; then
        if ! grep -q "openjdk@17" ~/.bash_profile; then
            echo 'export PATH="/usr/local/opt/openjdk@17/bin:$PATH"' >> ~/.bash_profile
            echo "  Added to ~/.bash_profile"
        fi
    fi

    echo "✅ Java 17 installed successfully"
else
    echo "✅ Java already installed"
    java -version
fi

echo ""

# Step 3: Add Jenkins tap
echo "Step 3/5: Adding Jenkins to Homebrew..."
brew tap homebrew/cask-versions 2>/dev/null || echo "  (tap already added)"
echo "✅ Jenkins tap added"

echo ""

# Step 4: Install Jenkins
echo "Step 4/5: Installing Jenkins LTS..."
brew install jenkins-lts
echo "✅ Jenkins LTS installed successfully"

echo ""

# Step 5: Start Jenkins service
echo "Step 5/5: Starting Jenkins service..."
brew services start jenkins-lts
echo "✅ Jenkins service started"

echo ""
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║                  Installation Complete! ✅                     ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

# Wait a moment for Jenkins to start
sleep 3

# Get initial admin password
JENKINS_PASSWORD_FILE="$HOME/.jenkins/secrets/initialAdminPassword"

if [ -f "$JENKINS_PASSWORD_FILE" ]; then
    INITIAL_PASSWORD=$(cat "$JENKINS_PASSWORD_FILE")
    echo "📋 Initial Admin Password:"
    echo "   $INITIAL_PASSWORD"
    echo ""
fi

echo "🌐 Access Jenkins:"
echo "   URL: http://localhost:8080"
echo ""

echo "📖 Next Steps:"
echo "   1. Open http://localhost:8080 in your browser"
echo "   2. Enter the initial admin password from above"
echo "   3. Follow the setup wizard"
echo "   4. Install suggested plugins"
echo "   5. Create your first admin user"
echo ""

echo "📚 Full Setup Guide:"
echo "   Read: JENKINS_INSTALL_MAC.md"
echo ""

echo "🚀 To integrate with your Playwright tests:"
echo "   1. Install Pipeline and Git plugins"
echo "   2. Create new Pipeline job"
echo "   3. Add Jenkinsfile to your repo"
echo "   4. Configure GitHub webhook"
echo "   5. Add Currents credentials"
echo ""

echo "⏹️  To stop Jenkins:"
echo "   brew services stop jenkins-lts"
echo ""

echo "🔄 To restart Jenkins:"
echo "   brew services restart jenkins-lts"
echo ""

echo "📊 Monitor builds on Currents:"
echo "   https://app.currents.dev/projects/LBuyQE"
echo ""

echo "✨ Jenkins is ready! Visit http://localhost:8080 to get started."
