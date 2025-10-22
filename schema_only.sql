CREATE TABLE categories (
	category_id INTEGER NOT NULL, 
	name VARCHAR, 
	"nameArabic" VARCHAR, 
	"desc" VARCHAR, 
	img VARCHAR, 
	PRIMARY KEY (category_id)
);
CREATE TABLE products (
	product_id INTEGER NOT NULL, 
	img VARCHAR, 
	name VARCHAR, 
	"desc" VARCHAR, 
	country VARCHAR, 
	category VARCHAR, 
	lang VARCHAR, 
	datasheet VARCHAR, 
	PRIMARY KEY (product_id)
);
CREATE TABLE catalogs (
	catalog_id INTEGER NOT NULL, 
	img VARCHAR, 
	name VARCHAR, 
	link VARCHAR, 
	category VARCHAR, 
	country VARCHAR, 
	lang VARCHAR, 
	PRIMARY KEY (catalog_id)
);
CREATE TABLE IF NOT EXISTS "technicalDatasheets" (
	"technicalDatasheet_id" INTEGER NOT NULL, 
	name VARCHAR, 
	link VARCHAR, 
	category VARCHAR, 
	country VARCHAR, 
	lang VARCHAR, 
	PRIMARY KEY ("technicalDatasheet_id")
);
CREATE TABLE post (
	id INTEGER NOT NULL, 
	title VARCHAR, 
	description VARCHAR, 
	date VARCHAR, 
	lang VARCHAR, 
	img VARCHAR, 
	category VARCHAR, 
	views VARCHAR, 
	PRIMARY KEY (id)
);
CREATE TABLE certificate (
	id INTEGER NOT NULL, 
	title VARCHAR, 
	description VARCHAR, 
	link VARCHAR, 
	img VARCHAR, 
	PRIMARY KEY (id)
);
CREATE TABLE approval (
	id INTEGER NOT NULL, 
	title VARCHAR, 
	description VARCHAR, 
	link VARCHAR, 
	img VARCHAR, 
	PRIMARY KEY (id)
);
CREATE TABLE product_categorie (
	category_id INTEGER, 
	product_id INTEGER, 
	FOREIGN KEY(category_id) REFERENCES categories (category_id), 
	FOREIGN KEY(product_id) REFERENCES products (product_id)
);
CREATE TABLE upload (
	id INTEGER NOT NULL, 
	filename VARCHAR(50), 
	data BLOB, 
	PRIMARY KEY (id)
);
CREATE TABLE social (
	id INTEGER NOT NULL, 
	name VARCHAR, 
	icon VARCHAR, 
	link VARCHAR, 
	PRIMARY KEY (id)
);
