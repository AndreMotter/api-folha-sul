-- CreateTable
CREATE TABLE "fsu_usuario" (
    "usu_codigo" SERIAL NOT NULL,
    "usu_login" TEXT NOT NULL,
    "usu_senha" TEXT NOT NULL,

    CONSTRAINT "fsu_usuario_pkey" PRIMARY KEY ("usu_codigo")
);

-- CreateTable
CREATE TABLE "fsu_propriedade" (
    "pro_codigo" SERIAL NOT NULL,
    "pro_descricao" TEXT NOT NULL,
    "pro_endereco" TEXT,

    CONSTRAINT "fsu_propriedade_pkey" PRIMARY KEY ("pro_codigo")
);

-- CreateTable
CREATE TABLE "fsu_talhao" (
    "tal_codigo" SERIAL NOT NULL,
    "pro_codigo" INTEGER NOT NULL,
    "tal_descricao" TEXT NOT NULL,
    "tal_area_hectares" DECIMAL(20,4) NOT NULL,
    "tal_latitude" DOUBLE PRECISION,
    "tal_longitude" DOUBLE PRECISION,

    CONSTRAINT "fsu_talhao_pkey" PRIMARY KEY ("tal_codigo")
);

-- CreateTable
CREATE TABLE "fsu_safra" (
    "saf_codigo" SERIAL NOT NULL,
    "saf_descricao" TEXT NOT NULL,
    "saf_data_inicio" TIMESTAMP(3) NOT NULL,
    "saf_data_fim" TIMESTAMP(3),
    "saf_status" INTEGER NOT NULL,

    CONSTRAINT "fsu_safra_pkey" PRIMARY KEY ("saf_codigo")
);

-- CreateTable
CREATE TABLE "fsu_analise_tecnica" (
    "ant_codigo" SERIAL NOT NULL,
    "tal_codigo" INTEGER NOT NULL,
    "saf_codigo" INTEGER NOT NULL,
    "usu_codigo" INTEGER NOT NULL,
    "ant_observacao" TEXT,
    "ant_data_hora" TIMESTAMP(3) NOT NULL,
    "ant_status" INTEGER NOT NULL,

    CONSTRAINT "fsu_analise_tecnica_pkey" PRIMARY KEY ("ant_codigo")
);

-- CreateTable
CREATE TABLE "fsu_analise_tecnica_imagem" (
    "ati_codigo" SERIAL NOT NULL,
    "ant_codigo" INTEGER NOT NULL,
    "ati_nome_arquivo" TEXT,
    "ati_imagem" BYTEA NOT NULL,
    "ati_tipo_arquivo" TEXT,
    "ati_percentual_severidade" DECIMAL(20,4),

    CONSTRAINT "fsu_analise_tecnica_imagem_pkey" PRIMARY KEY ("ati_codigo")
);

-- CreateIndex
CREATE UNIQUE INDEX "fsu_usuario_usu_login_key" ON "fsu_usuario"("usu_login");

-- AddForeignKey
ALTER TABLE "fsu_talhao" ADD CONSTRAINT "fsu_talhao_pro_codigo_fkey" FOREIGN KEY ("pro_codigo") REFERENCES "fsu_propriedade"("pro_codigo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fsu_analise_tecnica" ADD CONSTRAINT "fsu_analise_tecnica_tal_codigo_fkey" FOREIGN KEY ("tal_codigo") REFERENCES "fsu_talhao"("tal_codigo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fsu_analise_tecnica" ADD CONSTRAINT "fsu_analise_tecnica_saf_codigo_fkey" FOREIGN KEY ("saf_codigo") REFERENCES "fsu_safra"("saf_codigo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fsu_analise_tecnica" ADD CONSTRAINT "fsu_analise_tecnica_usu_codigo_fkey" FOREIGN KEY ("usu_codigo") REFERENCES "fsu_usuario"("usu_codigo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fsu_analise_tecnica_imagem" ADD CONSTRAINT "fsu_analise_tecnica_imagem_ant_codigo_fkey" FOREIGN KEY ("ant_codigo") REFERENCES "fsu_analise_tecnica"("ant_codigo") ON DELETE RESTRICT ON UPDATE CASCADE;
