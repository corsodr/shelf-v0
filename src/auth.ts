import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { sql } from '@vercel/postgres';

// change this to get user id and add it to JWT 
// confirm this is a good approach - compare to docs + examples 
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
        return true;
      } catch (error) {
        console.error("Error saving user to database:", error);
        return false;
      }
    },
  },
})

