(function () {
  function safeText(value) {
    return typeof value === "string" ? value.trim() : "";
  }

  function linkHtml(link) {
    const label = safeText(link && link.label);
    const url = safeText(link && link.url);
    if (!label || !url) return "";
    return '<a href="' + url + '" target="_blank" rel="noopener noreferrer">' + label + "</a>";
  }

  function renderItem(pub) {
    const title = safeText(pub.title) || "Untitled";
    const authors = safeText(pub.authors);
    const venue = safeText(pub.venue);
    const year = safeText(String(pub.year || ""));
    const month = safeText(pub.month);
    const abstractText = safeText(pub.abstract);
    const links = Array.isArray(pub.links) ? pub.links.map(linkHtml).filter(Boolean) : [];

    const metaParts = [venue, month, year].filter(Boolean);
    const meta = metaParts.join(" | ");

    let html = '<li class="publication-item">';
    html += '<span class="publication-title">' + title + "</span>";

    if (authors) {
      html += '<p class="publication-authors">' + authors + "</p>";
    }

    if (meta) {
      html += '<p class="publication-meta">' + meta + "</p>";
    }

    if (abstractText || links.length) {
      html += '<div class="publication-actions">';
      if (abstractText) {
        html += "<details><summary>Abs</summary>";
        html += '<div class="publication-abstract">' + abstractText + "</div>";
        html += "</details>";
      }
      if (links.length) {
        html += links.join("");
      }
      html += "</div>";
    }

    html += "</li>";
    return html;
  }

  function groupByYear(publications) {
    const groups = new Map();

    publications.forEach(function (pub) {
      const normalizedYear = Number.parseInt(pub.year, 10);
      const key = Number.isFinite(normalizedYear) ? String(normalizedYear) : "Other";

      if (!groups.has(key)) {
        groups.set(key, []);
      }
      groups.get(key).push(pub);
    });

    return Array.from(groups.entries()).sort(function (a, b) {
      if (a[0] === "Other") return 1;
      if (b[0] === "Other") return -1;
      return Number(b[0]) - Number(a[0]);
    });
  }

  function renderPublications(container, publications) {
    if (!publications.length) {
      container.innerHTML = '<p class="small">No publications listed yet. Add items in <code>/assets/publications.json</code>.</p>';
      return;
    }

    const grouped = groupByYear(publications);
    const hideOtherYearHeader = grouped.length === 1 && grouped[0][0] === "Other";
    const html = grouped
      .map(function (entry) {
        const year = entry[0];
        const items = entry[1];
        const yearHeader = hideOtherYearHeader ? "" : '<h3 class="publication-year">' + year + "</h3>";
        return yearHeader + '<ol class="publication-items">' + items.map(renderItem).join("") + "</ol>";
      })
      .join("");

    container.innerHTML = html;
  }

  function init() {
    const container = document.getElementById("publication-list");
    if (!container) return;

    fetch("/assets/publications.json")
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Failed to load publication data");
        }
        return response.json();
      })
      .then(function (data) {
        const publications = Array.isArray(data) ? data : [];
        renderPublications(container, publications);
      })
      .catch(function () {
        container.innerHTML = '<p class="small">Could not load publications data from <code>/assets/publications.json</code>.</p>';
      });
  }

  init();
})();
