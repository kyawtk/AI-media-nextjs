import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { connectToDataBase } from "@utils/database";
import User from "@models/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      //check if user exists
      //if exists do something
      try {
        await connectToDataBase();
        const userExits = await User.findOne({ email: profile.email });
        if (!userExits) {
          await User.create({
            username: profile.name.replace(" ", ""),
            email: profile.email,
            image: profile.picture,
          });
        }
        return true;
      } catch (err) {
        console.log("error checking if the user exitst", err);
      }

      //if not  create a new user
    },
    async session({ session }) {
      // store the user id from MongoDB to session
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();

      return session;
    },
  },
  secret: process.env.NEXT_PUBLIC_SECRET
});

export { handler as GET, handler as POST };
