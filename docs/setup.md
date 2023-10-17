# Getting started with GUAC Visualizer

## About

The GUAC Visualizer is an experimental utility that can be used to interact with
the GUAC services. It acts as a way to visualize the software supply chain graph
as well as a means to explore the supply chain, and prototype policies.

Since the GUAC Visaulizer is still in an early experimental stage, it is likely
that there may be some unexpected behavior or usage problems. We recommend using the [GraphQL interface directly](https://github.com/guacsec/guac/blob/main/demo/GraphQL.md). Feedback is welcome as we continue to improve the visualizer!

## Requirements

**Tools:**

- yarn
- docker

### Services

To use the GUAC visualizer, you need to have the main GUAC server running. For more information on how to do this, click
[here](https://docs.guac.sh/getting-started/).

## Step 1. Getting started

Get the
[source code for guac-visualizer `v0.3.0` here:](https://github.com/guacsec/guac-visualizer/releases/tag/v0.3.0)

`cd` into it:

```bash
cd guac-visualizer
```

## Step 2. Install dependencies

```bash
yarn install
```

## Step 3. Run the visualizer locally:

```bash
yarn dev
```

You can then go to [localhost:3000](http://localhost:3000) in your browser to
start using the visualizer.

```
...

$ next dev
ready - started server on 0.0.0.0:3000, url: http://localhost:3000
info  - Using webpack 5. Reason: Enabled by default https://nextjs.org/docs/messages/webpack5

...
```

<hr />

**Using the GUAC visualizer will look something like this:**

![image](https://github.com/guacsec/guac-visualizer/assets/68356865/420c523e-9774-4a4f-82c1-b7e1d29ba9ac)
