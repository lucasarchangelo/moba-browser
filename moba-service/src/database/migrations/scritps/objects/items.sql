-- SQL script to insert items into the items table

INSERT INTO items (name, description, base_health, base_mana, base_armor, base_magic_resistance, base_accuracy, base_damage, base_magic_damage, is_consumable, slot_type, price, image_url, effects)
VALUES
-- Wooden Set
-- Armor pieces
('Wooden Chest', 'A sturdy wooden chest.', 0, 0, 1, 0, 0, 0, 0, false, 'CHEST', 150, 'wooden_chest.png', '{}'),
('Wooden Feet', 'Wooden foot armor.', 0, 0, 1, 0, 0, 0, 0, false, 'FEET', 120, 'wooden_feet.png', '{}'),
('Wooden Head', 'A wooden helmet.', 0, 0, 1, 0, 0, 0, 0, false, 'HEAD', 140, 'wooden_head.png', '{}'),
('Wooden Legs', 'Wooden leg armor.', 0, 0, 1, 0, 0, 0, 0, false, 'LEGS', 130, 'wooden_legs.png', '{}'),

-- Physical weapons
('Wooden Sword', 'A basic wooden sword.', 0, 0, 0, 0, 0, 5, 0, false, 'WEAPON', 200, 'wooden_sword.png', '{}'),
('Wooden Axe', 'A basic wooden axe.', 0, 0, 0, 0, 0, 6, 0, false, 'WEAPON', 220, 'wooden_axe.png', '{}'),
('Wooden Bow', 'A basic wooden bow.', 0, 0, 0, 0, 0, 4, 0, false, 'WEAPON', 180, 'wooden_bow.png', '{}'),
('Wooden Crossbow', 'A basic wooden crossbow.', 0, 0, 0, 0, 0, 7, 0, false, 'WEAPON', 250, 'wooden_crossbow.png', '{}'),

-- Magic weapons
('Wooden Staff', 'A basic wooden staff.', 0, 0, 0, 0, 0, 0, 3, false, 'WEAPON', 150, 'wooden_staff.png', '{}'),
('Wooden Orb', 'A basic wooden orb.', 0, 0, 0, 0, 0, 0, 2, false, 'WEAPON', 100, 'wooden_orb.png', '{}'),

-- Accessories
('Wooden Health Amulet', 'A wooden amulet that increases health.', 10, 0, 0, 0, 0, 0, 0, false, 'ACCESSORY', 100, 'wooden_health_amulet.png', '{}'),
('Wooden Mana Ring', 'A wooden ring that increases mana.', 0, 10, 0, 0, 0, 0, 0, false, 'ACCESSORY', 100, 'wooden_mana_ring.png', '{}'),
('Wooden Magic Bracelet', 'A wooden bracelet that increases magic resistance.', 0, 0, 0, 1, 0, 0, 0, false, 'ACCESSORY', 100, 'wooden_magic_bracelet.png', '{}'),
('Wooden Accuracy Pendant', 'A wooden pendant that increases accuracy.', 0, 0, 0, 0, 1, 0, 0, false, 'ACCESSORY', 100, 'wooden_accuracy_pendant.png', '{}'),

-- Copper Set
-- Armor pieces
('Copper Chest', 'A sturdy copper chest.', 0, 0, 2, 0, 0, 0, 0, false, 'CHEST', 300, 'copper_chest.png', '{}'),
('Copper Feet', 'Copper foot armor.', 0, 0, 2, 0, 0, 0, 0, false, 'FEET', 250, 'copper_feet.png', '{}'),
('Copper Head', 'A copper helmet.', 0, 0, 2, 0, 0, 0, 0, false, 'HEAD', 280, 'copper_head.png', '{}'),
('Copper Legs', 'Copper leg armor.', 0, 0, 2, 0, 0, 0, 0, false, 'LEGS', 270, 'copper_legs.png', '{}'),

-- Physical weapons
('Copper Sword', 'A sharp copper sword.', 0, 0, 0, 0, 0, 10, 0, false, 'WEAPON', 400, 'copper_sword.png', '{}'),
('Copper Axe', 'A sharp copper axe.', 0, 0, 0, 0, 0, 12, 0, false, 'WEAPON', 450, 'copper_axe.png', '{}'),
('Copper Bow', 'A sharp copper bow.', 0, 0, 0, 0, 0, 8, 0, false, 'WEAPON', 350, 'copper_bow.png', '{}'),
('Copper Crossbow', 'A sharp copper crossbow.', 0, 0, 0, 0, 0, 14, 0, false, 'WEAPON', 500, 'copper_crossbow.png', '{}'),

-- Magic weapons
('Copper Staff', 'A sharp copper staff.', 0, 0, 0, 0, 0, 0, 6, false, 'WEAPON', 300, 'copper_staff.png', '{}'),
('Copper Orb', 'A sharp copper orb.', 0, 0, 0, 0, 0, 0, 4, false, 'WEAPON', 200, 'copper_orb.png', '{}'),

-- Accessories
('Copper Health Amulet', 'A copper amulet that increases health.', 20, 0, 0, 0, 0, 0, 0, false, 'ACCESSORY', 200, 'copper_health_amulet.png', '{}'),
('Copper Mana Ring', 'A copper ring that increases mana.', 0, 20, 0, 0, 0, 0, 0, false, 'ACCESSORY', 200, 'copper_mana_ring.png', '{}'),
('Copper Magic Bracelet', 'A copper bracelet that increases magic resistance.', 0, 0, 0, 2, 0, 0, 0, false, 'ACCESSORY', 200, 'copper_magic_bracelet.png', '{}'),
('Copper Accuracy Pendant', 'A copper pendant that increases accuracy.', 0, 0, 0, 0, 2, 0, 0, false, 'ACCESSORY', 200, 'copper_accuracy_pendant.png', '{}'),

-- Leather Set
-- Armor pieces
('Leather Chest', 'A sturdy leather chest.', 0, 0, 2, 0, 0, 0, 0, false, 'CHEST', 500, 'leather_chest.png', '{}'),
('Leather Feet', 'Leather foot armor.', 0, 0, 2, 0, 0, 0, 0, false, 'FEET', 450, 'leather_feet.png', '{}'),
('Leather Head', 'A leather helmet.', 0, 0, 2, 0, 0, 0, 0, false, 'HEAD', 480, 'leather_head.png', '{}'),
('Leather Legs', 'Leather leg armor.', 0, 0, 2, 0, 0, 0, 0, false, 'LEGS', 470, 'leather_legs.png', '{}'),

-- Physical weapons
('Leather Sword', 'A sharp leather sword.', 0, 0, 0, 0, 0, 8, 0, false, 'WEAPON', 600, 'leather_sword.png', '{}'),
('Leather Axe', 'A sharp leather axe.', 0, 0, 0, 0, 0, 10, 0, false, 'WEAPON', 650, 'leather_axe.png', '{}'),
('Leather Bow', 'A sharp leather bow.', 0, 0, 0, 0, 0, 6, 0, false, 'WEAPON', 550, 'leather_bow.png', '{}'),
('Leather Crossbow', 'A sharp leather crossbow.', 0, 0, 0, 0, 0, 12, 0, false, 'WEAPON', 700, 'leather_crossbow.png', '{}'),

-- Magic weapons
('Leather Staff', 'A sharp leather staff.', 0, 0, 0, 0, 0, 0, 4, false, 'WEAPON', 500, 'leather_staff.png', '{}'),
('Leather Orb', 'A sharp leather orb.', 0, 0, 0, 0, 0, 0, 3, false, 'WEAPON', 400, 'leather_orb.png', '{}'),

-- Accessories
('Leather Health Amulet', 'A leather amulet that increases health.', 30, 0, 0, 0, 0, 0, 0, false, 'ACCESSORY', 400, 'leather_health_amulet.png', '{}'),
('Leather Mana Ring', 'A leather ring that increases mana.', 0, 30, 0, 0, 0, 0, 0, false, 'ACCESSORY', 400, 'leather_mana_ring.png', '{}'),
('Leather Magic Bracelet', 'A leather bracelet that increases magic resistance.', 0, 0, 0, 3, 0, 0, 0, false, 'ACCESSORY', 400, 'leather_magic_bracelet.png', '{}'),
('Leather Accuracy Pendant', 'A leather pendant that increases accuracy.', 0, 0, 0, 0, 3, 0, 0, false, 'ACCESSORY', 400, 'leather_accuracy_pendant.png', '{}'),

-- Steel Set
-- Armor pieces
('Steel Chest', 'A sturdy steel chest.', 0, 0, 3, 0, 0, 0, 0, false, 'CHEST', 600, 'steel_chest.png', '{}'),
('Steel Feet', 'Steel foot armor.', 0, 0, 3, 0, 0, 0, 0, false, 'FEET', 550, 'steel_feet.png', '{}'),
('Steel Head', 'A steel helmet.', 0, 0, 3, 0, 0, 0, 0, false, 'HEAD', 580, 'steel_head.png', '{}'),
('Steel Legs', 'Steel leg armor.', 0, 0, 3, 0, 0, 0, 0, false, 'LEGS', 570, 'steel_legs.png', '{}'),

-- Physical weapons
('Steel Sword', 'A sharp steel sword.', 0, 0, 0, 0, 0, 15, 0, false, 'WEAPON', 700, 'steel_sword.png', '{}'),
('Steel Axe', 'A sharp steel axe.', 0, 0, 0, 0, 0, 18, 0, false, 'WEAPON', 750, 'steel_axe.png', '{}'),
('Steel Bow', 'A sharp steel bow.', 0, 0, 0, 0, 0, 12, 0, false, 'WEAPON', 650, 'steel_bow.png', '{}'),
('Steel Crossbow', 'A sharp steel crossbow.', 0, 0, 0, 0, 0, 21, 0, false, 'WEAPON', 800, 'steel_crossbow.png', '{}'),

-- Magic weapons
('Steel Staff', 'A sharp steel staff.', 0, 0, 0, 0, 0, 0, 9, false, 'WEAPON', 600, 'steel_staff.png', '{}'),
('Steel Orb', 'A sharp steel orb.', 0, 0, 0, 0, 0, 0, 6, false, 'WEAPON', 500, 'steel_orb.png', '{}'),

-- Accessories
('Steel Health Amulet', 'A steel amulet that increases health.', 40, 0, 0, 0, 0, 0, 0, false, 'ACCESSORY', 500, 'steel_health_amulet.png', '{}'),
('Steel Mana Ring', 'A steel ring that increases mana.', 0, 40, 0, 0, 0, 0, 0, false, 'ACCESSORY', 500, 'steel_mana_ring.png', '{}'),
('Steel Magic Bracelet', 'A steel bracelet that increases magic resistance.', 0, 0, 0, 4, 0, 0, 0, false, 'ACCESSORY', 500, 'steel_magic_bracelet.png', '{}'),
('Steel Accuracy Pendant', 'A steel pendant that increases accuracy.', 0, 0, 0, 0, 4, 0, 0, false, 'ACCESSORY', 500, 'steel_accuracy_pendant.png', '{}'),

-- Iron Set
-- Armor pieces
('Iron Chest', 'A sturdy iron chest.', 0, 0, 4, 0, 0, 0, 0, false, 'CHEST', 800, 'iron_chest.png', '{}'),
('Iron Feet', 'Iron foot armor.', 0, 0, 4, 0, 0, 0, 0, false, 'FEET', 750, 'iron_feet.png', '{}'),
('Iron Head', 'An iron helmet.', 0, 0, 4, 0, 0, 0, 0, false, 'HEAD', 780, 'iron_head.png', '{}'),
('Iron Legs', 'Iron leg armor.', 0, 0, 4, 0, 0, 0, 0, false, 'LEGS', 770, 'iron_legs.png', '{}'),

-- Physical weapons
('Iron Sword', 'A sharp iron sword.', 0, 0, 0, 0, 0, 20, 0, false, 'WEAPON', 900, 'iron_sword.png', '{}'),
('Iron Axe', 'A sharp iron axe.', 0, 0, 0, 0, 0, 24, 0, false, 'WEAPON', 950, 'iron_axe.png', '{}'),
('Iron Bow', 'A sharp iron bow.', 0, 0, 0, 0, 0, 16, 0, false, 'WEAPON', 850, 'iron_bow.png', '{}'),
('Iron Crossbow', 'A sharp iron crossbow.', 0, 0, 0, 0, 0, 28, 0, false, 'WEAPON', 1000, 'iron_crossbow.png', '{}'),

-- Magic weapons
('Iron Staff', 'A sharp iron staff.', 0, 0, 0, 0, 0, 0, 12, false, 'WEAPON', 800, 'iron_staff.png', '{}'),
('Iron Orb', 'A sharp iron orb.', 0, 0, 0, 0, 0, 0, 8, false, 'WEAPON', 700, 'iron_orb.png', '{}'),

-- Accessories
('Iron Health Amulet', 'An iron amulet that increases health.', 50, 0, 0, 0, 0, 0, 0, false, 'ACCESSORY', 700, 'iron_health_amulet.png', '{}'),
('Iron Mana Ring', 'An iron ring that increases mana.', 0, 50, 0, 0, 0, 0, 0, false, 'ACCESSORY', 700, 'iron_mana_ring.png', '{}'),
('Iron Magic Bracelet', 'An iron bracelet that increases magic resistance.', 0, 0, 0, 5, 0, 0, 0, false, 'ACCESSORY', 700, 'iron_magic_bracelet.png', '{}'),
('Iron Accuracy Pendant', 'An iron pendant that increases accuracy.', 0, 0, 0, 0, 5, 0, 0, false, 'ACCESSORY', 700, 'iron_accuracy_pendant.png', '{}'),

-- Platinum Set
-- Armor pieces
('Platinum Chest', 'A sturdy platinum chest.', 0, 0, 5, 0, 0, 0, 0, false, 'CHEST', 1200, 'platinum_chest.png', '{}'),
('Platinum Feet', 'Platinum foot armor.', 0, 0, 5, 0, 0, 0, 0, false, 'FEET', 1100, 'platinum_feet.png', '{}'),
('Platinum Head', 'A platinum helmet.', 0, 0, 5, 0, 0, 0, 0, false, 'HEAD', 1150, 'platinum_head.png', '{}'),
('Platinum Legs', 'Platinum leg armor.', 0, 0, 5, 0, 0, 0, 0, false, 'LEGS', 1125, 'platinum_legs.png', '{}'),

-- Physical weapons
('Platinum Sword', 'A sharp platinum sword.', 0, 0, 0, 0, 0, 25, 0, false, 'WEAPON', 1400, 'platinum_sword.png', '{}'),
('Platinum Axe', 'A sharp platinum axe.', 0, 0, 0, 0, 0, 30, 0, false, 'WEAPON', 1500, 'platinum_axe.png', '{}'),
('Platinum Bow', 'A sharp platinum bow.', 0, 0, 0, 0, 0, 20, 0, false, 'WEAPON', 1300, 'platinum_bow.png', '{}'),
('Platinum Crossbow', 'A sharp platinum crossbow.', 0, 0, 0, 0, 0, 35, 0, false, 'WEAPON', 1600, 'platinum_crossbow.png', '{}'),

-- Magic weapons
('Platinum Staff', 'A sharp platinum staff.', 0, 0, 0, 0, 0, 0, 15, false, 'WEAPON', 1200, 'platinum_staff.png', '{}'),
('Platinum Orb', 'A sharp platinum orb.', 0, 0, 0, 0, 0, 0, 10, false, 'WEAPON', 1000, 'platinum_orb.png', '{}'),

-- Accessories
('Platinum Health Amulet', 'A platinum amulet that increases health.', 60, 0, 0, 0, 0, 0, 0, false, 'ACCESSORY', 1000, 'platinum_health_amulet.png', '{}'),
('Platinum Mana Ring', 'A platinum ring that increases mana.', 0, 60, 0, 0, 0, 0, 0, false, 'ACCESSORY', 1000, 'platinum_mana_ring.png', '{}'),
('Platinum Magic Bracelet', 'A platinum bracelet that increases magic resistance.', 0, 0, 0, 6, 0, 0, 0, false, 'ACCESSORY', 1000, 'platinum_magic_bracelet.png', '{}'),
('Platinum Accuracy Pendant', 'A platinum pendant that increases accuracy.', 0, 0, 0, 0, 6, 0, 0, false, 'ACCESSORY', 1000, 'platinum_accuracy_pendant.png', '{}');

-- Consumable Items
-- Health Potions
INSERT INTO items (name, description, is_consumable, slot_type, price, image_url, effects)
VALUES
-- Health Potions
('Small Health Potion', 'Restores a small amount of health.', true, 'CONSUMABLE', 50, 'small_health_potion.png', 
'[{"type": "STAT_CHANGE", "target": "SELF", "value": 25, "stat": "HEALTH"}]'),
('Medium Health Potion', 'Restores a moderate amount of health.', true, 'CONSUMABLE', 100, 'medium_health_potion.png',
'[{"type": "STAT_CHANGE", "target": "SELF", "value": 50, "stat": "HEALTH"}]'),
('Large Health Potion', 'Restores a large amount of health.', true, 'CONSUMABLE', 200, 'large_health_potion.png',
'[{"type": "STAT_CHANGE", "target": "SELF", "value": 100, "stat": "HEALTH"}]'),
('Greater Health Potion', 'Restores a massive amount of health.', true, 'CONSUMABLE', 400, 'greater_health_potion.png',
'[{"type": "STAT_CHANGE", "target": "SELF", "value": 200, "stat": "HEALTH"}]'),

-- Mana Potions
('Small Mana Potion', 'Restores a small amount of mana.', true, 'CONSUMABLE', 50, 'small_mana_potion.png',
'[{"type": "STAT_CHANGE", "target": "SELF", "value": 25, "stat": "MANA"}]'),
('Medium Mana Potion', 'Restores a moderate amount of mana.', true, 'CONSUMABLE', 100, 'medium_mana_potion.png',
'[{"type": "STAT_CHANGE", "target": "SELF", "value": 50, "stat": "MANA"}]'),
('Large Mana Potion', 'Restores a large amount of mana.', true, 'CONSUMABLE', 200, 'large_mana_potion.png',
'[{"type": "STAT_CHANGE", "target": "SELF", "value": 100, "stat": "MANA"}]'),
('Greater Mana Potion', 'Restores a massive amount of mana.', true, 'CONSUMABLE', 400, 'greater_mana_potion.png',
'[{"type": "STAT_CHANGE", "target": "SELF", "value": 200, "stat": "MANA"}]'),

-- Damage Potions
('Small Damage Potion', 'Temporarily increases physical damage.', true, 'CONSUMABLE', 75, 'small_damage_potion.png',
'[{"type": "STAT_CHANGE", "target": "SELF", "value": 5, "stat": "DAMAGE", "duration": 3}]'),
('Medium Damage Potion', 'Temporarily increases physical damage significantly.', true, 'CONSUMABLE', 150, 'medium_damage_potion.png',
'[{"type": "STAT_CHANGE", "target": "SELF", "value": 10, "stat": "DAMAGE", "duration": 3}]'),
('Large Damage Potion', 'Temporarily increases physical damage greatly.', true, 'CONSUMABLE', 300, 'large_damage_potion.png',
'[{"type": "STAT_CHANGE", "target": "SELF", "value": 20, "stat": "DAMAGE", "duration": 3}]'),
('Greater Damage Potion', 'Temporarily increases physical damage massively.', true, 'CONSUMABLE', 600, 'greater_damage_potion.png',
'[{"type": "STAT_CHANGE", "target": "SELF", "value": 40, "stat": "DAMAGE", "duration": 3}]'),

-- Magic Damage Potions
('Small Magic Damage Potion', 'Temporarily increases magic damage.', true, 'CONSUMABLE', 75, 'small_magic_damage_potion.png',
'[{"type": "STAT_CHANGE", "target": "SELF", "value": 5, "stat": "MAGIC_DAMAGE", "duration": 3}]'),
('Medium Magic Damage Potion', 'Temporarily increases magic damage significantly.', true, 'CONSUMABLE', 150, 'medium_magic_damage_potion.png',
'[{"type": "STAT_CHANGE", "target": "SELF", "value": 10, "stat": "MAGIC_DAMAGE", "duration": 3}]'),
('Large Magic Damage Potion', 'Temporarily increases magic damage greatly.', true, 'CONSUMABLE', 300, 'large_magic_damage_potion.png',
'[{"type": "STAT_CHANGE", "target": "SELF", "value": 20, "stat": "MAGIC_DAMAGE", "duration": 3}]'),
('Greater Magic Damage Potion', 'Temporarily increases magic damage massively.', true, 'CONSUMABLE', 600, 'greater_magic_damage_potion.png',
'[{"type": "STAT_CHANGE", "target": "SELF", "value": 40, "stat": "MAGIC_DAMAGE", "duration": 3}]'),

-- Accuracy Potions
('Small Accuracy Potion', 'Temporarily increases accuracy.', true, 'CONSUMABLE', 75, 'small_accuracy_potion.png',
'[{"type": "STAT_CHANGE", "target": "SELF", "value": 2, "stat": "ACCURACY", "duration": 3}]'),
('Medium Accuracy Potion', 'Temporarily increases accuracy significantly.', true, 'CONSUMABLE', 150, 'medium_accuracy_potion.png',
'[{"type": "STAT_CHANGE", "target": "SELF", "value": 4, "stat": "ACCURACY", "duration": 3}]'),
('Large Accuracy Potion', 'Temporarily increases accuracy greatly.', true, 'CONSUMABLE', 300, 'large_accuracy_potion.png',
'[{"type": "STAT_CHANGE", "target": "SELF", "value": 8, "stat": "ACCURACY", "duration": 3}]'),
('Greater Accuracy Potion', 'Temporarily increases accuracy massively.', true, 'CONSUMABLE', 600, 'greater_accuracy_potion.png',
'[{"type": "STAT_CHANGE", "target": "SELF", "value": 16, "stat": "ACCURACY", "duration": 3}]'),

-- Magic Resistance Potions
('Small Magic Resistance Potion', 'Temporarily increases magic resistance.', true, 'CONSUMABLE', 75, 'small_magic_resistance_potion.png',
'[{"type": "STAT_CHANGE", "target": "SELF", "value": 2, "stat": "MAGIC_RESISTANCE", "duration": 3}]'),
('Medium Magic Resistance Potion', 'Temporarily increases magic resistance significantly.', true, 'CONSUMABLE', 150, 'medium_magic_resistance_potion.png',
'[{"type": "STAT_CHANGE", "target": "SELF", "value": 4, "stat": "MAGIC_RESISTANCE", "duration": 3}]'),
('Large Magic Resistance Potion', 'Temporarily increases magic resistance greatly.', true, 'CONSUMABLE', 300, 'large_magic_resistance_potion.png',
'[{"type": "STAT_CHANGE", "target": "SELF", "value": 8, "stat": "MAGIC_RESISTANCE", "duration": 3}]'),
('Greater Magic Resistance Potion', 'Temporarily increases magic resistance massively.', true, 'CONSUMABLE', 600, 'greater_magic_resistance_potion.png',
'[{"type": "STAT_CHANGE", "target": "SELF", "value": 16, "stat": "MAGIC_RESISTANCE", "duration": 3}]'),

-- Armor Potions
('Small Armor Potion', 'Temporarily increases armor.', true, 'CONSUMABLE', 75, 'small_armor_potion.png',
'[{"type": "STAT_CHANGE", "target": "SELF", "value": 2, "stat": "ARMOR", "duration": 3}]'),
('Medium Armor Potion', 'Temporarily increases armor significantly.', true, 'CONSUMABLE', 150, 'medium_armor_potion.png',
'[{"type": "STAT_CHANGE", "target": "SELF", "value": 4, "stat": "ARMOR", "duration": 3}]'),
('Large Armor Potion', 'Temporarily increases armor greatly.', true, 'CONSUMABLE', 300, 'large_armor_potion.png',
'[{"type": "STAT_CHANGE", "target": "SELF", "value": 8, "stat": "ARMOR", "duration": 3}]'),
('Greater Armor Potion', 'Temporarily increases armor massively.', true, 'CONSUMABLE', 600, 'greater_armor_potion.png',
'[{"type": "STAT_CHANGE", "target": "SELF", "value": 16, "stat": "ARMOR", "duration": 3}]');