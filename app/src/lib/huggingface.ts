/**
 * AI Image Generation Utility
 * Uses Pollinations.ai for reliable, free, key-less generation
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
    '3d': 'digital art, 3d render, octane render, highly detailed, cinematic',
    'photorealistic': 'photorealistic, professional photography, 8k, ultra-realistic',
    'anime': 'anime art style, vibrant colors, high resolution anime',
    'digital-art': 'digital art, creative illustration, trendy artstation',
    'oil-painting': 'oil painting, artistic brushwork, museum quality',
    'sketch': 'pencil sketch, hand-drawn art, detailed charcoal drawing',
};

export async function generateImage(
    options: GenerateImageOptions
): Promise<GenerateImageResult> {
    const { prompt, style = '3d' } = options;

    if (!prompt.trim()) {
        return { success: false, error: 'Prompt cannot be empty' };
    }

    try {
        const styleModifier = STYLE_MODIFIERS[style] || '';
        const enhancedPrompt = `${prompt.trim()}, ${styleModifier}`;

        const encodedPrompt = encodeURIComponent(enhancedPrompt);
        const seed = Math.floor(Math.random() * 1000000);

        // Direct URL for Pollinations.ai
        const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&seed=${seed}&nologo=true&model=flux`;

        return {
            success: true,
            imageUrl: imageUrl,
        };

    } catch (error) {
        console.error('AI Service Error:', error);
        return {
            success: false,
            error: 'Failed to connect to AI service.',
        };
    }
}
