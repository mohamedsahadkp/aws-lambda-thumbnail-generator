##

1. Create an EC2 Instance
Log in to the web console and navigate to the EC2 dashboard. Select “Launch instance” to start the wizard. On the first screen of the instance wizard, find in Quick Start an Amazon Linux. We recommend using “Amazon Linux 64-bit, HVM, SSD, EBS” because it’s eligible for free tier on t2.micro.

On the next screen Choose an instance type, select “t2.micro” (Free tier eligible).

Next, open Advanced settings as shown on the screen capture below


Paste the following code for bash command into User Data.

#!/bin/bash -ex
#!/bin/sh
sudo apt-get update
sudo apt-get install git nginx nodejs npm build-essential libssl-dev
curl -sL https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh -o install_nvm.sh
sudo chmod 777 install_nvm.sh
./install_nvm.sh
source ~/.profile
nvm install v10.15.3
nvm use v10.15.3
nvm alias default v10.15.3
npm install pm2 -g

env PATH=$PATH:/usr/bin pm2 startup upstart -u ubuntu
pm2 save

sudo env PATH=$PATH:/home/ubuntu/.nvm/versions/node/v10.15.3/bin pm2 startup upstart -u ubuntu --hp /home/ubuntu


