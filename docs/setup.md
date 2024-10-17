# Getting started with GUAC Visualizer

## About

The GUAC Visualizer is an experimental utility that can be used to interact with
the GUAC services. It acts as a way to visualize the software supply chain graph
as well as a means to explore the supply chain, and prototype policies.

Since the GUAC Visaulizer is still in an early experimental stage, it is likely
that there may be some unexpected behavior or usage problems. We recommend using the [GraphQL interface directly](https://github.com/guacsec/guac/blob/main/demo/GraphQL.md). Feedback is welcome as we continue to improve the visualizer!

## Prerequisites

**Tools:**

- [Yarn](https://yarnpkg.com/getting-started/install)
- [Docker](https://docs.docker.com/get-docker/)

### Services

To use the GUAC visualizer, you need to have the [main GUAC server running](https://docs.guac.sh/getting-started/).

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

## Configuring the server (optional step)

When running the development server (see step 3), or as a container app,
the visualizer app server needs some configuration.
The default configuration is stored in `.env` file.

```properties
# Reminder: These are the defaults for the application.
# Please, use a `.env.local` file for you local config
# See also: https://nextjs.org/docs/app/building-your-application/configuring/environment-variables

GUACGQL_SERVER_URL=http://localhost:8080
```

You have multiple options, to change the configuration to your local needs:
* provide environment variable ==> typical for execution environment, like kubernetes
* create file `.env.local`, which then contains local configurations ==> typical during development 

If these two options are not fitting for you, there are even more options for changing the configuration,
please read the [next.js's documentation, chapter environment variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables).

<hr />

**Using the GUAC visualizer will look something like this:**

![image](https://github.com/guacsec/guac-visualizer/assets/68356865/420c523e-9774-4a4f-82c1-b7e1d29ba9ac)

**Note:** If you get an error when guac-visualizer tries to render, you may need to update the generated graphql code.
To do this:

1. Clone the [GUAC repo](https://github.com/guacsec/guac)
2. Ensure the paths in the `codegen.ts` file in this repository are correct.
If you cloned GUAC into a directory next to this repo's directory, you will not need to change the paths.
3. Run `yarn graphql-codegen` to update the graphql code.
