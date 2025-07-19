#!/bin/bash

if [ -z "$1" ]; then
  echo "Usage: $0 <name>"
  exit 1
fi

NAME=$1

echo "Generating module for $NAME..."
nest g mo $NAME

echo "Generating service for $NAME..."
nest g s $NAME

echo "Generating resolver for $NAME..."
nest g r $NAME

echo "Done generating module, service, and resolver for $NAME."
