import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
import ProtectedRoute from "./pages/ProtectedRoute";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import User from "./pages/User";
import Settings from "./pages/Settings";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 6000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/pending-verification" element={<PageNotFound />} />

          {/* user can access below once logged in */}
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Home />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/:username" element={<User />} />
          </Route>
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: { duration: 3000 },
          error: { duration: 5000 },
          style: {
            fontSize: "1rem",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "white",
            color: "grey",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
