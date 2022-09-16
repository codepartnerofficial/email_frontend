/** @type {import('next').NextConfig} */
// module.exports = {
//   future: {
//     webpack5: true, // by default, if you customize webpack config, they switch back to version 4. 
//       // Looks like backward compatibility approach.
//   },
//   webpack(config) {
//     config.resolve.fallback = {
//       ...config.resolve.fallback, // if you miss it, all the other options in fallback, specified
//         // by next.js will be dropped. Doesn't make much sense, but how it is
//       fs: false, // the solution
//       net:false,
//       child_process : false,
//       dgram : false,
//       net : false ,
  
      
//     };

//     return config;
//   },
// };


module.exports = {
  webpack: (config, { isServer }) => {
      if (!isServer) {
          // don't resolve 'fs' module on the client to prevent this error on build --> Error: Can't resolve 'fs'
          config.resolve.fallback = {
              fs: false,
      net:false,
      child_process : false,
      dgram : false,

          }
      }

      return config;
  }
}
