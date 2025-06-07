import { createContentLoader } from "vitepress";

const loader = createContentLoader("posts/*/index.md");

export default {
    ...loader,
};
