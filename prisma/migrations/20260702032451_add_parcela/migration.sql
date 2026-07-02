/*
  Warnings:

  - You are about to drop the column `tal_codigo` on the `fsu_analise_tecnica` table. All the data in the column will be lost.
  - Added the required column `par_codigo` to the `fsu_analise_tecnica` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "fsu_analise_tecnica" DROP CONSTRAINT "fsu_analise_tecnica_tal_codigo_fkey";

-- AlterTable
ALTER TABLE "fsu_analise_tecnica" DROP COLUMN "tal_codigo",
ADD COLUMN     "par_codigo" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "fsu_parcela" (
    "par_codigo" SERIAL NOT NULL,
    "tal_codigo" INTEGER NOT NULL,
    "par_descricao" TEXT NOT NULL,
    "par_area_hectares" DECIMAL(20,4) NOT NULL,

    CONSTRAINT "fsu_parcela_pkey" PRIMARY KEY ("par_codigo")
);

-- AddForeignKey
ALTER TABLE "fsu_parcela" ADD CONSTRAINT "fsu_parcela_tal_codigo_fkey" FOREIGN KEY ("tal_codigo") REFERENCES "fsu_talhao"("tal_codigo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fsu_analise_tecnica" ADD CONSTRAINT "fsu_analise_tecnica_par_codigo_fkey" FOREIGN KEY ("par_codigo") REFERENCES "fsu_parcela"("par_codigo") ON DELETE RESTRICT ON UPDATE CASCADE;
