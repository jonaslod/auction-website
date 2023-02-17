import calculations from "../calculations/index.mjs";

/**
 * Creates HTML for a bid in the bid history
 * @param {*} bid Bid information
 * @returns {*} HTML for displaying a bid in the bid history
 * @example
 * ```js
 * const bid = blueprints.bid(details);
 * ```
 */
export default function bid({ bidderName, amount, created }) {
  const biddingInfo = document.createElement("span");
  biddingInfo.setAttribute("class", "");
  biddingInfo.innerText = `${bidderName} bids ${amount}`;
  const bidIcon = document.createElement("img");
  bidIcon.setAttribute("class", "w-100 d-block m-auto");
  bidIcon.setAttribute("alt", "Number of credits in bid");
  bidIcon.src = "../img/icons/tokens-black.png";
  const bicIconWrapper = document.createElement("span");
  bicIconWrapper.append(bidIcon);
  bicIconWrapper.setAttribute("class", "icon-product ms-2");
  const biddingInfoWrapper = document.createElement("p");
  biddingInfoWrapper.setAttribute("class", "m-0 d-flex align-items-center");
  biddingInfoWrapper.append(biddingInfo, bicIconWrapper);

  const timeIcon = document.createElement("img");
  timeIcon.setAttribute("class", 'w-100 d-block m-auto"');
  timeIcon.setAttribute("alt", "Time since bid");
  timeIcon.src = "../img/icons/time-left.png";
  const timeIconWrapper = document.createElement("span");
  timeIconWrapper.setAttribute("class", "icon-product me-2");
  timeIconWrapper.append(timeIcon);
  const timeSince = document.createElement("span");
  timeSince.innerText = calculations.timeBetween(created, true);
  const timeSinceWrapper = document.createElement("p");
  timeSinceWrapper.setAttribute(
    "class",
    "m-0 d-flex align-items-center number-of-days-left"
  );
  timeSinceWrapper.append(timeIconWrapper, timeSince);

  const bidPadding = document.createElement("div");
  bidPadding.setAttribute("class", "pb-1");
  bidPadding.append(biddingInfoWrapper, timeSinceWrapper);

  const bid = document.createElement("div");
  bid.setAttribute(
    "class",
    "d-flex align-items-center border-dark border-2 border-bottom col-12 col-sm-6 pb-3 mb-3"
  );
  bid.append(bidPadding);

  return bid;
}
