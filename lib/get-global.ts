import { query } from "./strapi";

// Tipos exportados
export type SocialLinks = {
  facebookUrl: string;
  instagramUrl: string;
  // Se elimina twitterUrl
  tiktokUrl: string;
  youtubeUrl: string;
  whatsappUrl: string;
};

export type SeoImage = {
  url: string;
};

export type DefaultSeo = {
  metaTitle: string;
  metaDescription: string;
  shareImage?: SeoImage;
  // Se eliminan twitterTitle, twitterDescription y twitterImage
};

export type GlobalData = {
  siteName: string;
  siteDescription: string;
  favicon?: SeoImage;
  defaultSeo: DefaultSeo;
  socialLinks: SocialLinks;
};

export async function getGlobal(): Promise<GlobalData> {
  const res = await query(
    "global?populate[defaultSeo][populate][]=shareImage&populate[socialLinks]=*"
  );

  if (!res?.data) {
    throw new Error('Failed to fetch global data: API response invalid');
  }

  // Como la API devuelve los datos directamente en data, se asigna:
  const attributes = res.data;

  if (!attributes?.defaultSeo || !attributes?.socialLinks) {
    throw new Error('Global data structure is invalid');
  }

  // Versión mejorada de getImageUrl que soporta dos posibles estructuras:
  const getImageUrl = (imageData: any) => {
    if (!imageData) return undefined;
    // Si viene en la estructura anidada:
    if (imageData.data && imageData.data.attributes && imageData.data.attributes.url) {
      return imageData.data.attributes.url;
    }
    // Si viene de forma plana:
    if (imageData.url) {
      return imageData.url;
    }
    return undefined;
  };

  const favicon = getImageUrl(attributes.favicon);
  const shareImage = getImageUrl(attributes.defaultSeo.shareImage);
  // Se elimina twitterImage

  return {
    siteName: attributes.siteName || '',
    siteDescription: attributes.siteDescription || '',
    favicon,
    defaultSeo: {
      metaTitle: attributes.defaultSeo.metaTitle || '',
      metaDescription: attributes.defaultSeo.metaDescription || '',
      shareImage,
    },
    socialLinks: {
      facebookUrl: attributes.socialLinks.facebookUrl || '',
      instagramUrl: attributes.socialLinks.instagramUrl || '',
      // Se elimina twitterUrl
      tiktokUrl: attributes.socialLinks.tiktokUrl || '',
      youtubeUrl: attributes.socialLinks.youtubeUrl || '',
      whatsappUrl: attributes.socialLinks.whatsappUrl || '',
    },
  };
}
