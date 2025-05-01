#!/bin/bash

# Load environment variables from .env file if it exists
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
fi

# Default configuration values
DB_NAME=${POSTGRES_DB:-"moba"}
DB_USER=${POSTGRES_USER:-"postgres"}
DB_PASSWORD=${POSTGRES_PASSWORD:-"postgres"}
DB_HOST=${POSTGREES_HOST:-"postgres"}
DB_PORT=${POSTGRES_PORT:-"5432"}
MIGRATIONS_DIR=${MIGRATIONS_DIR:-"src/database/migrations/scritps/create"}
MIGRATIONS_TABLE=${MIGRATIONS_TABLE:-"migrations"}

# Function to execute SQL command
execute_sql() {
    PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -t -c "$1"
}

# Function to check if migrations table exists
check_migrations_table() {
    local table_exists=$(execute_sql "SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = '$MIGRATIONS_TABLE');" | tr -d '[:space:]')
    if [ "$table_exists" != "t" ]; then
        echo "Creating migrations table..."
        execute_sql "CREATE TABLE $MIGRATIONS_TABLE (
            id SERIAL PRIMARY KEY,
            filename VARCHAR(255) NOT NULL UNIQUE,
            executed_at TIMESTAMP NOT NULL DEFAULT NOW()
        );"
    fi
}

# Function to check if a migration has been executed
is_migration_executed() {
    local filename=$1
    local executed=$(execute_sql "SELECT EXISTS (SELECT 1 FROM $MIGRATIONS_TABLE WHERE filename = '$filename');" | tr -d '[:space:]')
    [ "$executed" = "t" ]
}

# Function to record a migration as executed
record_migration() {
    local filename=$1
    execute_sql "INSERT INTO $MIGRATIONS_TABLE (filename) VALUES ('$filename');"
}

# Main script
echo "Starting database migrations..."
echo "Using configuration:"
echo "  DB_NAME: $DB_NAME"
echo "  DB_USER: $DB_USER"
echo "  DB_HOST: $DB_HOST"
echo "  DB_PORT: $DB_PORT"
echo "  MIGRATIONS_DIR: $MIGRATIONS_DIR"
echo "  MIGRATIONS_TABLE: $MIGRATIONS_TABLE"

# Check if migrations table exists
check_migrations_table

# Process each SQL file in the migrations directory
for file in $MIGRATIONS_DIR/*.sql; do
    if [ -f "$file" ]; then
        filename=$(basename "$file")
        if ! is_migration_executed "$filename"; then
            echo "Executing migration: $filename"
            # Execute the migration file
            PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f "$file"
            
            # Check if the migration was successful
            if [ $? -eq 0 ]; then
                echo "Migration successful, recording execution..."
                record_migration "$filename"
            else
                echo "Error executing migration: $filename"
                exit 1
            fi
        else
            echo "Skipping already executed migration: $filename"
        fi
    fi
done

echo "All migrations completed successfully!" 