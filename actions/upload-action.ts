'use server';

import { generatesummaryfromOPENAI } from "@/lib/openai";
import { extractedpdf } from "@/lib/langchain";
import { generatesummaryfromGEMINI } from "@/lib/gemini";
import { auth } from "@clerk/nextjs/server";
import { getformattedfilename } from "@/utils/getfilename";
import { getData } from "@/lib/db";
import { revalidatePath } from "next/cache";

// Schema for user data
interface userSchema { 
  userId?: string;
  fileURL: string;
  summary: string;
  title: string;
  filename: string;
}

/**
 * Process uploaded PDF and generate a summary
 */
export async function getPDFSummary(uploadresponse: any) {
  // Validate upload response
  if (!uploadresponse) {
    return {
      success: false,
      message: "File Upload Failed",
      data: null
    };
  }
  
  // Extract file data from response
  const fileData = Array.isArray(uploadresponse) ? uploadresponse[0] : uploadresponse;
  if (!fileData || !fileData.serverData) {
    return {
      success: false,
      message: "File Upload Failed",
      data: null
    };
  }
  
  // Extract URL and name from server data
  const serverData = fileData.serverData;
  const { url: pdfURL, name: pdfNAME } = serverData;

  if (!pdfURL) {
    return {
      success: false,
      message: "File Upload Failed",
      data: null
    };
  }

  try {
    // Extract text content from PDF
    const pdfTEXT = await extractedpdf(pdfURL);
    let summary;
    
    // Try to generate summary with OpenAI first
    try {
      summary = await generatesummaryfromOPENAI(pdfTEXT);
      console.log("----summary----", summary);
    } catch (error) {
      console.log("Error generating summary:", error);
      
      // Fall back to Gemini if OpenAI fails
      if (error instanceof Error) {
        try {
          summary = await generatesummaryfromGEMINI(pdfTEXT);
        } catch (error) {
          console.log("Gemini API failed after OpenAI failed", error);
        }
      }
      
      // If both APIs failed, return error
      if (!summary) {
        return {
          success: false,
          message: "Could not generate summary",
          data: null
        };
      }
    }
    
    // Format filename and return success response
    const formattedFileName = getformattedfilename(pdfNAME) 
    return {
      success: true,
      message: "File Upload Success",
      data: {
        title: formattedFileName,
        summary,
      }
    };
  } catch (error) {
    // Handle any other errors in PDF processing
    console.log("PDF processing error:", error);
    return {
      success: false,
      message: "File Upload Failed",
      data: null
    };
  }
}

/**
 * Save PDF summary to database
 */
async function getsummaryofPDF({userId, fileURL, summary, title, filename}: userSchema) {
  try {
    // Get database connection
    const sql = await getData();
    
    // Insert summary into database
    const result = await sql`
      INSERT INTO pdf_summaries (
        user_id,
        original_file_url,
        summary_text,
        title,
        file_name
      ) VALUES (
        ${userId},
        ${fileURL},
        ${summary},
        ${title},
        ${filename}
      )
    `;
    
    return result; // Return the result of the SQL operation
  } catch (error) {
    console.log("Error saving PDF summary:", error);
    throw error;
  }
}

/**
 * Server action to store PDF summary
 */
export async function storePDFsummaryAction({fileURL, summary, title, filename}: Omit<userSchema, 'userId'>) {
  let savedPDFsummary: any;
  
  try {
    // Get authenticated user ID
    const { userId } = await auth();

    // Check if user is authenticated
    if (!userId) {
      return {
        success: false,
        message: "User not authenticated",
      };
    }   

    // Save summary to database
    savedPDFsummary = await getsummaryofPDF({
      userId,
      fileURL, 
      summary, 
      title,
      filename,
    });

    // Check if save was successful
    if (!savedPDFsummary) {
      return {
        success: false,
        message: "Could not save PDF summary",
      };
    }
    
    // Return success response
   

  } catch (error) {
    // Handle errors
    return {
      success: false, 
      message: error instanceof Error ? error.message : "Error saving PDF summary",
    };
  }

  // Revalidate cache
  revalidatePath(`/summaries/${savedPDFsummary.id}`)
   return {
      success: true, 
      message: "PDF summary saved successfully",
      data: { 
        id : savedPDFsummary.id,

      }
    };
}
