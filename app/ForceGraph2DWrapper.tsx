'use client';

// Unsure why I need to have this in a separate file, but it seems to be required to support passing refs to the graph.

import dynamic from "next/dynamic";
const ForceGraph2D = dynamic(() => import("./ForceGraph2D"), {
    ssr: false
});

export default ForceGraph2D;