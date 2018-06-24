##########################################################
# Dockerfile to build Jenkins container images
# Based on Jenkins LTS Docker Image
# Built for TestCafe and Cucumber.js
# Includes working Chrome and Firefox Browsers
############################################################

FROM jenkins/jenkins:lts
MAINTAINER Renato Curic "r.curic@reply.de"

# Run stuff as root
USER root

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

# Change to jenkins user

USER jenkins
USER root