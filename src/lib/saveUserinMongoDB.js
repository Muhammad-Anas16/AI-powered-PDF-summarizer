import { currentUser } from "@clerk/nextjs/server";
import { connectDB } from "./db";
import User from "@/models/User";

const saveUserinMongoDB = async () => {
    try {
        const user = await currentUser();

        if (!user) {
            console.log("⚠️ No user found");
            return null;
        }

        await connectDB();

        let alreadyHaveUser = await User.findOne({ clerkId: user.id });

        if (alreadyHaveUser) {
            console.log("✅ User already exists in DB");
            return alreadyHaveUser;
        }

        alreadyHaveUser = new User({
            clerkId: user.id,
            email: user.emailAddresses[0].emailAddress,
            firstName: user.firstName,
            lastName: user.lastName,
            imageUrl: user.imageUrl,
        });

        await alreadyHaveUser.save();
        console.log("✅ User saved to MongoDB");

        return alreadyHaveUser;
    } catch (error) {
        console.error("❌ Error in saveUserinMongoDB:", error);
        return null;
    }
};

export { saveUserinMongoDB };