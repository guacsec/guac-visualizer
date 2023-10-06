# Getting started with GUAC Visualizer

## About

The GUAC Visualizer is an experimental utility that can be used to interact with
the GUAC services. It acts as a way to visualize the software supply chain graph
as well as a means to explore the supply chain, and prototype policies.

Since the GUAC Visaulizer is still in an early experimental stage, it is likely
that there may be some unexpected behavior or usage problems. Feedback is welcome as we continue to improve the visualizer!

## Requirements

**Tools:**

- yarn
- Node.js
- Docker

# 1. Getting started

To use the GUAC visualizer, you need to have the main GUAC server running.

### 1. Download GUAC version `v0.2.0` from [here](https://github.com/guacsec/guac/releases/tag/v0.2.0).

- Follow these steps outlined here to get the GUAC server up and running: https://docs.guac.sh/setup

### 2. Download GUAC visualizer version `v0.2.0` from [here](https://github.com/guacsec/guac-visualizer/releases/tag/v0.2.0) and extract it in the same path as your GUAC repo.

Change directories into the visualizer's repo:

```bash
cd guac-visualizer
```

# 2. Install dependencies

**Install the dependencies by running:**

```bash
yarn install
```

# 3. Run the visualizer locally:

**Then run:**

```bash
yarn dev
```

You can then go to [localhost:3000](http://localhost:3000) in your browser to
see the graph visualization.

```
...

$ next dev
ready - started server on 0.0.0.0:3000, url: http://localhost:3000
info  - Using webpack 5. Reason: Enabled by default https://nextjs.org/docs/messages/webpack5

...
```

<hr />
<br />

### Using the GUAC visualizer will look something like this:

<br />

![image](https://github.com/guacsec/guac-visualizer/assets/68356865/420c523e-9774-4a4f-82c1-b7e1d29ba9ac)
