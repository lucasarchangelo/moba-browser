-- SQL script to insert skills into the skills table

INSERT INTO skills (name, description, magic_type, base_damage, base_mana_cost, required_strength, required_dexterity, required_intelligence, price, image_url, effects)
VALUES
-- Physical Skills
-- Starter
('Basic Strike', 'A simple but effective physical attack.', 'PHYSICAL', 20, 5, 5, 5, 0, 100, 'basic_strike.png', '{}'),
('Quick Slash', 'A fast slashing attack that deals moderate damage.', 'PHYSICAL', 25, 8, 10, 10, 0, 200, 'quick_slash.png', '{}'),
('Power Strike', 'A powerful strike that deals high damage.', 'PHYSICAL', 30, 10, 15, 15, 0, 300, 'power_strike.png', '{}'),
('Combo Attack', 'A series of quick attacks that deal multiple hits.', 'PHYSICAL', 35, 12, 20, 20, 0, 400, 'combo_attack.png', '{}'),

-- Medium
('Whirlwind Slash', 'A spinning attack that hits all nearby enemies.', 'PHYSICAL', 45, 15, 25, 25, 0, 500, 'whirlwind_slash.png', '{}'),
('Berserker Rage', 'Increases attack power temporarily.', 'PHYSICAL', 50, 18, 30, 30, 0, 600, 'berserker_rage.png', '{}'),
('Precision Strike', 'A highly accurate attack that rarely misses.', 'PHYSICAL', 55, 20, 35, 35, 0, 700, 'precision_strike.png', '{}'),
('Dual Wield', 'Attacks twice in quick succession.', 'PHYSICAL', 60, 22, 40, 40, 0, 800, 'dual_wield.png', '{}'),

-- Late
('Blade Storm', 'Creates a storm of blades around the user.', 'PHYSICAL', 70, 25, 45, 45, 0, 900, 'blade_storm.png', '{}'),
('Death Strike', 'A deadly attack that deals massive damage.', 'PHYSICAL', 75, 28, 50, 50, 0, 1000, 'death_strike.png', '{}'),
('Perfect Form', 'Achieves perfect combat form for increased damage.', 'PHYSICAL', 80, 30, 55, 55, 0, 1100, 'perfect_form.png', '{}'),
('Master Technique', 'Uses advanced combat techniques for devastating damage.', 'PHYSICAL', 85, 32, 60, 60, 0, 1200, 'master_technique.png', '{}'),

-- Ultimate
('God Slayer', 'A legendary technique that can slay even gods.', 'PHYSICAL', 100, 35, 65, 65, 0, 1500, 'god_slayer.png', '{}'),
('World Breaker', 'An attack so powerful it can break the world.', 'PHYSICAL', 110, 38, 70, 70, 0, 1600, 'world_breaker.png', '{}'),
('Divine Strike', 'A strike blessed by the gods themselves.', 'PHYSICAL', 120, 40, 75, 75, 0, 1700, 'divine_strike.png', '{}'),
('Ultimate Warrior', 'Achieves the pinnacle of physical combat mastery.', 'PHYSICAL', 130, 42, 80, 80, 0, 1800, 'ultimate_warrior.png', '{}'),

-- Fire Skills
-- Starter
('Fire Bolt', 'A basic fire projectile attack.', 'FIRE', 15, 10, 0, 5, 5, 100, 'fire_bolt.png', '{}'),
('Flame Touch', 'Coats the user''s hands in fire for melee attacks.', 'FIRE', 20, 12, 0, 10, 10, 200, 'flame_touch.png', '{}'),
('Heat Wave', 'Creates a wave of heat that damages enemies.', 'FIRE', 25, 15, 0, 15, 15, 300, 'heat_wave.png', '{}'),
('Fire Shield', 'Creates a protective shield of fire.', 'FIRE', 30, 18, 0, 20, 20, 400, 'fire_shield.png', '{}'),

-- Medium
('Fireball', 'Launches a powerful ball of fire.', 'FIRE', 40, 20, 0, 25, 25, 500, 'fireball.png', '{}'),
('Flame Burst', 'Creates an explosion of fire around the user.', 'FIRE', 45, 22, 0, 30, 30, 600, 'flame_burst.png', '{}'),
('Meteor Shower', 'Summons small meteors to rain down on enemies.', 'FIRE', 50, 25, 0, 35, 35, 700, 'meteor_shower.png', '{}'),
('Inferno', 'Creates a raging inferno that burns enemies.', 'FIRE', 55, 28, 0, 40, 40, 800, 'inferno.png', '{}'),

-- Late
('Dragon Breath', 'Breathes fire like a dragon.', 'FIRE', 65, 30, 0, 45, 45, 900, 'dragon_breath.png', '{}'),
('Sun Strike', 'Calls down the power of the sun.', 'FIRE', 70, 32, 0, 50, 50, 1000, 'sun_strike.png', '{}'),
('Volcanic Eruption', 'Causes a volcanic eruption beneath enemies.', 'FIRE', 75, 35, 0, 55, 55, 1100, 'volcanic_eruption.png', '{}'),
('Phoenix Flame', 'Summons the legendary phoenix''s fire.', 'FIRE', 80, 38, 0, 60, 60, 1200, 'phoenix_flame.png', '{}'),

-- Ultimate
('Ragnarok', 'Brings about the end of the world with fire.', 'FIRE', 90, 40, 0, 65, 65, 1500, 'ragnarok.png', '{}'),
('Solar Flare', 'Calls down a massive solar flare.', 'FIRE', 100, 42, 0, 70, 70, 1600, 'solar_flare.png', '{}'),
('Hellfire', 'Summons the fires of hell itself.', 'FIRE', 110, 45, 0, 75, 75, 1700, 'hellfire.png', '{}'),
('Sun God''s Wrath', 'Channels the wrath of the sun god.', 'FIRE', 120, 48, 0, 80, 80, 1800, 'sun_god_wrath.png', '{}'),

-- Ice Skills
-- Starter
('Ice Shard', 'Launches a sharp shard of ice.', 'ICE', 15, 10, 0, 5, 5, 100, 'ice_shard.png', '{}'),
('Frost Touch', 'Coats the user''s hands in ice for melee attacks.', 'ICE', 20, 12, 0, 10, 10, 200, 'frost_touch.png', '{}'),
('Cold Snap', 'Creates a sudden burst of cold air.', 'ICE', 25, 15, 0, 15, 15, 300, 'cold_snap.png', '{}'),
('Ice Shield', 'Creates a protective shield of ice.', 'ICE', 30, 18, 0, 20, 20, 400, 'ice_shield.png', '{}'),

-- Medium
('Ice Lance', 'Launches a powerful lance of ice.', 'ICE', 40, 20, 0, 25, 25, 500, 'ice_lance.png', '{}'),
('Frost Nova', 'Creates an explosion of ice around the user.', 'ICE', 45, 22, 0, 30, 30, 600, 'frost_nova.png', '{}'),
('Blizzard', 'Summons a localized blizzard.', 'ICE', 50, 25, 0, 35, 35, 700, 'blizzard.png', '{}'),
('Glacial Spike', 'Summons a massive spike of ice.', 'ICE', 55, 28, 0, 40, 40, 800, 'glacial_spike.png', '{}'),

-- Late
('Arctic Breath', 'Breathes freezing cold air.', 'ICE', 65, 30, 0, 45, 45, 900, 'arctic_breath.png', '{}'),
('Ice Age', 'Brings about a mini ice age.', 'ICE', 70, 32, 0, 50, 50, 1000, 'ice_age.png', '{}'),
('Frozen Tomb', 'Encases enemies in ice.', 'ICE', 75, 35, 0, 55, 55, 1100, 'frozen_tomb.png', '{}'),
('Crystal Storm', 'Creates a storm of ice crystals.', 'ICE', 80, 38, 0, 60, 60, 1200, 'crystal_storm.png', '{}'),

-- Ultimate
('Absolute Zero', 'Brings temperature to absolute zero.', 'ICE', 90, 40, 0, 65, 65, 1500, 'absolute_zero.png', '{}'),
('Glacial Apocalypse', 'Brings about an ice age apocalypse.', 'ICE', 100, 42, 0, 70, 70, 1600, 'glacial_apocalypse.png', '{}'),
('Frost God''s Wrath', 'Channels the wrath of the frost god.', 'ICE', 110, 45, 0, 75, 75, 1700, 'frost_god_wrath.png', '{}'),
('Eternal Winter', 'Summons an eternal winter.', 'ICE', 120, 48, 0, 80, 80, 1800, 'eternal_winter.png', '{}'),

-- Lightning Skills
-- Starter
('Spark', 'Creates a small electrical spark.', 'LIGHTNING', 15, 10, 0, 5, 5, 100, 'spark.png', '{}'),
('Electric Touch', 'Coats the user''s hands in electricity.', 'LIGHTNING', 20, 12, 0, 10, 10, 200, 'electric_touch.png', '{}'),
('Thunder Clap', 'Creates a loud clap of thunder.', 'LIGHTNING', 25, 15, 0, 15, 15, 300, 'thunder_clap.png', '{}'),
('Static Shield', 'Creates a protective shield of electricity.', 'LIGHTNING', 30, 18, 0, 20, 20, 400, 'static_shield.png', '{}'),

-- Medium
('Lightning Bolt', 'Calls down a bolt of lightning.', 'LIGHTNING', 40, 20, 0, 25, 25, 500, 'lightning_bolt.png', '{}'),
('Chain Lightning', 'Creates lightning that chains between enemies.', 'LIGHTNING', 45, 22, 0, 30, 30, 600, 'chain_lightning.png', '{}'),
('Thunderstorm', 'Summons a localized thunderstorm.', 'LIGHTNING', 50, 25, 0, 35, 35, 700, 'thunderstorm.png', '{}'),
('Electric Surge', 'Creates a surge of electricity.', 'LIGHTNING', 55, 28, 0, 40, 40, 800, 'electric_surge.png', '{}'),

-- Late
('Thunder Strike', 'Calls down a massive thunder strike.', 'LIGHTNING', 65, 30, 0, 45, 45, 900, 'thunder_strike.png', '{}'),
('Lightning Storm', 'Creates a storm of lightning.', 'LIGHTNING', 70, 32, 0, 50, 50, 1000, 'lightning_storm.png', '{}'),
('Electric Discharge', 'Releases a massive electric discharge.', 'LIGHTNING', 75, 35, 0, 55, 55, 1100, 'electric_discharge.png', '{}'),
('Thunder God''s Wrath', 'Channels the wrath of the thunder god.', 'LIGHTNING', 80, 38, 0, 60, 60, 1200, 'thunder_god_wrath.png', '{}'),

-- Ultimate
('Ragnarok Thunder', 'Brings about the end of the world with lightning.', 'LIGHTNING', 90, 40, 0, 65, 65, 1500, 'ragnarok_thunder.png', '{}'),
('Divine Lightning', 'Calls down divine lightning from the heavens.', 'LIGHTNING', 100, 42, 0, 70, 70, 1600, 'divine_lightning.png', '{}'),
('Storm God''s Wrath', 'Channels the wrath of the storm god.', 'LIGHTNING', 110, 45, 0, 75, 75, 1700, 'storm_god_wrath.png', '{}'),
('Ultimate Thunder', 'Summons the ultimate thunderstorm.', 'LIGHTNING', 120, 48, 0, 80, 80, 1800, 'ultimate_thunder.png', '{}'),

-- Earth Skills
-- Starter
('Rock Throw', 'Throws a rock at the enemy.', 'EARTH', 15, 10, 0, 5, 5, 100, 'rock_throw.png', '{}'),
('Earth Touch', 'Coats the user''s hands in earth.', 'EARTH', 20, 12, 0, 10, 10, 200, 'earth_touch.png', '{}'),
('Sand Blast', 'Blasts enemies with sand.', 'EARTH', 25, 15, 0, 15, 15, 300, 'sand_blast.png', '{}'),
('Earth Shield', 'Creates a protective shield of earth.', 'EARTH', 30, 18, 0, 20, 20, 400, 'earth_shield.png', '{}'),

-- Medium
('Earth Spike', 'Summons spikes from the earth.', 'EARTH', 40, 20, 0, 25, 25, 500, 'earth_spike.png', '{}'),
('Quake', 'Creates a small earthquake.', 'EARTH', 45, 22, 0, 30, 30, 600, 'quake.png', '{}'),
('Rock Slide', 'Causes rocks to slide down on enemies.', 'EARTH', 50, 25, 0, 35, 35, 700, 'rock_slide.png', '{}'),
('Mud Wave', 'Creates a wave of mud.', 'EARTH', 55, 28, 0, 40, 40, 800, 'mud_wave.png', '{}'),

-- Late
('Tectonic Shift', 'Shifts the earth beneath enemies.', 'EARTH', 65, 30, 0, 45, 45, 900, 'tectonic_shift.png', '{}'),
('Mountain Crush', 'Summons a mountain to crush enemies.', 'EARTH', 70, 32, 0, 50, 50, 1000, 'mountain_crush.png', '{}'),
('Earthquake', 'Creates a massive earthquake.', 'EARTH', 75, 35, 0, 55, 55, 1100, 'earthquake.png', '{}'),
('Terraform', 'Reshapes the earth around enemies.', 'EARTH', 80, 38, 0, 60, 60, 1200, 'terraform.png', '{}'),

-- Ultimate
('Continental Shift', 'Shifts entire continents.', 'EARTH', 90, 40, 0, 65, 65, 1500, 'continental_shift.png', '{}'),
('Planetary Crush', 'Crushes enemies with planetary force.', 'EARTH', 100, 42, 0, 70, 70, 1600, 'planetary_crush.png', '{}'),
('Earth God''s Wrath', 'Channels the wrath of the earth god.', 'EARTH', 110, 45, 0, 75, 75, 1700, 'earth_god_wrath.png', '{}'),
('World Shaper', 'Reshapes the world itself.', 'EARTH', 120, 48, 0, 80, 80, 1800, 'world_shaper.png', '{}'),

-- Wind Skills
-- Starter
('Gust', 'Creates a small gust of wind.', 'WIND', 15, 10, 0, 5, 5, 100, 'gust.png', '{}'),
('Wind Touch', 'Coats the user''s hands in wind.', 'WIND', 20, 12, 0, 10, 10, 200, 'wind_touch.png', '{}'),
('Air Blast', 'Blasts enemies with compressed air.', 'WIND', 25, 15, 0, 15, 15, 300, 'air_blast.png', '{}'),
('Wind Shield', 'Creates a protective shield of wind.', 'WIND', 30, 18, 0, 20, 20, 400, 'wind_shield.png', '{}'),

-- Medium
('Tornado', 'Creates a small tornado.', 'WIND', 40, 20, 0, 25, 25, 500, 'tornado.png', '{}'),
('Cyclone', 'Creates a powerful cyclone.', 'WIND', 45, 22, 0, 30, 30, 600, 'cyclone.png', '{}'),
('Hurricane', 'Summons a localized hurricane.', 'WIND', 50, 25, 0, 35, 35, 700, 'hurricane.png', '{}'),
('Wind Blade', 'Creates blades of wind.', 'WIND', 55, 28, 0, 40, 40, 800, 'wind_blade.png', '{}'),

-- Late
('Typhoon', 'Creates a massive typhoon.', 'WIND', 65, 30, 0, 45, 45, 900, 'typhoon.png', '{}'),
('Storm Surge', 'Creates a surge of wind.', 'WIND', 70, 32, 0, 50, 50, 1000, 'storm_surge.png', '{}'),
('Wind God''s Wrath', 'Channels the wrath of the wind god.', 'WIND', 75, 35, 0, 55, 55, 1100, 'wind_god_wrath.png', '{}'),
('Tempest', 'Creates a powerful tempest.', 'WIND', 80, 38, 0, 60, 60, 1200, 'tempest.png', '{}'),

-- Ultimate
('Divine Wind', 'Summons the divine wind.', 'WIND', 90, 40, 0, 65, 65, 1500, 'divine_wind.png', '{}'),
('Storm God''s Wrath', 'Channels the wrath of the storm god.', 'WIND', 100, 42, 0, 70, 70, 1600, 'storm_god_wrath.png', '{}'),
('World Wind', 'Creates winds that can reshape the world.', 'WIND', 110, 45, 0, 75, 75, 1700, 'world_wind.png', '{}'),
('Ultimate Storm', 'Summons the ultimate storm.', 'WIND', 120, 48, 0, 80, 80, 1800, 'ultimate_storm.png', '{}'),

-- Water Skills
-- Starter
('Water Splash', 'Creates a splash of water.', 'WATER', 15, 10, 0, 5, 5, 100, 'water_splash.png', '{}'),
('Water Touch', 'Coats the user''s hands in water.', 'WATER', 20, 12, 0, 10, 10, 200, 'water_touch.png', '{}'),
('Tidal Wave', 'Creates a small tidal wave.', 'WATER', 25, 15, 0, 15, 15, 300, 'tidal_wave.png', '{}'),
('Water Shield', 'Creates a protective shield of water.', 'WATER', 30, 18, 0, 20, 20, 400, 'water_shield.png', '{}'),

-- Medium
('Water Jet', 'Creates a powerful jet of water.', 'WATER', 40, 20, 0, 25, 25, 500, 'water_jet.png', '{}'),
('Tsunami', 'Creates a small tsunami.', 'WATER', 45, 22, 0, 30, 30, 600, 'tsunami.png', '{}'),
('Water Prison', 'Traps enemies in water.', 'WATER', 50, 25, 0, 35, 35, 700, 'water_prison.png', '{}'),
('Ocean Wave', 'Creates a massive ocean wave.', 'WATER', 55, 28, 0, 40, 40, 800, 'ocean_wave.png', '{}'),

-- Late
('Tidal Crush', 'Crushes enemies with tidal force.', 'WATER', 65, 30, 0, 45, 45, 900, 'tidal_crush.png', '{}'),
('Water God''s Wrath', 'Channels the wrath of the water god.', 'WATER', 70, 32, 0, 50, 50, 1000, 'water_god_wrath.png', '{}'),
('Ocean Storm', 'Creates a storm over the ocean.', 'WATER', 75, 35, 0, 55, 55, 1100, 'ocean_storm.png', '{}'),
('Deep Sea Pressure', 'Applies deep sea pressure to enemies.', 'WATER', 80, 38, 0, 60, 60, 1200, 'deep_sea_pressure.png', '{}'),

-- Ultimate
('Divine Flood', 'Summons a divine flood.', 'WATER', 90, 40, 0, 65, 65, 1500, 'divine_flood.png', '{}'),
('Ocean God''s Wrath', 'Channels the wrath of the ocean god.', 'WATER', 100, 42, 0, 70, 70, 1600, 'ocean_god_wrath.png', '{}'),
('World Flood', 'Floods the entire world.', 'WATER', 110, 45, 0, 75, 75, 1700, 'world_flood.png', '{}'),
('Ultimate Tsunami', 'Summons the ultimate tsunami.', 'WATER', 120, 48, 0, 80, 80, 1800, 'ultimate_tsunami.png', '{}'),

-- Light Skills
-- Starter
('Light Beam', 'Creates a beam of light.', 'LIGHT', 15, 10, 0, 5, 5, 100, 'light_beam.png', '{}'),
('Light Touch', 'Coats the user''s hands in light.', 'LIGHT', 20, 12, 0, 10, 10, 200, 'light_touch.png', '{}'),
('Holy Light', 'Creates a burst of holy light.', 'LIGHT', 25, 15, 0, 15, 15, 300, 'holy_light.png', '{}'),
('Light Shield', 'Creates a protective shield of light.', 'LIGHT', 30, 18, 0, 20, 20, 400, 'light_shield.png', '{}'),

-- Medium
('Solar Beam', 'Creates a powerful beam of solar energy.', 'LIGHT', 40, 20, 0, 25, 25, 500, 'solar_beam.png', '{}'),
('Divine Light', 'Summons divine light.', 'LIGHT', 45, 22, 0, 30, 30, 600, 'divine_light.png', '{}'),
('Holy Ray', 'Creates a ray of holy energy.', 'LIGHT', 50, 25, 0, 35, 35, 700, 'holy_ray.png', '{}'),
('Light Burst', 'Creates a burst of light energy.', 'LIGHT', 55, 28, 0, 40, 40, 800, 'light_burst.png', '{}'),

-- Late
('Heaven''s Light', 'Calls down light from heaven.', 'LIGHT', 65, 30, 0, 45, 45, 900, 'heavens_light.png', '{}'),
('Divine Judgment', 'Judges enemies with divine light.', 'LIGHT', 70, 32, 0, 50, 50, 1000, 'divine_judgment.png', '{}'),
('Holy Storm', 'Creates a storm of holy light.', 'LIGHT', 75, 35, 0, 55, 55, 1100, 'holy_storm.png', '{}'),
('Light God''s Wrath', 'Channels the wrath of the light god.', 'LIGHT', 80, 38, 0, 60, 60, 1200, 'light_god_wrath.png', '{}'),

-- Ultimate
('Divine Light', 'Summons the ultimate divine light.', 'LIGHT', 90, 40, 0, 65, 65, 1500, 'divine_light.png', '{}'),
('Heaven''s Wrath', 'Channels the wrath of heaven.', 'LIGHT', 100, 42, 0, 70, 70, 1600, 'heavens_wrath.png', '{}'),
('World Light', 'Fills the world with divine light.', 'LIGHT', 110, 45, 0, 75, 75, 1700, 'world_light.png', '{}'),
('Ultimate Light', 'Summons the ultimate light.', 'LIGHT', 120, 48, 0, 80, 80, 1800, 'ultimate_light.png', '{}'),

-- Dark Skills
-- Starter
('Dark Bolt', 'Creates a bolt of darkness.', 'DARK', 15, 10, 0, 5, 5, 100, 'dark_bolt.png', '{}'),
('Dark Touch', 'Coats the user''s hands in darkness.', 'DARK', 20, 12, 0, 10, 10, 200, 'dark_touch.png', '{}'),
('Shadow Blast', 'Blasts enemies with shadow energy.', 'DARK', 25, 15, 0, 15, 15, 300, 'shadow_blast.png', '{}'),
('Dark Shield', 'Creates a protective shield of darkness.', 'DARK', 30, 18, 0, 20, 20, 400, 'dark_shield.png', '{}'),

-- Medium
('Shadow Bolt', 'Creates a powerful bolt of shadow.', 'DARK', 40, 20, 0, 25, 25, 500, 'shadow_bolt.png', '{}'),
('Dark Nova', 'Creates an explosion of darkness.', 'DARK', 45, 22, 0, 30, 30, 600, 'dark_nova.png', '{}'),
('Shadow Storm', 'Creates a storm of shadows.', 'DARK', 50, 25, 0, 35, 35, 700, 'shadow_storm.png', '{}'),
('Dark Wave', 'Creates a wave of darkness.', 'DARK', 55, 28, 0, 40, 40, 800, 'dark_wave.png', '{}'),

-- Late
('Void Strike', 'Strikes with the power of the void.', 'DARK', 65, 30, 0, 45, 45, 900, 'void_strike.png', '{}'),
('Dark God''s Wrath', 'Channels the wrath of the dark god.', 'DARK', 70, 32, 0, 50, 50, 1000, 'dark_god_wrath.png', '{}'),
('Shadow Realm', 'Summons the shadow realm.', 'DARK', 75, 35, 0, 55, 55, 1100, 'shadow_realm.png', '{}'),
('Dark Apocalypse', 'Brings about a dark apocalypse.', 'DARK', 80, 38, 0, 60, 60, 1200, 'dark_apocalypse.png', '{}'),

-- Ultimate
('Void God''s Wrath', 'Channels the wrath of the void god.', 'DARK', 90, 40, 0, 65, 65, 1500, 'void_god_wrath.png', '{}'),
('World Darkness', 'Fills the world with darkness.', 'DARK', 100, 42, 0, 70, 70, 1600, 'world_darkness.png', '{}'),
('Ultimate Void', 'Summons the ultimate void.', 'DARK', 110, 45, 0, 75, 75, 1700, 'ultimate_void.png', '{}'),
('Darkness Eternal', 'Brings about eternal darkness.', 'DARK', 120, 48, 0, 80, 80, 1800, 'darkness_eternal.png', '{}'); 