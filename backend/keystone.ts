// keystone.ts

import "dotenv/config"; // Load environment variables
import { config, createSchema } from "@keystone-next/keystone/schema"; // Keystone core functions
import { User } from "./schemas/User";
import { createAuth } from "@keystone-next/auth";
import {
  withItemData,
  statelessSessions,
} from "@keystone-next/keystone/session";
import { Product } from "./schemas/Product";
import { ProductImage } from "./schemas/ProductImage";
import { insertSeedData } from "./seed-data"; // Import seed data function

const databaseURL =
  process.env.DATABASE_URL || "mongodb://localhost/keystone-shoptrends";

// Session configuration for authentication
const sessionConfig = {
  maxAge: 60 * 60 * 24 * 30, // Session lasts for 30 days
  secret: process.env.COOKIE_SECRET, // Secret to sign cookies
};

const { withAuth } = createAuth({
  listKey: "User", // Which list is the user stored in
  identityField: "email", // How the user logs
  secretField: "password", // How the user authenticates
  sessionData: "name", // What to store in the session
  // @ts-ignore
  initFirstItem: {
    fields: ["name", "email", "password"], // Fields for the first user
  },
});

export default withAuth(
  config({
    // @ts-ignore
    server: {
      cors: {
        origin: [process.env.FRONTEND_URL], // Allow requests from the frontend
        credentials: true, // Allow sending cookies with requests
      },
    },
    db: {
      adapter: "mongoose",
      url: databaseURL,
      async onConnect(context) {
        console.log("Connected to the database!");
        if (process.argv.includes("--seed-data")) {
          await insertSeedData(context);
        }
      },
    },
    lists: createSchema({
      // Register the User list (data type)
      User,
      Product,
      ProductImage,
    }),
    ui: {
      isAccessAllowed: ({ session }) => {
        // console.log(session);
        return !!session?.data;
      },
    },
    session: withItemData(statelessSessions(sessionConfig), {
      // Session configuration for authentication and user data storage in the session cookie
      User: "id name email", // Which fields to store in the session cookie (id, name, email, etc.)
      Product,
      ProductImage,
    }),
  })
);
