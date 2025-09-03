import type { Item } from "../types/Item";

interface ItemListProps {
    list: Item[];
    listName: string;
    selectedItems: Set<number>;
    toggleItemSelection: (id: number) => void;
}

const ItemList = (props: ItemListProps) => {
    const { list, listName, toggleItemSelection, selectedItems } = props;
    return (
        <div >
            <h3>{listName}</h3>
            <ul className="item-list">
                {list.map((item) => (
                    <li key={item.id}>
                        <input type="checkbox" id={`item-${item.id}`} checked={selectedItems.has(item.id)}
                            onChange={() => toggleItemSelection(item.id)} />
                        <label htmlFor={`item-${item.id}`}>{item.name}</label>
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default ItemList;