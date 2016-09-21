#!/bin/bash
set -e

echo create database
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
  CREATE DATABASE THE_DB_NAME;
EOSQL

echo install uuid-support
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" THE_DB_NAME <<-EOSQL
  CREATE EXTENSION "uuid-ossp";
EOSQL


echo create tables
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" THE_DB_NAME <<-EOSQL
  CREATE TABLE some_db_model
  (
    id uuid NOT NULL DEFAULT uuid_generate_v1(),
    foo_id uuid NOT NULL,
    some_string character varying,
    self_reference_id uuid,
    CONSTRAINT some_db_model_pkey PRIMARY KEY (id, foo_id),
    CONSTRAINT some_db_model_parent_id_some_db_model_id_foreign FOREIGN KEY (self_reference_id)
        REFERENCES some_db_model (id) MATCH SIMPLE
        ON UPDATE RESTRICT ON DELETE RESTRICT,
    CONSTRAINT some_db_model_id_key UNIQUE (id)
  );
EOSQL

echo INSERT data
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" THE_DB_NAME <<-EOSQL
  insert into some_db_model(id, foo_id, some_string, self_reference_id) values ('100e4567-e89b-12d3-a456-426655440000','600e4567-e89b-12d3-a456-426655440000', 'some string', null);
  insert into some_db_model(id, foo_id, some_string, self_reference_id) values ('101e4567-e89b-12d3-a456-426655440000','600e4567-e89b-12d3-a456-426655440000', 'some string1', '100e4567-e89b-12d3-a456-426655440000');
EOSQL
