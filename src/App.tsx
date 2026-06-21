import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { ProgressProvider } from "./context/ProgressContext";
import { FinalePage } from "./pages/FinalePage";
import { IntroPage } from "./pages/IntroPage";
import { StationPage } from "./pages/StationPage";

export default function App() {
  return (
    <ProgressProvider>
      <HashRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<IntroPage />} />
            <Route path="/station/:id" element={<StationPage />} />
            <Route path="/finale" element={<FinalePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </HashRouter>
    </ProgressProvider>
  );
}
