CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS "users"
(
  "id" SERIAL NOT NULL,
  "email" character varying NOT NULL,
  "fib" numeric NOT NULL,
  UNIQUE ("email"),
  PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "anagrams"
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    anagram_map jsonb NOT NULL,
    "userId" integer,
    PRIMARY KEY (id),
    UNIQUE ("userId"),
    FOREIGN KEY ("userId")
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);
