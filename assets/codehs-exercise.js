(function() {
    (function addTopNavigation() {
        var main = document.querySelector("main");
        
        
        var codehsIndex = ["1-2-5","1-2-6","1-2-7","1-2-8","1-2-9","1-3-5","1-3-8","1-3-9","1-4-6","1-4-7","1-4-8","1-5-5","1-5-6","1-6-4","1-6-5","1-6-6","1-7-11","1-7-4","1-7-5","1-7-8","10-1-6","10-1-7","10-1-8","10-1-9","10-2-6","10-2-7","10-2-8","10-3-6","10-3-7","10-3-8","10-3-9","2-1-8","2-1-9","2-10-6","2-10-7","2-10-8","2-2-6","2-2-7","2-2-8","2-2-9","2-3-10","2-3-7","2-3-8","2-3-9","2-4-5","2-4-6","2-4-7","2-4-8","2-5-5","2-5-7","2-5-8","2-5-9","2-6-6","2-6-7","2-6-8","2-7-7","2-7-8","2-7-9","2-8-10","2-8-6","2-8-7","2-8-8","2-8-9","2-9-6","2-9-7","2-9-8","3-1-6","3-1-7","3-1-8","3-2-6","3-2-7","3-2-8","3-2-9","3-3-5","3-3-6","3-3-7","3-3-8","3-4-6","3-4-7","3-4-8","3-4-9","3-5-6","3-5-7","3-5-8","3-5-9","3-6-5","3-6-6","3-6-7","3-7-10","3-7-7","3-7-9","4-1-6","4-1-7","4-1-8","4-1-9","4-2-10","4-2-6","4-2-7","4-2-8","4-2-9","4-3-10","4-3-6","4-3-7","4-3-8","4-3-9","4-4-6","4-4-7","4-4-8","4-5-7","5-1-4","5-1-5","5-1-6","5-2-5","5-2-6","5-2-7","5-2-8","5-3-5","5-3-6","5-3-7","5-3-8","5-4-5","5-4-6","5-4-7","5-5-5","5-5-6","5-5-7"/*,"5-6-5","5-6-6","5-6-7","5-7-5","5-7-6","5-7-7","5-8-7","5-8-8","5-8-9","5-9-5","5-9-6","5-9-7","6-1-6","6-1-7","6-1-8","6-1-9","6-2-10","6-2-7","6-2-8","6-2-9","6-3-6","6-3-7","6-3-8","6-3-9","6-4-6","6-4-7","6-4-8","7-1-7","7-1-8","7-2-6","7-2-7","7-2-8","7-2-9","7-3-6","7-3-8","7-3-9","7-4-6","7-4-7","7-4-8","7-4-9","7-5-6","7-5-7","7-6-10","7-6-4","7-6-9","8-1-5","8-1-6","8-1-7","8-2-7","8-2-8","9-1-6","9-1-7","9-1-8","9-1-9","9-2-6","9-2-7","9-2-8","9-2-9","9-3-6","9-3-7","9-3-8","9-4-6","9-4-7","9-4-8","9-4-9","9-5-6","9-5-7","9-5-8","9-5-9","9-6-6","9-6-7","9-6-8","9-6-9","9-7-6","9-7-7","9-7-8","9-7-9"*/];
        
        var self = /\d-\d-\d/.exec(location.pathname)[0];
        
        var selfIndex = codehsIndex.indexOf(self);
        
        var navContainer = document.createElement("div");
        navContainer.classList.add("assignment-navigation");
        
        var previous = codehsIndex[selfIndex - 1];
        var beforeLink = document.createElement(previous ? "a" : "span");
        beforeLink.textContent = "Previous: " + (previous||"").replace(/-/g, ".");
        beforeLink.href = previous;
        navContainer.appendChild(beforeLink);
        
        var bull = document.createElement("span");
        bull.innerHTML = "&nbsp;&bull;&nbsp;";
        bull.classList.add("assignment-navigation--bullet");
        navContainer.appendChild(bull);
    
        var next = codehsIndex[selfIndex + 1];
        var nextLink = document.createElement(next ? "a" : "span");
        nextLink.textContent = "Next: " + (next||"unavailable").replace(/-/g, ".");
        nextLink.href = next;
        navContainer.appendChild(nextLink || "");
        
        main.insertBefore(navContainer, main.firstElementChild);
    })();
    
    
    
    var editors = [];
    var editorsParent, editorsTablist, selectedTab, editorsTabsEmptyState;

    (function createTabsParent() {
        var main = document.querySelector("main");

        var editorsTablistParent = document.createElement("div");
        editorsTablistParent.classList.add("editor-tabs--grandparent")

        editorsTablist = document.createElement("div");
        editorsTablist.classList.add("editor-tabs--tablist")
        editorsTablist.setAttribute("role", "tablist");
        editorsTablistParent.appendChild(editorsTablist);

        editorsParent = document.createElement("div");
        editorsParent.classList.add("editor-tabs--parent");
        editorsParent.innerHTML = `<div class="editor-tabs--emptystate"><h2>Nothing open!</h2><p>Select a file in the top to open it.</p></div>`;
        editorsTabsEmptyState = editorsParent.children[0];
        editorsTablistParent.appendChild(editorsParent);

        main.appendChild(editorsTablistParent);
    })();

    for (var i = 0; ; i++) {
        var source = document.getElementById("source" + (i || ""));
        if (source != null) editors.push(makeEditor(source, i));
        else break;
    }

    editorsTablist.lastElementChild.click();

    function loadCodeIntelligence(override) {
        if(navigator.connection || override) {
            if (
                override ||
                ((navigator.connection.type != "bluetooth" && navigator.connection.type != "cellular") &&
                !navigator.connection.saveData)
            ) {
                for(var i = 0; i < editors.length; i++) {
                    (function() {
                        var editor = editors[i];
                        if(editor.onLoadCodeIntelligence) requestAnimationFrame(function() {
                            editor.onStartLoadingCodeIntelligence();
                        });
                    })()
                }
                loadDep(["java-parser.js", "ast-tools.js"], ["explainer.js"], function() {
                    requestAnimationFrame(startCodeIntelligence);
                });
                showAlert({
                    text: "Loading Code Intelligence...",
                    stopTimeout: true,
                    inProgress: true
                });
            } else {
                showAlert({
                    text: `Because you are in Data Saver mode, Code Intelligence will not be loaded.`,
                    stopTimeout: true,
                    color: "war",
                    exitButton: true,
                    actions: [
                        {
                            text: "Download Anyway",
                            action: function() {
                                loadCodeIntelligence(true);
                            }
                        }
                    ]
                });
            }
        } else {
            showAlert({
                text: `There was a problem automatically detecting your connection info. Would you like to load Code Intelligence? These files are rather large (285kb), so we recommend that you not download on cell data.`,
                stopTimeout: true,
                color: "war",
                exitButton: true,
                actions: [
                    {
                        text: "Always Download",
                        action: function() {
                            localStorage.setItem("override-data-saver", "1")
                            loadCodeIntelligence(true);
                        }
                    },
                    {
                        text: "Download",
                        action: function() {
                            loadCodeIntelligence(true);
                        }
                    }
                ]
            });
        }
    }

    loadCodeIntelligence(+localStorage.getItem("override-data-saver"));

    function startCodeIntelligence() {
        showAlert({
            text: "Code Intelligence is loaded!",
            duration: 800
        });
        for(var i = 0; i < editors.length; i++) {
            if(editors[i].onLoadCodeIntelligence) editors[i].onLoadCodeIntelligence();
        }
    }

    function makeEditor(source, editorIndex) {
        editorIndex = +editorIndex;
        source.classList.add("lang-java");

        var sourceContent = source.textContent;
        var sourceLinesHtml = source.innerHTML.split("\n");

        var table = makeNumberedLinesTable(sourceLinesHtml);
        

        var parent = document.createElement("div");
        parent.classList.add("code-with-lines--parent");
        parent.appendChild(table);

        var loader = document.createElement("div");
        loader.classList.add("code-with-lines--load-box");
        parent.appendChild(loader);

        //we'll add the SVG after the loader is attached, because it doesn't like it if we don't
        
        var border = document.createElement("div");
        border.classList.add("code-with-lines--border-parent");
        border.appendChild(parent);

        var tabTitle = document.createElement("button");
        var titleRegexp = (/public\s+class\s+(\w+)/).exec(source.textContent);
        var fileName = titleRegexp ? titleRegexp[1] + ".java" : source.textContent.substring(0, 32).replace(/\n/g, " ") + "...";
        tabTitle.innerHTML = `<span>${encodeCharacterEntities(fileName)}</span>`

        source.style.display = "none";
        appendTab(tabTitle, border);

        loader.innerHTML = `<h3>Conducting static code analysis. Just a second.</h3><svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.0" width="64px" height="64px" viewBox="0 0 128 128" xml:space="preserve"><g><path d="M75.4 126.63a11.43 11.43 0 0 1-2.1-22.65 40.9 40.9 0 0 0 30.5-30.6 11.4 11.4 0 1 1 22.27 4.87h.02a63.77 63.77 0 0 1-47.8 48.05v-.02a11.38 11.38 0 0 1-2.93.37z" fill="#ffffff" fill-opacity="1"/><animateTransform attributeName="transform" type="rotate" from="0 64 64" to="360 64 64" dur="1800ms" repeatCount="indefinite"></animateTransform></g></svg>`;

        function onStartLoadingCodeIntelligence() {
            this.table.hidden = true;
            this.parent.classList.add("code-with-lines--loading");
        }

        var onLoadCodeIntelligence = function(parse) { 
            var ed = this;

            try {
                executeDependencyFunction("java-parser.js", "parse", [sourceContent], function(ast) {
                    window.ast = ast;
                    executeDependencyFunction("ast-tools.js", "astToString", [ast, {colorize: true}], function(astSource) {
                        makeNumberedLinesTable(astSource.split("\n"), ed.table);
                        explainEditor(ed);
                        
                        ed.table.hidden = false;
                        ed.parent.classList.remove("code-with-lines--loading");
                    });
                });
            } catch(e) {
                showAlert({
                    text: `Error in activating Code Intelligence on ${fileName}.`,
                    exitButton: true
                });
                return;
            }

            
        }

        var result = {
            parent: parent,
            source: sourceContent,
            index: editorIndex,
            table: table,
            file: fileName,
            lines: sourceLinesHtml
        };

        result.onLoadCodeIntelligence = onLoadCodeIntelligence.bind(result);
        result.onStartLoadingCodeIntelligence = onStartLoadingCodeIntelligence.bind(result);

        return result;
    }

    function appendTab(tab, tabpanel) {
        var generatedId = "tab-" + (Math.round(Math.random() * 100)) + "-" + editorsParent.children.length;
        
        tab.id = generatedId;
        tabpanel.id = generatedId + "-panel";

        tab.setAttribute("tabindex", "0");
        tab.setAttribute("aria-controls", generatedId + "-panel");
        tab.setAttribute("aria-selected", "false");
        tab.setAttribute("role", "tab");

        tab.addEventListener("click", function() {
            if(editorsTabsEmptyState) {
                editorsParent.removeChild(editorsTabsEmptyState);
                editorsTabsEmptyState = undefined;
            }
            if(selectedTab) {
                selectedTab.setAttribute("aria-selected", "false");

                var selectedTabpanel = document.getElementById(selectedTab.getAttribute("aria-controls"));
                selectedTabpanel.setAttribute("hidden", "true");
                selectedTabpanel.setAttribute("aria-hidden", "true");
            }

            tabpanel.removeAttribute("hidden");
            tabpanel.setAttribute("aria-hidden", "false");
            tab.setAttribute("aria-selected", "true");
            selectedTab = tab;
        });

        editorsTablist.appendChild(tab);

        tabpanel.setAttribute("aria-hidden", "true");
        tabpanel.setAttribute("aria-labelledby", generatedId);
        tabpanel.setAttribute("role", "tabpanel");
        tabpanel.setAttribute("hidden", "true");

        editorsParent.appendChild(tabpanel);
    }

    function makeNumberedLinesTable(htmlLines, table) {
        if(table === undefined) table = document.createElement("table");
        while(table.children[0]) table.removeChild(table.children[0]);
        table.classList.add("code-with-lines");

        var paddingToRemove = Infinity;
        var firstContentLine = 0;
        for (var i = 0; i < htmlLines.length; i++) {
            var len = /^\s*/.exec(htmlLines[i])[0].length;
            if(i == firstContentLine) htmlLines[i] = htmlLines[i].trim();
            if(len == htmlLines[i].length) firstContentLine++;
            
            if(len > 0) paddingToRemove = Math.min(paddingToRemove, len-2);
        }
        paddingToRemove=0;

        for (var i = 0; i < htmlLines.length; i++) {
            var line = document.createElement("tr");

            var lineNum = document.createElement("th");
            var numSpan = document.createElement("span");
            numSpan.textContent = (i + 1);
            lineNum.appendChild(numSpan);
            line.appendChild(lineNum);

            var lineContent = document.createElement("td");
            var lcCode = document.createElement("code");
            lcCode.innerHTML = htmlLines[i].substring(paddingToRemove);

            var indentLevel = /^\s*/.exec(lcCode.innerHTML)[0].length;
            lcCode.style.textIndent = -1 * indentLevel + "ch";
            lcCode.style.paddingInlineStart = indentLevel + "ch";

            lineContent.appendChild(lcCode);
            line.appendChild(lineContent);

            table.appendChild(line);
        }

        return table;
    }

    function showAlert(opts) {
        if (opts === undefined) opts = {};
        var colors = {
            "suc": "#92D190",
            "err": "#DD8B8B",
            "war": "#FAB28E"
        };
        var elem = document.createElement("div");

        document.querySelectorAll(".alert").forEach(x => {
            x.parentElement.removeChild(x);
        });

        elem.classList.add("alert");
        if(opts.inProgress) elem.classList.add("progress")
        elem.style.borderColor = colors[opts.color] || colors.suc;
        elem.style.cursor = "default";

        elem.innerText = (opts.text || "");

        var snackbarActions = document.createElement("div");
        snackbarActions.classList.add("snackbar-actions");
        if (opts.actions) {
            for (let i = 0; i < opts.actions.length; i++) {
                let buttonElem = document.createElement("button");
                buttonElem.innerText = opts.actions[i].text;
                buttonElem.onclick = opts.actions[i].action;
                snackbarActions.appendChild(buttonElem);
            }
        }

        if (opts.exitButton) {
            let exitElem = document.createElement("button");
            exitElem.innerHTML = "Close" || opts.exitText;
            exitElem.onclick = function () {
                elem.parentElement.removeChild(elem);
            };
            snackbarActions.appendChild(exitElem);
        } else {
            elem.onclick = function () {
                elem.parentElement.removeChild(elem);
            };
        }

        elem.appendChild(snackbarActions);

        document.body.appendChild(elem);

        if (!opts.stopTimeout) {
            setTimeout(function () {
                try { elem.parentElement.removeChild(elem); } catch (e) { }
            }, opts.duration || 3000);
        }
    }

    function encodeCharacterEntities(str) {
        return str.replace(/&/g, "&amp;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&apos;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
    }
})();