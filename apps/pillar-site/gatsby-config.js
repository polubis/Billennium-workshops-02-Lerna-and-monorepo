/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */
 require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` })

 module.exports = {
   /* Your site config here */
   plugins: [
     'gatsby-plugin-sass',
     {
       resolve: `gatsby-plugin-env-variables`,
       options: {
         allowList: [],
       },
     },
     {
       resolve: "gatsby-plugin-firebase",
       options: {
         credentials: {
           apiKey: process.env.API_KEY,
           authDomain: process.env.AUTH_DOMAIN,
           projectId: process.env.PROJECT_ID,
           storageBucket: process.env.STORAGE_BUCKET,
           messagingSenderId: process.env.MESSAGING_SENDER_ID,
           appId: process.env.APP_ID,
           measurementId: process.env.MEASURMENT_ID,
         },
       },
     },
 
     "gatsby-plugin-styled-components",
     "gatsby-plugin-sass",
     {
       resolve: `gatsby-plugin-webfonts`,
       options: {
         fonts: {
           google: [
             {
               family: "Roboto",
               variants: ["400", "500", "700"],
             },
             { family: "Open Sans" },
           ],
         },
       },
     },
   ],
 }