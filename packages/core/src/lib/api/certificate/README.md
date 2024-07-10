# Generate CA
 - openssl genrsa -des3 -out myCA.key 2048
 - openssl req -x509 -new -nodes -key myCA.key -sha256 -days 3650 -out myCA.pem

# Generate a Private Key

 - openssl req -newkey rsa:2048 -keyout peacom.key -out peacom.csr -config peacom.conf
 - `openssl x509 \
   -req \
   -in peacom.csr \
   -CAkey myCA.key \
   -CA myCA.pem \
   -set_serial -01 \
   -out peacom.crt \
   -days 36500 \
   -sha256 \
   -extfile <(printf "subjectAltName=DNS:backend.local\
   ,DNS:service.local,DNS:*.peacom.co")`
 - Verify: `openssl verify -CAfile myCA.pem peacom.crt`
