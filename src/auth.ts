import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { sql } from '@vercel/postgres';

// compare to docs 
// review claude + my notes 
// review line by line 
// more typescript? 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ user }) {
      try {
        const result = await sql`
          INSERT INTO users (email, name, image_url)
          VALUES (${user.email}, ${user.name}, ${user.image})
          ON CONFLICT (email) 
          DO UPDATE SET name = ${user.name}, image_url = ${user.image}, updated_at = CURRENT_TIMESTAMP
          RETURNING id;
        `;
        user.id = result.rows[0].id;
        return true;
      } catch (error) {
        console.error("Error saving user to database:", error);
        return false;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        // fix this 
        session.user.id = token.userId;
      }
      return session;
    },
  },
})