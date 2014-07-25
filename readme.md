### Usage
coreos-broker --help



docker run -it --rm \
  -v /home/core/.broker:/var/run/broker \
  --hostname=broker.$(hostname -f) \
  --name=broker.$(hostname -f) \
  usabilitydynamics/broker startBroker


docker run -it --rm \
  -v /home/core/.broker:/var/run/broker \
  -v /home/core/dev/coreos-broker:/usr/local/lib/node_modules/coreos-broker \
  -e ETCDCTL_PEERS=http://208.52.164.202:4001,
  --hostname=broker.$(hostname -f) \
  --name=broker.$(hostname -f) \
  usabilitydynamics/broker /bin/bash


npm install -g UsabilityDynamics/node-coreos-broker