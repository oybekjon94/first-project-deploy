// Build environment. Vercel sets VERCEL=1 when it builds the site,
// so things like analytics only run on the live site (not on localhost).
export default {
    vercel: process.env.VERCEL === "1",
};
