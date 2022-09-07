import NextAuth from "next-auth"; // Next auth
import TwitterProvider from "next-auth/providers/twitter"; // Twitter provider

export default NextAuth({
  providers: [
    // Twitter OAuth provider
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID!,
      clientSecret: process.env.TWITTER_CLIENT_SECRET!,
      // version: "2.0",
    }),
  ],
  // Custom page:
  pages: {
    // On error, throw to home
    error: "/",
  },
  // Use JWT
  session: {
    strategy: "jwt",
    // 30 day expiry
    maxAge: 30 * 24 * 60 * 60,
    // Refresh JWT on each login
    updateAge: 0,
  },
  jwt: {
    // JWT secret
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  callbacks: {
    // On signin + signout
    async jwt({token, user, account, profile}) {
      // Check if user is signing in (versus logging out)
      const isSignIn = user ? true : false;

      // If signing in
      if (isSignIn) {
        // Attach additional parameters (twitter id + handle + anti-bot measures)
        console.log("jwt-token:",token);
        console.log("jwt-user:",user);
        console.log("jwt-account",account);
        console.log("jwt-profile",profile);
        token.twitter_id = account?.providerAccountId;
        token.twitter_handle = profile?.screen_name;
        token.twitter_num_tweets = profile?.statuses_count;
        token.twitter_num_followers = profile?.followers_count;
        token.twitter_created_at = profile?.created_at;
      }

      // Resolve JWT
      return Promise.resolve(token);
      },
      // On session retrieval
      async session({session, token, user})  {
        // Attach additional params from JWT to session
        console.log("session-session",session);
        console.log("session-token:",token);
        console.log("session-user:",user);
        session.twitter_id = token.twitter_id;
        session.twitter_handle = token.twitter_handle;
        session.twitter_num_tweets = token.twitter_num_tweets;
        session.twitter_num_followers = token.twitter_num_followers;
        session.twitter_created_at = token.twitter_created_at;
        console.log("session-session",session);
        
        // Resolve session
        return Promise.resolve(session);
      },
  },
});
