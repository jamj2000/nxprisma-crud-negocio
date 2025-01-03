import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();


///// Lectura

// 1. Mostrar todos los artículos. (findMany)
// const articulos = await prisma.articulo.findMany();
// console.log(articulos);


// 2. Mostrar el primer artículo. (findFirst)
// const articulo = await prisma.articulo.findFirst();
// console.log(articulo);


// 3. Mostrar el articulo con id = 1 (findUnique)
// const articulo = await prisma.articulo.findMany({
//     where: {
//         precio: 33
//     },
//     select: {
//         nombre: true,
//         descripcion: true,
//     },
// });
// console.log(articulo);


// 4. Mostrar todos los artículos, sólo los campos nombre y precio.
// const articulos = await prisma.articulo.findMany({
//     select: {
//         // nombre: true,
//         precio: true
//     }
// });
// console.log(articulos);


// 5. Mostrar el artículo con id = 1, sólo su precio.
// const articulo = await prisma.articulo.findUnique({
//     where: {
//         id: 40
//     },
//     select: {
//         precio: true
//     }
// });
// console.log(articulo);


// 6. Mostrar el artículo con id = 1 y sus proveedores.
// const articulo = await prisma.articulo.findUnique({
//     where: {
//         id: 41
//     },
//     include: {
//         proveedores: true
//     }
// });
// console.log(articulo);


// 7. Mostrar el artículo con id = 1 y sólo el nombre de los proveedores.
// const articulo = await prisma.articulo.findUnique({
//     where: {
//         id: 40
//     },
//     select: {
//         nombre: true,
//         descripcion: true,
//         proveedores: {
//             select: {
//                 nombre: true,
//                 nacional: true,
//             }
//         }
//     }
// });
// console.log(articulo);



///// Inserción

// 1. Inserta un artículo
// const articulo = await prisma.articulo.create({
//     data: {
//       nombre: 'Artículo desde clase',
//       descripcion: 'Artículo creado desde consultas.mjs',
//       precio: 199.98,
//     },
//   })
// console.log(articulo);


// 2. Inserta un proveedor.
// const proveedor = await prisma.proveedor.create({
//     data: {
//       nombre: 'Proveedor muy nuevo',
//       nacional: true, 
//     },
//   })
// console.log(proveedor);


// 3. Inserta un artículo con 2 proveedores.
// const articulo = await prisma.articulo.create({
//     data: {
//         nombre: 'Artículo muy muy nuevo',
//         descripcion: 'El último de los últimos',
//         precio: 98.12,
//         proveedores:{
//             create: [{
//                 nombre: 'Un proveedor con create y un articulo',
//                 nacional: true,
//             },
//             {
//                 nombre: 'Otro proveedor con create y un articulo',
//                 nacional: false,
//             }]
//         }, 
//     }
// })
// console.log(articulo);



///// Actualización

// 1. Edita el artículo con id = 1 y cambia el precio.
// const articulo = await prisma.articulo.update({
//     where: {
//         id: 5
//     },
//     data: {
//         precio: 12.21
//     }
// })
// console.log(articulo);


// 2. Edita el artículo con id = 1 y cambia el precio y el nombre.
// const articulo = await prisma.articulo.update({
//     where: {
//         id: 41
//     },
//     data: {
//         nombre: 'Monitor  17 pulgadas',
//         precio: 44.33
//     }
// })
// console.log(articulo);


// 3. Edita el artículo con id = 1 y relaciona (connect) con proveedores con id = 2 e id = 3
// const articulo = await prisma.articulo.update({
//     where: {
//         id: 41
//     },
//     data: {
//         proveedores:{
//             connect: [{ id: 5 }, { id: 6 }] 
//         }
//     },
//     include: {
//         proveedores: true
//     }
// })
// console.log(articulo);


// 4. Edita el artículo con id = 1 y quita relación (disconnect) con proveedor con id = 3
// const articulo = await prisma.articulo.update({
//     where: {
//         id: 41
//     },
//     data: {
//         proveedores:{
//             connect: [ {id: 5}, {id: 7}, {id: 8}],
//             disconnect: [{ id: 5 }],  
//         }
//     },
//     include: {
//         proveedores: true
//     }
// })
// console.log(articulo);



///// Borrado

// 1. Elimina el proveedor con id = 1.
// const proveedor = await prisma.proveedor.delete({
//     where: {
//       id: 25,
//     },
// })
// console.log(proveedor);


// 2. Elimina los artículos con precio > 20
const articulo = await prisma.articulo.deleteMany({
    where: {
      precio: {
        gt: 20
      },
    },
})
console.log(articulo);

