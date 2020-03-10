import { useMediaQuery } from "react-responsive"

const MEDIA_QUERY_SIZES = {
  small: 500,
  medium: 750,
  large: 1150,
}

export const useResponsive = (size) => {
  const query = MEDIA_QUERY_SIZES[size];

  if (!query) {
    throw new Error(`size "${size}" is not a valid size`);
  }

  return useMediaQuery({ query })
}