DROP TABLE IF EXISTS test;
CREATE TABLE `test` (
	`id` VARCHAR(255) NOT NULL,
	`name` VARCHAR(255) NOT NULL,
	`sizeCl` INT(255) unsigned NOT NULL COMMENT 'size of bottle',
	`buyPrice` INT(255) unsigned NOT NULL COMMENT 'current buying price',
	`sellPrice` INT(255) unsigned NOT NULL COMMENT 'current sellingg price',
	`inventory` DECIMAL NOT NULL COMMENT 'amount in stock',
	PRIMARY KEY (`id`)
) ENGINE=InnoDB;

INSERT INTO test (id, name, sizeCl, buyPrice, sellPrice, inventory)
  VALUES  ('2ef2505f-9f48-4545-99f3-2285c1cd028b', 'Mexican Pinyon', '85', '1900', '2100', '22');

-- ALTER TABLE `test` MODIFY `inventory` DECIMAL(255);

CREATE TABLE `testSell` (
	`id` VARCHAR(255) NOT NULL COMMENT 'id of purchase',
	`drinks` JSON NOT NULL,
	`time` DATETIME NOT NULL COMMENT 'time of purchase',
	`customerName` VARCHAR(255) COMMENT 'customer name',
	PRIMARY KEY (`id`)
) ENGINE=InnoDB;

INSERT INTO `testSell` (`id`,`time`,`drinks`,`customerName`)
  VALUES  ('cb8Aff3e','2023-04-30 00:19:44','[{"drinkId":"67ad3af3-0138-4e28-9572-6f22016f326d","cartonsAmount":46,"cost":400},{"drinkId":"99b059e5-3f8a-4694-817f-76460242d5b2","cartonsAmount":40,"cost":400},{"drinkId":"aa581083-2a22-43ed-a8f0-d9bee06daf3e","cartonsAmount":41,"cost":400}]','Gwennie');

CREATE TABLE `testBuy` (
	`id` VARCHAR(255) NOT NULL COMMENT 'id of purchase',
	`drinks` JSON NOT NULL,
	`time` DATETIME NOT NULL COMMENT 'time of purchase',
	`purchasedFrom` VARCHAR(255) COMMENT 'purchase from seller',
	`status` SMALLINT NOt NULL DEFAULT 0 COMMENT 'status of purchase (-1|0|1)=(cancelled|processing|completed)',
	PRIMARY KEY (`id`)
) ENGINE=InnoDB;

INSERT INTO `testSell` (`id`,`time`,`drinks`,`purchaseFrom`)
  VALUES  ('cb8Aff3e','2023-04-30 00:19:44','[{"drinkId":"67ad3af3-0138-4e28-9572-6f22016f326d","cartonsAmount":46,"cost":400},{"drinkId":"99b059e5-3f8a-4694-817f-76460242d5b2","cartonsAmount":40,"cost":400},{"drinkId":"aa581083-2a22-43ed-a8f0-d9bee06daf3e","cartonsAmount":41,"cost":400}]','Gwennie');
