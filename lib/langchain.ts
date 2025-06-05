import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';

export async function extractedpdf(fileUrl: string) {
  const response = await fetch(fileUrl);
  const blob = await response.blob();

  const arrayBuffer = await blob.arrayBuffer();

  const loader = new PDFLoader(new Blob([arrayBuffer]));

  const docs = await loader.load();
  
  // Combine all pages
  return docs.map((doc) => doc.pageContent).join('\n');
}
