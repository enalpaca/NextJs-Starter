import NextAuth from "next-auth"
import AppleProvider from "next-auth/providers/apple"
import GoogleProvider from "next-auth/providers/google"
import EmailProvider from "next-auth/providers/email"
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  secret: process.env.SECRET,
  pages: {
    signIn: '/auth/signin',
    // signOut: '/auth/signout',
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  providers: [
    // OAuth authentication providers
    AppleProvider({
      clientId: process.env.APPLE_ID as string,
      clientSecret: process.env.APPLE_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    // Sign in with passwordless email link
    // EmailProvider({
    //     server: process.env.MAIL_SERVER,
    //     from: "<no-reply@example.com>",
    // }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const res = await fetch("localhost:3000/api/sendatalogin", {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" }
        })
        const user = await res.json()

        // If no error and we have user data, return it
        if (res.ok && user) {
          return user
        }
        // Return null if user data could not be retrieved
        return null
        // const USERS = [{
        //     id: "1",
        //     username: "DEF",
        //     name: "J Smith",
        //     email: "jsmith@example.com",
        //     password: "XYZ1",
        //     firstname: "Ellyah",
        //     lastname: "Nguyen",
        //     numberphone: "0385100218"
        // }, {
        //     username: "QWER",
        //     password: "ZXZC",
        //     firstname: "BUOI",
        //     lastname: "Pham",
        //     numberphone: "0385100219"
        // }, {
        //     username: "IPI",
        //     password: "GHJ",
        //     firstname: "CHUOI",
        //     lastname: "LE",
        //     numberphone: "0385100220"
        // }]

        // const user = USERS[0];

        // if (user) {
        //     // Any object returned will be saved in `user` property of the JWT
        //     return user
        // } else {
        //     // If you return null then an error will be displayed advising the user to check their details.
        //     return null

        //     // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        // }
      }
    }),
  ],
})