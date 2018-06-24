##########################################################
# Build this if you want to run UI tests on Chrome and Firefox browser with xvfb server
############################################################

FROM ubuntu:latest
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
        wget \
        curl \
        ca-certificates \
        bzip2

# Install xvfb with apt

RUN apt-get install -qqy xvfb

# Download node installation and install

RUN curl -sL https://deb.nodesource.com/setup_8.x | bash 2>/dev/null
RUN apt-get install -qqy nodejs

# Install Chrome Browser

# You can specify versions by CHROME_VERSION;
#  e.g. google-chrome-stable
#       google-chrome-beta
#       google-chrome-unstable
#       latest (equivalent to google-chrome-stable)
#       google-chrome-beta (pull latest beta)

ARG CHROME_VERSION="google-chrome-stable"
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
  && echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list \
  && apt-get update -qqy \
  && apt-get -qqy install \
    ${CHROME_VERSION:-google-chrome-stable} \
  && rm /etc/apt/sources.list.d/google-chrome.list \
  && rm -rf /var/lib/apt/lists/* /var/cache/apt/*


# Chrome Launch Script Modification

COPY bin/chrome_launcher.sh /opt/google/chrome/google-chrome
RUN chmod +x /opt/google/chrome/google-chrome

# Install Firefox Browser

# You can specify versions by FIREFOX_VERSION;
#  e.g.  latest
#        nightly-latest
#        devedition-latest

ARG FIREFOX_VERSION=latest
RUN FIREFOX_DOWNLOAD_URL=$(echo "https://download.mozilla.org/?product=firefox-$FIREFOX_VERSION&os=linux64&lang=en-US") \

#  RUN FIREFOX_DOWNLOAD_URL=$(if [ $FIREFOX_VERSION = "latest" ] || [ $FIREFOX_VERSION = "nightly-latest" ] || [ $FIREFOX_VERSION = "devedition-latest" ]; then echo "https://download.mozilla.org/?product=firefox-$FIREFOX_VERSION-ssl&os=linux64&lang=en-US"; else echo "https://download-installer.cdn.mozilla.net/pub/firefox/releases/$FIREFOX_VERSION/linux-x86_64/en-US/firefox-$FIREFOX_VERSION.tar.bz2"; fi) \

  && apt-get update -qqy \
  && apt-get -qqy install firefox \
  && rm -rf /var/lib/apt/lists/* /var/cache/apt/* \
  && wget --no-verbose -O /tmp/firefox.tar.bz2 $FIREFOX_DOWNLOAD_URL \
  && apt-get -y purge firefox \
  && rm -rf /opt/firefox \
  && tar -C /opt -xjf /tmp/firefox.tar.bz2 \
  && rm /tmp/firefox.tar.bz2 \
  && mv /opt/firefox /opt/firefox-$FIREFOX_VERSION \
  && ln -fs /opt/firefox-$FIREFOX_VERSION/firefox /usr/bin/firefox

# Install as node (npm does not recommend to install npm as root, also had problems while doing so)

USER node

# Install npm

RUN npm install -g npm@latest
RUN npm install -g @angular/cli 2>/dev/null

# Fix problems with npm

RUN npm update
RUN npm rebuild node-sass


USER root

RUN mkdir /opt/project
COPY project /opt/project