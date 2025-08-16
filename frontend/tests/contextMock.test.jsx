// tests/contextMock.test.jsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "../src/App.jsx";
import { ResumeProvider } from "../src/context/ResumeContext.jsx";
import { vi } from 'vitest';

// Mock du UserContext
vi.mock('../src/context/UserContext', () => ({
  useUser: vi.fn(),
}));
import { useUser } from "../src/context/UserContext";

// Mock du ResumeContext
vi.mock('../src/context/ResumeContext', () => ({
  useResumes: vi.fn(),
  ResumeProvider: ({ children }) => children,
}));
import { useResumes } from "../src/context/ResumeContext";

const queryClient = new QueryClient();

const renderApp = (initialRoute = "/") => {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </MemoryRouter>
  );
};

describe("App with mocked contexts", () => {
  test("renders dashboard for logged-in user with mocked CVs", async () => {
    useUser.mockReturnValue({ user: { id: 1, name: "Mohamed" } });

    // Mock des CVs
    useResumes.mockReturnValue({
   resumes: [
    {
        "id": 1,
        "name": "CV Test 1",
        "created_at": "2025-08-15T12:00:00Z",
        "theme": {
            "font": "Bree Serif",
            "color": "#7C2D12",
            "background_color": "#FFFFFF"
        }
    },
    {
        "id": 2,
        "name": "CV Test 2",
        "created_at": "2025-08-14T10:30:00Z",
        "theme": {
            "font": "Arial",
            "color": "#000000",
            "background_color": "#F5F5F5"
        }
    }
],

      deleteResume: vi.fn(),
      loading: false
    });

    renderApp("/dashboard");

    const cv1 = await screen.findByText(/CV Test 1/i);
    const cv2 = await screen.findByText(/CV Test 2/i);

    expect(cv1).toBeInTheDocument();
    expect(cv2).toBeInTheDocument();
  });
});
