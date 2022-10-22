-- CreateTable
CREATE TABLE "Athlete" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "spotifyid" TEXT
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "usuario" TEXT NOT NULL,
    "clave" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "onLine" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "spotifyid" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "ingreso" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
