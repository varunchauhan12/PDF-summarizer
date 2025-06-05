import { getData } from './db';

export async function getSummaries(userId: string) {
  const sql = await getData();
  const summaries = await sql`
    SELECT * 
    FROM pdf_summaries 
    WHERE user_id = ${userId} 
    ORDER BY created_at DESC
  `;
  return summaries;
} 

export default async function getSummarybyId(id: string) {
  try {
    const sql = await getData();
    const [summary] = await sql`
      SELECT 
        id,
        user_id,
        title,
        original_file_url,
        summary_text,
        status,
        created_at,
        updated_at,
        file_name,
        (LENGTH(summary_text) - LENGTH(REPLACE(summary_text, ' ', '')) + 1) as word_count
      FROM pdf_summaries 
      WHERE id = ${id} 
      ORDER BY created_at DESC
    `;
    return summary;
  } catch (error) {
    return null;
  }
}


export async function getuploadcount(userId:string) {
  const sql = await getData();
  try {
    const [result] = await sql`
      SELECT COUNT(*)  as count FROM pdf_summaries WHERE user_id = ${userId}
    `;
    
    return result?.count;
  } catch (error) {
    console.error('Error fetching upload count:', error);
    return 0;
  }

  
}