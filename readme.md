### Usage
coreos-broker --help



    docker run -it --rm \
      -v /home/core/.broker:/var/run/broker \
      --hostname=broker.$(hostname) \
      --name=broker.$(hostname) \
      usabilitydynamics/broker startBroker


    docker run -it --rm \
      -v /home/core/.broker:/var/run/broker \
      -v /home/core/dev/broker:/
      --hostname=broker.$(hostname) \
      --name=broker.$(hostname) \
      usabilitydynamics/broker /bin/bash

