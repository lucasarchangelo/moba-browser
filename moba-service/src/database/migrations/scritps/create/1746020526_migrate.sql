-- Create the set_updated_at() function
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  nickname VARCHAR(255) NOT NULL,
  blocked BOOLEAN DEFAULT FALSE,
  active BOOLEAN DEFAULT TRUE,
  role VARCHAR(50) NOT NULL DEFAULT 'USER',
  avatar_url VARCHAR(255),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create trigger for users table
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION set_updated_at();

-- Create seasons table
CREATE TABLE IF NOT EXISTS seasons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  start_date TIMESTAMP NOT NULL,
  end_date TIMESTAMP NOT NULL,
  is_active BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create trigger for seasons table
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON seasons
  FOR EACH ROW
  EXECUTE FUNCTION set_updated_at();

-- Create heroes table
CREATE TABLE IF NOT EXISTS heroes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  level INTEGER DEFAULT 1,
  strength INTEGER DEFAULT 0,
  dexterity INTEGER DEFAULT 0,
  intelligence INTEGER DEFAULT 0,
  current_life INTEGER DEFAULT 0,
  current_mana INTEGER DEFAULT 0,
  user_id UUID NOT NULL REFERENCES users(id),
  season_id UUID NOT NULL REFERENCES seasons(id),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  -- Ensure a user can only have one hero per season
  UNIQUE(user_id, season_id)
);

-- Create trigger for heroes table
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON heroes
  FOR EACH ROW
  EXECUTE FUNCTION set_updated_at();

-- Create enum types
CREATE TYPE "public"."magic_type_enum" AS ENUM ('FIRE', 'ICE', 'LIGHTNING', 'EARTH', 'WIND', 'WATER', 'LIGHT', 'DARK', 'PHYSICAL');

-- Create skills table
CREATE TABLE "public"."skills" (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  name varchar NOT NULL,
  description varchar NOT NULL,
  magic_type magic_type_enum NOT NULL DEFAULT 'PHYSICAL',
  base_damage integer NOT NULL DEFAULT 0,
  base_mana_cost integer NOT NULL DEFAULT 0,
  required_strength integer NOT NULL DEFAULT 0,
  required_dexterity integer NOT NULL DEFAULT 0,
  required_intelligence integer NOT NULL DEFAULT 0,
  price integer NOT NULL DEFAULT 0,
  image_url varchar NOT NULL,
  effects jsonb NOT NULL DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT "PK_skills" PRIMARY KEY ("id")
);

-- Create trigger for updated_at
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON "public"."skills"
  FOR EACH ROW
  EXECUTE FUNCTION set_updated_at();

-- Create hero_skills table
CREATE TABLE IF NOT EXISTS hero_skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  hero_id UUID REFERENCES heroes(id),
  skill_id UUID REFERENCES skills(id),
  level INTEGER DEFAULT 0,
  damage_multiplier INTEGER DEFAULT 0,
  cooldown_multiplier INTEGER DEFAULT 0,
  manaCost_multiplier INTEGER DEFAULT 0,
  range_multiplier INTEGER DEFAULT 0,
  area_of_effect_multiplier INTEGER DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create trigger for hero_skills table
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON hero_skills
  FOR EACH ROW
  EXECUTE FUNCTION set_updated_at();

-- Create item enums
CREATE TYPE item_rarity AS ENUM ('COMMON', 'UNCOMMON', 'RARE', 'EPIC', 'LEGENDARY');
CREATE TYPE item_slot_type AS ENUM ('HEAD', 'CHEST', 'HANDS', 'LEGS', 'FEET', 'WEAPON', 'ACCESSORY');

-- Create items table
CREATE TABLE IF NOT EXISTS items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  base_health INTEGER DEFAULT 0,
  base_mana INTEGER DEFAULT 0,
  base_armor INTEGER DEFAULT 0,
  base_magic_resistance INTEGER DEFAULT 0,
  base_accuracy INTEGER DEFAULT 0,
  base_damage INTEGER DEFAULT 0,
  base_magic_damage INTEGER DEFAULT 0,
  is_consumable BOOLEAN DEFAULT FALSE,
  slot_type item_slot_type NOT NULL,
  price INTEGER NOT NULL,
  image_url VARCHAR(255) NOT NULL,
  effects JSONB,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create trigger for items table
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON items
  FOR EACH ROW
  EXECUTE FUNCTION set_updated_at();

-- Create inventories table
CREATE TABLE IF NOT EXISTS inventories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  hero_id UUID REFERENCES heroes(id),
  item_id UUID REFERENCES items(id),
  quantity INTEGER DEFAULT 1,
  acquired_at TIMESTAMP NOT NULL DEFAULT NOW(),
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create equipped_items table
CREATE TABLE IF NOT EXISTS equipped_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  heroId UUID REFERENCES heroes(id),
  item_id UUID REFERENCES items(id),
  slot INTEGER NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create trigger for equipped_items table
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON equipped_items
  FOR EACH ROW
  EXECUTE FUNCTION set_updated_at();

-- Create matches table
CREATE TABLE IF NOT EXISTS matches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  hero_id UUID REFERENCES heroes(id),
  hero_killer_id UUID REFERENCES heroes(id),
  gold_earned INTEGER DEFAULT 0,
  experience_earned INTEGER DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create match event type enum
CREATE TYPE match_event_type AS ENUM ('KILL', 'DEATH', 'ASSIST', 'GOLD_EARNED', 'EXPERIENCE_EARNED', 'ITEM_PURCHASED', 'ITEM_SOLD', 'SKILL_USED');

-- Create match_events table
CREATE TABLE IF NOT EXISTS match_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  match_id UUID REFERENCES matches(id),
  event_type match_event_type NOT NULL,
  hero_id UUID REFERENCES heroes(id),
  target_id UUID REFERENCES heroes(id),
  details JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
); 