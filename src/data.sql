CREATE TABLE "item"
(
    "id" serial primary key,
    "email" varchar(255) not null,
    "order_number" VARCHAR(100),
    "order_total" VARCHAR(100),
    "qty" INT,
    "created_at" VARCHAR(255),
    "timestamp" DATE NOT NULL DEFAULT NOW()
); 

CREATE TABLE "sku"
(
    "id" serial primary key,
    "email" VARCHAR(255),
    "order_number" VARCHAR(100),
    "sku" varchar(50),
    "created_at" VARCHAR(255),
    "timestamp" DATENOT NULL DEFAULT NOW()
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