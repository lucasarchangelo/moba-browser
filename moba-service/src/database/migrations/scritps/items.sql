-- SQL script to insert items into the items table

INSERT INTO items (name, description, type, damage, armor, magicResistance, health, mana, strength, agility, intelligence, imageUrl, price, rarity, slotType, isConsumable, effects)
VALUES
-- Wooden Set
('Wooden Accessory', 'A basic wooden accessory.', 'ACCESSORY', 0, 0, 0, 0, 0, 0, 0, 0, 'wooden_accessory.png', 100, 'COMMON', 'ACCESSORY', false, '{}'),
('Wooden Chest', 'A sturdy wooden chest.', 'CHEST', 0, 1, 0, 0, 0, 0, 0, 0, 'wooden_chest.png', 150, 'COMMON', 'CHEST', false, '{}'),
('Wooden Feet', 'Wooden foot armor.', 'FEET', 0, 1, 0, 0, 0, 0, 0, 0, 'wooden_feet.png', 120, 'COMMON', 'FEET', false, '{}'),
('Wooden Head', 'A wooden helmet.', 'HEAD', 0, 1, 0, 0, 0, 0, 0, 0, 'wooden_head.png', 140, 'COMMON', 'HEAD', false, '{}'),
('Wooden Legs', 'Wooden leg armor.', 'LEGS', 0, 1, 0, 0, 0, 0, 0, 0, 'awooden_legs.png', 130, 'COMMON', 'LEGS', false, '{}'),
('Wooden Sword', 'A basic wooden sword.', 'WEAPON', 5, 0, 0, 0, 0, 0, 0, 0, 'wooden_sword.png', 200, 'COMMON', 'WEAPON', false, '{}'),
('Wooden Axe', 'A basic wooden axe.', 'WEAPON', 6, 0, 0, 0, 0, 0, 0, 0, 'wooden_axe.png', 220, 'COMMON', 'WEAPON', false, '{}'),
('Wooden Bow', 'A basic wooden bow.', 'WEAPON', 4, 0, 0, 0, 0, 0, 0, 0, 'wooden_bow.png', 180, 'COMMON', 'WEAPON', false, '{}'),
('Wooden Crossbow', 'A basic wooden crossbow.', 'WEAPON', 7, 0, 0, 0, 0, 0, 0, 0, 'wooden_crossbow.png', 250, 'COMMON', 'WEAPON', false, '{}'),
('Wooden Staff', 'A basic wooden staff.', 'WEAPON', 3, 0, 0, 0, 0, 0, 0, 0, 'wooden_staff.png', 150, 'COMMON', 'WEAPON', false, '{}'),
('Wooden Orb', 'A basic wooden orb.', 'WEAPON', 2, 0, 0, 0, 0, 0, 0, 0, 'wooden_orb.png', 100, 'COMMON', 'WEAPON', false, '{}'),

-- Copper Set
('Copper Accessory', 'A shiny copper accessory.', 'ACCESSORY', 0, 0, 0, 0, 0, 0, 0, 0, 'copper_accessory.png', 200, 'COMMON', 'ACCESSORY', false, '{}'),
('Copper Chest', 'A sturdy copper chest.', 'CHEST', 0, 2, 0, 0, 0, 0, 0, 0, 'copper_chest.png', 300, 'COMMON', 'CHEST', false, '{}'),
('Copper Feet', 'Copper foot armor.', 'FEET', 0, 2, 0, 0, 0, 0, 0, 0, 'copper_feet.png', 250, 'COMMON', 'FEET', false, '{}'),
('Copper Head', 'A copper helmet.', 'HEAD', 0, 2, 0, 0, 0, 0, 0, 0, 'copper_head.png', 280, 'COMMON', 'HEAD', false, '{}'),
('Copper Legs', 'Copper leg armor.', 'LEGS', 0, 2, 0, 0, 0, 0, 0, 0, 'acopper_legs.png', 270, 'COMMON', 'LEGS', false, '{}'),
('Copper Sword', 'A sharp copper sword.', 'WEAPON', 10, 0, 0, 0, 0, 0, 0, 0, 'copper_sword.png', 400, 'COMMON', 'WEAPON', false, '{}'),
('Copper Axe', 'A sharp copper axe.', 'WEAPON', 12, 0, 0, 0, 0, 0, 0, 0, 'copper_axe.png', 450, 'COMMON', 'WEAPON', false, '{}'),
('Copper Bow', 'A sharp copper bow.', 'WEAPON', 8, 0, 0, 0, 0, 0, 0, 0, 'copper_bow.png', 350, 'COMMON', 'WEAPON', false, '{}'),
('Copper Crossbow', 'A sharp copper crossbow.', 'WEAPON', 14, 0, 0, 0, 0, 0, 0, 0, 'copper_crossbow.png', 500, 'COMMON', 'WEAPON', false, '{}'),
('Copper Staff', 'A sharp copper staff.', 'WEAPON', 6, 0, 0, 0, 0, 0, 0, 0, 'copper_staff.png', 300, 'COMMON', 'WEAPON', false, '{}'),
('Copper Orb', 'A sharp copper orb.', 'WEAPON', 4, 0, 0, 0, 0, 0, 0, 0, 'copper_orb.png', 200, 'COMMON', 'WEAPON', false, '{}'),

-- Leather Set
('Leather Accessory', 'A flexible leather accessory.', 'ACCESSORY', 0, 0, 0, 0, 0, 0, 0, 0, 'leather_accessory.png', 400, 'UNCOMMON', 'ACCESSORY', false, '{}'),
('Leather Chest', 'A sturdy leather chest.', 'CHEST', 0, 2, 0, 0, 0, 0, 0, 0, 'leather_chest.png', 500, 'UNCOMMON', 'CHEST', false, '{}'),
('Leather Feet', 'Leather foot armor.', 'FEET', 0, 2, 0, 0, 0, 0, 0, 0, 'leather_feet.png', 450, 'UNCOMMON', 'FEET', false, '{}'),
('Leather Head', 'A leather helmet.', 'HEAD', 0, 2, 0, 0, 0, 0, 0, 0, 'leather_head.png', 480, 'UNCOMMON', 'HEAD', false, '{}'),
('Leather Legs', 'Leather leg armor.', 'LEGS', 0, 2, 0, 0, 0, 0, 0, 0, 'aleather_legs.png', 470, 'UNCOMMON', 'LEGS', false, '{}'),
('Leather Sword', 'A sharp leather sword.', 'WEAPON', 8, 0, 0, 0, 0, 0, 0, 0, 'leather_sword.png', 600, 'UNCOMMON', 'WEAPON', false, '{}'),
('Leather Axe', 'A sharp leather axe.', 'WEAPON', 10, 0, 0, 0, 0, 0, 0, 0, 'leather_axe.png', 650, 'UNCOMMON', 'WEAPON', false, '{}'),
('Leather Bow', 'A sharp leather bow.', 'WEAPON', 6, 0, 0, 0, 0, 0, 0, 0, 'leather_bow.png', 550, 'UNCOMMON', 'WEAPON', false, '{}'),
('Leather Crossbow', 'A sharp leather crossbow.', 'WEAPON', 12, 0, 0, 0, 0, 0, 0, 0, 'leather_crossbow.png', 700, 'UNCOMMON', 'WEAPON', false, '{}'),
('Leather Staff', 'A sharp leather staff.', 'WEAPON', 4, 0, 0, 0, 0, 0, 0, 0, 'leather_staff.png', 500, 'UNCOMMON', 'WEAPON', false, '{}'),
('Leather Orb', 'A sharp leather orb.', 'WEAPON', 3, 0, 0, 0, 0, 0, 0, 0, 'leather_orb.png', 400, 'UNCOMMON', 'WEAPON', false, '{}'),

-- Steel Set
('Steel Accessory', 'A durable steel accessory.', 'ACCESSORY', 0, 0, 0, 0, 0, 0, 0, 0, 'steel_accessory.png', 500, 'UNCOMMON', 'ACCESSORY', false, '{}'),
('Steel Chest', 'A sturdy steel chest.', 'CHEST', 0, 3, 0, 0, 0, 0, 0, 0, 'steel_chest.png', 600, 'UNCOMMON', 'CHEST', false, '{}'),
('Steel Feet', 'Steel foot armor.', 'FEET', 0, 3, 0, 0, 0, 0, 0, 0, 'steel_feet.png', 550, 'UNCOMMON', 'FEET', false, '{}'),
('Steel Head', 'A steel helmet.', 'HEAD', 0, 3, 0, 0, 0, 0, 0, 0, 'steel_head.png', 580, 'UNCOMMON', 'HEAD', false, '{}'),
('Steel Legs', 'Steel leg armor.', 'LEGS', 0, 3, 0, 0, 0, 0, 0, 0, 'asteel_legs.png', 570, 'UNCOMMON', 'LEGS', false, '{}'),
('Steel Sword', 'A sharp steel sword.', 'WEAPON', 15, 0, 0, 0, 0, 0, 0, 0, 'steel_sword.png', 700, 'UNCOMMON', 'WEAPON', false, '{}'),
('Steel Axe', 'A sharp steel axe.', 'WEAPON', 18, 0, 0, 0, 0, 0, 0, 0, 'steel_axe.png', 750, 'UNCOMMON', 'WEAPON', false, '{}'),
('Steel Bow', 'A sharp steel bow.', 'WEAPON', 12, 0, 0, 0, 0, 0, 0, 0, 'steel_bow.png', 650, 'UNCOMMON', 'WEAPON', false, '{}'),
('Steel Crossbow', 'A sharp steel crossbow.', 'WEAPON', 21, 0, 0, 0, 0, 0, 0, 0, 'steel_crossbow.png', 800, 'UNCOMMON', 'WEAPON', false, '{}'),
('Steel Staff', 'A sharp steel staff.', 'WEAPON', 9, 0, 0, 0, 0, 0, 0, 0, 'steel_staff.png', 600, 'UNCOMMON', 'WEAPON', false, '{}'),
('Steel Orb', 'A sharp steel orb.', 'WEAPON', 6, 0, 0, 0, 0, 0, 0, 0, 'steel_orb.png', 500, 'UNCOMMON', 'WEAPON', false, '{}'),

-- Iron Set
('Iron Accessory', 'A strong iron accessory.', 'ACCESSORY', 0, 0, 0, 0, 0, 0, 0, 0, 'iron_accessory.png', 700, 'UNCOMMON', 'ACCESSORY', false, '{}'),
('Iron Chest', 'A sturdy iron chest.', 'CHEST', 0, 4, 0, 0, 0, 0, 0, 0, 'iron_chest.png', 800, 'UNCOMMON', 'CHEST', false, '{}'),
('Iron Feet', 'Iron foot armor.', 'FEET', 0, 4, 0, 0, 0, 0, 0, 0, 'iron_feet.png', 750, 'UNCOMMON', 'FEET', false, '{}'),
('Iron Head', 'An iron helmet.', 'HEAD', 0, 4, 0, 0, 0, 0, 0, 0, 'iron_head.png', 780, 'UNCOMMON', 'HEAD', false, '{}'),
('Iron Legs', 'Iron leg armor.', 'LEGS', 0, 4, 0, 0, 0, 0, 0, 0, 'airon_legs.png', 770, 'UNCOMMON', 'LEGS', false, '{}'),
('Iron Sword', 'A sharp iron sword.', 'WEAPON', 20, 0, 0, 0, 0, 0, 0, 0, 'iron_sword.png', 900, 'UNCOMMON', 'WEAPON', false, '{}'),
('Iron Axe', 'A sharp iron axe.', 'WEAPON', 24, 0, 0, 0, 0, 0, 0, 0, 'iron_axe.png', 950, 'UNCOMMON', 'WEAPON', false, '{}'),
('Iron Bow', 'A sharp iron bow.', 'WEAPON', 16, 0, 0, 0, 0, 0, 0, 0, 'iron_bow.png', 850, 'UNCOMMON', 'WEAPON', false, '{}'),
('Iron Crossbow', 'A sharp iron crossbow.', 'WEAPON', 28, 0, 0, 0, 0, 0, 0, 0, 'iron_crossbow.png', 1000, 'UNCOMMON', 'WEAPON', false, '{}'),
('Iron Staff', 'A sharp iron staff.', 'WEAPON', 12, 0, 0, 0, 0, 0, 0, 0, 'iron_staff.png', 800, 'UNCOMMON', 'WEAPON', false, '{}'),
('Iron Orb', 'A sharp iron orb.', 'WEAPON', 8, 0, 0, 0, 0, 0, 0, 0, 'iron_orb.png', 700, 'UNCOMMON', 'WEAPON', false, '{}'),

-- Platinum Set
('Platinum Accessory', 'A luxurious platinum accessory.', 'ACCESSORY', 0, 0, 0, 0, 0, 0, 0, 0, 'platinum_accessory.png', 1000, 'RARE', 'ACCESSORY', false, '{}'),
('Platinum Chest', 'A sturdy platinum chest.', 'CHEST', 0, 5, 0, 0, 0, 0, 0, 0, 'platinum_chest.png', 1200, 'RARE', 'CHEST', false, '{}'),
('Platinum Feet', 'Platinum foot armor.', 'FEET', 0, 5, 0, 0, 0, 0, 0, 0, 'platinum_feet.png', 1100, 'RARE', 'FEET', false, '{}'),
('Platinum Head', 'A platinum helmet.', 'HEAD', 0, 5, 0, 0, 0, 0, 0, 0, 'platinum_head.png', 1150, 'RARE', 'HEAD', false, '{}'),
('Platinum Legs', 'Platinum leg armor.', 'LEGS', 0, 5, 0, 0, 0, 0, 0, 0, 'aplatinum_legs.png', 1125, 'RARE', 'LEGS', false, '{}'),
('Platinum Sword', 'A sharp platinum sword.', 'WEAPON', 25, 0, 0, 0, 0, 0, 0, 0, 'platinum_sword.png', 1400, 'RARE', 'WEAPON', false, '{}'),
('Platinum Axe', 'A sharp platinum axe.', 'WEAPON', 30, 0, 0, 0, 0, 0, 0, 0, 'platinum_axe.png', 1500, 'RARE', 'WEAPON', false, '{}'),
('Platinum Bow', 'A sharp platinum bow.', 'WEAPON', 20, 0, 0, 0, 0, 0, 0, 0, 'platinum_bow.png', 1300, 'RARE', 'WEAPON', false, '{}'),
('Platinum Crossbow', 'A sharp platinum crossbow.', 'WEAPON', 35, 0, 0, 0, 0, 0, 0, 0, 'platinum_crossbow.png', 1600, 'RARE', 'WEAPON', false, '{}'),
('Platinum Staff', 'A sharp platinum staff.', 'WEAPON', 15, 0, 0, 0, 0, 0, 0, 0, 'platinum_staff.png', 1200, 'RARE', 'WEAPON', false, '{}'),
('Platinum Orb', 'A sharp platinum orb.', 'WEAPON', 10, 0, 0, 0, 0, 0, 0, 0, 'platinum_orb.png', 1000, 'RARE', 'WEAPON', false, '{}'),

-- Magic Set
('Magic Accessory', 'A mystical magic accessory.', 'ACCESSORY', 0, 0, 0, 0, 0, 0, 0, 0, 'magic_accessory.png', 800, 'RARE', 'ACCESSORY', false, '{}'),
('Magic Chest', 'A mystical magic chest.', 'CHEST', 0, 3, 2, 0, 0, 0, 0, 0, 'magic_chest.png', 1000, 'RARE', 'CHEST', false, '{}'),
('Magic Feet', 'Magic foot armor.', 'FEET', 0, 3, 2, 0, 0, 0, 0, 0, 'magic_feet.png', 900, 'RARE', 'FEET', false, '{}'),
('Magic Head', 'A magic helmet.', 'HEAD', 0, 3, 2, 0, 0, 0, 0, 0, 'magic_head.png', 950, 'RARE', 'HEAD', false, '{}'),
('Magic Legs', 'Magic leg armor.', 'LEGS', 0, 3, 2, 0, 0, 0, 0, 0, 'amagic_legs.png', 925, 'RARE', 'LEGS', false, '{}'),
('Magic Sword', 'A mystical magic sword.', 'WEAPON', 15, 0, 0, 0, 0, 0, 0, 0, 'magic_sword.png', 1200, 'RARE', 'WEAPON', false, '{}'),
('Magic Axe', 'A mystical magic axe.', 'WEAPON', 18, 0, 0, 0, 0, 0, 0, 0, 'magic_axe.png', 1300, 'RARE', 'WEAPON', false, '{}'),
('Magic Bow', 'A mystical magic bow.', 'WEAPON', 12, 0, 0, 0, 0, 0, 0, 0, 'magic_bow.png', 1100, 'RARE', 'WEAPON', false, '{}'),
('Magic Crossbow', 'A mystical magic crossbow.', 'WEAPON', 21, 0, 0, 0, 0, 0, 0, 0, 'magic_crossbow.png', 1400, 'RARE', 'WEAPON', false, '{}'),
('Magic Staff', 'A mystical magic staff.', 'WEAPON', 9, 0, 0, 0, 0, 0, 0, 0, 'magic_staff.png', 1000, 'RARE', 'WEAPON', false, '{}'),
('Magic Orb', 'A mystical magic orb.', 'WEAPON', 6, 0, 0, 0, 0, 0, 0, 0, 'magic_orb.png', 800, 'RARE', 'WEAPON', false, '{}');