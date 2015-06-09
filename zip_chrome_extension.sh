#!/bin/sh
rm chrome_extension.zip
mv node_modules/ /tmp/dep_node_modules
zip -r chrome_extension.zip *
mv /tmp/dep_node_modules node_modules
