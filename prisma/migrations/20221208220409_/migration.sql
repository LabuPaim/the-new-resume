-- CreateEnum
CREATE TYPE "Role" AS ENUM ('CANDIDATO', 'EMPRESA');

-- CreateEnum
CREATE TYPE "Bool" AS ENUM ('SIM', 'NAO', 'TANTOFAZ');

-- CreateEnum
CREATE TYPE "Stack" AS ENUM ('FULLSTACK', 'FRONTEND', 'BACKEND');

-- CreateEnum
CREATE TYPE "Nivel" AS ENUM ('JUNIOR', 'PLENO', 'SENIOR');

-- CreateEnum
CREATE TYPE "Contratos" AS ENUM ('PJ', 'CLT');

-- CreateEnum
CREATE TYPE "Office" AS ENUM ('PRESENCIAL', 'HIBRIDO', 'HOMEOFFICE');

-- CreateEnum
CREATE TYPE "Habilidades" AS ENUM ('ANDROIDSTUDIO', 'ANGULAR', 'API', 'APIREST', 'APIRESTFULL', 'BASH', 'CLEANCODE', 'CSS', 'DART', 'DESIGNPATTERN', 'EXPRESS', 'FIGMA', 'FIREBASE', 'GIT', 'GITHUB', 'GRAPHQL', 'HTML', 'JAVA', 'JAVASCRIPT', 'JSON', 'KANBAN', 'MONGODB', 'MVC', 'NESTJS', 'NEXTJS', 'NODEJS', 'NOSQL', 'PHP', 'POSTGRESQL', 'PYTHON', 'REACTJS', 'REDUX', 'SASS', 'SCRUM', 'SCSS', 'SEO', 'SOLID', 'SQL', 'STYLEDCOMPONENTS', 'TYPESCRIPT', 'VUE');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Candidato" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "nascimento" TIMESTAMP(3) NOT NULL,
    "cpf" TEXT NOT NULL,
    "celular" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "descricao" TEXT,
    "stack" "Stack"[],
    "nivel" "Nivel" NOT NULL,
    "habilidades" "Habilidades"[],
    "contratos" "Contratos"[],
    "office" "Office"[],
    "deficiencia" BOOLEAN NOT NULL,

    CONSTRAINT "Candidato_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Empresa" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "descricao" TEXT,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,

    CONSTRAINT "Empresa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vaga" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "stack" "Stack" NOT NULL,
    "nivel" "Nivel" NOT NULL,
    "descricao" TEXT,
    "formacao" TEXT[],
    "habilidades" "Habilidades"[],
    "experiencia" TEXT[],
    "contratos" "Contratos" NOT NULL,
    "office" "Office" NOT NULL,
    "deficiencia" "Bool" NOT NULL,

    CONSTRAINT "Vaga_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Links" (
    "id" TEXT NOT NULL,
    "candidatoId" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "github" TEXT,
    "linkedin" TEXT,
    "instagram" TEXT,
    "site" TEXT,

    CONSTRAINT "Links_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Experiencia" (
    "id" TEXT NOT NULL,
    "candidatoId" TEXT NOT NULL,
    "empresa" TEXT,
    "cargo" TEXT,
    "descricao" TEXT,
    "habilidades" "Habilidades"[],
    "dataInicio" TIMESTAMP(3) NOT NULL,
    "dataFinal" TIMESTAMP(3),
    "atualmente" BOOLEAN NOT NULL,

    CONSTRAINT "Experiencia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Formacao" (
    "id" TEXT NOT NULL,
    "candidatoId" TEXT NOT NULL,
    "instituicao" TEXT NOT NULL,
    "nivel" TEXT NOT NULL,
    "curso" TEXT NOT NULL,
    "situacao" TEXT NOT NULL,
    "dataInicio" TIMESTAMP(3) NOT NULL,
    "dataFinal" TIMESTAMP(3),
    "atualmente" BOOLEAN NOT NULL,

    CONSTRAINT "Formacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CandidatoToVaga" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Candidato_id_key" ON "Candidato"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Candidato_cpf_key" ON "Candidato"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Candidato_celular_key" ON "Candidato"("celular");

-- CreateIndex
CREATE UNIQUE INDEX "Empresa_id_key" ON "Empresa"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Empresa_cnpj_key" ON "Empresa"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "Empresa_telefone_key" ON "Empresa"("telefone");

-- CreateIndex
CREATE UNIQUE INDEX "Vaga_id_key" ON "Vaga"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Links_id_key" ON "Links"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Experiencia_id_key" ON "Experiencia"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Formacao_id_key" ON "Formacao"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_CandidatoToVaga_AB_unique" ON "_CandidatoToVaga"("A", "B");

-- CreateIndex
CREATE INDEX "_CandidatoToVaga_B_index" ON "_CandidatoToVaga"("B");

-- AddForeignKey
ALTER TABLE "Candidato" ADD CONSTRAINT "Candidato_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Empresa" ADD CONSTRAINT "Empresa_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vaga" ADD CONSTRAINT "Vaga_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Links" ADD CONSTRAINT "Links_candidatoId_fkey" FOREIGN KEY ("candidatoId") REFERENCES "Candidato"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Links" ADD CONSTRAINT "Links_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Experiencia" ADD CONSTRAINT "Experiencia_candidatoId_fkey" FOREIGN KEY ("candidatoId") REFERENCES "Candidato"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Formacao" ADD CONSTRAINT "Formacao_candidatoId_fkey" FOREIGN KEY ("candidatoId") REFERENCES "Candidato"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CandidatoToVaga" ADD CONSTRAINT "_CandidatoToVaga_A_fkey" FOREIGN KEY ("A") REFERENCES "Candidato"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CandidatoToVaga" ADD CONSTRAINT "_CandidatoToVaga_B_fkey" FOREIGN KEY ("B") REFERENCES "Vaga"("id") ON DELETE CASCADE ON UPDATE CASCADE;
