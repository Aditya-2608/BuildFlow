/**
 * Reusable utility to call a Gemini API endpoint with silent auto-retries and exponential backoff
 * when transient quota limits, token thresholds, or server errors are encountered.
 */
export async function callGeminiWithRetry(apiCall, maxRetries = 5, delay = 1500) {
  let currentDelay = delay;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await apiCall();
    } catch (error) {
      const errorMsg = error?.message?.toLowerCase() || "";
      const isRetriable =
        errorMsg.includes("quota") ||
        errorMsg.includes("rate limit") ||
        errorMsg.includes("429") ||
        errorMsg.includes("limit") ||
        errorMsg.includes("exhausted") ||
        errorMsg.includes("503") ||
        errorMsg.includes("500") ||
        errorMsg.includes("overloaded") ||
        errorMsg.includes("token");

      if (isRetriable && attempt < maxRetries) {
        console.warn(
          `Gemini API limit/overload hit (Attempt ${attempt}/${maxRetries}). Retrying in ${currentDelay}ms...`,
          error
        );
        await new Promise((resolve) => setTimeout(resolve, currentDelay));
        currentDelay *= 2; // Exponential backoff
        continue;
      }
      throw error;
    }
  }
}
