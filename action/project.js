import { auth } from "@clerk/nextjs/server";

export async function createProject(data) {
    const {userId,orgId} = await auth();
    if(!userId){
        throw new Error("Unauthorized");
    }

    if(!orgId){
        throw new Error("Organization not found")
    }

    const { data: membership } =
     await clerkClient().organizations.getOrganizationMembershipList({
         organizationId: organization.id,
         }); 
    const userMembership = membership.find(
         (member) => member.publicUserData.userId === userId 
        );
    
    if(!userMembership){
        throw new Error("User is not a member of the organization")
    }

    try{
        const project = await db.project.create({
            data: {
                name: data.name,
                key: data.key,
                description: data.description,
                organizationId: orgId,
            },
        });
        return project;
    }catch(error){
        throw new Error("Error creating project:"+ error.message);
    }
}