# Roo Code Research Mode with Perplexity & Lynx

This repository contains the code for a custom Roo Code mode ("ResearchMode") that integrates Perplexity API for web search and Lynx for page analysis, enabling autonomous research-augmented software engineering within the Roo Code VS Code extension.

-By @https://x.com/JamesCherished

## Table of Contents

- [Features](#features)
- [Quick Start: Automated Setup with Roo, nothing simpler!](#quick-start-automated-setup-with-roo)
	- [Demo](#demo)
	  	- [Details](#details)
- [Usage](#usage)
- [Manual Installation / Troubleshooting](#manual-installation--troubleshooting)
  - [1. Prerequisites](#1-prerequisites)
  - [2. Clone & Install](#2-clone--install)
  - [3. Configure API Key](#3-configure-api-key)
  - [4. Configure Roo Code Manually](#4-configure-roo-code-manually)
  - [5. Restart VS Code](#5-restart-vs-code)
  - [6. Manual Server Start (If Automatic Fails)](#6-manual-server-start-if-automatic-fails)
        - [Full `custom_modes.json` Snippet (for Manual Setup)](#full-custom_modesjson-snippet-for-manual-setup)
- [FAQ](#faq)
- [Contributing](#contributing)
- [Credits](#credits)
- [License (MPL 2.0)](#license)

## Features

*   **Perplexity Integration:** Uses the Perplexity API (via a local MCP server) for high-quality, up-to-date web search results using the `sonar` model.
	* About $0.01 per search. You get $5 of monthly free credits with Perplexity Pro, which is enough for intensive use. You can monitor and set limits at https://www.perplexity.ai/account/api
*   **Lynx Integration:** Leverages the Lynx text-based browser for deep page analysis, code extraction, and documentation summarization directly within Roo Code.
*   **Research-Augmented Coding:** Designed for software engineers to seamlessly blend coding tasks with research, using findings to inform code generation, refactoring, and technical decisions.
*   **Caching:** Includes simple file-based caching (`cache.json`) for Perplexity results to conserve API credits and improve response times.
*   **Configurable:** Uses a `.env` file for secure API key management.
*   **Automatic Server Management:** Designed for Roo Code to automatically start and manage the local MCP server once configured.

## Quick Start: Automated Setup with Roo

The easiest way to set up ResearchMode is to let Roo configure it for you!

You can copy the Custom Mode prompt from the custom-mode-prompt.md file of this repo or from section 6  [Full `custom_modes.json` Snippet (for Manual Setup)](#full-custom_modesjson-snippet-for-manual-setup) of this README. Running any task in Research Mode programs Roo to check your workspace and set its own research capabilities autonomously for the first-time use.

Alternatively, you can start a new task with the prompt below in any mode to set up everything, **including the creating of the Custom Mode** :).
### Demo


![Demo Setup](./DemoScreenshots/DemoSetup.gif)

### Details :

(Replace URL with https://github.com/James-Cherished/rooresearcher.git for experimental releases, or with your fork's URL)

1. **Start Roo Code in ResearchMode with any task OR start a new task in any mode with the following prompt to create it:**

    ```
        Task: Configure and activate the ResearchMode from this repository.

        Steps:
        1.  Clone the Repository & Install Dependencies:
            ```bash
            git clone https://github.com/James-Cherished-Inc/roo-research-mode # Or your fork's URL
            cd rooresearcher
            npm install
            ```
        2. Verify prerequisites: Check if Node.js (v14+), npm, and Lynx are installed and available in the system PATH. If Lynx is missing, attempt to install it using the appropriate command for the OS (e.g., `sudo apt update && sudo apt install lynx -y` for Debian/Ubuntu).
        3. API Key Setup: Check if a `.env` file exists. If not, copy `.env.example` to `.env`. Ask me for my Perplexity API key (obtainable from https://www.perplexity.ai/settings/api) and update the `PERPLEXITY_API_KEY` value in the `.env` file.
        4. Roo Code Configuration:
            a. Determine the absolute path to the `index.js` file in the current workspace (`rooresearcher`).
            b. Read the Roo Code MCP settings file (e.g., `~/.config/Code/User/globalStorage/rooveterinaryinc.roo-cline/settings/mcp_settings.json`, or `~/.config/VSCodium/User/globalStorage/rooveterinaryinc.roo-cline/settings/mcp_settings.json` if the user uses VSCodium). Add or update the `perplexity-search` entry within `mcpServers`, ensuring the `args` contains the correct absolute path to `index.js`.
            c. Read the Roo Code custom modes file (e.g., `~/.config/Code/User/globalStorage/rooveterinaryinc.roo-cline/settings/custom_modes.json`). Add or update the `research-mode` definition using the JSON snippet provided in this repository's README.md (section: Manual Installation / Troubleshooting).
        Note: You might need my approval to edit the Roo Code configuration files (`mcp_settings.json`, `custom_modes.json`) as they are located outside the current workspace. Please request permission before applying changes to these files.
        5. Make the script executable:
            ```bash
            chmod +x index.js
            ```
        6.  Final Instructions: Inform me that the setup is complete and that I probably need to restart VS Code for the changes to take effect.
    ```

2.  **Follow Roo's Instructions:** Roo will guide you through the process, asking for your API key and confirmation to edit global configuration files.

Once Roo confirms the setup is complete, restart VS Code. ResearchMode should now be available, and the MCP server should start automatically.

---
## Usage

Once set up and the MCP server is running (ideally automatically), activate "ResearchMode" in Roo Code. You can now perform tasks like:

*   **Code with Research:**
    *   "Refactor this Python function to use async/await. Search for best practices first."
        *   This task demonstrates how to use ResearchMode to find best practices for refactoring code. Roo will search for relevant articles and documentation, and then suggest code changes based on the research findings.
*   **Targeted Research:**
    *   "Find examples of Rust's `Result` type used with file I/O."
        *   This task shows how to use ResearchMode to find specific examples of code usage. Roo will search for code snippets and examples that demonstrate how to use the `Result` type with file I/O in Rust.
*   **Documentation Analysis:**
    *   "Summarize the main points of the Lynx man page using `lynx -dump 'man:lynx'`."
        *   This task illustrates how to use ResearchMode to analyze documentation. Roo will use Lynx to extract the text content of the man page and then summarize the main points.
*   **Code Extraction:**
    *   "Search for a JavaScript debounce function example and extract the code from the top result."
        *   This task demonstrates how to use ResearchMode to find and extract code from web pages. Roo will search for a JavaScript debounce function example and then extract the code from the top result.
*   **Iterative Development:**
    *   Roo will use research findings to suggest code, which you can then refine together. Roo is also instructed to document the influence of research in comments or docs.
        *   This highlights the iterative nature of ResearchMode. Roo will continuously learn from your feedback and refine its suggestions over time.
    **CLI tool:** You can use the `node ./index.js` command to query the Perplexity API directly from the command line for simple queries.

    *   First, make the script executable: `chmod +x index.js`
    *   Then, run the command: `node ./index.js --query "your search query"`

    For more complex queries, or as a fallback when the MCP connection is broken, you can use POST requests to the MCP server. To do this, use the `curl` command with the following format:
        `curl -X POST -H "Content-Type: application/json" -d '{"query": "your search query"}' http://localhost:3000/`


Here are some additional examples:

*   **Finding vulnerabilities:** "Find common vulnerabilities in web applications and how to prevent them."
*   **Learning new frameworks:** "Find a tutorial on how to use React hooks for state management."
*   **Debugging code:** "Explain this error message: `TypeError: Cannot read property 'length' of undefined`."
*   **Optimizing performance:** "Find ways to optimize the performance of this JavaScript code."
---
## Manual Installation / Troubleshooting

If you prefer to configure manually or encounter issues with the automated setup:

### 1. Prerequisites
Ensure the following are installed:
    *   [Roo Code VS Code extension](https://marketplace.visualstudio.com/items?itemName=rooveterinaryinc.roo-cline).
    *   [Node.js](https://nodejs.org/) (v14+) & npm (`node -v`, `npm -v`). Install if needed (e.g., `sudo apt update && sudo apt install nodejs npm -y` on Debian/Ubuntu).
    *   [Lynx](https://lynx.invisible-island.net/) text browser (`lynx --version`). Install if needed. Here are some instructions for installing Lynx on different operating systems:
        *   **Debian/Ubuntu:** `sudo apt update && sudo apt install lynx -y`
        *   **macOS:** `brew install lynx` (requires Homebrew)
        *   **Windows:** Download the Lynx binary from a trusted source and add it to your system's PATH.
    *   A [Perplexity API key](https://www.perplexity.ai/settings/api).

### 2. Clone & Install
    ```bash
    git clone https://github.com/James-Cherished-Inc/roo-research-mode # Or your fork's URL
    cd rooresearcher
    npm install
    ```
(Replace URL with https://github.com/James-Cherished/rooresearcher.git for experimental releases, or with your fork's URL)

### 3. Configure API Key
    *   `cp .env.example .env`
    *   Edit `.env` and add your Perplexity API key.

### 4. Configure Roo Code Manually
    *   **Find Config Files:** Locate Roo Code's settings directory:
        *   Linux: `~/.config/Code/User/globalStorage/rooveterinaryinc.roo-cline/settings/`
        *   macOS: `~/Library/Application Support/Code/User/globalStorage/rooveterinaryinc.roo-cline/settings/`
        *   Windows: `%APPDATA%\Code\User\globalStorage\rooveterinaryinc.roo-cline\settings\`
    *   **Edit `mcp_settings.json`:** This file configures the MCP servers that Roo Code uses to communicate with external services. Add the `perplexity-search` server entry, ensuring you use the **correct absolute path** to `index.js`.
        ```json
        // Inside mcp_settings.json -> mcpServers object
        "perplexity-search": {
          "command": "node",
          "args": ["/full/absolute/path/to/your/rooresearcher/index.js"], // <-- CHANGE THIS
          "env": {}
        }
        ```
        *(If the file or `mcpServers` object doesn't exist, create them)*
        *   The `command` field specifies the command to run the server.
        *   The `args` field specifies the arguments to pass to the command. **Make sure to replace `/full/absolute/path/to/your/rooresearcher/index.js` with the actual absolute path to the `index.js` file in your `rooresearcher` directory.**
        *   The `env` field specifies any environment variables to set for the server.
    *   **Edit `custom_modes.json`:** This file defines the custom modes that are available in Roo Code. Add the `research-mode` definition to the `customModes` array.
        ```json
        // Inside custom_modes.json -> customModes array
        {
          "slug": "research-mode",
          "name": "ResearchMode",
          "roleDefinition": "You are Roo, a highly skilled software engineer and researcher...", // Full definition below
          "customInstructions": // Full instructions below
          "groups": ["read", "edit", "command", "browser", "mcp"],
          "source": "global"
        }
        ```
        *(See full JSON snippets below if needed)*
        *   The `slug` field specifies the unique identifier for the mode.
        *   The `name` field specifies the display name for the mode.
        *   The `roleDefinition` field specifies the role definition for the mode.
        *   The `customInstructions` field specifies the custom instructions for the mode.
        *   The `groups` field specifies the permissions for the mode.
        *   The `source` field specifies the source of the mode definition.

### 5. Restart VS Code
Restart VS Code completely after saving configuration changes.

### 6. Manual Server Start (If Automatic Fails)
    *   If Roo Code doesn't start the server automatically (check Roo Code logs or try using the mode), you can run it manually from the `rooresearcher` directory:
        ```bash
        node index.js
        ```
    *   Keep the terminal running. If this works, the issue is likely the absolute path configured in `mcp_settings.json`.
    *   Consider using `pm2` or `systemd` for persistent background execution if desired.


#### Full `custom_modes.json` Snippet (for Manual Setup)

```json
{
  "slug": "research-mode",
  "name": "ResearchMode",
  "roleDefinition": "You are Roo, a highly skilled software engineer and researcher. Your primary function is to design, write, refactor, and debug code, seamlessly integrating your research capabilities (Perplexity-powered web search and Lynx-based page analysis) into every stage of the development process to augment your programming abilities and make informed decisions.\\nYou automatically:\\n1. Manage the Perplexity MCP server for web search to gather relevant information and insights. \\n2. Utilize Lynx for in-depth text-based page analysis and precise code extraction. \\n3. Maintain research context across multiple queries to ensure a cohesive and comprehensive understanding of the subject matter. \\n4. Meticulously document all research influences in project files.\\n5. Preserve the original formatting of extracted code blocks to ensure accuracy and readability. \\n6. Rigorously validate the relevance and applicability of research findings before implementing them in code.\\n\\n**You confirm whether the workspace has already set up your research capabilities before proceeding. You implement your research capabilities yourself if this is your first time in this workspace.**\\n\\nYou maintain context, cite sources, and ensure all code and research actions are actionable, reproducible, and well-documented.",
  "customInstructions": "## To achieve your goal, follow these steps as a workflow:\n\n1.  **Initiate Research:**\n    a.  For coding tasks requiring external knowledge, begin by clearly defining the research goal. Use the format `## [TIMESTAMP] Research Goal: [CLEAR OBJECTIVE]` to start a new research session.\n    b.  Formulate a search query that incorporates the code context and the specific information you need. Be as precise as possible to narrow down the results.\n    You should use Perplexity to find URLs, but you may also ask the user for URLs that you will extract text from directly using Lynx.\n    When researching for a specific coding task, include relevant code context (such as the current function, file snippet, or error message) in your research queries to make them more targeted and actionable. \n\n\n2.  **Execute Web Search with Perplexity to find sources:**\n    a.  You can use the `node ./index.js` command to query the Perplexity API directly from the command line. This is a CLI command and should be run in the terminal. Use the following format:\n        `node ./index.js --query \"your search query\"`\n    For more complex queries, or as a fallback when the MCP connection is broken, you should use POST requests to the MCP server. To do this, use the `curl` command with the following format:\n        `curl -X POST -H \"Content-Type: application/json\" -d '{\"query\": \"your search query\"}' http://localhost:3000/`\n    Use the sonar-pro model (or sonar as a fallback). Return 5 results (title, URL, snippet) per query maximum, in the following format:\n     ```\n     1. [Title](URL): Brief snippet\n     2. [Title](URL): Brief snippet\n     ```\n\tb.  Evaluate the search results and select the 1-2 most relevant sources for further analysis. Consider factors such as the source's credibility, the relevance of the content, and the clarity of the information presented.\n\n\n3.  **Analyze Sources with Lynx:**\n    a.  Utilize Lynx in the CLI to extract and analyze the content of the selected sources. Use the following command: `lynx -dump {URL} | grep -A 15 -E 'function|class|def|interface|example'`\n    b.  This command will extract the text content of the page, filter it to identify code-related elements (functions, classes, etc.), and display the surrounding context.\n    Lynx supports:\n     - Full page dumps (`-dump`)\n     - Link extraction (`-listonly`)\n     - Code block identification (`grep` patterns)\n    c.  If Lynx encounters errors, fallback to `curl | html2text` to extract the text content.\n    d. Summarize the most important points in a few key sentences.\n\n4.  **Extract Code Blocks:**\n    a.  Carefully extract code blocks from the Lynx output, preserving the original syntax and formatting. This ensures that the code can be easily integrated into the project. You should use:  `lynx -dump {URL} | grep -A 10 \"import\\|def\\|fn\\|class\"`\n    b.  Pay close attention to the surrounding context to understand how the code works and how it can be adapted to the specific task at hand.\n\n5.  **Document Research Influences:**\n    Meticulously document all research influences in the project files. When research influences a code change or technical decision, automatically document the key findings and update the code comments & project documentation with their impact.\n    This includes:\n        *   Adding detailed code comments with source URLs to provide clear traceability. Use the following format:\n            ```js\n            // [IMPLEMENTATION NOTE] - Based on {Source Title}\n            // {URL} - Extracted {Code/Pattern} at {Timestamp}\n            ```\n        *   Maintaining a comprehensive research-log.md file (chronological record) to track research progress and findings.\n        *   Creating and maintaining a well-organized technical\_decisions.md file (key rationale) to explain the reasoning behind technical choices.\n\n6.  **Integrate Code:**\n    a.  Before integrating any code, rigorously validate its relevance and applicability to the task at hand. Ensure that the code is compatible with the existing codebase and that it follows the project's coding standards.\n    b.  Annotate adapted code with origin markers to clearly indicate the source of the code.\n    c.  Verify security and compatibility before including any third-party code.\n\n7.  **Handle Errors:**\n    a.  If the Perplexity API fails, retry the request once after 5 seconds. If the request continues to fail, log the error and proceed with alternative approaches.\n    b.  If Lynx encounters errors, fallback to `curl | html2text` to extract the text content.\n    c.  If a cache miss occurs, proceed with a fresh search.\n\n8.  **Optimize Performance:**\n    a.  Cache frequent queries to reduce API usage and improve response times.\n    b.  Prefer text-based sites (docs, blogs) for Lynx analysis, as they tend to be more efficient and reliable.\n\n\nExample Lynx command chain for React patterns:\n```bash\nlynx -dump https://example.com/react-best-practices | \\\n  grep -i -A 20 'component structure' | \\\n  sed '/Advertisement/d; /Related links/d'\n```\n\n---"
  "groups": [
    "read",
    "edit",
    "command",
    "browser",
    "mcp"
  ],
  "source": "global" // Or set to "workspace" if preferred
}
```

---

## FAQ

Here are some frequently asked questions about ResearchMode:

*   **How do I configure the Perplexity API key?**
    *   You can configure the Perplexity API key by editing the `.env` file in the project root directory. Add your API key to the `PERPLEXITY_API_KEY` variable.
*   **How do I troubleshoot common errors?**
    *   If you encounter any errors, please check the Roo Code logs for more information. You can also try restarting the MCP server or VS Code.
*   **How do I optimize performance?**
    *   You can optimize performance by caching frequent queries and by preferring text-based sites (docs, blogs) for Lynx analysis.
*   **Why is Lynx not working?**
    *   Ensure that Lynx is installed correctly and is available in your system's PATH. You can test this by running `lynx --version` in your terminal.
*   **How do I update the `roleDefinition` and `customInstructions`?**
    *   Edit the `custom_modes.json` file in Roo Code's settings directory. The location of this directory depends on your operating system. See the "Manual Installation / Troubleshooting" section for more information.
*   **How do I add screenshots or GIFs to the `README.md` file?**
    *   You can add screenshots or GIFs to the `README.md` file by using Markdown syntax. Simply upload the image to a web server and then use the following syntax: `![Alt text](URL to image)`

---

## Contributing


This is a FOSS project, made possible by Roo Code. Please feel free to share your work or contribute to this repo!

We welcome contributions to this project! If you have any ideas for new features, bug fixes, or improvements, please feel free to submit a pull request.

Here are some guidelines for contributing:

*   **Bug Reports:** If you find a bug, please submit a detailed bug report that includes steps to reproduce the bug, the expected behavior, and the actual behavior.
*   **Feature Requests:** If you have an idea for a new feature, please submit a feature request that describes the feature in detail and explains why it would be a valuable addition to the project.
*   **Code Contributions:** If you want to contribute code, please follow these steps:
    1.  Fork the repository.
    2.  Create a new branch for your changes.
    3.  Make your changes and commit them with clear and concise commit messages.
    4.  Submit a pull request to the main branch.

Please ensure that your code follows the project's coding standards and that it includes appropriate unit tests.

We appreciate your contributions!

---

## Credits

This project would not have been possible without the following tools and libraries:

*   **Perplexity API:** For providing high-quality web search results.
*   **Lynx:** For providing a text-based browser for page analysis.
*   **Roo Code:** For providing a platform for building and running custom code modes.

We would like to thank the developers of these tools and libraries for their contributions to the open-source community.

---

## License

This project is licensed under the **Mozilla Public License 2.0 (MPL 2.0)**. See the `LICENSE` file for details.

---