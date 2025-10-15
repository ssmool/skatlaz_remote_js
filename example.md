🧩 Instructions

Place this index.html in the same directory as:

```bash
skatlaz_js.js
skatlaz_parsers_js.js
data/example.csv
```

Create a simple test CSV file at data/example.csv:

```bash
item
One
Two
Three
```

Start a local server:

```bash
python -m http.server
```

Open http://localhost:8000/ in your browser.
You’ll see the list items and profile bindings dynamically rendered.

```bash
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Skatlaz Remote JS Demo</title>
  <script src="skat_laz_parsers_js.js"></script>
  <script src="skat_laz_js.js"></script>
  <style>
    body {
      font-family: sans-serif;
      background: #0a0a0a;
      color: #f2f2f2;
      margin: 2rem;
    }
    h1 { color: #00ffcc; }
    ul { list-style: none; padding: 0; }
    li {
      background: #111;
      border: 1px solid #333;
      margin: 0.3rem 0;
      padding: 0.5rem 1rem;
      border-radius: 8px;
    }
    footer {
      margin-top: 2rem;
      font-size: 0.8rem;
      color: #777;
    }
  </style>
</head>

<body>
  <h1>🧠 Skatlaz Remote JS Demo</h1>
  <p>This page demonstrates loading and binding remote data using <code>_skatlaz_remote()</code> and <code>bind()</code>.</p>

  <h2>CSV Data Example</h2>
  <ul id="list"><li>{item}</li></ul>

  <h2>Profile Template Example</h2>
  <div id="profile">
    <h3>{name}</h3>
    <p>{bio}</p>
  </div>

  <script>
    // Example 1 — Parse a CSV file and bind to <ul id="list">
    var _rs = _set_addr('data/example.csv');
    let _data = _skatlaz_remote();
    _addr_stream = _data;
    _json = streamCSV();
    bind('list');

    // Example 2 — Bind manually with inline JSON
    let people = [
      { name: "Alice", bio: "Engineer & creator" },
      { name: "Bob", bio: "Designer & thinker" },
      { name: "Clara", bio: "Developer & tester" }
    ];
    bind('profile');
  </script>

  <footer>
    <p>⚙️ Running on local or www server is required for full functionality.</p>
    <p>Docs: <a href="manual.md" target="_blank">Manual</a> | <a href="README.md" target="_blank">Readme</a></p>
  </footer>
</body>
</html>
```
