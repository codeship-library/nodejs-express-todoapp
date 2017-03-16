#!/bin/sh
set -e
psql -U "$POSTGRES_USER" -f /docker-entrypoint-initdb.d/setup.sql $POSTGRES_DB
