import { PrismaClient } from '@prisma/client'

// DECLARACIÓN DE DATOS
const articulos = [
    {
        nombre: 'Monitor 17 pulgadas',
        descripcion: 'Monitor plano LCD',
        precio: 110.22,
    },
    {
        nombre: 'Teclado',
        descripcion: 'Teclado USB en español',
        precio: 20.12,
    },
    {
        nombre: 'Impresora',
        descripcion: 'Impresora láser a color',
        precio: 360.05,
    },
];

const proveedores = [
    {
        nombre: 'El Dorado',
        nacional: true,
    },
    {
        nombre: 'Altavista',
        nacional: false,
    },
    {
        nombre: 'Novoceno',
        nacional: true,
    },
    {
        nombre: 'Plutarco S.A.',
        nacional: true,
    },

];


const prisma = new PrismaClient();

const load = async () => {
    try {
        // await prisma.$queryRaw`ALTER SEQUENCE articulos_id_seq RESTART WITH 1`;
        // console.log('reset articulo sequence to 1');
        await prisma.articulo.deleteMany({});
        console.log('Borrados los registros de la tabla articulos');

        await prisma.articulo.createMany({
            data: articulos,
        });
        console.log('Añadidos datos a tabla articulos');

        await prisma.proveedor.deleteMany({});
        console.log('Borrados los registros de la tabla proveedores');

        await prisma.proveedor.createMany({
            data: proveedores,
        });
        console.log('Añadidos datos a tabla proveedores');


    } catch (e) {
        console.error(e);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
};

load();