PGDMP     (    +    	        
    x            affiliateorders    12.5    12.3     R           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            S           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            T           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            U           1262    16396    affiliateorders    DATABASE     �   CREATE DATABASE affiliateorders WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.UTF-8' LC_CTYPE = 'en_US.UTF-8';
    DROP DATABASE affiliateorders;
                doadmin    false            �            1259    16400    item    TABLE     �   CREATE TABLE public.item (
    id integer NOT NULL,
    email character varying(255) NOT NULL,
    order_number character varying(100),
    order_total character varying(100),
    qty integer,
    created_at character varying(255)
);
    DROP TABLE public.item;
       public         heap    affiliateorders    false            �            1259    16398    item_id_seq    SEQUENCE     �   CREATE SEQUENCE public.item_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.item_id_seq;
       public          affiliateorders    false    203            V           0    0    item_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE public.item_id_seq OWNED BY public.item.id;
          public          affiliateorders    false    202            �            1259    16411    sku    TABLE     �   CREATE TABLE public.sku (
    id integer NOT NULL,
    email character varying(255),
    order_number character varying(100),
    sku character varying(50),
    created_at character varying(255)
);
    DROP TABLE public.sku;
       public         heap    affiliateorders    false            �            1259    16409 
   sku_id_seq    SEQUENCE     �   CREATE SEQUENCE public.sku_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 !   DROP SEQUENCE public.sku_id_seq;
       public          affiliateorders    false    205            W           0    0 
   sku_id_seq    SEQUENCE OWNED BY     9   ALTER SEQUENCE public.sku_id_seq OWNED BY public.sku.id;
          public          affiliateorders    false    204            �           2604    16403    item id    DEFAULT     b   ALTER TABLE ONLY public.item ALTER COLUMN id SET DEFAULT nextval('public.item_id_seq'::regclass);
 6   ALTER TABLE public.item ALTER COLUMN id DROP DEFAULT;
       public          affiliateorders    false    202    203    203            �           2604    16414    sku id    DEFAULT     `   ALTER TABLE ONLY public.sku ALTER COLUMN id SET DEFAULT nextval('public.sku_id_seq'::regclass);
 5   ALTER TABLE public.sku ALTER COLUMN id DROP DEFAULT;
       public          affiliateorders    false    204    205    205            M          0    16400    item 
   TABLE DATA           U   COPY public.item (id, email, order_number, order_total, qty, created_at) FROM stdin;
    public          affiliateorders    false    203   `       O          0    16411    sku 
   TABLE DATA           G   COPY public.sku (id, email, order_number, sku, created_at) FROM stdin;
    public          affiliateorders    false    205   }       X           0    0    item_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.item_id_seq', 1, false);
          public          affiliateorders    false    202            Y           0    0 
   sku_id_seq    SEQUENCE SET     9   SELECT pg_catalog.setval('public.sku_id_seq', 1, false);
          public          affiliateorders    false    204            �           2606    16408    item item_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.item
    ADD CONSTRAINT item_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.item DROP CONSTRAINT item_pkey;
       public            affiliateorders    false    203            �           2606    16419    sku sku_pkey 
   CONSTRAINT     J   ALTER TABLE ONLY public.sku
    ADD CONSTRAINT sku_pkey PRIMARY KEY (id);
 6   ALTER TABLE ONLY public.sku DROP CONSTRAINT sku_pkey;
       public            affiliateorders    false    205            M      x������ � �      O      x������ � �     