const axios = require('axios');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Generate manga-style image using Hugging Face API
 * @param {string} prompt - Text prompt for image generation
 * @returns {Promise<string>} - URL of the generated image
 */
const generateMangaImage = async (prompt, retries = 3) => {
  try {
    if (!process.env.HUGGING_FACE_API_KEY || !process.env.HUGGING_FACE_MODEL) {
      throw new Error('Hugging Face API configuration missing');
    }

    // Optimize prompt for animagine-xl-3.1
    const optimizedPrompt = `manga style, black and white, ${prompt}, monochrome, ink drawing`;
    
    let lastError;
    for (let i = 0; i < retries; i++) {
      try {
        const response = await axios({
          url: `https://api-inference.huggingface.co/models/${process.env.HUGGING_FACE_MODEL}`,
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
            'Content-Type': 'application/json',
          },
          data: {
            inputs: optimizedPrompt,
            parameters: {
              guidance_scale: 7.0,
              num_inference_steps: 20,
              width: 512,
              height: 768,
              negative_prompt: "lowres, bad anatomy, text, error"
            }
          },
          responseType: 'arraybuffer',
          timeout: 60000, // 60 second timeout
        });
        
        // If we get here, the request was successful
        const base64Image = Buffer.from(response.data).toString('base64');
        return `data:image/jpeg;base64,${base64Image}`;
      } catch (error) {
        lastError = error;
        
        // If it's a timeout or server error, wait and retry
        if (error.response && [500, 502, 504].includes(error.response.status)) {
          const waitTime = Math.pow(2, i) * 2000; // Exponential backoff starting at 2 seconds
          await sleep(waitTime);
          continue;
        }
        
        // For other errors, throw immediately
        throw error;
      }
    }
    
    // If we get here, all retries failed
    throw lastError || new Error('Failed to generate image after all retries');
  } catch (error) {
    console.error('Error generating image:', error);
    throw new Error(`Failed to generate image: ${error.message}`);
  }
};

/**
 * Process a story into manga panels
 * @param {string} story - The story to convert to manga
 * @returns {Promise<Array>} - Array of panel objects with images
 */
const processStoryToManga = async (story) => {
  try {
    // Split story into segments for panels
    const storySegments = story.split(/[.!?]+/).filter(segment => segment.trim().length > 0);
    
    // Generate panels sequentially to avoid overwhelming the API
    const panels = [];
    for (let i = 0; i < Math.min(storySegments.length, 5); i++) {
      const segment = storySegments[i].trim();
      
      try {
        const imageUrl = await generateMangaImage(segment);
        panels.push({
          imageUrl,
          order: i + 1,
          prompt: segment
        });
        
        // Wait a bit between panels to avoid rate limiting
        if (i < Math.min(storySegments.length, 5) - 1) {
          await sleep(1000);
        }
      } catch (error) {
        console.error(`Failed to generate panel ${i + 1}:`, error);
        throw error;
      }
    }
    
    return panels;
  } catch (error) {
    console.error('Error processing story to manga:', error);
    throw new Error('Failed to process story to manga');
  }
};

module.exports = {
  generateMangaImage,
  processStoryToManga
}; 