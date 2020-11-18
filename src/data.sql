CREATE TABLE "item"
(
    "id" serial primary key,
    "email" varchar(255) not null,
    "order_number" VARCHAR(100),
    "qty" INT,
    "created_at" DATE NOT NULL DEFAULT 'now()'
); 

CREATE TABLE "sku"
(
    "id" serial primary key,
    "item_id" INT REFERENCES "item",
    "email" VARCHAR(255),
    "order_number" VARCHAR(100),
    "sku" varchar(50),
    "created_at" DATE NOT NULL DEFAULT 'now()'
); 

CREATE TABLE "options"
(
    "id" serial primary key,
    "sku_id" INT REFERENCES "sku",
    "email" VARCHAR(255),
    "order_number" VARCHAR(100),
    "sku" varchar(50),
    "product_options" TEXT,
    "created_at" DATE NOT NULL DEFAULT 'now()'
); 

/*to select how many items each affilate has sold total*/
SELECT array_agg(DISTINCT email) as email, COUNT(*)
FROM sku
GROUP BY email;
/*to view skus by Affiliate*/
SELECT array_agg(DISTINCT sku) as sku, COUNT(*)
FROM sku
where email={userinput}
GROUP BY sku;