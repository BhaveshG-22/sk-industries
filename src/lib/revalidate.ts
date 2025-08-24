import { revalidatePath } from 'next/cache';

/**
 * Triggers revalidation of key pages when product data changes
 */
export function revalidateProductPages() {
  try {
    // Revalidate pages that display product data
    revalidatePath('/');           // Homepage
    revalidatePath('/demo');       // Demo page
    revalidatePath('/categories'); // Categories page
    revalidatePath('/products');   // Products page (if exists)
    
    console.log('✅ Revalidated product pages');
  } catch (error) {
    console.error('❌ Failed to revalidate pages:', error);
  }
}

/**
 * Triggers revalidation via API call (useful for external triggers)
 */
export async function triggerRevalidation(paths: string[] = ['/demo', '/', '/categories']) {
  try {
    const baseUrl = process.env.NEXTAUTH_URL || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3007';
    const secret = process.env.REVALIDATION_SECRET;

    const response = await fetch(`${baseUrl}/api/revalidate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${secret}`
      },
      body: JSON.stringify({ paths })
    });

    if (response.ok) {
      const result = await response.json();
      console.log('✅ Triggered revalidation via API:', result);
      return result;
    } else {
      console.error('❌ Failed to trigger revalidation:', response.statusText);
    }
  } catch (error) {
    console.error('❌ Error triggering revalidation:', error);
  }
}