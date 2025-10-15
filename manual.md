### 🌍 skatlaz_remote_js

JAVASCRIPT REMOTE FETCH TO SCAFFOLDING HTML DOM WITH DATASOURCE FILES JSON-CSV-TXT-RSS-XML

![SKATLAZ REMOTE JS Logo](./skatlazremote.gif)

**Version:** 4.0 Beta  
**Status:** Under Development  
**Author:** #asytrick  
**Website:** [github.com/ssmool/skatlaz_remote_js/](https://github.com/ssmool/skatlaz_remote_js/)  
**Contact:** eusmool@gmail.com 

# Skatlaz Remote JavaScript Manual

This document provides a **developer reference and usage guide** for the Skatlaz Remote JavaScript toolkit.  
It explains how to configure, bind, and parse remote or local data sources (`XML`, `CSV`, `RSS`, `TXT`) using  
`skatlaz_js.js` and `skatlaz_parsers_js.js`.

---

### 🏄 Lightweight JavaScript **remote JSON scaffolder** for HTML DOM.

> Small library to fetch a JSON resource and scaffold values into an HTML template in the browser with minimal client and server memory overhead. Useful for simple content pages, prototyping, and progressive enhancement.

---

## Features

* Fetch JSON from a remote URI and return as a JavaScript object.
* Bind JSON keys to an HTML template and append rendered content into the DOM.
* Tiny footprint and low runtime memory usage — designed for simple pages and constrained environments.
* Easy to extend for parsing CSV, RSS, XML, and plain text for different purposes (#asytrick).

---

## Installation

This is a tiny client-side script. Add the `skatlaz_remote.js` file to your project and include it with a `<script>` tag.

```html
<script src="skatlaz_js.js"></script>
<script src="skatlaz_parser_js.js"></script>
```

## 🔧 Overview

Skatlaz Remote JS enables HTML element binding through placeholders in the DOM.  
It automatically duplicates HTML templates using remote or parsed data returned from `_skatlaz_remote()`.

This allows dynamic rendering without using complex frameworks — pure JavaScript and simple markup.

---

## 📁 File Structure

/project-root
│
├── index.html
├── skatlaz_js.js
├── skatlaz_parsers_js.js
├── data/
│ ├── example.csv
│ ├── example.xml
│ ├── example.txt
│ └── example.rss
└── manual.md


---

## 🧩 Main Components

### 1. `skat_laz_js.js`
- Handles **HTML DOM binding** and **template duplication**.
- Reads JSON objects or `_data` arrays and replaces placeholders marked as `{key}`.
- Binds values to duplicated elements identified by an element `id`.

### 2. `skat_laz_parsers_js.js`
- Handles **data parsing** for multiple formats:
  - XML → JSON
  - CSV → JSON
  - RSS → JSON
  - TXT → JSON (line or delimiter-based)
- Returns structured data objects usable by `_skatlaz_remote()`.

---

## 🚀 Function Reference

### `_skatlaz_remote(source, type, options)`

| Parameter | Type | Description |
|------------|------|-------------|
| `source` | `string` | Path or URL to data file (local or remote). |
| `type` | `string` | Data format: `'xml'`, `'csv'`, `'rss'`, or `'txt'`. |
| `options` | `object` | Optional: delimiter for CSV/TXT, tag names for XML/RSS. |

**Returns:**  
`_data` — a JSON array or object parsed from the source.

**Example:**
```javascript
let _data = _skatlaz_remote('data/example.csv', 'csv');

🧠 Binding Data to HTML
Step 1 — Create an HTML Template

Example template for repeating list items:

🧠 Binding Data to HTML
Step 1 — Create an HTML Template

Example template for repeating list items:

```bash
<ul id="list">
  <li>{item}</li>
</ul>
```
Step 2 — Provide JSON or Parsed Data

Example JSON from CSV or API:

```bash
[
  { "item": "First" },
  { "item": "Second" },
  { "item": "Third" }
]
```

Step 3 — Bind Using bind() Function

```bash
bind('list');
```bash

This will:

    Find <ul id="list">

    Duplicate its inner template (<li>{item}</li>)

    Replace {item} with each value from _data

    Render:

```bash
<ul id="list">
  <li>First</li>
  <li>Second</li>
  <li>Third</li>
</ul>
```

Step 4 — Combining Remote and Bind

```bash
let _data = _skatlaz_remote('data/items.xml', 'xml');
bind('list');
```

The parser will convert XML into a JSON array and pass it directly to the binding function.

⚙️ Settings and Configuration

You can customize bindings and placeholders by defining JSON key-value pairs that match
your HTML placeholders.

Example HTML:

```bash
<div id="profile">
  <h2>{name}</h2>
  <p>{bio}</p>
</div>
```

Example JSON:

```
[
  { "name": "Alice", "bio": "Engineer" },
  { "name": "Bob", "bio": "Designer" }
]
```

Bind:

```
<div id="profile">
  <h2>Alice</h2>
  <p>Engineer</p>
</div>
<div id="profile">
  <h2>Bob</h2>
  <p>Designer</p>
</div>
```

🌐 Server Requirement Warning

⚠️ Important:
The project includes file access operations that require a local or web server
to function correctly.

Use one of these for testing:

Local server: python -m http.server

Node.js: npx serve

XAMPP / Apache for Windows/Mac/Linux

Directly opening .html from the filesystem (file://) will block fetch requests.

```bash
<script src="skat_laz_parsers_js.js"></script>
<script src="skat_laz_js.js"></script>

<ul id="list"><li>{title}</li></ul>

<script>
  _set_addr('data.rss');
  let _data = _skatlaz_remote();
  bind('list');
</script>
```

🛠️ Developer Notes

Placeholders {key} must exactly match the JSON property name.

Each bound element ID should be unique.

The system duplicates the element body, not the element tag itself.

_skatlaz_remote() may return arrays or objects depending on data structure.

📄 License and Project Info

Skatlaz Remote JS is intended for web projects, experiments, and dynamic content generation
without dependencies.

⚠️ Includes internal server-accessing features for testing, deployment, and www-based projects.


