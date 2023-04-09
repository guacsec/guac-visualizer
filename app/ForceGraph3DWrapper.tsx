'use client';

// Unsure why I need to have this in a separate file, but it seems to be required to support passing refs to the graph.

import dynamic from "next/dynamic";
const ForceGraph3D = dynamic(() => import("./ForceGraph3D"), {
    ssr: false
});

export default ForceGraph3D;
