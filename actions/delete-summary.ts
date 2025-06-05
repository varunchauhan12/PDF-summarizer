'use server';
import { currentUser } from "@clerk/nextjs/server";
import { getData } from "@/lib/db";
import { revalidatePath } from "next/cache";
export default async function deleteSummaryAction({ summaryId }: { summaryId: string }) {   
try {
    const sql = await getData();  
    const user = await currentUser();
    const userId = user?.id; 
    if (!user?.id) {
        throw new Error("User not authenticated");
    }
    const result = await sql`
    DELETE FROM pdf_summaries
    WHERE id = ${summaryId} AND user_id = ${userId}
    RETURNING id;`;
    if(result.length > 0 ){
        revalidatePath('/dashboard');
        return { success: true, message: "Summary deleted successfully." };
    }
    return { success: false, message: "Summary not found or you do not have permission to delete it." };
  
} catch (error) {
    console.error("Error deleting summary:", error);
    return { success: false, message: "An error occurred while deleting the summary." };
    
}
}