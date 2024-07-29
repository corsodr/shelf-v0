import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { sql } from '@vercel/postgres';

// review how true and false how are used 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    // does it make sense to run this function every time someone signs in?
    // should I use account and profile? 
    async signIn({ user, account, profile }) {
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

// add more db user operations if needed