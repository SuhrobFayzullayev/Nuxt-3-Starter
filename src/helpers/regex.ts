export const decimalRegex = /^\d*\.?\d*$/;

export const youtubeIframeRegex =
  /<iframe\s+[^>]*src="(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:embed\/|v\/|watch\?v=)|youtu\.be\/)([a-zA-Z0-9_-]+)(?:\?[^"]+)?"[^>]*><\/iframe>/;

// #map
export const googleMapRegex =
  /<iframe\s+.*?src=["']https:\/\/www\.google\.com\/maps\/embed\?.+?["'].*?>.*?<\/iframe>/;

export const yandexMapRegex =
  /<iframe\s+.*?src=["']https:\/\/www\.yandex\.uz\/maps\/embed\?.+?["'].*?>.*?<\/iframe>/;
