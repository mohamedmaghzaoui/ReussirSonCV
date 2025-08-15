import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "../src/App";
import { ResumeProvider } from "../src/context/ResumeContext";
import { vi } from 'vitest';
// Mock du hook
vi.mock('../src/context/UserContext', () => ({
  useUser: vi.fn(),
}));

import { useUser } from "../src/context/UserContext";

const queryClient = new QueryClient();

const renderApp = (initialRoute = "/") => {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <QueryClientProvider client={queryClient}>
        <ResumeProvider>
          <App />
        </ResumeProvider>
      </QueryClientProvider>
    </MemoryRouter>
  );
};

describe("Private Routes Dashboard", () => {
    //dashboard if not connected
  test("redirects to Home if not logged in", async() => {
    useUser.mockReturnValue({ user: null }); // pas connecté
    renderApp("/dashboard");
    const homeText = await screen.findByText(/Commencer/i);
    expect(homeText).toBeInTheDocument();
  });
//dashboard if connected
  test("renders Dashboard if logged in", async() => {
    useUser.mockReturnValue({ user: { id: 1, name: "Mohamed" } }); // connecté
    renderApp("/dashboard");
    const dashboardText = await screen.findByText(/Chargement des CV.../i);
    expect(dashboardText).toBeInTheDocument();
  });
});
//profile if not connected
describe("Private Routes  Profile ", () => {
  test("renders Profile if logged in", async () => {
    useUser.mockReturnValue({ user: { id: 1, name: "Mohamed" } }); // connecté
    renderApp("/profile");
    
    
    const profileText = await screen.findByText(/Modifier votre mot de passe/i);
    expect(profileText).toBeInTheDocument();
  });
//profile if connected
  test("redirects to Home if not logged in (Profile)", async () => {
    useUser.mockReturnValue({ user: null }); // pas connecté
    renderApp("/profile");

    const homeText = await screen.findByText(/Commencer/i);
    expect(homeText).toBeInTheDocument();
  });


});

