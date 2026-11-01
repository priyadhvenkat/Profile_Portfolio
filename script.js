// Tab switching for the portfolio
document.addEventListener("DOMContentLoaded", function () {
    const tabs = document.querySelectorAll(".tab");
    const panels = document.querySelectorAll(".panel");
    const tabsBar = document.querySelector(".tabs-bar");

    function openTab(name, updateUrl) {
        const target = document.getElementById(name);
        if (!target || !target.classList.contains("panel")) return false;

        tabs.forEach(function (tab) {
            const isActive = tab.dataset.tab === name;
            tab.classList.toggle("active", isActive);
            tab.setAttribute("aria-selected", isActive ? "true" : "false");
            tab.tabIndex = isActive ? 0 : -1;
        });

        panels.forEach(function (panel) {
            const isActive = panel.id === name;
            panel.classList.toggle("active", isActive);
            panel.hidden = !isActive;
        });

        if (updateUrl) {
            history.replaceState(null, "", "#" + name);
        }
        return true;
    }

    tabs.forEach(function (tab, index) {
        tab.addEventListener("click", function () {
            openTab(tab.dataset.tab, true);
            tab.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
        });

        // Left/right arrow keys move between tabs
        tab.addEventListener("keydown", function (e) {
            let next = null;
            if (e.key === "ArrowRight") next = tabs[(index + 1) % tabs.length];
            if (e.key === "ArrowLeft") next = tabs[(index - 1 + tabs.length) % tabs.length];
            if (next) {
                e.preventDefault();
                next.focus();
                openTab(next.dataset.tab, true);
            }
        });
    });

    // Links in the top section (e.g. "Browse projects") open a tab and scroll to it
    document.querySelectorAll("[data-open]").forEach(function (link) {
        link.addEventListener("click", function (e) {
            if (openTab(link.dataset.open, true)) {
                e.preventDefault();
                tabsBar.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    // Open the right tab if the link has #projects, #contact, etc.
    const start = window.location.hash.replace("#", "");
    if (start) openTab(start, false);
});
