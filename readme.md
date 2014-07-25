veneer api -c create-key -n discodonniepresents.com -r administrator

### Development

  $ node /usr/local/bin/veneer start --service true --config /etc/veneer/veneer.yaml --logs /var/log/veneer/veneer.log
  $ rm -rf /etc/udev/rules.d/70-persistent-net.rules

### To Do

* Add "add-ip" task to allow remote IP adding.
* Consider implementing https://www.npmjs.org/package/upbeat for performance monitoring.

### Install Service
Some RPM based distributions are using chkconfig to enable and disable services.
The init script is located at /etc/init.d/veneer-broker, where as the configuration file is placed at /etc/sysconfig/veneer-broker.
Like the debian package the RPM package is not started by default after installation, you have to do this manually by entering the following commands

* Veneer Modules should be installed globally in the /usr/local/lib/node_modules directory.
* Services may be daemonized but only the "veneer" service should autostart.

### Authentication

  - There are many Access Tokens, each with its own permissions.
  - Access Tokens may be for browser, mobile device, web application or web service.
  - Some Access Tokens may have Clients such as Mobile Devices and XML-RPC enabled WordPress sites.
  - Each authenticated client has a Client Token for identification.
  - Identity Tokens are used to keep track of user identies within a domain/account.
  - A valid Identity Token is generally the required to get an Access Token.

### Accounts

  - Accounts are logical groupings of services, identifies, documents, etc. specific to an organization.
  - Account data is stored in ElasticSearch indices. An account may have numerous indeces with each index having standard (service, identity, token) and custom document types.

### Document / Storage

  - Each index has a randomized ID which should not be used by client applications.
  - Each index may have multiple aliases which should be used by client applications.
  - Aliases are used as they allow immediate switching between indices to prevent downtime when an index is being updated or documents are being re-generated.
  - Each alias may be used to for each network site that needs access to a network-wide index.
  - Seperate indexes should be used when tokens and clients' access must be restricted to data within an index. Otherwise its understood that custom documents are shared.

### Service & Route

  - Each account has many routing rules that route HTTP(S) and WS(S) requests to common (e.g. documents) or account (e.g. geolocation) services.
  - Service backends must be configured for non-common services.
  - Requests will be proxied to backends after passing validation, verifying identity of client and authenticating Access Token's scopes.
  - Veneer headers, such as client information, added to request.
  - Backends may utilize various protocols such as standard JSON REST, XML-RPC connections, WebSocket connections, AMQP Exchanges, etc.
  - Backends should have a Google Discovery compliant service schema to allow request validation prior to proxy, but could do so themselves.
  - Services and Routes are broken up into a parent and child documents. s
  - Service data is rather static but could be quite large.
  - Service Route data may have lots of entries to accomodate various patterns and may be added/removed often and should be re-indexed individually. For instance, a seperate route could be created for each document ID.
  - Services may be deleted without affecting the created service route rules.
  - Routes with same URLs may have same priority value if the are unlikely to overlap due to different method or protocol.

## CLI Commands

  - grunt watch:documents: Watch document changes, push to ElasticSearch cluster.
  - grunt watch:mapping: Watch mapping changes, push to ElasticSearch cluster.
  - grunt documents:drop:  Remove and re-create Veneer account types and data.
  - grunt mapping:drop:  Remove and re-create Veneer account types and data.
  - grunt mapping:veneer:  Remove and re-create Drop account types and data.

## Tests
The Veneer Tests expect the Veneer Server to be active and accessible for the machine running the tests.
