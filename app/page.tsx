// The default home page renders the US landing. The India landing is
// archived in /_archive-in/ and not part of the routing tree.
// Geo middleware redirects GCC visitors to /ae before this renders.
export { default } from "./us/page";
