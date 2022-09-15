openssl genrsa -des3 -out server.key 2048
openssl req -new -x509 -key server.key -out ca.crt -days 3650
openssl req -new -key server.key -out server.csr
openssl x509 -req -days 3650 -in server.csr -CA ca.crt -CAkey server.key -CAcreateserial -out server.crt
cat server.key server.crt > server.pem