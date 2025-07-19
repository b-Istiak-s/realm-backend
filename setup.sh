#!/bin/bash

sudo mv realm-backend.service /etc/systemd/system/realm-backend.service
sudo mkdir /var/www/realm.duckdns.com/logs
sudo chown -R istiak:istiak /var/www/realm.duckdns.com
sudo chmod 644 /etc/systemd/system/realm-backend.service
sudo chown istiak:istiak /var/www/realm.duckdns.com/logs
sudo systemctl daemon-reload
sudo systemctl enable realm-backend
sudo systemctl start realm-backend
