import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { jwt } from "better-auth/plugins";

import { getMongoClient, getMongoDB } from "@/lib/mongodb";

const client = await getMongoClient();
const db = await getMongoDB();

export const auth = betterAuth({
  appName: "StudioSpace",

  baseURL: process.env.BETTER_AUTH_URL,

  secret: process.env.BETTER_AUTH_SECRET,

  database: mongodbAdapter(db, {
    client,
  }),

  emailAndPassword: {
    enabled: true,
  },

  plugins: [
    jwt({
      jwt: {
        issuer: process.env.BETTER_AUTH_URL,
        audience: process.env.BETTER_AUTH_URL,
        expirationTime: "15m",

        definePayload: ({ user }) => ({
          id: user.id,
          email: user.email,
          name: user.name,
        }),
      },
    }),
  ],

  // session: {
  //   cookieCache: {
  //     enabled : true,
  //     strategy: "jwt",
  //     maxAge: 7 * 24 * 60 * 60, // 7 days
  //   }
  // }
});