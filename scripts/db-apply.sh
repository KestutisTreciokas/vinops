#!/usr/bin/env bash
set +e +u
echo "[db-apply] expecting PGHOSTADDR, PGHOST, PGPORT, PGDATABASE, PGUSER, PGPASSWORD"
: "${PGHOSTADDR:?missing}"; : "${PGHOST:?missing}"; : "${PGPORT:=5432}"; : "${PGDATABASE:?missing}"; : "${PGUSER:?missing}"; : "${PGPASSWORD:?missing}"
PSQL="psql --no-psqlrc --set ON_ERROR_STOP=1 --pset pager=off"

echo "[db-apply] server ping"
$PSQL "hostaddr=$PGHOSTADDR host=$PGHOST port=$PGPORT dbname=$PGDATABASE" -c "select current_user, current_database(), version();" || exit 1

apply_file () {
  local f="$1"
  echo "---- APPLY: $f ----"
  $PSQL "hostaddr=$PGHOSTADDR host=$PGHOST port=$PGPORT dbname=$PGDATABASE" -f "$f" || exit 2
}

# Порядок строгий
apply_file "db/sql/enable_extensions.sql"
apply_file "db/migrations/0001_init.sql"
apply_file "db/migrations/0002_constraints.sql"
apply_file "db/migrations/0003_indexes.sql"
apply_file "db/migrations/0004_policy_flags.sql"
apply_file "db/sql/setup_roles_and_privs.sql"

echo "[db-apply] DONE"
