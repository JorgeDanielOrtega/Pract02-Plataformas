/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig



// /** @type {import('next').NextConfig} */

// module.exports = {
//     async headers() {
//       return [
//         {
//           // matching all API routes
//           source: "/:path*",
//           headers: [
//             { key: "Access-Control-Allow-Credentials", value: "true" },
//             { key: "Access-Control-Allow-Origin", value: "*" },
//             { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
//             { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
//           ]
//         }
//       ]
//     }
//   };
  


// /** @type {import('next').NextConfig} */
// const nextConfig = {
    
      
//       async headers() {
//         return [
//           {
//             // matching all API routes
//             source: "/:path*",
//             headers: [
//               { key: "Access-Control-Allow-Credentials", value: "true" },
//               { key: "Access-Control-Allow-Origin", value: "*" },
//               {
//                 key: "Access-Control-Allow-Methods",
//                 value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
//               },
//               {
//                 key: "Access-Control-Allow-Headers",
//                 value:
//                   "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, token-key",
//               },
//             ],
//           },
//         ];
//       },
    
//   };
  
//   module.exports = nextConfig;




// module.exports = {
//     async rewrites() {
//         return [
//           {
//             source: '/details/:path*',
//             destination: 'https://computacion.unl.edu.ec/pdml/practica1/:path*',
//           },
//         ]
//       },
//   };



// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     async headers() {
//       return [
//         {
//           // Routes this applies to
//           source: "/api/(.*)",
//           // Headers
//           headers: [
//             // Allow for specific domains to have access or * for all
//             {
//               key: "Access-Control-Allow-Origin",
//               value: "*",
//               // DOES NOT WORK
//               // value: process.env.ALLOWED_ORIGIN,
//             },
//             // Allows for specific methods accepted
//             {
//               key: "Access-Control-Allow-Methods",
//               value: "GET, POST, PUT, DELETE, OPTIONS",
//             },
//             // Allows for specific headers accepted (These are a few standard ones)
//             {
//               key: "Access-Control-Allow-Headers",
//               value: "Content-Type, Authorization",
//             },
//           ],
//         },
//       ];
//     },
//   };
  
//   module.exports = nextConfig;





/// chat


// next.config.js
// module.exports = {
//   async headers() {
//     return [
//       {
//         source: '/:path*',
//         headers: [
//           {
//             key: 'Access-Control-Allow-Origin',
//             value: '*', // o tu dominio específico
//           },
//           {
//             key: 'Access-Control-Allow-Methods',
//             value: 'GET, POST, PUT, DELETE, OPTIONS',
//           },
//           {
//             key: 'Access-Control-Allow-Headers',
//             value: 'Accept, TOKEN-KEY',
//           },
//         ],
//       },
//     ];
//   },
// };
