import { useMediaQuery } from "react-responsive";

const ResponsiveDesktop = ({ children = null, minWidth, maxWidth }) => {
  const query = {};
  if (minWidth) query.minWidth = minWidth;
  if (maxWidth) query.maxWidth = maxWidth;

  const matches = useMediaQuery(query);

  return matches ? children : null;
};

export default ResponsiveDesktop;
