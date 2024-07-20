import { getSinglePage } from "@lib/contentParser";
import { slugify } from "./utils/textConverter";

export const getTaxonomy = (folder, name) => {
  const singlePages = getSinglePage(folder);
  const taxonomyPages = singlePages.map((page) => page.frontmatter[name]);
  let taxonomies = [];
  for (let i = 0; i < taxonomyPages.length; i++) {
    const categoryArray = taxonomyPages[i];
    if (Array.isArray(categoryArray)) {
      for (let j = 0; j < categoryArray.length; j++) {
        taxonomies.push(slugify(categoryArray[j]));
      }
    } else {
      console.warn(`Expected an array but got ${typeof categoryArray} for page index ${i}`);
    }
  }
  const taxonomy = [...new Set(taxonomies)];
  return taxonomy;
};
