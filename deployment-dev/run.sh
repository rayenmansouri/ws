#!/bin/bash
docker compose --env-file ../.env up -d 

#initilize TLS certificate for wildcard
# docker compose run --rm  certbot certonly --dns-cloudflare --dns-cloudflare-credentials /cloudflare.ini --non-interactive --agree-tos --email ayoub.chrigui@horizon-tech.tn -d *.webschool.tn

#intilize TLS certificate 
# docker compose run --rm  certbot certonly --webroot --webroot-path /var/www/certbot/ --non-interactive --agree-tos --email ayoub.chrigui@horizon-tech.tn -d api.webschoool.com

#renew certificate
#docker compose run --rm certbot renew
