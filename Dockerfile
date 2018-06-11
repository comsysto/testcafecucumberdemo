##########################################################
# Dockerfile to build Jenkins container images
# Based on Jenkins LTS Docker Image
# Built for TestCafe and Cucumber.js
# Includes working Chrome browser
############################################################
FROM jenkins/jenkins:lts
MAINTAINER Renato Curic "r.curic@reply.de"

# Run stuff as root
USER root

# Create global npm folder so we can install npm into it
# There were problems with permission without this config

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
        sudo \
        unzip \
        wget \
        less

# Install xvfb with apt

RUN apt-get install -qqy xvfb

# Download node installation

RUN curl -sL https://deb.nodesource.com/setup_8.x | bash 2>/dev/null

# Install node

RUN apt-get install -qqy  nodejs 2>/dev/null

# Install Chrome Browser

# You can specify versions by CHROME_VERSION;
#  e.g. google-chrome-stable=53.0.2785.101-1
#       google-chrome-beta=53.0.2785.92-1
#       google-chrome-unstable=54.0.2840.14-1
#       latest (equivalent to google-chrome-stable)
#       google-chrome-beta  (pull latest beta)

ARG CHROME_VERSION="google-chrome-stable"
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
  && echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list \
  && apt-get update -qqy \
  && apt-get -qqy install \
    ${CHROME_VERSION:-google-chrome-stable} \
  && rm /etc/apt/sources.list.d/google-chrome.list \
  && rm -rf /var/lib/apt/lists/* /var/cache/apt/*


# Chrome Launch Script Modication

COPY src/bin/chrome_launcher.sh /opt/google/chrome/google-chrome
RUN chmod +x /opt/google/chrome/google-chrome

# Disable Jenkins manual setup

ENV JAVA_OPTS="-Djenkins.install.runSetupWizard=false"

# Copy the configuration script

COPY src/bin/security.groovy /usr/share/jenkins/ref/init.groovy.d/security.groovy

# Install Jenkins plugins

COPY src/config/plugins.txt /usr/share/jenkins/ref/plugins.txt
RUN /usr/local/bin/install-plugins.sh < /usr/share/jenkins/ref/plugins.txt

# Install as node (nam does not recommend to install nam as root, also problems while doing so)

USER node

# Install npm and fix problems related to it

RUN npm install -g npm@latest
RUN npm install -g @angular/cli 2>/dev/null
RUN npm update
RUN npm rebuild node-sass

# Change to root user for later debug reasons
# Notes: Change to jenkins later when done with changes

USER root