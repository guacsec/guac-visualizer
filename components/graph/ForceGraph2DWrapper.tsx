"use client";

import dynamic from "next/dynamic";
const ForceGraph2D = dynamic(() => import("./ForceGraph2D"), {
  ssr: false,
});

export default ForceGraph2D;
