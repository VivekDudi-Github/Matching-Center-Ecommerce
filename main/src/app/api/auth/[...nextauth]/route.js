import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers : [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt"
  },
  callbacks: {
    // fn runs every login
    async jwt({ token, user }) {
      if(user){
        token.user = user;
        
        let customer = await prisma.customer.findUnique({
          where: {
            email: user.email
          }
        })

        if(!customer){
          customer = await prisma.customer.create({
            data: {
              email: user.email,
              name: user.name,
              number: null,
              verified: false,
            }
          })
        }
        token.user.id = customer.id;
        token.user.number = customer.number;
      }
      return token;
    },
    // fn runs every session request
    async session({ session, token }) {
      if(session.user){
        session.user.id = token.user.id;
        session.user.number = token.user.number;
      } 
      return session;
    },
  },
};


const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };