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
DROP_SCRIPT="src/database/migrations/scritps/drop/drop-tables.sql"

echo "Starting database reset..."
echo "Using configuration:"
echo "  DB_NAME: $DB_NAME"
echo "  DB_USER: $DB_USER"
echo "  DB_HOST: $DB_HOST"
echo "  DB_PORT: $DB_PORT"
echo "  DROP_SCRIPT: $DROP_SCRIPT"

# Execute the drop script
echo "Executing drop script..."
PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f "$DROP_SCRIPT"

if [ $? -eq 0 ]; then
    echo "Database reset completed successfully!"
else
    echo "Error resetting database!"
    exit 1
fi 