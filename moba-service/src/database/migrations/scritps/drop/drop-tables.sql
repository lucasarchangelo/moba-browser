
-- Drop tables in reverse order to handle foreign key constraints
DROP TABLE IF EXISTS migrations; 
DROP TABLE IF EXISTS match_events;
DROP TABLE IF EXISTS matches;
DROP TABLE IF EXISTS equipped_items;
DROP TABLE IF EXISTS inventories;
DROP TABLE IF EXISTS items;
DROP TABLE IF EXISTS hero_skills;
DROP TABLE IF EXISTS skills;
DROP TABLE IF EXISTS heroes;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS seasons;

-- Drop types in reverse order to handle foreign key constraints
DROP TYPE IF EXISTS item_slot_type;
DROP TYPE IF EXISTS magic_type_enum;
DROP TYPE IF EXISTS item_rarity;
DROP TYPE IF EXISTS match_event_type;