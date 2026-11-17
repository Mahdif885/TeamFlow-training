#!/usr/bin/env bash
set -e
printf '== TeamFlow - verification des outils ==\n'
java -version; mvn -version; node --version; npm --version; git --version
