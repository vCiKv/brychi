CREATE TABLE `test` (
	`id` varchar(255) NOT NULL,
	`name` varchar(255) NOT NULL,
	`sizeCl` int NOT NULL,
	`buyPrice` int NOT NULL,
	`sellPrice` int NOT NULL,
	`inventory` decimal(65,1) NOT NULL,
	CONSTRAINT `test_id` PRIMARY KEY(`id`),
	CONSTRAINT `test_id_unique` UNIQUE(`id`)
);
--> statement-breakpoint
CREATE TABLE `testBuy` (
	`id` varchar(255) NOT NULL DEFAULT 'f7qv3kcS',
	`drinks` json NOT NULL,
	`time` datetime NOT NULL DEFAULT '2023-10-09 12:02:46',
	`purchasedFrom` varchar(255) NOT NULL,
	`status` tinyint NOT NULL DEFAULT 0,
	CONSTRAINT `testBuy_id` PRIMARY KEY(`id`),
	CONSTRAINT `testBuy_id_unique` UNIQUE(`id`)
);
--> statement-breakpoint
CREATE TABLE `testSell` (
	`id` varchar(255) NOT NULL DEFAULT 'bO51DjTK',
	`drinks` json NOT NULL,
	`time` datetime NOT NULL DEFAULT '2023-10-09 12:02:46',
	`customerName` varchar(255),
	CONSTRAINT `testSell_id` PRIMARY KEY(`id`),
	CONSTRAINT `testSell_id_unique` UNIQUE(`id`)
);
