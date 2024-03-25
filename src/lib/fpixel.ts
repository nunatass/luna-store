export const fbPixelId = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID as string;

export const pageview = () => {
  window.fbq('track', 'PageView');
};

export const event = (name: string, options = {}) => {
  window.fbq('track', name, options);
};
