// ImportReacts.tsx

// -------------------------------------------------------------------------------------------------
// 1. react
export type { JSX } from "react";
export {
  default as React,
  useState,
  useEffect,
  useRef
} from "react";

// --------------------------------------------------------------------------------------------
// 2. react-dom
export {
  createRoot,
} from "react-dom/client";

// --------------------------------------------------------------------------------------------
// 3. react-router
export {
  useNavigate,
  useLocation,
  BrowserRouter,
  Routes,
  Route,
} from "react-router";
