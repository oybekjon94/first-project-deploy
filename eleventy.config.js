import fs from "node:fs";
import Image from "@11ty/eleventy-img";
import markdownIt from "markdown-it";

const markdown = markdownIt();

export default function (eleventyConfig) {
    // Files copied to the site as-is (no processing)
    eleventyConfig.addPassthroughCopy("src/assets/css");
    eleventyConfig.addPassthroughCopy("src/assets/js");
    eleventyConfig.addPassthroughCopy("src/assets/images/profile.jpg");
    eleventyConfig.addPassthroughCopy("src/assets/images/case-studies");
    eleventyConfig.addPassthroughCopy("src/mockchi-bola.html");
    eleventyConfig.addPassthroughCopy("src/uzbrainai.html");
    eleventyConfig.ignores.add("src/mockchi-bola.html");
    eleventyConfig.ignores.add("src/uzbrainai.html");

    // Projects: one Markdown file each in src/projects, sorted by `order`
    eleventyConfig.addCollection("projects", (collectionApi) =>
        collectionApi
            .getFilteredByGlob("src/projects/*.md")
            .sort((a, b) => a.data.order - b.data.order)
    );

    // Blog posts: one Markdown file each in src/blog, newest first
    eleventyConfig.addCollection("posts", (collectionApi) =>
        collectionApi.getFilteredByGlob("src/blog/*.md").sort((a, b) => b.date - a.date)
    );

    // Journal chapters (photos + text): one Markdown file each in src/journal, by "order" (1 = first chapter on top)
    eleventyConfig.addCollection("journal", (collectionApi) =>
        collectionApi.getFilteredByGlob("src/journal/*.md").sort((a, b) => (a.data.order || 0) - (b.data.order || 0))
    );

    // One post page per language for every blog post
    eleventyConfig.addCollection("postPages", (collectionApi) =>
        collectionApi
            .getFilteredByGlob("src/blog/*.md")
            .sort((a, b) => b.date - a.date)
            .flatMap((post) => ["en", "ko"].map((lang) => ({ lang, post })))
    );

    // Markdown text from front matter (e.g. a post body) → HTML
    eleventyConfig.addFilter("markdown", (text) => markdown.render(text || ""));

    // "18 Oct 2026" / "2026년 10월 18일"
    eleventyConfig.addFilter("formatDate", (date, lang) => {
        if (lang === "ko") {
            return new Intl.DateTimeFormat("ko-KR", { dateStyle: "long" }).format(date);
        }
        const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(date);
        return `${date.getDate()} ${month} ${date.getFullYear()}`;
    });

    // First n items of a list
    eleventyConfig.addFilter("limit", (items, n) => items.slice(0, n));

    // One detail page per language for every project with `detail: true`
    eleventyConfig.addCollection("projectPages", (collectionApi) =>
        collectionApi
            .getFilteredByGlob("src/projects/*.md")
            .filter((project) => project.data.detail)
            .flatMap((project) => ["en", "ko"].map((lang) => ({ lang, project })))
    );

    // Wraps `phrase` inside `text` with <mark> (for the highlighted part of a title)
    const escapeHtml = (text) =>
        String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    eleventyConfig.addFilter("highlight", (text, phrase) => {
        const safeText = escapeHtml(text);
        if (!phrase || !text.includes(phrase)) return safeText;
        return safeText.replace(escapeHtml(phrase), `<mark>${escapeHtml(phrase)}</mark>`);
    });

    // The next n projects after the current one (in `order`), wrapping around; for "Next case studies"
    eleventyConfig.addFilter("nextProjects", (projects, slug, n) => {
        const i = projects.findIndex((p) => p.fileSlug === slug);
        return [...projects.slice(i + 1), ...projects.slice(0, Math.max(i, 0))].slice(0, n);
    });

    // Projects shown on the home page (`featured: true`)
    eleventyConfig.addFilter("featured", (projects) => projects.filter((p) => p.data.featured));

    // Projects in one category ("all" = every project)
    eleventyConfig.addFilter("inCategory", (projects, key) =>
        key === "all" ? projects : projects.filter((p) => p.data.categories.includes(key))
    );

    // Responsive, compressed images: {% image "src/...png", "alt text", "(min-width: 768px) 50vw, 100vw" %}
    // An empty path (e.g. a blog post without a cover) renders nothing
    eleventyConfig.addAsyncShortcode("image", async (src, alt, sizes = "100vw") => {
        if (!src || src.endsWith("/")) return "";

        const metadata = await Image(src, {
            widths: [640, 1024, 1600],
            formats: ["webp", "jpeg"],
            outputDir: "_site/assets/img/",
            urlPath: "/assets/img/",
            fixOrientation: true, // phone photos: apply the EXIF rotation (e.g. upside-down shots)
        });

        return Image.generateHTML(metadata, {
            alt,
            sizes,
            loading: "lazy",
            decoding: "async",
        });
    });

    // Small icon, built into the HTML (no extra file to load): {% icon "l:mic" %}
    //   l:<name> = Lucide line icon (lucide-static), s:<slug> = Simple Icons brand logo (simple-icons),
    //   c:<name> = our own drawing (below), for icons the packages do not have.
    const ownIcons = {
        // LinkedIn (older Lucide brand icon, ISC)
        linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
        // Adobe XD: rounded square with "Xd"
        adobexd: '<rect x="2" y="3" width="20" height="18" rx="3"/><path d="m6 8 4 8"/><path d="m10 8-4 8"/><circle cx="15" cy="13.5" r="2.5"/><path d="M17.5 8v8"/>',
        // Basketball
        basketball: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2v20"/><path d="M4.9 4.9a10 10 0 0 1 0 14.2"/><path d="M19.1 4.9a10 10 0 0 0 0 14.2"/>',
    };
    const lineSvg = (inner) =>
        `<svg class="icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`;

    eleventyConfig.addShortcode("icon", (name = "") => {
        const [set, id] = name.split(":");
        if (!id) return "";
        try {
            if (set === "c") return ownIcons[id] ? lineSvg(ownIcons[id]) : "";
            if (set === "l") {
                const svg = fs.readFileSync(`node_modules/lucide-static/icons/${id}.svg`, "utf8");
                const inner = svg.slice(svg.indexOf(">", svg.indexOf("<svg")) + 1, svg.lastIndexOf("</svg>")).trim();
                return lineSvg(inner);
            }
            if (set === "s") {
                const svg = fs.readFileSync(`node_modules/simple-icons/icons/${id}.svg`, "utf8");
                const inner = svg.replace(/^.*?<\/title>/, "").replace(/<\/svg>\s*$/, "");
                return `<svg class="icon icon-brand" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">${inner}</svg>`;
            }
        } catch (e) {
            console.warn(`[icon] not found: ${name}`);
        }
        return "";
    });

    // URL of a large version of an image, for "click to enlarge": {% imageUrl "src/...png" %}
    eleventyConfig.addAsyncShortcode("imageUrl", async (src) => {
        if (!src || src.endsWith("/")) return "";

        const metadata = await Image(src, {
            widths: [2400],
            formats: ["webp"],
            outputDir: "_site/assets/img/",
            urlPath: "/assets/img/",
            fixOrientation: true, // phone photos: apply the EXIF rotation (e.g. upside-down shots)
        });

        return metadata.webp[0].url;
    });

    return {
        dir: {
            input: "src",
            output: "_site",
        },
        htmlTemplateEngine: "njk",
        markdownTemplateEngine: "njk",
    };
}
