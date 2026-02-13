/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Utility to extract text from PDF and DOCX files using browser-side libraries.
 * Assumes pdfjs-dist and mammoth are loaded via CDN in index.html.
 */

declare const pdfjsLib: any;
declare const mammoth: any;

export async function extractTextFromFile(file: File): Promise<string> {
    const extension = file.name.split('.').pop()?.toLowerCase();

    if (extension === 'pdf') {
        return extractTextFromPDF(file);
    } else if (extension === 'docx' || extension === 'doc') {
        return extractTextFromDOCX(file);
    } else if (extension === 'txt') {
        return await file.text();
    } else {
        throw new Error('Unsupported file type');
    }
}

async function extractTextFromPDF(file: File): Promise<string> {
    try {
        const arrayBuffer = await file.arrayBuffer();

        // Initialize PDF.js
        if (typeof pdfjsLib === 'undefined') {
            throw new Error('PDF.js library not loaded in index.html');
        }

        // Set worker source
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        let fullText = '';

        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items.map((item: any) => item.str).join(' ');
            fullText += pageText + '\n';
        }

        return fullText;
    } catch (error) {
        console.error('Error parsing PDF:', error);
        throw new Error('Failed to parse PDF resume');
    }
}

async function extractTextFromDOCX(file: File): Promise<string> {
    try {
        const arrayBuffer = await file.arrayBuffer();

        if (typeof mammoth === 'undefined') {
            throw new Error('Mammoth.js library not loaded in index.html');
        }

        const result = await mammoth.extractRawText({ arrayBuffer });
        return result.value || '';
    } catch (error) {
        console.error('Error parsing DOCX:', error);
        throw new Error('Failed to parse Word resume');
    }
}
