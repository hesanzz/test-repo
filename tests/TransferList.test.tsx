import { describe, expect, it } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { initialListA, initialListB } from '../src/constants/constant'
import TransferList from "../src/components/TransferList";
import type { Item } from '../src/types/Item'

const mockListA: Item[] = initialListA;
const mockListB: Item[] = initialListB;

describe("TransferList", () => {
    it("renders both lists", () => {
        render(<TransferList />);
        expect(screen.getByRole("heading", { name: "List A" })).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "List B" })).toBeInTheDocument();
    });
    it("toggles item selection", async () => {
        render(<TransferList />);
        const firstItemCheckbox = screen.getByLabelText(mockListA[0].name);
        expect(firstItemCheckbox).not.toBeChecked();
        await userEvent.click(firstItemCheckbox);
        expect(firstItemCheckbox).toBeChecked();
        await userEvent.click(firstItemCheckbox);
        expect(firstItemCheckbox).not.toBeChecked();
    })


    it("transfers items from List A to List B", async () => {
        render(<TransferList />);
        const firstItemCheckbox = screen.getByLabelText(mockListA[0].name);
        await userEvent.click(firstItemCheckbox);
        const transferButton = screen.getByRole("button", { name: "->" });
        await userEvent.click(transferButton);
        await waitFor(() => {

            expect(screen.getByLabelText(mockListA[0].name)).toBeInTheDocument();
        })
    })

    it("transfers items from List B to List A", async () => {
        render(<TransferList />);
        const firstItemCheckbox = screen.getByLabelText(mockListB[0].name);
        await userEvent.click(firstItemCheckbox);
        const transferButton = screen.getByRole("button", { name: "<-" });
        await userEvent.click(transferButton);
        await waitFor(() => {
            expect(screen.getByLabelText(mockListB[0].name)).toBeInTheDocument();
        })
    })

    it("disables transfer buttons when no items are selected", async () => {
        render(<TransferList />);
        const transferButtonToB = screen.getByRole("button", { name: "->" });
        const transferButtonToA = screen.getByRole("button", { name: "<-" });
        expect(transferButtonToB).toBeDisabled();
        expect(transferButtonToA).toBeDisabled();
        const firstItemCheckbox = screen.getByLabelText(mockListA[0].name);
        await userEvent.click(firstItemCheckbox);
        expect(transferButtonToB).not.toBeDisabled();
        expect(transferButtonToA).toBeDisabled();
    });

})
