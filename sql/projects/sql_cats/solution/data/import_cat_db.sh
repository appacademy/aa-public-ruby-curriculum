#!/usr/bin/env sh

dropdb meowtime
createdb meowtime
psql meowtime < data/cat_tables.sql
