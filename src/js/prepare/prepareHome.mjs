import listings from "../api/listings/index.mjs";
import listeners from "../listeners/index.mjs";
import blueprints from "../blueprints/index.mjs";
import render from "../render/index.mjs";
import validation from "../validation/index.mjs";
import "../render/clearHTML/index.mjs";

/**
 * Prepares the home page CTA and auction listings for rendering, and sets event listener for filtering auction listings
 * @example
 * ```js
 * prepareHome();
 * ```
 */
export default async function prepareHome() {
  try {
    const isLoggedIn = await validation.loggedIn();
    render.createCTA(isLoggedIn);

    const auctions = await listings.getAll();

    if (!auctions) {
      throw blueprints.error("Could not get auctions from database");
    }

    render.showcases([...auctions]);
    listeners.filterAuctions([...auctions]);
  } catch (error) {
    const container = document.getElementById("listings-wrapper");
    if (container) {
      container.clearHTML();

      if (error.isCustomError) {
        container.append(blueprints.feedback(error.message, "warning"));
      } else {
        container.append(
          blueprints.feedback(
            "Something went wrong when rendering the home page"
          )
        );
      }
    }
  }
}
