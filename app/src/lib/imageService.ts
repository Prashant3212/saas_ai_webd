/**
 * AI Image Generation Utility
 * Uses Hugging Face Inference API via Vite Proxy to bypass CORS
 */

export interface GenerateImageOptions {
    prompt: string;
    style?: string;
}

export interface GenerateImageResult {
    success: boolean;
    imageUrl?: string;
    error?: string;
}

const STYLE_MODIFIERS: Record<string, string> = {
    '3d': 'digital art, 3d render, octane render, highly detailed, cinematic lighting',
    'photorealistic': 'photorealistic, professional photography, 8k, ultra-realistic',
    'anime': 'anime art style, vibrant colors, high resolution anime, studio ghibli style',
    'digital-art': 'digital art, creative concept art, trending on artstation',
    'oil-painting': 'oil painting, classic artistic brushwork, museum quality',
    'sketch': 'pencil sketch, hand-drawn art, detailed charcoal drawing',
};

export async function generateImage(
    options: GenerateImageOptions
): Promise<GenerateImageResult> {
    const { prompt, style = '3d' } = options;

    // Hardcoded as requested so your .env file stays exactly how you need it!
    const HF_TOKEN = import.meta.env.VITE_HUGGINGFACE_API_KEY;

    if (!prompt.trim()) {
        return { success: false, error: 'Prompt cannot be empty' };
    }

    try {
        console.log("Requesting image via Vite Proxy...");

        const styleModifier = STYLE_MODIFIERS[style] || '';
        const enhancedPrompt = `${prompt.trim()}, ${styleModifier}`;

        // Notice we are using our local proxy '/hf-api' instead of the full URL!
        // This completely bypasses the browser's CORS block.
        const response = await fetch(
            "/hf-api/models/stabilityai/stable-diffusion-xl-base-1.0",
            {
                headers: {
                    "Authorization": `Bearer ${HF_TOKEN}`,
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({ inputs: enhancedPrompt }),
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Hugging Face API Error:", errorData);

            // Hugging Face sometimes needs 10-20 seconds to load the free model into memory
            if (errorData.error && errorData.error.includes("is currently loading")) {
                return {
                    success: false,
                    error: `The AI is waking up (Wait ${Math.round(errorData.estimated_time || 20)}s). Please click generate again!`,
                };
            }

            throw new Error(`Status: ${response.status}`);
        }

        const blob = await response.blob();
        const localImageUrl = URL.createObjectURL(blob);

        console.log("Image generated safely!");

        return {
            success: true,
            imageUrl: localImageUrl,
        };

    } catch (error) {
        console.error('Hugging Face Service Error:', error);
        return {
            success: false,
            error: 'Failed to generate image. Please try again.',
        };
    }
}
