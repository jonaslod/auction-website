import blueprints from "../../blueprints/index.mjs";
import calculations from "../../calculations/index.mjs";
import storage from "../../storage/index.mjs";
import "../clearHTML/index.mjs";

/**
 * Populates profile page with information about the given profile
 * @param {*} profile Profile to render
 * @example
 * ```js
 * renderProfile(profile);
 * ```
 */
export default function renderProfile({ name, avatar, listings, bids }) {
  const container = document.querySelector("main");
  if (container) {
    container.clearHTML();

    document.title = `${name} | Electroneer`;

    const h1 = document.createElement("h1");
    h1.setAttribute("class", "m-0 text-center text-break");
    h1.innerText = name;

    const icon = document.createElement("img");
    icon.setAttribute("class", "mw-100 mh-100 d-block m-auto ");
    icon.setAttribute("alt", "Profile image");
    icon.src = avatar ? avatar : `/img/icons/profile-big.png`;
    const IconWrapper = document.createElement("div");
    IconWrapper.setAttribute("class", "icon-profile d-flex");
    IconWrapper.append(icon);
    const profileImage = document.createElement("div");
    profileImage.setAttribute(
      "class",
      "icon-profile-wrapper position-relative d-flex align-items-center justify-content-center m-auto"
    );
    profileImage.append(IconWrapper);

    const updateProfile = document.createElement("section");
    updateProfile.setAttribute("class", "maxw-650 mx-auto my-4 px-3");

    if (storage.get("name") == name) {
      profileImage.append(blueprints.editProfileIcon(updateProfile));
    }

    const banner = document.createElement("section");
    banner.setAttribute("class", "maxw-650 mx-auto");
    banner.append(profileImage, h1);
    const bannerWrapper = document.createElement("div");
    bannerWrapper.setAttribute(
      "class",
      "bg-primary profile-showcase d-flex align-items-center justify-content-center py-4 text-light"
    );
    bannerWrapper.append(banner);

    const listingsHeader = document.createElement("h2");
    listingsHeader.innerText = `Listings by ${name}`;

    const listingsShowcases = document.createElement("div");
    listingsShowcases.setAttribute(
      "class",
      "row row-cols-1 row-cols-sm-2 row-cols-md-3"
    );

    if (listings.length > 0) {
      listingsShowcases.append(...listings.map(blueprints.listingShowcase));
    } else {
      listingsShowcases.append(
        blueprints.feedback(`${name} has not made any listings.`, "info")
      );
    }

    const listingsWrapper = document.createElement("div");
    listingsWrapper.setAttribute(
      "class",
      "container-fluid my-5 maxw-650 mx-auto"
    );
    listingsWrapper.append(listingsHeader, listingsShowcases);

    const bidsHeader = document.createElement("h2");
    bidsHeader.innerText = `Bids by ${name}`;

    const bidsShowcases = document.createElement("div");
    bidsShowcases.setAttribute(
      "class",
      "row row-cols-1 row-cols-sm-2 row-cols-md-3"
    );

    if (bids.length > 0) {
      let bidsToFilter = [...bids];
      let filteredBids = [];
      while (bidsToFilter.length > 0) {
        const match = [...bidsToFilter].filter(
          (bid) => bid.listing.id == bidsToFilter[0].listing.id
        );
        const highestBid = calculations.highestBid(match);
        const { listing, ...bid } = match.find(
          (bid) => bid.amount == highestBid
        );
        listing["bids"] = [bid];
        filteredBids.push(listing);
        bidsToFilter = [...bidsToFilter].filter(
          (bid) => bid.listing.id !== listing.id
        );
      }
      bidsShowcases.append(...filteredBids.map(blueprints.listingShowcase));
    } else {
      bidsShowcases.append(
        blueprints.feedback(`${name} has not made any bids.`, "info")
      );
    }

    const bidsWrapper = document.createElement("div");
    bidsWrapper.setAttribute("class", "container-fluid my-5 maxw-650 mx-auto");
    bidsWrapper.append(bidsHeader, bidsShowcases);

    container.append(
      bannerWrapper,
      updateProfile,
      listingsWrapper,
      bidsWrapper
    );
  }
}
