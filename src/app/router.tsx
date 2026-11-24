import { createBrowserRouter } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import HomePage from "@/features/home/pages/HomePage";
import NotFoundPage from "@/features/home/pages/NotFoundPage";
import PlacesPage from "@/features/places/pages/PlacesPage";
import PlaceDetailPage from "@/features/places/pages/PlaceDetailPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "places", element: <PlacesPage /> },
      { path: "places/:id", element: <PlaceDetailPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
