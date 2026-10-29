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
        });

        return Image.generateHTML(metadata, {
            alt,
            sizes,
            loading: "lazy",
            decoding: "async",
        });
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
