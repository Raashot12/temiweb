import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Tabs } from ".";

const tabs = [
  {
    label: "All",
    value: "all",
    content: <div>All Content</div>,
  },
  {
    label: "Individual",
    value: "individual",
    content: <div>Individual Content</div>,
  },
  {
    label: "Family",
    value: "family",
    content: <div>Family Content</div>,
  },
  {
    label: "Corporate",
    value: "corporate",
    content: <div>Corporate Content</div>,
  },
] as const;

type TabValue = (typeof tabs)[number]["value"];

const props = {
  tabs,
  onChange: () => {},
};

describe("Tabs Component", () => {
  test("renders without crashing", () => {
    render(<Tabs<TabValue> defaultTab="all" {...props} />);
  });

  test("renders the correct number of tabs", () => {
    render(<Tabs<TabValue> defaultTab="all" {...props} />);
    const tabElements = screen.getAllByRole("tab");
    expect(tabElements.length).toBe(tabs.length);
  });

  test("displays the correct default tab content", () => {
    render(<Tabs<TabValue> defaultTab="all" {...props} />);
    expect(screen.getByText("All Content")).toBeInTheDocument();
  });

  test("switches to the correct tab content when a tab is clicked", async () => {
    const user = userEvent.setup();
    render(<Tabs<TabValue> defaultTab="all" {...props} />);

    await user.click(screen.getByText("Individual"));
    expect(screen.getByText("Individual Content")).toBeInTheDocument();
    expect(screen.queryByText("All Content")).not.toBeInTheDocument();

    await user.click(screen.getByText("Family"));
    expect(screen.getByText("Family Content")).toBeInTheDocument();
    expect(screen.queryByText("Individual Content")).not.toBeInTheDocument();

    await user.click(screen.getByText("Corporate"));
    expect(screen.getByText("Corporate Content")).toBeInTheDocument();
    expect(screen.queryByText("Family Content")).not.toBeInTheDocument();
  });

  test("displays the correct tab label", () => {
    render(<Tabs<TabValue> defaultTab="all" tabs={tabs} onChange={() => {}} />);
    tabs.forEach((tab) => {
      expect(screen.getByText(tab.label)).toBeInTheDocument();
    });
  });
});
