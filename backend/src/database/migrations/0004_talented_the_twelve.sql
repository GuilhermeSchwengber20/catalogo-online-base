ALTER TABLE "itens_pedido" ALTER COLUMN "preco_unitario" SET DATA TYPE double precision;--> statement-breakpoint
ALTER TABLE "itens_pedido" ALTER COLUMN "subtotal" SET DATA TYPE double precision;--> statement-breakpoint
ALTER TABLE "pedidos" ALTER COLUMN "subtotal" SET DATA TYPE double precision;--> statement-breakpoint
ALTER TABLE "pedidos" ALTER COLUMN "desconto" SET DATA TYPE double precision;--> statement-breakpoint
ALTER TABLE "pedidos" ALTER COLUMN "desconto" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "pedidos" ALTER COLUMN "total" SET DATA TYPE double precision;