import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "../../../lib/mongodb"

export const authOptions: any = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? "",
      // https://next-auth.js.org/providers/google
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  secret: process.env.NEXT_PUBLIC_SECRET,
  callbacks: {
    async signIn({ account, profile }: { account: any; profile: any }) {
      if (account.provider === "google") {
        return profile.email_verified // && profile.email.endsWith("@example.com")
      }
      return true // Do different verification for other providers that don't have `email_verified`
    },
    async jwt({
      token,
      user,
      account,
    }: {
      token: any
      user: any
      account: any
    }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.id_token = account.id_token
        token.naUserObjectId = user.id
      }
      return token
    },
    async session({ session, token }: { session: any; token: any }) {
      // Send properties to the client, like an access_token from a provider.
      session.user.id_token = token.id_token
      session.user.provider = "google"
      session.user.naUserObjectId = token.naUserObjectId
      return session
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 7,
    // strategy: "database",
    // maxAge: 60 * 60 * 24,
    // updateAge: 60 * 60,
  },
  adapter: MongoDBAdapter(clientPromise, {
    databaseName: process.env.DATABASE_DB,
    collections: {
      Users: process.env.DATABASE_COLLECTION_NAUSERS ?? "naUsers",
      Accounts: process.env.DATABASE_COLLECTION_NAACCOUNTS ?? "naAccounts",
      Sessions: process.env.DATABASE_COLLECTION_NASESSIONS ?? "naSessions",
      VerificationTokens:
        process.env.DATABASE_COLLECTION_NAVERIFICATIONTOKENS ??
        "naVerificationTokens",
    },
  }),
}

export default NextAuth(authOptions)
