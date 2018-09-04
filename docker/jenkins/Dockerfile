##########################################################
# Dockerfile to build Jenkins container images
# Based on Jenkins LTS Docker Image
# Built for TestCafe and Cucumber.js
############################################################

FROM jenkins/jenkins:lts
MAINTAINER Renato Curic "r.curic@reply.de"

# Run stuff as root
USER root

# Create global npm folder so we can install npm into it (There were problems with permissions)

RUN mkdir /opt/.npm-global

# Set npm env variable so we use the custom npm folder

ENV NPM_CONFIG_PREFIX=/opt/.npm-global

# Create node user

RUN useradd -ms /bin/sh node

# Give write permissions to folder

RUN chown node /opt/.npm-global

# Install with apt

RUN apt-get update -qqy \
    && apt-get -qqy --no-install-recommends install \
        bzip2 \
        ca-certificates \
        default-jre \
        unzip \
        wget \
        software-properties-common \
        apt-transport-https \
    && curl -fsSL https://download.docker.com/linux/debian/gpg | apt-key add - && \
        apt-key fingerprint 0EBFCD88 && \
         add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/debian $(lsb_release -cs) stable" && \
         apt-get update -qq && \
         apt-get install -qqy docker-ce && \
         usermod -aG docker jenkins

# Download node installation and install
RUN curl -fsSL https://deb.nodesource.com/gpgkey/nodesource.gpg.key | apt-key add - \
    && curl -sL https://deb.nodesource.com/setup_8.x | bash 2>/dev/null \
    && apt-get update -qqy \
    && apt-get install -qqy nodejs

# Disable Jenkins manual setup

ENV JAVA_OPTS="-Djenkins.install.runSetupWizard=false"

# Copy the configuration scripts

COPY bin/security.groovy /usr/share/jenkins/ref/init.groovy.d/security.groovy
COPY bin/csp.groovy /usr/share/jenkins/ref/init.groovy.d/csp.groovy

# Install Jenkins plugins

COPY config/plugins.txt /usr/share/jenkins/ref/plugins.txt
RUN /usr/local/bin/install-plugins.sh < /usr/share/jenkins/ref/plugins.txt

# Add jenkins user to sudo group so we can run docker under jenkins user

RUN echo "jenkins ALL=NOPASSWD: ALL" >> /etc/sudoers

# Install as node (npm does not recommend to install npm as root, also had problems while doing so)

USER node

# Install npm

RUN npm install -g npm@latest
RUN npm install -g @angular/cli 2>/dev/null

# Fix problems with npm

RUN npm update
RUN npm rebuild node-sass

# Change to jenkins user

USER jenkins
USER root