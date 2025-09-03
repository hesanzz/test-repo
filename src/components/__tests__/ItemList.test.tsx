import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import ItemList from '../ItemList'
import userEvent from '@testing-library/user-event';
import type { Item } from '../../types/Item'
import { initialListA } from '../../constants/constant'

const mockList: Item[] = initialListA;

describe('ItemList', () => {
    let toggleItemSelectionMock: (id: number) => void;

    beforeEach(() => {
        toggleItemSelectionMock = vi.fn();
    });
    it('renders the list name', () => {
        render(<ItemList list={mockList} listName="Test List" selectedItems={new Set()} toggleItemSelection={toggleItemSelectionMock} />);

        expect(screen.getByRole("heading")).toHaveTextContent("Test List");
    })

    it('renders the correct number of items', () => {
        render(<ItemList list={mockList} listName="Test List" selectedItems={new Set()} toggleItemSelection={toggleItemSelectionMock} />);
        expect(screen.getAllByRole("checkbox")).toHaveLength(mockList.length);
    })
    it('calls toggleItemSelection when an item is clicked', async () => {
        render(<ItemList list={mockList} listName="Test List" selectedItems={new Set()} toggleItemSelection={toggleItemSelectionMock} />);
        const firstCheckbox = screen.getAllByRole("checkbox")[0];
        await userEvent.click(firstCheckbox);
        expect(toggleItemSelectionMock).toHaveBeenCalledWith(mockList[0].id);
    })
})