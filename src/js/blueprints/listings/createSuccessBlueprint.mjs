/**
 * Creates HTML for a success message and link to a specific auction listing
 * @param {string} id ID of listing
 * @returns {HTMLElement} HTML for displaying for a success message and link
 * @example
 * ```js
 * const message = createSuccessBlueprint(id)
 * ```
 */
export default function createSuccessBlueprint(id) {
  const message = document.createElement("p");
  message.setAttribute("class", "m-0");
  message.innerText = "Your auction was successfully created!";

  const link = document.createElement("a");
  link.setAttribute("class", "fst-italic");
  link.setAttribute("href", `../listing/?id=${id}`);
  link.innerText = "View listing on the listing page >>";

  const feedback = document.createElement("div");
  feedback.setAttribute("class", `alert alert-success w-100`);
  feedback.setAttribute("role", "alert");
  feedback.append(message, link);
  return feedback;
}
