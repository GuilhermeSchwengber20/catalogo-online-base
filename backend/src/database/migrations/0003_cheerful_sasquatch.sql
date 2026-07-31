ALTER TABLE "produtos" ALTER COLUMN "preco" SET DATA TYPE double precision;--> statement-breakpoint
ALTER TABLE "produtos" ALTER COLUMN "preco" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "produtos" ALTER COLUMN "preco_promocional" SET DATA TYPE double precision;