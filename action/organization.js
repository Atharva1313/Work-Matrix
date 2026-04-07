"use server"

import { db } from "@/lib/prisma";
import { auth, clerkClient, createClerkClient } from "@clerk/nextjs/server";

export async function getOrganization(slug){
    // checking if user is logged in (auth() is async in server actions)
    const { userId } = await auth();
    if (!userId) {
        throw new Error("Unauthorized");
    }

    //if user exist in our dbase or not

    const user=await db.user.findUnique({
        where:{clerkUserId: userId}
    });

    if(!user){
        throw new Error("user not found");
    }

    // org details from Clerk
    const client = await clerkClient();
    const organization = await client.organizations.getOrganization({ slug });

    if (!organization) {
        return null;
    }

    // check if user is a member of the org
    const { data: membership } =
    await client.organizations.getOrganizationMembershipList({
        organizationId: organization.id,
    });

  const userMembership = membership.find(
    (member) => member.publicUserData.userId === userId
  );

    if (!userMembership) {
        return null;
    }

    return organization;

}