import { useState } from "react";
import type { Item } from "../types/Item";
import ItemList from "./ItemList";
import { initialListA, initialListB } from "../constants/constant";
import "./style.css";
import { Button } from "./atoms/Button";
const TransferList = () => {

    const [listA, setListA] = useState<Item[]>(initialListA);
    const [listB, setListB] = useState<Item[]>(initialListB);
    const [selectedItemsA, setSelectedItemsA] = useState<Set<number>>(new Set());
    const [selectedItemsB, setSelectedItemsB] = useState<Set<number>>(new Set());

    const toggleItemSelection = (id: number, listType: "A" | "B") => {
        const newSelectedItems = listType === "A" ? new Set(selectedItemsA) : new Set(selectedItemsB);
        if (newSelectedItems.has(id)) {
            newSelectedItems.delete(id);
        } else {
            newSelectedItems.add(id);
        }
        if (listType === "A") {
            setSelectedItemsA(newSelectedItems);
        } else {
            setSelectedItemsB(newSelectedItems);
        }
    }

    const onTransferItems = (direction: "AtoB" | "BtoA") => {
        let newListA = [...listA];
        let newListB = [...listB];

        if (direction === "AtoB") {
            newListB = [...newListB, ...newListA.filter(item => selectedItemsA.has(item.id))];
            newListA = listA.filter(item => !selectedItemsA.has(item.id));
            setSelectedItemsA(new Set());
        } else {
            newListA = [...newListA, ...newListB.filter(item => selectedItemsB.has(item.id))];
            newListB = newListB.filter(item => !selectedItemsB.has(item.id));
            setSelectedItemsB(new Set());
        }
        setListA(newListA);
        setListB(newListB);
    }

    const isTransferEnabled = (list: "A" | "B") => {
        return list === "A" ? selectedItemsA.size > 0 : selectedItemsB.size > 0;
    };

    return (
        <div className="transfer-list">
            <ItemList list={listA} selectedItems={selectedItemsA} listName="List A" toggleItemSelection={(id) => toggleItemSelection(id, "A")} />

            <div className="button-container">
                <Button onClick={() => onTransferItems("AtoB")} disabled={!isTransferEnabled("A")} direction="AtoB" />
                <Button onClick={() => onTransferItems("BtoA")} disabled={!isTransferEnabled("B")} direction="BtoA" />
            </div>

            <ItemList list={listB} selectedItems={selectedItemsB} listName="List B" toggleItemSelection={(id) => toggleItemSelection(id, "B")} />
        </div>
    )

}
export default TransferList;